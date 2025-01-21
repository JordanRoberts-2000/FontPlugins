import { z } from "zod";
import { settingsSchema } from "./settings/settings.schema.js";
import { googleFontSchema } from "./fonts/google/google.font.schema.js";
import { localFontSchema } from "./fonts/local/local.font.schema.js";
import defaultSettings from "../config/defaultSettings.js";

const configSchema = z
  .object({
    settings: settingsSchema.optional().default(defaultSettings),
    googleFonts: z.array(googleFontSchema).optional(),
    localFonts: z.array(localFontSchema).optional(),
    remoteFonts: z.array(localFontSchema).optional(),
    cdnFonts: z.array(localFontSchema).optional(),
  })
  .transform((config) => {
    // const cdnFonts = configureCdnFonts(config.googleFonts, config.settings);
    return {};
  });
