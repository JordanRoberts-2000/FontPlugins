import { z } from "zod";

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
      z.string(),
      z.object({
        font: z.string(),
      }),
    ])
  ),
});

export default FontPluginConfigSchema;
