import attemptFetch from "../../shared/utils/attemptFetch.js";
import { scriptPrefix } from "../processGoogleFonts.js";
import { FontsMetadataSchema } from "./fontMetaDataSchema.js";

export default async function fetchFontMetaData(url: string) {
  const fontsMetaDataJSON = await attemptFetch({
    url,
    parse: "JSON",
    retries: 3,
    errorPrefix: scriptPrefix,
  });

  const fontsMetaData = FontsMetadataSchema.safeParse(fontsMetaDataJSON);
  if (!fontsMetaData.success) {
    fontsMetaData.error.errors.map((error) => {
      console.error(`${scriptPrefix} Validation Failed: ${error.message}`);
    });
    throw new Error(`${scriptPrefix} Failed to validate fontsMetaDataJSON`);
  }

  return fontsMetaData.data.familyMetadataList;
}
