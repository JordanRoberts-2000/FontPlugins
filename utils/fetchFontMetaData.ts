import { z } from "zod";
import attemptFetch from "./attemptFetch.js";
import { errorPrefix } from "../scripts/processGoogleFontUrl.js";

export default async function fetchFontMetaData(url: string) {
  const fontsMetaDataJSON = await attemptFetch({
    url,
    parse: "JSON",
    retries: 3,
    errorPrefix: errorPrefix,
  });

  const FontsMetadataSchema = z.object({
    familyMetadataList: z.array(
      z.object({
        family: z.string(),
        subsets: z.array(z.string()),
        fonts: z.record(z.unknown()), // This represents { [key: string]: unknown }
        axes: z.array(
          z.object({
            tag: z.string(),
          })
        ),
        isOpenSource: z.boolean(),
      })
    ),
  });

  const fontsMetaData = FontsMetadataSchema.safeParse(fontsMetaDataJSON);
  if (!fontsMetaData.success) {
    fontsMetaData.error.errors.map((error) => {
      console.error(`${errorPrefix} Validation Failed: ${error.message}`);
    });
    throw new Error(`${errorPrefix} Failed to validate fontsMetaDataJSON`);
  }

  return fontsMetaData.data.familyMetadataList;
}
