import fs from "fs/promises";
import { join } from "path";
import type { FontData } from "../fontMetaData/fontMetaData.schema.js";
import formatDate from "../formatDate.js";
import { scriptPrefix } from "../../processGoogleFonts.js";

const generateFile = `googleFontData_${formatDate(new Date())}.json`;

export default async function generateFontDataJson(
  fontMetadata: FontData,
  folderPaths: string[]
) {
  try {
    await Promise.all(
      folderPaths.map((path) => {
        fs.writeFile(
          join(path, generateFile),
          JSON.stringify(fontMetadata, null, 2)
        );
      })
    );
  } catch (error) {
    throw new Error(
      `${scriptPrefix} Error creating '${generateFile}': ${error}`
    );
  }
}
