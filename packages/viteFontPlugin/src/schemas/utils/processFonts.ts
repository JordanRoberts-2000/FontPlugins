import validateField from "./validateField.js";
import { fontData as fontMap } from "../../utils/googleFontDataMap.js";
import { FontSchema } from "../fonts.schema.js";
import { ConfigSchema } from "../config.schema.js";

export function processFontString(font: string, config: ConfigSchema) {}

export function processFontObject(
  fontData: Exclude<FontSchema[number], string>,
  config: ConfigSchema
) {
  const googleFontData = fontMap.get(fontData.font);
  if (!googleFontData) throw Error("unable to retrieve font data");

  Object.assign(fontData, {
    className: fontData.className ?? fontData.font.replace(/\s+/g, ""),
    modifiedFallback: fontData.customFallback ?? config.defaultModifiedFallback,
    display: fontData.display ?? config.defaultDisplay,
    preload: fontData.preload ?? config.defaultPreload,
    subsets: validateField(fontData.subsets, googleFontData.subsets),
    axes: validateField(fontData.axes, googleFontData.axes),
    weight: validateFontWeight(fontData.weight),
  });

  type Weight =
    | string
    | string[]
    | {
        from: string;
        to: string;
      }
    | undefined;

  function validateFontWeight(fontWeight: Weight) {
    switch (true) {
      case fontWeight === undefined:
      // get values from dataMapcheck, axes > 0: set to "variable" else ["all weights"]
      case fontWeight === "variable":
      // validate thats its a variable font from dataMap
      case fontWeight === "all":
      // retrieve full font weights from dataMap;
      case typeof fontWeight === "string":
      // validate with dataMap, convert to array
      case Array.isArray(fontWeight):
      // validate with dataMap
      case typeof fontWeight === "object":
      // get values from dataMap, if empty throw error
    }
  }

  // TODO: ITALICS. ==============================================================================
  // Todo: case: None - if weight is variable set to true, if weight is not put its valid values in array
  // Todo: case: None - includeItalicsByDefault is false then set none to [empty array]
  // Todo: case: true - if weight is variable set leave as true, if weight is not put its valid values in array
  // Todo: case: False - [empty array]
  // Todo: case: "all" - if weight is variable set to true, else get all italics array
  // Todo: case: ["400"] - leave as is, check values are valid
  // Todo: case: "400" - put in array: check value is valid
  // Todo: case: { min: 300, max: 800} - check valid values, min < max, return ["all values inbetween"]

  // let weight = fontMap.get(fontData.font)!.weights.roman
  // if(Array.isArray(fontData.weight)){ }
}
