import { z } from "zod";
import { DISPLAY_OPTIONS } from "../../constants.js";
import { numericFontWeightSchema } from "./fonts.weights.schema.js";

const axesSchema = z
  .object({
    wght: z.tuple([z.number(), z.number()]).optional(),
    wdth: z.tuple([z.number(), z.number()]).optional(),
    ital: z.tuple([z.number(), z.number()]).optional(),
    slnt: z.tuple([z.number(), z.number()]).optional(),
    opsz: z.tuple([z.number(), z.number()]).optional(),
  })
  .refine((data) => Object.values(data).some((field) => field !== undefined), {
    message:
      "At least one axis (e.g., wght, wdth, ital, slnt, opsz) must be provided.",
  });

const urlSchema = z.object({
  fontUrl: z.string().url(),
  weight: numericFontWeightSchema.optional(),
  italic: z.boolean().optional(),
  preload: z.boolean().optional(),
  convertToWoff2: z.boolean().optional(),
  optimize: z.boolean().optional(),
  selfHost: z.boolean().optional(),
  defer: z.boolean().optional(),
  unicodeRange: z.string().optional(),
  display: z.enum(DISPLAY_OPTIONS).optional(),
  axes: axesSchema.optional(),
});

export default urlSchema;
