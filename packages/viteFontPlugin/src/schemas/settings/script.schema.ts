import { z } from "zod";
import { invalidFallback } from "../utils/index.js";
import { CONFIG_DEFAULT_SETTINGS } from "../../constants.js";

const scriptSchema = z.object({
  css: invalidFallback(
    z
      .object({
        disable: invalidFallback(
          z.boolean().optional(),
          "script.css.disable",
          CONFIG_DEFAULT_SETTINGS.script.css.disable
        ),
        minify: invalidFallback(
          z.boolean().optional(),
          "script.css.minify",
          CONFIG_DEFAULT_SETTINGS.script.css.minify
        ),
        outputPath: invalidFallback(
          z.string().optional(),
          "script.css.outputPath",
          CONFIG_DEFAULT_SETTINGS.script.css.outputPath
        ),
      })
      .optional(),
    "script.css",
    CONFIG_DEFAULT_SETTINGS.script.css
  ),
  fontFiles: invalidFallback(
    z
      .object({
        disable: invalidFallback(
          z.boolean().optional(),
          "script.fontFiles.disable",
          CONFIG_DEFAULT_SETTINGS.script.fontFiles.disable
        ),
        outputPath: invalidFallback(
          z.string().optional(),
          "script.fontFiles.outputPath",
          CONFIG_DEFAULT_SETTINGS.script.fontFiles.outputPath
        ),
      })
      .optional(),
    "script.fontFiles",
    CONFIG_DEFAULT_SETTINGS.script.fontFiles
  ),
});

export default scriptSchema;
