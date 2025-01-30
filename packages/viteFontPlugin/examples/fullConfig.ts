export const fontConfig = {
  settings: {
    disable: false,
    preload: true,
    display: "auto",
    subset: "latin",
    includeItalicsByDefault: true,
    unicodeRange: "",

    preconnects: ["cdnPreConnectOne", "cdnPreConnectTwo"],

    optimize: {
      enabled: true,
      extractUnicodeRange: true,
      trimUnusedWeightsAndStyles: true,
      convertToWoff2: true,
    },

    google: {
      disable: false,
      preconnect: true,

      adjustedFallback: true,
      includeItalicsByDefault: true,
      preload: true,
      subset: "latin",
      display: "auto",
      selfHost: {
        enabled: true,
        extractUnicodeRange: true,
        trimUnusedWeightsAndStyles: true,
      },
    },

    local: {
      disable: false,
      subset: "latin",
      unicodeRange: "",
      preload: true,
      display: "auto",
      selfHostRemoteUrlsOnBuild: true,
      optimize: {
        enabled: true,
        extractUnicodeRange: true,
        trimUnusedWeightsAndStyles: true,
        convertToWoff2: true,
      },
    },

    css: {
      method: "externalBuildFiles",
      minify: true,
    },

    script: {
      outputFolder: "./src/assets/fonts",
      css: {
        disable: false,
        minify: false,
        fileName: "",
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
  },
  googleFonts: [
    {
      font: "ABeeZee",
      weights: ["allSupportedWieghts", "variable"],
      includeItalics: "allSupportedItalics",

      className: "classname",
      cssVariable: "--serif",

      includeAdjustedFallback: false,
      fallback: "customFallback",
      display: "swap",
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
  localFonts: {
    name: "Open Sans",
    className: "classname",
    cssVariable: "--serif",
    fallback: "customFallback",
    display: "swap",
    preload: true,

    optimize: {
      enabled: true,
      extractUnicodeRange: true,
      trimUnusedWeightsAndStyles: true,
      convertToWoff2: true,
    },

    defer: false,
    unicodeRange: "",
    src: [
      {
        src: "",
        weight: 400,
        italic: true,
        preload: true,
        defer: false,
        display: "swap",
        axes: {
          wght: [100, 900],
          wdth: [75, 125],
          ital: [0, 1],
        },
      },
    ],
  },
};
