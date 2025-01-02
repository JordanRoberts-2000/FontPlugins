import { z } from "zod";
import fontData from "./fontData.json" with { type: "json" };

const FontPluginConfigSchema = z.object({
  config: z
    .object({
      selfHost: z.boolean().default(true),
      css: z.enum(["inlineHead", "buildFile"]).default("buildFile"),
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
      z.string().refine((fontName) => fontData.some((font) => font.family === fontName.replace(/\s+/g, '_')), {message: "Invalid font-family"}),
      z.object({
        font: z.string().refine((fontName) => fontData.some((font) => font.family === fontName.replace(/\s+/g, '_')), {message: "Invalid font-family"}),
      }),
    ])
  ),
});

export default FontPluginConfigSchema;
