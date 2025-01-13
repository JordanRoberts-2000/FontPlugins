import { z } from "zod";
import { fontData } from "../utils/googleFontDataMap.js";

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
        message: "Invalid italic weight: max !> min ",
      }),
  ]);

  return z
    .array(
      z.union([
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
          display: z
            .enum(["auto", "block", "swap", "fallback", "optional"])
            .optional(),
          weight: weightSchema.optional(),
          italic: italicWeightsSchema.optional(),
          subsets: z.union([z.string(), z.array(z.string())]).default([]),
          axes: z.union([z.string(), z.array(z.string())]).default([]),
        }),
      ])
    )
    .min(1, { message: "Fonts array must have atleast 1 item" });
}

const fontsSchema = generateFontsSchema(fontData);

export type FontSchema = z.infer<typeof fontsSchema>;

export default fontsSchema;
