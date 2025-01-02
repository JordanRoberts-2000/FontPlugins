import type { FontPluginConfig } from "../types/pluginConfigType.js";

export default function modifyConfig(
  config: FontPluginConfig
): FontPluginConfig {
  // fontName replace spaces
  // resolve if subset is "all" or undefined
  // resolve if weight & italic weight is undefined
  // add -- to css variables if not included
  return config;
}
