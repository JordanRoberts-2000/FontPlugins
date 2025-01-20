import type { FontData } from "../../fontMetaDataSchema.js";

export default function generateFontTypes(fontData: FontData) {
  let fontConfigType = "";
  let fontTitlesType = "";

  fontData.forEach(({ family, subsets, weights, axes }) => {
    const { roman, italic } = weights;
    fontTitlesType += `| "${family}"\n`;

    fontConfigType += `
    | (GoogleFontSharedOptions & {
        font: "${family}",
       ${generateWeights(roman, axes)}${generateItalics(italic)}${generateField(
      subsets,
      "subsets"
    )}${generateField(axes, "axes")}
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

type GoogleFonts = Array<${fontConfigType} ${fontTitlesType}>, 

`;
}

function generateWeights(roman: number[], axes: string[]) {
  if (roman.length === 0) {
    return `${axes.length > 0 ? '\n\t\t\t\tweight?: "variable,"' : ""}`;
  }

  return `\n\t\t\t\tweight?: "all"${
    axes.length > 0 ? ' | "variable"' : ""
  } | ${roman.join(" | ")} | Array<${roman.join(" | ")}>${
    roman.length > 1
      ? ` | { min: ${roman.slice(0, -1).join(" | ")}, max: ${roman
          .slice(1)
          .join(" | ")} }`
      : ""
  }`;
}

function generateItalics(italics: number[]) {
  if (italics.length === 0) {
    return ``;
  }

  return `\n\t\t\t\titalic?: "all" | boolean | ${italics.join(
    " | "
  )} | Array<${italics.join(" | ")}>${
    italics.length > 1
      ? ` | { min: ${italics.slice(0, -1).join(" | ")}, max: ${italics
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
    .join(" | ")} | Array<${field.map((f) => `"${f}"`).join(" | ")}>,`;
}
