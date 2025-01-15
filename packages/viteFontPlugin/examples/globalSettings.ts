export const fontConfig = {
  settings: {
    suppressNotOpenSourceWarnings: true,
    preconnect: {
      google: true,
      custom: ["cdnPreConnectOne", "cdnPreConnectTwo"],
    },
    subsetPriority: ["latin", "latin-ext", "cyrillic"],
    defaultPreload: true,
    defaultDisplay: "auto",
    convertToWoff2ByDefault: true,
    optimizeByDefault: true,
    adjustedFallbackByDefault: true,
    includeItalicsByDefault: true,
    selfHostByDefault: true,
    plugin: {
      disable: false,
      css: {
        method: "externalBuildFiles",
        minify: true,
      },
      fontFiles: {
        optimise: true,
        convertToWoff2: true,
      },
    },
    script: {
      css: {
        disable: false,
        minify: false,
        outputPath: "./src/styles",
      },
      fontFiles: {
        disable: false,
        outputPath: "./src/assets/fonts",
      },
    },
  },
};
