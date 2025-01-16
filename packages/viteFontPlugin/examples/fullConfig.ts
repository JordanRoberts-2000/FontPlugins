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
  googleFonts: [
    {
      font: "ABeeZee",
      className: "classname",
      cssVariable: "--serif",
      includeAdjustedFallback: false,
      fallback: "customFallback",
      display: "swap",
      selfHost: true,
      optimize: true,
      weights: ["allSupportedWieghts", "variable"],
      includeItalics: "allSupportedItalics",
      subsets: "allSubsets",
      axes: ["allAxes"],
      preload: {
        // boolean, useful for variable
        italic: [],
        regular: [],
      },
      defer: {
        // boolean, useful for variable
        italic: [],
        regular: [],
      },
    },
  ],
  cdnFonts: {
    // semantic
    // Wont attempt to self host
    name: "Open Sans",
    className: "classname",
    cssVariable: "--serif",
    fallback: "customFallback",
    display: "swap",
    includeAdjustedFallback: "Google Font", // or false
    unicodeRange: "",
    preload: true,
    defer: false,
    urls: [
      {
        fontUrl: "",
        weight: 400,
        preload: true,
        defer: false,
        italic: true,
        unicodeRange: "",
        display: "swap",
        axes: {
          wght: [400, 700],
          ital: [0, 1],
        },
      },
    ],
  },
  remoteFonts: {
    name: "Open Sans",
    className: "classname",
    selfHost: true,
    cssVariable: "--serif",
    fallback: "customFallback",
    display: "swap",
    preload: true,
    convertToWoff2: true,
    optimize: true,
    defer: false,
    unicodeRange: "",
    urls: [
      {
        fontUrl: "",
        weight: 400,
        italic: true,
        preload: true,
        convertToWoff2: true,
        optimize: true,
        defer: false,
        unicodeRange: "",
        selfHost: false,
        display: "swap",
        axes: {
          wght: [400, 700],
          ital: [0, 1],
        },
      },
    ],
  },
  localFonts: {
    name: "Open Sans",
    className: "classname",
    cssVariable: "--serif",
    fallback: "customFallback",
    display: "swap",
    preload: true,
    convertToWoff2: true,
    optimize: true,
    defer: false,
    unicodeRange: "",
    paths: [
      {
        path: "",
        weight: 400,
        italic: true,
        preload: true,
        convertToWoff2: true,
        optimize: true,
        defer: false,
        unicodeRange: "",
        display: "swap",
        axes: {
          wght: [400, 700],
          ital: [0, 1],
        },
      },
    ],
  },
};
