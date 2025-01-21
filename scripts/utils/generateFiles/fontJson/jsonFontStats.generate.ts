import type { FontData } from "../../fontMetaData/fontMetaData.schema.js";
import fs from "fs/promises";
import { join } from "path";
import formatDate from "../../formatDate.js";
import { scriptPrefix } from "../../../processGoogleFonts.js";

const generateFile = `googleFontStats.json`;

export default async function generateFontStatsJson(
  fontData: FontData,
  folderPaths: string[]
) {
  const numberOfGoogleFonts = fontData.length;

  const numberOfVariableFonts = fontData.filter(
    (font) => font.axes.length > 0
  ).length;

  const subsets = Array.from(
    new Set(fontData.flatMap((font) => font.subsets))
  ).sort();
  const axes = Array.from(
    new Set(fontData.flatMap((font) => font.axes))
  ).sort();

  const genereteJson = {
    metadata: {
      generatedOn: formatDate(new Date()),
      description:
        "This file contains stats on fontData from 'https://fonts.google.com/metadata/fonts'",
    },
    stats: {
      numberOfGoogleFonts,
      numberOfVariableFonts,
      subsets,
      axes,
    },
  };

  try {
    await Promise.all(
      folderPaths.map((path) =>
        fs.writeFile(
          join(path, generateFile),
          JSON.stringify(genereteJson, null, 2)
        )
      )
    );
  } catch (error) {
    throw new Error(
      `${scriptPrefix} Error creating '${generateFile}': ${error}`
    );
  }
}
