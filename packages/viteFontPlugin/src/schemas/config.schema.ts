import { z } from "zod";
import settingsSchema from "./settings/settings.schema.js";
import invalidFallback from "./utils/invalidFallback.js";
import { CONFIG_DEFAULT_SETTINGS } from "../constants.js";
import googleFontsSchema from "./fonts/fonts.google.schema.js";
import localFontsSchema from "./fonts/fonts.local.schema.js";
import remoteFontsSchema from "./fonts/fonts.remote.schema.js";
import cdnFontsSchema from "./fonts/fonts.cdn.schema.js";
import { configureCdnFonts } from "./utils/configure/configure.cdnFonts.js";

const configSchema = z
  .object({
    settings: invalidFallback(
      settingsSchema.optional(),
      "settings",
      CONFIG_DEFAULT_SETTINGS
    ),
    googleFonts: googleFontsSchema.optional(),
    localFonts: localFontsSchema.optional(),
    remoteFonts: remoteFontsSchema.optional(),
    cdnFonts: cdnFontsSchema.optional().default([]),
  })
  .transform((config) => {
    // configureGoogle(config.settings, config.googleFonts)
    // configureLocal(config.settings, config.localFonts)
    // configureRemote(config.settings, config.remoteFonts)
    const cdnFonts = configureCdnFonts(config.cdnFonts, config.settings);
    return {};
  });
