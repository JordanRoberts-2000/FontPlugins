import { z } from "zod";
import { optimizeSchema } from "../../shared/optimize.schema.js";

export const scriptSettingsSchema = z.object({
  outputFolder: z.string(),
  css: z.object({
    disable: z.boolean(),
    minify: z.boolean(),
    fileName: z.string(),
    outputFolder: z.string(),
  }),
  fontFiles: z.object({
    disable: z.boolean(),
    outputFolder: z.string(),
    optimize: optimizeSchema,
  }),
});
