import { z } from "zod";
import { fontSettingsSchema } from "../shared/fontSettings.schema.js";
import { SUBSETS_OPTIONS } from "../../../../../../shared/constants.js";
import { optimizeSchema } from "../shared/optimize.schema.js";
import removeDuplicates from "../../../lib/zod/removeDuplicates.js";

export const googleSettingsSchema = fontSettingsSchema
  .omit({ unicodeRange: true })
  .extend({
    preconnect: z.boolean(),
    suppressNotOpenSourceWarnings: z.boolean(),
    adjustedFallback: z.boolean(),
    fallbackSubsets: removeDuplicates(z.array(z.enum(SUBSETS_OPTIONS)), {
      warn: true,
    }),
    selfHost: optimizeSchema.omit({ convertToWoff2: true }),
  });

export type GoogleSettings = z.infer<typeof googleSettingsSchema>;
