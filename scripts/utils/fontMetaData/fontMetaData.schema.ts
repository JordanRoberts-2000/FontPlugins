import { z } from "zod";
import type { WeightNumber } from "../../../shared/types.js";

export const FontsMetadataSchema = z.object({
  familyMetadataList: z.array(
    z
      .object({
        family: z.string(),
        subsets: z.array(z.string()),
        fonts: z.record(z.unknown()).transform((fonts) => {
          const keys = Object.keys(fonts);
          return keys.reduce(
            (acc, key) => {
              if (key.endsWith("i")) {
                acc.italic.push(parseInt(key.slice(0, -1)) as WeightNumber);
              } else {
                acc.roman.push(parseInt(key) as WeightNumber);
              }
              return acc;
            },
            { roman: [], italic: [] } as {
              roman: WeightNumber[];
              italic: WeightNumber[];
            }
          );
        }),
        axes: z
          .array(
            z.object({
              tag: z.string(),
            })
          )
          .transform((axes) => axes.map((axis) => axis.tag)),
      })
      .transform(({ fonts, family, ...rest }) => ({
        family,
        weights: fonts,
        ...rest,
      }))
  ),
});

export type FontData = z.infer<
  typeof FontsMetadataSchema
>["familyMetadataList"];
