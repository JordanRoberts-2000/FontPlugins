import { z } from "zod";
import { fontData } from "../../utils/googleFontDataMap.js";
import sharedFontSchema from "./fonts.shared.schema.js";
import { AXES_OPTIONS, SUBSETS_OPTIONS } from "../../constants.js";
import removeDuplicates from "../utils/removeDuplicates.js";
import { italicSchema, weightSchema } from "./fonts.weights.schema.js";

const googleFamilySchema = z.string().refine(
  (fontName) => fontData.has(fontName),
  (val) => ({
    message: `Invalid font-family: ${val}`,
  })
);

const loadingOptionSchema = z.union([
  z.boolean(),
  z.object({
    italic: z.array(z.number()),
    regular: z.array(z.number()),
  }),
]);

const googleFontsSchema = z.array(
  z.union([
    z.null(),
    googleFamilySchema,
    sharedFontSchema.extend({
      font: googleFamilySchema,
      includeAdjustedFallback: z.boolean().optional(),
      selfHost: z.boolean().optional(),
      optimize: z.boolean().optional(),
      weights: weightSchema.optional(),
      includeItalics: italicSchema.optional(),
      subsets: z
        .union([
          z.enum(SUBSETS_OPTIONS),
          z
            .array(z.enum(SUBSETS_OPTIONS))
            .transform((values) =>
              removeDuplicates(values, "googleFonts subsets")
            ),
        ])
        .optional(),
      axes: z
        .union([
          z.enum(AXES_OPTIONS),
          z
            .array(z.enum(AXES_OPTIONS))
            .transform((values) =>
              removeDuplicates(values, "googleFonts axes")
            ),
        ])
        .optional(),
      preload: loadingOptionSchema.optional(),
      defer: loadingOptionSchema.optional(),
    }),
  ])
);

export default googleFontsSchema;
