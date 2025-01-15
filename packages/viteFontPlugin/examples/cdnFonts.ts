export const fontConfig = {
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
};
