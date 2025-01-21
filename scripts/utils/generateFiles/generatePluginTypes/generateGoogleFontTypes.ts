import { WEIGHT_MAP } from "../../../../shared/constants.js";
import type { FontData } from "../../fontMetaData/fontMetaData.schema.js";

export default function generateFontTypes(fontData: FontData) {
  let fontConfigType = "";
  let fontTitlesType = "";

  fontData.forEach(({ family, subsets, weights, axes }) => {
    const { roman, italic } = weights;
    fontTitlesType += `| "${family}"\n`;

    fontConfigType += `
    | (GoogleFontSharedOptions & {
        font: "${family}",${generateWeights(roman, axes)}${generateItalics(
      italic
    )}${generateField(subsets, "subsets")}${generateField(axes, "axes")}
  })`;
  });

  return `
type GoogleFontSharedOptions = {
  className?: string,
  cssVariable?: string,
  preload?: boolean,
  modifiedFallback?: boolean,
  customFallback?: string,
  display?: SubsetOptions,
}

type GoogleFonts = Array<${fontConfigType} ${fontTitlesType}>; 
`;
}

function generateWeights(roman: number[], axes: string[]) {
  if (roman.length === 0) {
    return `${axes.length > 0 ? '\n\t\t\t\tweight?: "variable,"' : ""}`;
  }

  const weightOptions = roman
    .map((num) => `"${WEIGHT_MAP[num]}" | ${num}`)
    .join(" | ");

  return `\n\t\t\t\tweight?: "allSupportedWeights"${
    axes.length > 0 ? ' | "variable"' : ""
  } | ${weightOptions} | Array<${weightOptions}>${
    roman.length > 1
      ? ` | { min: ${roman
          .map((num) => `"${WEIGHT_MAP[num]}" | ${num}`)
          .slice(0, -1)
          .join(" | ")}, max: ${roman
          .map((num) => `"${WEIGHT_MAP[num]}" | ${num}`)
          .slice(1)
          .join(" | ")} }`
      : ""
  }`;
}

function generateItalics(italics: number[]) {
  if (italics.length === 0) {
    return ``;
  }

  const italicOptions = italics
    .map((num) => `"${WEIGHT_MAP[num]}" | ${num}`)
    .join(" | ");

  return `\n\t\t\t\titalic?: "allSupportedWeights" | boolean | ${italicOptions} | Array<${italicOptions}>${
    italics.length > 1
      ? ` | { min: ${italics
          .map((num) => `"${WEIGHT_MAP[num]}" | ${num}`)
          .slice(0, -1)
          .join(" | ")}, max: ${italics
          .map((num) => `"${WEIGHT_MAP[num]}" | ${num}`)
          .slice(1)
          .join(" | ")} }`
      : ""
  },`;
}

function generateField(field: string[], fieldName: string): string {
  if (field.length === 0) {
    return "";
  }

  return `\n\t\t\t\t${fieldName}?: "all" | ${field
    .map((f) => `"${f}"`)
    .join(" | ")} | Array<${field.map((f) => `"${f}"`).join(" | ")}>;`;
}
