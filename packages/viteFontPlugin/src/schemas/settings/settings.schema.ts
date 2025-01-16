import { z } from "zod";
import { invalidFallback, removeDuplicates } from "../utils/index.js";
import {
  CONFIG_DEFAULT_SETTINGS,
  DISPLAY_OPTIONS,
  SUBSETS_OPTIONS,
} from "../../constants.js";
import preconnectSchema from "./preconnect.schema.js";
import scriptSchema from "./script.schema.js";
import pluginSchema from "./plugin.schema.js";

const settingsSchema = z.object({
  suppressNotOpenSourceWarnings: invalidFallback(
    z.boolean().optional(),
    "suppressNotOpenSourceWarnings",
    CONFIG_DEFAULT_SETTINGS.suppressNotOpenSourceWarnings
  ),

  preconnect: invalidFallback(
    preconnectSchema.optional(),
    "preconnect",
    CONFIG_DEFAULT_SETTINGS.preconnect
  ),

  subsetPriority: invalidFallback(
    z
      .array(z.enum(SUBSETS_OPTIONS))
      .nonempty()
      .transform((values) =>
        removeDuplicates(values, "settings.subsetPriority")
      )
      .optional(),
    "subsetPriority",
    CONFIG_DEFAULT_SETTINGS.subsetPriority
  ),

  defaultDisplay: invalidFallback(
    z.enum(DISPLAY_OPTIONS).optional(),
    "defaultDisplay",
    CONFIG_DEFAULT_SETTINGS.defaultDisplay
  ),

  defaultPreload: invalidFallback(
    z.boolean().optional(),
    "defaultPreload",
    CONFIG_DEFAULT_SETTINGS.defaultPreload
  ),

  convertToWoff2ByDefault: invalidFallback(
    z.boolean().optional(),
    "convertToWoff2ByDefault",
    CONFIG_DEFAULT_SETTINGS.convertToWoff2ByDefault
  ),

  optimizeByDefault: invalidFallback(
    z.boolean().optional(),
    "optimizeByDefault",
    CONFIG_DEFAULT_SETTINGS.optimizeByDefault
  ),

  adjustedFallbackByDefault: invalidFallback(
    z.boolean().optional(),
    "adjustedFallbackByDefault",
    CONFIG_DEFAULT_SETTINGS.adjustedFallbackByDefault
  ),

  includeItalicsByDefault: invalidFallback(
    z.boolean().optional(),
    "includeItalicsByDefault",
    CONFIG_DEFAULT_SETTINGS.includeItalicsByDefault
  ),

  selfHostByDefault: invalidFallback(
    z.boolean().optional(),
    "selfHostByDefault",
    CONFIG_DEFAULT_SETTINGS.selfHostByDefault
  ),

  plugin: invalidFallback(
    pluginSchema.optional(),
    "plugin",
    CONFIG_DEFAULT_SETTINGS.plugin
  ),

  script: invalidFallback(
    scriptSchema.optional(),
    "script",
    CONFIG_DEFAULT_SETTINGS.script
  ),
});

export type Settings = z.infer<typeof settingsSchema>;

export default settingsSchema;
