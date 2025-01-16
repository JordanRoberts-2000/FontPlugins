import { z } from "zod";
import {
  CONFIG_DEFAULT_SETTINGS,
  CSS_METHOD_OPTIONS,
} from "../../constants.js";
import { invalidFallback } from "../utils/index.js";

const pluginSchema = z.object({
  disable: invalidFallback(
    z.boolean().optional(),
    "plugin.disable",
    CONFIG_DEFAULT_SETTINGS.plugin.disable
  ),
  css: invalidFallback(
    z
      .object({
        method: invalidFallback(
          z.enum(CSS_METHOD_OPTIONS).optional(),
          "plugin.css.minify",
          CONFIG_DEFAULT_SETTINGS.plugin.css.method
        ),
        minify: invalidFallback(
          z.boolean().optional(),
          "plugin.css.minify",
          CONFIG_DEFAULT_SETTINGS.plugin.css.minify
        ),
      })
      .optional(),
    "plugin.css",
    CONFIG_DEFAULT_SETTINGS.plugin.css
  ),
  fontFiles: invalidFallback(
    z
      .object({
        optimise: invalidFallback(
          z.boolean().optional(),
          "plugin.fontFiles.optimise",
          CONFIG_DEFAULT_SETTINGS.plugin.fontFiles.optimise
        ),
        convertToWoff2: invalidFallback(
          z.boolean().optional(),
          "plugin.fontFiles.convertToWoff2",
          CONFIG_DEFAULT_SETTINGS.plugin.fontFiles.convertToWoff2
        ),
      })
      .optional(),
    "plugin.fontFiles",
    CONFIG_DEFAULT_SETTINGS.plugin.fontFiles
  ),
});

export default pluginSchema;
