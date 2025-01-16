import processSubField from "./processSubField.js";
import { fontData as fontMap } from "../../utils/googleFontDataMap.js";
import { FontSchema } from "../legacyFontsSchema.js";
import { ConfigSchema } from "../config.schema.js";
import processFontWeight from "./processFontWeight.js";
import processFontItalic from "./processFontItalic.js";
import PluginLogger from "../../utils/logger.js";

export default function processFontObject(
  fontData: Exclude<Exclude<FontSchema[number], string>, null>,
  config: ConfigSchema
) {
  try {
    const googleFontData = fontMap.get(fontData.font);
    if (!googleFontData) throw Error("Unable to retrieve font data");
    const validWeights = processFontWeight(fontData, googleFontData);
    return Object.assign(fontData, {
      className: fontData.className ?? fontData.font.replace(/\s+/g, ""),
      modifiedFallback:
        fontData.customFallback ?? config.defaultModifiedFallback,
      display: fontData.display ?? config.defaultDisplay,
      preload: fontData.preload ?? config.defaultPreload,
      subsets: processSubField(
        "subsets",
        fontData.subsets,
        googleFontData.subsets
      ),
      axes: processSubField("axes", fontData.axes, googleFontData.axes),
      weight: validWeights,
      italic: processFontItalic(
        fontData.italic,
        validWeights,
        googleFontData,
        config.includeItalicsByDefault
      ),
    });
  } catch (error) {
    PluginLogger.error(
      `Invalid properties on font '${fontData.font}'. Error: ${error}`
    );
    return null;
  }
}
