import { prefix } from "../constants.js";
import type { FontData } from "../fontMetaDataSchema.js";
import fs from "fs/promises";
import formatDate from "../formatDate.js";

const generateFile = "packages/viteFontPlugin/src/types/pluginConfigType.ts";

export default async function generatePluginConfigType(fontData: FontData) {
  const generatedFontConfigType = pluginConfigType(fontData);

  try {
    await fs.writeFile(generateFile, generatedFontConfigType);
  } catch (err) {
    throw new Error(`${prefix} Error creating '${generateFile}': ${err}`);
  }
}

function pluginConfigType(fontData: FontData) {
  const { fontConfigType, fontTitlesType } = generateFontTypes(fontData);
  return `// Generated by scripts/processGoogleFonts.ts: ${formatDate(
    new Date()
  )}

export type FontPluginConfig = {
  config?: {
    suppressNotOpenSourceWarnings: boolean,
    handleCss?: "inlineHead" | "buildFile",
    selfHost?: boolean,
    defaultPreload?: boolean,
    defaultDisplay?: "auto" | "block" | "swap" | "fallback" | "optional",
    includeItalicsByDefault: boolean,
  },
  fonts: Array<${fontConfigType} ${fontTitlesType}>
}
`;
}

function generateFontTypes(fontData: FontData) {
  let fontConfigType = "";
  let fontTitlesType = "";

  fontData.forEach(({ family, subsets, weights, axes }) => {
    const { roman, italic } = weights;
    fontTitlesType += `| "${family}"\n`;

    fontConfigType += `
    | {
        font: "${family}",
        className?: string,
        cssVariable?: string,
        preload?: boolean,
        modifiedFallback?: boolean,
        customFallback?: string,
        display?: "auto" | "block" | "swap" | "fallback" | "optional",
        weight?: ${generateWeights(roman, axes)}
        italic?: ${generateItalics(italic)}
        subsets?: ${generateField(subsets)}
        axes?: ${generateField(axes)}
    }`;
  });

  return {
    fontConfigType,
    fontTitlesType,
  };
}

function generateWeights(roman: number[], axes: string[]) {
  return `"all"${axes.length > 0 ? ' | "variable" ' : ""} | ${
    '"' + roman.join('" | "') + '"'
  } | Array<${'"' + roman.join('" | "') + '"'}> ${
    roman.length > 1
      ? ` | { from: ${'"' + roman.slice(0, -1).join('" | "') + '"'}, to: ${
          '"' + roman.slice(1).join('" | "') + '"'
        }}`
      : ""
  }`;
}

function generateItalics(italics: number[]) {
  `${
    italics.length > 0
      ? `"all" | boolean | ${'"' + italics.join('" | "') + '"'} | Array<${
          '"' + italics.join('" | "') + '"'
        }> ${
          italics.length > 1
            ? `| { from: ${
                '"' + italics.slice(0, -1).join('" | "') + '"'
              }, to: ${'"' + italics.slice(1).join('" | "') + '"'}}`
            : ""
        },`
      : "never,"
  }`;
}

function generateField(field: string[]) {
  `${
    field.length > 0
      ? `"all" | ${'"' + field.join('" | "') + '"'} | Array<${
          '"' + field.join('" | "') + '"'
        }>,`
      : "never,"
  }`;
}
