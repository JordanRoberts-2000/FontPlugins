export const pluginConfig = {
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
          wght: [100, 900],
          wdth: [75, 125],
          ital: [0, 1],
        },
      },
    ],
  },
};
