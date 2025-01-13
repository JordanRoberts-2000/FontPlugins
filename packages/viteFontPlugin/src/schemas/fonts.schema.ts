import { z } from "zod";
import { fontData } from "../utils/googleFontDataMap.js";

const fontSchema = z.string().refine(
  (fontName) => fontData.has(fontName),
  (val) => ({
    message: `Invalid font-family: ${val}`,
  })
);

const fontsSchema = z.array(
  z.union([
    fontSchema,
    z.object({
      font: fontSchema,
      className: z.string().optional(),
      cssVariable: z
        .string()
        .transform((varName) =>
          varName.startsWith("--") ? varName : "--" + varName
        )
        .optional(),
      preload: z.boolean().optional(),
      modifiedFallback: z.boolean().default(true),
      customFallback: z.string().optional(),
      display: z
        .enum(["auto", "block", "swap", "fallback", "optional"])
        .optional(),
      weight: z
        .union([
          z.string(),
          z.array(z.string()),
          z.object({
            from: z.string(),
            to: z.string(),
          }),
        ])
        .optional(),
      italic: z
        .union([
          z.string(),
          z.boolean(),
          z.array(z.string()),
          z.object({
            from: z.string(),
            to: z.string(),
          }),
        ])
        .optional(),
      subsets: z.union([z.string(), z.array(z.string())]).default([]),
      axes: z.union([z.string(), z.array(z.string())]).default([]),
    }),
  ])
);

export type FontSchema = z.infer<typeof fontsSchema>;

export default fontsSchema;
