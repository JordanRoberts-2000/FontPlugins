import type { FontData } from "../../fontMetaData/fontMetaData.schema.js";
import fs from "fs/promises";
import { join } from "path";
import formatDate from "../../formatDate.js";
import { scriptPrefix } from "../../../processGoogleFonts.js";

const generateFile = "googleFontDataMap.ts";

export default async function generateFontDataMap(
  fontData: FontData,
  folderPaths: string[]
) {
  const fontDataMap = `// Generated by scripts/processGoogleFonts: ${formatDate(
    new Date()
  )}

export type FontData = {
  subsets: string[];
  weights: {
    roman: number[];
    italic: number[];
  };
  axes: string[];
};

export type FontDataMap = Map<string, FontData>;

export const fontData: FontDataMap = new Map([
${fontData
  .map(
    ({ family, ...rest }) => `  ["${family}", ${JSON.stringify(rest, null, 2)}]`
  )
  .join(",\n")}
]);
`;

  try {
    await Promise.all(
      folderPaths.map((path) =>
        fs.writeFile(join(path, generateFile), fontDataMap)
      )
    );
  } catch (error) {
    throw new Error(
      `${scriptPrefix} Error creating '${generateFile}': ${error}`
    );
  }
}
