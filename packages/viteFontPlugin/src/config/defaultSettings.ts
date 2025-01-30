import { CSS_METHODS } from "../../../../shared/constants.js";

const defaultSettings = {
  disable: false,
  preload: false,
  display: "swap" as const,
  subset: "latin" as const,
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
    disable: undefined,
    preload: undefined,
    subset: undefined,
    display: undefined,
    includeItalicsByDefault: undefined,

    preconnect: true,
    adjustedFallback: true,
    fallbackSubsets: undefined,

    selfHost: {
      enabled: undefined,
      extractUnicodeRange: undefined,
      trimUnusedWeightsAndStyles: undefined,
    },
  },

  local: {
    disable: undefined,
    subset: undefined,
    preload: undefined,
    display: undefined,

    unicodeRange: undefined,
    selfHostRemoteUrlsOnBuild: true,

    optimize: {
      enabled: undefined,
      extractUnicodeRange: undefined,
      trimUnusedWeightsAndStyles: undefined,
      convertToWoff2: undefined,
    },
  },

  css: {
    method: "inlineHead" as (typeof CSS_METHODS)[number],
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
