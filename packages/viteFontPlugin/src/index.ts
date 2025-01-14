import type { Plugin } from "vite";
import type { FontPluginConfig } from "./types/pluginConfigType.js";
import addPreconnectLinks from "./utils/htmlGen/addPreconnectLinks.js";
// import processConfig from "./utils/processConfig.js";
import fs from "fs";
import PluginLog from "./utils/logger.js";

export default function fontPlugin(config: FontPluginConfig): Plugin {
  let processedConfig; //: ProccessedConfig;
  return {
    name: "vite-font-plugin",
    config(_, { command }) {
      // try {
      //   processedConfig = processConfig(config);
      // } catch (error) {
      //   if(command === "build"){
      //     PluginLog.fatal(`Fail the build due to incorrect config: ${error}`)
      //   }
      //   PluginLog.error(`config was incorrect ${error}`);
      //   processedConfig = null
      // }
    },
    transformIndexHtml(html) {
      // if(!processedConfig || !processedConfig.fonts){
      //   return html
      // }

      // const { settings, fonts } = processedConfig;
      if (process.env.NODE_ENV === "development") {
        html = addPreconnectLinks(html);

        // warn if not openSource

        // Add google font url links

        // Inject fallbacks???

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
      // if(!processedConfig){
      //   return html
      // }
      // download each font, retrieve some css while doing so
      // build & minify css file, add it to dist/build folder, include fallbacks
    },
  };
}
