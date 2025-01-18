import { SUBSET_FALLBACK_ARRAY } from "../constants.js";

const defaultSettings = {
  disable: false,
  preload: false,
  display: "swap" as const,
  subset: "latin",
  includeItalicsByDefault: true,
  unicodeRange: undefined,
  preconnects: undefined,

  optimize: {
    enabled: true,
    extractUnicodeRange: true,
    trimUnusedWeightsAndStyles: true,
    convertToWoff2: true,
  },

  google: {
    disable: false,
    preconnect: true,
    suppressNotOpenSourceWarnings: true,
    adjustedFallback: true,
    includeItalicsByDefault: true,
    subset: "latin" as const,
    preload: false,
    display: "swap" as const,
    fallbackSubsets: SUBSET_FALLBACK_ARRAY,
    selfHost: {
      enabled: true,
      extractUnicodeRange: true,
      trimUnusedWeightsAndStyles: true,
    },
  },

  local: {
    disable: false,
    subset: "latin" as const,
    unicodeRange: undefined,
    preload: false,
    display: "swap" as const,
    selfHostRemoteUrlsOnBuild: true,
    optimize: {
      enabled: true,
      extractUnicodeRange: true,
      trimUnusedWeightsAndStyles: true,
      convertToWoff2: true,
    },
  },

  css: {
    method: "inlineHead",
    minify: true,
  },

  script: {
    outputFolder: "./",
    css: {
      disable: false,
      minify: false,
      fileName: "fonts",
      outputFolder: "./src/styles",
    },
    fontFiles: {
      disable: false,
      outputFolder: "./src/assets/fonts",
      optimize: {
        enabled: true,
        extractUnicodeRange: true,
        trimUnusedWeightsAndStyles: true,
        convertToWoff2: true,
      },
    },
  },
};

export default defaultSettings;
