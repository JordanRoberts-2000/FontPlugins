import type { Plugin } from "vite";
import type { FontPluginConfig } from "./types/pluginConfigType.js";
import addPreconnectLinks from "./utils/htmlGen/addPreconnectLinks.js";
import modifyConfig from "./utils/modifyConfig.js";
import FontPluginConfigSchema from "./schemas/configSchema.js";
import PluginLog from "./utils/logging.js";

export default function fontPlugin(config: FontPluginConfig): Plugin {
  const validConfig = FontPluginConfigSchema.safeParse(config);
  if (!validConfig.success) {
    validConfig.error.errors.map((error) => {
      PluginLog.error(`Validation Failed: ${error.message}`);
    });
    throw new Error("FontPlugin: Failed to validate provided config object");
  }
  return {
    name: "vite-font-plugin",
    config() {
      config = modifyConfig(config);
    },
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "development") {
        html = addPreconnectLinks(html);

        // Add google font url links

        // Inject css classes into the head

        // Inject css variables into the head

        return html;
      }
      if (process.env.NODE_ENV === "production") {
        // add link to css file
        // add preloads
        return html;
      }
    },

    buildEnd() {
      // download each font, retrieve some css while doing so
      // build & minify css file, add it to dist/build folder, include fallbacks
    },
  };
}
