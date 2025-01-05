import { z } from "zod";
import configSchema from "./config.schema.js";
import fontsSchema from "./fonts.schema.js";
import { fontData as fontMap } from "../utils/googleFontDataMap.js";

const pluginConfigSchema = z
  .object({
    config: configSchema,
    fonts: fontsSchema,
  })
  .superRefine(({ config, fonts }) => {
    const processFonts = fonts.map((fontData) => {
      if (typeof fontData === "string") {
        // Todo: fill in entire font.
      } else {
        Object.assign(fontData, {
          className: fontData.className ?? fontData.font.replace(/\s+/g, ""),
          modifiedFallback:
            fontData.customFallback ?? config.defaultModifiedFallback,
          display: fontData.display ?? config.defaultDisplay,
          preload: fontData.preload ?? config.defaultPreload,
        });
        // Subsets & Axes: string[]
        // Weights: "variable" | string[]
        // Italics: true | string[]
        // TODO: SUBSETS -> if string put in array, check values in array valid, if "all" get all.

        // TODO: AXES -> if string put in array, check values in array valid, if "all" get all.

        // TODO: WEIGHTS. ==============================================================================
        // Todo: case: None - check for variable, axes > 0, set to "variable" else ["all weights"].
        // Todo: case: "variable" - check it is a variable font
        // Todo: case: "all" - get full font array.
        // Todo: case: ["400"] - check the font has these values
        // Todo: case: "400" - check the font has this value, convert to array
        // Todo: case: { min: 300, max: 800} - check valid values, min < max, return ["all values inbetween"]

        // TODO: ITALICS. ==============================================================================
        // Todo: case: None - if weight is variable set to true, if weight is not put its valid values in array
        // Todo: case: None - includeItalicsByDefault is false then set none to [empty array]
        // Todo: case: true - if weight is variable set leave as true, if weight is not put its valid values in array
        // Todo: case: False - [empty array]
        // Todo: case: "all" - if weight is variable set to true, else get all italics array
        // Todo: case: ["400"] - leave as is, check values are valid
        // Todo: case: "400" - put in array: check value is valid
        // Todo: case: { min: 300, max: 800} - check valid values, min < max, return ["all values inbetween"]
      }
      // let weight = fontMap.get(fontData.font)!.weights.roman
      // if(Array.isArray(fontData.weight)){ }
    });
    return {
      config: {
        suppressNotOpenSourceWarnings: config.suppressNotOpenSourceWarnings,
        selfHost: config.selfHost,
        handleCss: config.handleCss,
      },
      fonts: processFonts,
    };
  });

export default pluginConfigSchema;
