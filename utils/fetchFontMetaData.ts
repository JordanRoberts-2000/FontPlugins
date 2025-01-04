import { z } from "zod";
import attemptFetch from "./attemptFetch.js";

const prefix = "[Script - GeneratePluginConfigType]";
const ignoredSubsets = [
  "menu",
  "japanese",
  "korean",
  "chinese-simplified",
  "chinese-hongkong",
  "chinese-traditional",
];

export default async function fetchFontMetaData(url: string) {
  const fontsMetaDataJSON = await attemptFetch({
    url,
    parse: "JSON",
    retries: 3,
    errorPrefix: prefix,
  });

  const FontsMetadataSchema = z.object({
    familyMetadataList: z.array(
      z
        .object({
          family: z.string(),
          subsets: z
            .array(z.string())
            .transform((subsets) =>
              subsets.filter((subset) => !ignoredSubsets.includes(subset))
            ),
          fonts: z.record(z.unknown()).transform((fonts) => {
            const keys = Object.keys(fonts);
            return keys.reduce(
              (acc, key) => {
                if (key.endsWith("i")) {
                  acc.italic.push(parseInt(key.slice(0, -1)));
                } else {
                  acc.roman.push(parseInt(key));
                }
                return acc;
              },
              { roman: [], italic: [] } as { roman: number[]; italic: number[] }
            );
          }),
          axes: z
            .array(
              z.object({
                tag: z.string(),
              })
            )
            .transform((axes) => axes.map((axis) => axis.tag)),
          isOpenSource: z.boolean(),
        })
        .transform(({ fonts, family, ...rest }) => ({
          family,
          weights: fonts,
          ...rest,
        }))
    ),
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
