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
};
