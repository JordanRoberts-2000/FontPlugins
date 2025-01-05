import attemptFetch from "./attemptFetch.js";
import { prefix } from "./constants.js";
import { FontsMetadataSchema } from "./fontMetaDataSchema.js";

export default async function fetchFontMetaData(url: string) {
  const fontsMetaDataJSON = await attemptFetch({
    url,
    parse: "JSON",
    retries: 3,
    errorPrefix: prefix,
  });

  const fontsMetaData = FontsMetadataSchema.safeParse(fontsMetaDataJSON);
  if (!fontsMetaData.success) {
    fontsMetaData.error.errors.map((error) => {
      console.error(`${prefix} Validation Failed: ${error.message}`);
    });
    throw new Error(`${prefix} Failed to validate fontsMetaDataJSON`);
  }

  return fontsMetaData.data.familyMetadataList;
}
