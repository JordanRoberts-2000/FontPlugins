import { scriptPrefix } from "../../processGoogleFonts.js";
import { FontsMetadataSchema } from "./fontMetaData.schema.js";

export default function parseFontMetaData(fontsMetaDataJSON: unknown) {
  const fontsMetaData = FontsMetadataSchema.safeParse(fontsMetaDataJSON);
  if (!fontsMetaData.success) {
    fontsMetaData.error.errors.map((error) => {
      console.error(`${scriptPrefix} Validation Failed: ${error.message}`);
    });
    throw new Error(`${scriptPrefix} Failed to validate fontsMetaDataJSON`);
  }
  return fontsMetaData.data.familyMetadataList;
}
