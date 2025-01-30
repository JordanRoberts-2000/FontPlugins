import fs from "fs/promises";
import type { FontData } from "../../fontMetaData/fontMetaData.schema.js";
import generateWeightSchema from "./weights/weights.generate.schema.js";
import { join } from "path";
import { scriptPrefix } from "../../../processGoogleFonts.js";
import prettier from "prettier";

const generateFile = "googleFontsSchema.ts";

export default async function generateZodSchema(
  fontData: FontData,
  folderPaths: string[]
) {
  const schemaCode = `
import { z } from "zod";
import { weightToNumber } from "../../../../../../shared/constants.js";
import { WeightNumber } from "../../../../../../shared/types.js";

export const googleFontsSchema = z.array(
  z.discriminatedUnion("font", [
  ${fontData
    .slice(0, 2)
    .map(
      (font) => `
     z.object({
      font: z.literal("${font.family}"),
      ${!!font.weights.roman.length ? `weights: ${generateWeightSchema(font.weights.roman)},` : ""}
      ${!!font.weights.italic.length ? `italics: ${generateWeightSchema(font.weights.italic, true)},` : ""}
    }),
    `
    )
    .join("")}
  ])
);
`;

  const prettierCode = await prettier.format(schemaCode, {
    parser: "typescript", // Ensures proper TypeScript formatting
    singleQuote: true,
    semi: false,
    trailingComma: "all",
  });

  try {
    await Promise.all(
      folderPaths.map((path) =>
        fs.writeFile(join(path, generateFile), prettierCode)
      )
    );
  } catch (error) {
    throw new Error(
      `${scriptPrefix} Error creating '${generateFile}': ${error}`
    );
  }
}
