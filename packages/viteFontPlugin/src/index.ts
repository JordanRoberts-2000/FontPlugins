import type { Plugin } from "vite";
import type { FontPluginConfig } from "./types/pluginConfigType.js";
import addPreconnectLinks from "./utils/htmlGen/addPreconnectLinks.js";
import processConfig from "./utils/processConfig.js";

export default function fontPlugin(config: FontPluginConfig): Plugin {
  // let processedConfig: ProccessedConfig;
  return {
    name: "vite-font-plugin",
    config() {
      // processedConfig = processConfig(config);
    },
    transformIndexHtml(html) {
      // const { fonts: settings } = processedConfig;
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
