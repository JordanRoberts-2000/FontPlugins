import { z } from "zod";
import { fontData } from "../utils/googleFontDataMap.js";

const FontPluginConfigSchema = z.object({
  config: z
    .object({
      selfHost: z.boolean().default(true),
      css: z.enum(["inlineHead", "buildFile"]).default("buildFile"),
      includeItalicsByDefault: z.boolean().default(true),
      defaultPreload: z.boolean().default(false),
      defaultDisplay: z
        .enum(["auto", "block", "swap", "fallback", "optional"])
        .default("swap"),
    })
    .default({
      selfHost: true,
      css: "inlineHead",
      defaultPreload: false,
      defaultDisplay: "swap",
    }),
  fonts: z.array(
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
        preload: z.boolean().optional(),
        cssVariable: z
          .string()
          .transform((varName) =>
            varName.startsWith("--") ? varName : "--" + varName
          )
          .optional(),
        className: z.string().optional(),
        customFallback: z.string().optional(),
        display: z
          .enum(["auto", "block", "swap", "fallback", "optional"])
          .optional(),
        modifiedFallback: z.boolean().optional(),
      }),
    ])
  ),
});

export default FontPluginConfigSchema;
