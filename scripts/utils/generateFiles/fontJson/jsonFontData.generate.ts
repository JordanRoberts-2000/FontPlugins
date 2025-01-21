import fs from "fs/promises";
import { join } from "path";
import type { FontData } from "../../fontMetaData/fontMetaData.schema.js";
import formatDate from "../../formatDate.js";
import { scriptPrefix } from "../../../processGoogleFonts.js";

const generateFile = `googleFontData.json`;

export default async function generateFontDataJson(
  fontMetadata: FontData,
  folderPaths: string[]
) {
  try {
    const fontMetaDataJson = {
      metadata: {
        generatedOn: formatDate(new Date()),
        description:
          "This file contains modified json fontData from 'https://fonts.google.com/metadata/fonts'",
      },
      fonts: fontMetadata,
    };

    await Promise.all(
      folderPaths.map((path) =>
        fs.writeFile(
          join(path, generateFile),
          JSON.stringify(fontMetaDataJson, null, 2)
        )
      )
    );
  } catch (error) {
    throw new Error(
      `${scriptPrefix} Error creating '${generateFile}': ${error}`
    );
  }
}
