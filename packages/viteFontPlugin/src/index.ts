import type { Plugin } from "vite";
import { FontPluginConfig } from "./types/pluginConfigType";
import addPreconnectLinks from "./utils/addPreconnectLinks.js";

export default function fontPlugin(config: FontPluginConfig): Plugin {
  return {
    name: "vite-font-plugin",
    config() {
      // fontName replace spaces
      // resolve if subset is "all" or undefined
      // resolve if weight & italic weight is undefined
      // add -- to css variables if not included
      console.log("env: ", process.env.NODE_ENV);
      console.log("config: ", config);
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
      }
    },

    buildEnd() {
      // download each font, retrieve some css while doing so
      // build & minify css file, add it to dist/build folder, include fallbacks
    },
  };
}
