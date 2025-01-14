import { FontData } from "../../utils/googleFontDataMap.js";
import { FontSchema } from "../fonts.schema.js";

export default function processFontItalic(
  italic: Exclude<Exclude<FontSchema[number], string>, null>["italic"],
  weight: "variable" | number[],
  fontData: FontData,
  include: boolean
): true | number[] {
  switch (true) {
    case italic === undefined:
      // If no italic value is provided, return based on the `include` flag
      if (weight === "variable") {
        return include ? true : [];
      }
      return include
        ? fontData.weights.italic.filter((w) => weight.includes(w))
        : [];

    case italic === "all":
      // Return all italic weights
      return fontData.weights.italic;

    case italic === false:
      // If explicitly set to `false`, return an empty array
      return [];

    case italic === true:
      if (weight === "variable") {
        // If `italic` is `true` and weight is variable, return `true`
        return true;
      }
      // Otherwise, filter italics based on available weights
      return fontData.weights.italic.filter((w) => weight.includes(w));

    case typeof italic === "number":
      // If `italic` is a single number, validate it and return as an array
      if (fontData.weights.italic.includes(italic)) {
        return [italic];
      }
      throw new Error(`Invalid italic weight: ${italic}`);

    case Array.isArray(italic):
      // Filter valid italic weights from the array
      const validItalics = italic.filter((i) =>
        fontData.weights.italic.includes(i)
      );
      if (validItalics.length !== italic.length) {
        const invalidItalics = italic.filter(
          (i) => !fontData.weights.italic.includes(i)
        );
        throw new Error(`Invalid italic weights: ${invalidItalics.join(", ")}`);
      }
      return validItalics;

    case typeof italic === "object" && italic !== null:
      const { min, max } = italic;
      // Validate range and return matching weights
      if (min >= max) {
        throw new Error(
          `Invalid italic range: min ${min} cannot be greater than or equal to max ${max}`
        );
      }
      return fontData.weights.italic.filter((w) => w >= min && w <= max);

    default:
      // Fallback case to ensure invalid inputs throw an error
      throw new Error(`Invalid italic input`);
  }
}
