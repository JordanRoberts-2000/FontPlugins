import { z } from "zod";
import { scriptSettingsSchema } from "./script/script.settings.schema.js";
import { googleSettingsSchema } from "./google/google.settings.schema.js";
import { localSettingsSchema } from "./local/local.settings.schema.js";
import { fontSettingsSchema } from "./shared/fontSettings.schema.js";
import { cssSettingsSchema } from "./css/css.settings.schema.js";
import { optimizeSchema } from "../shared/optimize.schema.js";
import { DeepPartial } from "../../types/index.js";
import enforceDefaults from "../../lib/zod/applyDefaults.js";
import defaultSettings from "../../config/defaultSettings.js";
import ensureDefault from "../../lib/zod/ensureDefault.js";

const settingsSchemaBase = fontSettingsSchema.extend({
  unicodeRange: z.string(),
  preconnects: z.array(z.string()),
  optimize: optimizeSchema,
  google: googleSettingsSchema,
  local: localSettingsSchema,
  css: cssSettingsSchema,
  script: scriptSettingsSchema,
});

const settingsSchemaBaseWithDefaults = enforceDefaults(
  settingsSchemaBase,
  defaultSettings
);

export const settingsSchema = ensureDefault(
  settingsSchemaBaseWithDefaults.optional(),
  defaultSettings as any
);

export type GlobalSettings = DeepPartial<z.infer<typeof settingsSchemaBase>>;
