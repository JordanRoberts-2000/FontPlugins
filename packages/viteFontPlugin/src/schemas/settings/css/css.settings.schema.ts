import { z } from "zod";
import { CSS_METHODS } from "../../../../../../shared/constants.js";

export const cssSettingsSchema = z.object({
  method: z.enum(CSS_METHODS),
  minify: z.boolean(),
});

export type CssSettings = z.infer<typeof cssSettingsSchema>;
