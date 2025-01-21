import { z } from "zod";
import sharedFontSchema from "../shared/shared.font.schema.js";
import validateGoogleFont from "../../../lib/zod/validateGoogleFont.js";
import { fontData } from "../../../utils/googleFontDataMap.js";
import {
  googleLoadOptionsWeightSchema,
  italicWeightSchema,
  regularWeightSchema,
} from "../shared/weights.font.schema.js";
import {
  AXES_OPTIONS,
  SUBSETS_OPTIONS,
} from "../../../../../../shared/constants.js";

export const googleFontSchema = z.union([
  validateGoogleFont(z.string(), fontData),
  sharedFontSchema.extend({
    font: validateGoogleFont(z.string(), fontData),
    weights: regularWeightSchema.optional(),
    includeItalics: italicWeightSchema.optional(),

    includeAdjustedFallback: z.boolean().optional(),
    selfHost: z.boolean().optional(),
    subsets: z
      .union([
        z.literal("all"),
        z.enum(SUBSETS_OPTIONS),
        z.array(z.enum(SUBSETS_OPTIONS)),
      ])
      .optional(),
    axes: z
      .union([
        z.literal("all"),
        z.enum(AXES_OPTIONS),
        z.array(z.enum(AXES_OPTIONS)),
      ])
      .optional(),
    preload: googleLoadOptionsWeightSchema.optional(),
    defer: googleLoadOptionsWeightSchema.optional(),
  }),
]);

export type GoogleFont = z.infer<typeof googleFontSchema>;
