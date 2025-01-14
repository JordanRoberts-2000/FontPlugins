import pluginConfigSchema from "../schemas/pluginConfig.schema.js";
import type { FontPluginConfig } from "../types/pluginConfigType.js";
import PluginLogger from "./logger.js";

export default function processConfig(config: FontPluginConfig) {
  const { data, success, error } = pluginConfigSchema.safeParse(config);
  if (!success) {
    error.errors.map((error) => {
      PluginLogger.error(`Validation Failed: ${error.message}`);
    });
    throw new Error("FontPlugin: Failed to validate provided config object");
  }
  return { fonts: data.fonts, settings: data.config };
}
