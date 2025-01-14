import { z } from "zod";
import { fontData } from "../utils/googleFontDataMap.js";
import { DISPLAY_OPTIONS } from "../constants.js";
import PluginLogger from "../utils/logger.js";

export function generateFontsSchema(fontData: Map<string, unknown>) {
  const nameSchema = z.string().refine(
    (fontName) => fontData.has(fontName),
    (val) => ({
      message: `Invalid font-family: ${val}`,
    })
  );

  const numericFontWeightSchema = z.union([
    z.literal(100),
    z.literal(200),
    z.literal(300),
    z.literal(400),
    z.literal(500),
    z.literal(600),
    z.literal(700),
    z.literal(800),
    z.literal(900),
  ]);

  const weightSchema = z.union([
    z.literal("all"),
    z.literal("variable"),
    numericFontWeightSchema,
    z.array(numericFontWeightSchema),
    z
      .object({
        min: numericFontWeightSchema,
        max: numericFontWeightSchema,
      })
      .refine(({ min, max }) => min < max, {
        message: "Invalid weight: max !> min ",
      }),
  ]);

  const italicWeightsSchema = z.union([
    z.literal("all"),
    z.boolean(),
    numericFontWeightSchema,
    z.array(numericFontWeightSchema),
    z
      .object({
        min: numericFontWeightSchema,
        max: numericFontWeightSchema,
      })
      .refine(({ min, max }) => min < max, {
        message: "Invalid italic weight: max > min ",
      }),
  ]);

  return z
    .array(
      z
        .union([
          z.null(),
          nameSchema,
          z.object({
            font: nameSchema,
            className: z.string().optional(),
            cssVariable: z
              .string()
              .transform((varName) =>
                varName.startsWith("--") ? varName : "--" + varName
              )
              .optional(),
            preload: z.boolean().optional(),
            modifiedFallback: z.boolean().optional(),
            customFallback: z.string().optional(),
            display: z.enum(DISPLAY_OPTIONS),
            weight: weightSchema.optional(),
            italic: italicWeightsSchema.optional(),
            subsets: z.union([z.string(), z.array(z.string())]).optional(),
            axes: z.union([z.string(), z.array(z.string())]).optional(),
          }),
        ])
        .catch(({ input, error }) => {
          PluginLogger.error(
            `Font '${
              typeof input === "string" ? input : input?.font
            }' is invalid. Error: ${error}`
          );
          return null;
        })
    )
    .catch(({ input, error }) => {
      PluginLogger.error(`Fonts value '${input}' is invalid. Error: ${error}`);
      return [];
    });
}

const fontsSchema = generateFontsSchema(fontData);

export type FontSchema = z.infer<typeof fontsSchema>;

export default fontsSchema;
