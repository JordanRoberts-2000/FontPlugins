import pluginConfigSchema from "../../src/schemas/pluginConfig.schema.js";

describe("PluginConfigValidation", () => {
  it("Should should ", () => {
    console.log(testCases);
  });
});

const testCases = [
  {
    name: "valid config and fonts",
    input: {
      config: {
        suppressNotOpenSourceWarnings: true,
        selfHost: false,
        handleCss: "inlineHead",
      },
      fonts: ["Roboto", { font: "Inter", weight: "400" }],
    },
    shouldPass: true,
  },
];

// config options can modify outputted font
//

// output:
// {
//   "font": "Inter",
//   "modifiedFallback": true,
//   "weight": "variable",
//   "italic": true,
//   "subsets": ["greek-ext"],
//   "axes": ["opsz", "wght"],
//   "className": "Inter",
//   "display": "swap",
//   "preload": false
// },
