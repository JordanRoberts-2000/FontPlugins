import {
  fontData as fontMap,
} from "../../utils/googleFontDataMap.js";
import { ConfigSchema } from "../config.schema.js";

export default function processFontString(font: string, config: ConfigSchema) {
  const googleFontData = fontMap.get(font);
  if (!googleFontData) throw Error("unable to retrieve font data");
  return Object.assign({

    font: "name of font",
    weight: // "variable" | number[](All fonts), todo: get variable by default???
    italic: //config.includeItalicsByDefault && has font got variable => true | number[], set defsult to false??
    subsets: number[], //todo: whats the significance of subsets
    axes: [],
    className: font.replace(/\s+/g, ""),
    modifiedFallback: config.defaultModifiedFallback,
    display: config.defaultDisplay,
    preload: config.defaultPreload,
  })
}
