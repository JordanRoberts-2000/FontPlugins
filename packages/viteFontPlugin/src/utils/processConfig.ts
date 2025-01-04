import type { FontPluginConfig } from "../types/pluginConfigType.js";
import FontPluginConfigSchema from "../schemas/configSchema.js";
import PluginLog from "../utils/logging.js";

export default function processConfig(config: FontPluginConfig) {
  const validConfig = FontPluginConfigSchema.safeParse(config);
  if (!validConfig.success) {
    validConfig.error.errors.map((error) => {
      PluginLog.error(`Validation Failed: ${error.message}`);
    });
    throw new Error("FontPlugin: Failed to validate provided config object");
  }
  return { fonts: validConfig.data.fonts, settings: validConfig.data.config };
}
