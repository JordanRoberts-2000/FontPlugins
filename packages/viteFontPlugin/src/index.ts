import type { Plugin } from "vite";
import { FontPluginConfig } from "./types/pluginConfigType";

export default function fontPlugin(config: FontPluginConfig): Plugin {
  return {
    name: "vite-font-plugin",
    config() {
      console.log("env: ", process.env.NODE_ENV);
      console.log("config: ", config);
    },
  };
}
