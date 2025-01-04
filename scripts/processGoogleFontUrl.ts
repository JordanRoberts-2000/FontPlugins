import fs from "fs/promises";
import fetchFontMetaData from "../utils/fetchFontMetaData.js";

const googleFontsMetaDataUrl = "https://fonts.google.com/metadata/fonts";
export const prefix = "[Script - GeneratePluginConfigType]";
const viteFontPluginConfigTypePath =
  "packages/viteFontPlugin/src/types/pluginConfigType.ts";

const fontMetadata = await fetchFontMetaData(googleFontsMetaDataUrl);

try {
  await fs.writeFile(
    "googleFontMetaData.json",
    JSON.stringify(fontMetadata, null, 2)
  );
  console.log(
    `${prefix} JSON file created successfully: googleFontMetaData.json`
  );
} catch (error) {
  throw new Error(`${prefix} Error creating googleFontMetaData.json: ${error}`);
}

const typeDefinition = `
export type FontMetadata = {
  subsets: string[];
  weights: {
    roman: number[];
    italic: number[];
  };
  axes: string[];
  isOpenSource: boolean;
};

export const fontData: Map<string, FontMetadata> = new Map([
${fontMetadata
  .map(
    ({ family, ...rest }) => `  ["${family}", ${JSON.stringify(rest, null, 2)}]`
  )
  .join(",\n")}
]);
`;

try {
  await fs.writeFile(
    "packages/viteFontPlugin/src/utils/googleFontDataMap.ts",
    typeDefinition
  );
  console.log(
    `${prefix} Typescript map created successfully: googleFontMetaData.ts`
  );
} catch (error) {
  throw new Error(`${prefix} Error creating googleFontMetaData.ts: ${error}`);
}

// let fontConfigType = "";
// let fontTitlesType = "";

// familyMetadataList.forEach(({ family, subsets, weights, axes, isOpenSource }) => {
//   const weights = Object.keys(weights).filter((key) => !key.includes("i"));
//   const italicWeights = Object.keys(weights)
//     .filter((key) => key.endsWith("i"))
//     .map((el) => el.slice(0, -1));
//   const relevantSubsets = subsets.filter(
//     (subset) => !ignoredSubsets.includes(subset)
//   );
//   const wghtAxis = axes.find((axis) => axis.tag === "wght");

//   fontTitlesType += `| "${family}"\n`;

//   fontConfigType += `
//     | {
//         font: "${family}",
//         className?: string,
//         cssVariable?: string,
//         preload?: boolean,
//         modifiedFallback?: boolean,
//         customFallback?: string,
//         display?: "auto" | "block" | "swap" | "fallback" | "optional",
//         weight?: "all" | ${'"' + weights.join('" | "') + '"'} | Array<${
//     '"' + weights.join('" | "') + '"'
//   }> ${
//     weights.length > 1
//       ? ` | { from: ${'"' + weights.slice(0, -1).join('" | "') + '"'}, to: ${
//           '"' + weights.slice(1).join('" | "') + '"'
//         }}`
//       : ""
//   }
//         italic?: ${
//           italicWeights.length > 0
//             ? `"all" | boolean | ${
//                 '"' + italicWeights.join('" | "') + '"'
//               } | Array<${'"' + italicWeights.join('" | "') + '"'}> ${
//                 italicWeights.length > 1
//                   ? `| { from: ${
//                       '"' + italicWeights.slice(0, -1).join('" | "') + '"'
//                     }, to: ${'"' + italicWeights.slice(1).join('" | "') + '"'}}`
//                   : ""
//               },`
//             : "never,"
//         }
//         subsets?: ${
//           relevantSubsets.length > 0
//             ? `"all" | ${'"' + relevantSubsets.join('" | "') + '"'} | Array<${
//                 '"' + relevantSubsets.join('" | "') + '"'
//               }>,`
//             : "never,"
//         }
//         axes?: ${
//           axes.length > 0
//             ? `"all" | Array<${
//                 '"' + axes.map((axis) => axis.tag).join('" | "') + '"'
//               }>,`
//             : "never,"
//         }
//     }`;
// });

// const fontPluginConfigType = `// Generated by scripts/generateConfigType.ts

// export type FontPluginConfig = {
//   config?: {
//     css?: "inlineHead" | "buildFile",
//     selfHost?: boolean,
//     defaultPreload?: boolean,
//     defaultDisplay?: "auto" | "block" | "swap" | "fallback" | "optional",
//     includeItalicsByDefault: boolean,
//   },
//   fonts: Array<${fontConfigType} ${fontTitlesType}>
// }
// `;

// try {
//   fs.writeFileSync(viteFontPluginConfigTypePath, fontPluginConfigType);
// } catch (err) {
//   throw new Error(
//     `Failed to write fontPluginConfigType to ${viteFontPluginConfigTypePath}, error: ${err}`
//   );
// }

console.log(`${prefix} Processed Google font url successfully`);
