import type { Plugin } from "vite";
import type { FontPluginConfig } from "./types/pluginConfigType.js";
import addPreconnectLinks from "./utils/htmlGen/addPreconnectLinks.js";
// import processConfig from "./utils/processConfig.js";
import fs from "fs";

export default function fontPlugin(config: FontPluginConfig): Plugin {
  let processedConfig; //: ProccessedConfig;
  return {
    name: "vite-font-plugin",
    config() {
      // processedConfig = processConfig(config);
      // // console.log(`Processed Config: ${JSON.stringify(processedConfig)}`);
      // fs.writeFile(
      //   "../../configOutput.json",
      //   JSON.stringify(processedConfig),
      //   (err) => console.log(err)
      // );
    },
    transformIndexHtml(html) {
      // const { settings, fonts } = processedConfig;
      if (process.env.NODE_ENV === "development") {
        html = addPreconnectLinks(html);

        // warn if not openSource

        // Add google font url links

        // Inject fallbacks

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
