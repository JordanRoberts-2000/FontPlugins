import { FontData } from "../../utils/googleFontDataMap.js";
import PluginLogger from "../../utils/logger.js";
import { FontSchema } from "../fonts.schema.js";

export default function processFontWeight(
  inputData: Exclude<Exclude<FontSchema[number], string>, null>,
  fontData: FontData
) {
  const { font, weight: fontWeight } = inputData;
  switch (true) {
    case fontWeight === undefined:
      return fontData.axes.length > 0 ? "variable" : fontData.weights.roman;
    case fontWeight === "variable":
      if (fontData.axes.length === 0) {
        throw new Error(`Font does not support variable weights`);
      }
      return "variable";
    case fontWeight === "all":
      return fontData.weights.roman;
    case typeof fontWeight === "number":
      if (!fontData.weights.roman.includes(fontWeight)) {
        throw new Error(`Invalid weight on font '${font}': ${fontWeight}`);
      }
      return [fontWeight];
    case Array.isArray(fontWeight):
      const { validWeights, invalidWeights } = fontWeight.reduce<{
        validWeights: number[];
        invalidWeights: number[];
      }>(
        (acc, weight) => {
          if (fontData.weights.roman.includes(weight)) {
            acc.validWeights.push(weight);
          } else {
            acc.invalidWeights.push(weight);
          }
          return acc;
        },
        { validWeights: [], invalidWeights: [] }
      );

      if (!validWeights.length) {
        throw new Error("No valid weights provided in weight array");
      }

      if (invalidWeights.length > 0) {
        PluginLogger.warn(
          `Invalid weights used on font '${font}'. Ignoring: ${invalidWeights.join(
            ", "
          )}`
        );
      }

      return validWeights;
    case typeof fontWeight === "object" && fontWeight !== null:
      const { min, max } = fontWeight;
      return fontData.weights.roman.filter(
        (weight) => weight >= min && weight <= max
      );
  }
  throw new Error(`Invalid weight input: ${fontWeight}`);
}
