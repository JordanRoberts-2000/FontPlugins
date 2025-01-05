import { z } from "zod";
import { fontData } from "../utils/googleFontDataMap.js";

const fontsSchema = z.array(
  z.union([
    z
      .string()
      .refine((fontName) => fontData.has(fontName.replace(/\s+/g, "_")), {
        message: "Invalid font-family",
      }),
    z.object({
      font: z
        .string()
        .refine((fontName) => fontData.has(fontName.replace(/\s+/g, "_")), {
          message: "Invalid font-family",
        }),
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
            min: z.string(),
            max: z.string(),
          }),
        ])
        .optional(),
      italic: z
        .union([
          z.string(),
          z.boolean(),
          z.array(z.string()),
          z.object({
            min: z.string(),
            max: z.string(),
          }),
        ])
        .optional(),
      subsets: z.union([z.string(), z.array(z.string())]).optional(),
      axes: z.union([z.string(), z.array(z.string())]).optional(),
    }),
  ])
);

export default fontsSchema;
