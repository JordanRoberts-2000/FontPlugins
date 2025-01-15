export const pluginConfig = {
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
          wght: [100, 900],
          wdth: [75, 125],
          ital: [0, 1],
        },
      },
    ],
  },
};
