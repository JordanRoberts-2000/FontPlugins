import fs from "fs/promises";
import { prefix } from "../constants.js";
import type { FontData } from "../fontMetaDataSchema.js";
import formatDate from "../formatDate.js";

const generateFile = `googleFontData_${formatDate(new Date())}.json`;

export default async function generateFontDataJson(fontMetadata: FontData) {
  try {
    await fs.writeFile(generateFile, JSON.stringify(fontMetadata, null, 2));
  } catch (error) {
    throw new Error(`${prefix} Error creating '${generateFile}': ${error}`);
  }
}
