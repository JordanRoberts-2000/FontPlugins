import { z } from "zod";
import {
  DISPLAY_OPTIONS,
  SUBSETS_OPTIONS,
} from "../../../../../../shared/constants.js";

export const fontSettingsSchema = z.object({
  disable: z.boolean(),
  preload: z.boolean(),
  display: z.enum(DISPLAY_OPTIONS),
  subset: z.enum(SUBSETS_OPTIONS),
  includeItalicsByDefault: z.boolean(),
  unicodeRange: z.string(),
});

export type FontSettings = z.infer<typeof fontSettingsSchema>;
