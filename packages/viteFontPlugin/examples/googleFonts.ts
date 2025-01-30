export const pluginConfig = {
  googleFonts: [
    {
      font: "ABeeZee",

      weights: "allSupportedWieghts",
      italics: "allSupportedItalics",
      variable: true, // | ["allAxes"]

      selfHost: false,
      includeAdjustedFallback: false,

      className: "classname",
      cssVariable: "--serif",

      fallback: "customFallback",
      display: "swap",
      subsets: "allSubsets",

      // what if defer and preload contain the same values?
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
};
