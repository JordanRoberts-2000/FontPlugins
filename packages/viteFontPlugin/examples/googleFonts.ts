export const pluginConfig = {
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
      weights: ["allSupportedWeights", "variable"],
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
};
