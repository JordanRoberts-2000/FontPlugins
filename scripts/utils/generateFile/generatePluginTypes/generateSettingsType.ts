import { CSS_METHODS } from "../../../../shared/constants.js";

export default function generateSettingsType() {
  return `
export type PluginConfigSettings = {
  disable?: boolean,
  preload?: boolean,
  display?: DisplayOptions,
  handleCss?: "${CSS_METHODS.join(" | ")}",
  subset?: SubsetOptions,
  includeItalicsByDefault?: boolean,
  unicodeRange?: string,
  preconnects?: string[],
  optimize?: {
    enabled?: boolean,
    extractUnicodeRange?: boolean,
    trimUnusedWeightsAndStyles?: boolean,
    convertToWoff2?: boolean,
  },

  google?: {
    disable?: boolean,
    preconnect?: boolean,
    suppressNotOpenSourceWarnings?: boolean,
    adjustedFallback?: boolean,
    includeItalicsByDefault?: boolean,
    preload?: boolean,
    subset?: SubsetOptions,
    display?: DisplayOptions,
    fallbackSubsets?: DisplayOptions[],
    selfHost?: {
      enabled?: true,
      extractUnicodeRange?: true,
      trimUnusedWeightsAndStyles?: true,
    },
  },

  local?: {
    disable?: boolean,
    subset?: SubsetOptions,
    unicodeRange?: string,
    preload?: boolean,
    display?: DisplayOptions,
    selfHostRemoteUrlsOnBuild?: boolean,
    optimize?: {
      enabled?: boolean,
      extractUnicodeRange?: boolean,
      trimUnusedWeightsAndStyles?: boolean,
      convertToWoff2?: boolean,
    },
  },

  css: {
    method: "${CSS_METHODS.join(" | ")}",
    minify: boolean,
  },

  script: {
    outputFolder: string,
    css: {
      disable: boolean,
      minify: boolean,
      fileName: string,
      outputFolder: string,
    },
    fontFiles: {
      disable: boolean,
      outputFolder: string,
      optimize: {
        enabled: boolean,
        extractUnicodeRange: boolean,
        trimUnusedWeightsAndStyles: boolean,
        convertToWoff2: boolean,
      },
    },
  },
};`;
}
