import fs from "fs/promises";
import { prefix } from "../constants.js";
import type { FontData } from "../fontMetaDataSchema.js";

const generateFile = "googleFontMetaData.json";

export default async function generateFontDataJson(fontMetadata: FontData) {
  try {
    await fs.writeFile(generateFile, JSON.stringify(fontMetadata, null, 2));
  } catch (error) {
    throw new Error(`${prefix} Error creating '${generateFile}': ${error}`);
  }
}
