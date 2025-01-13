import { z } from "zod";

const configSchema = z
  .object({
    suppressNotOpenSourceWarnings: z.boolean().default(false),
    selfHost: z.boolean().default(true),
    handleCss: z.enum(["inlineHead", "buildFile"]).default("inlineHead"),
    includeItalicsByDefault: z.boolean().default(true),
    defaultModifiedFallback: z.boolean().default(true),
    defaultPreload: z.boolean().default(false),
    defaultDisplay: z
      .enum(["auto", "block", "swap", "fallback", "optional"])
      .default("swap"),
  })
  .strict()
  .default({
    suppressNotOpenSourceWarnings: false,
    selfHost: true,
    handleCss: "inlineHead",
    includeItalicsByDefault: true,
    defaultPreload: false,
    defaultDisplay: "swap",
  });

export type ConfigSchema = z.infer<typeof configSchema>;

export default configSchema;
