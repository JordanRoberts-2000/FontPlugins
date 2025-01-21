import { z } from "zod";
import { weightSchema } from "../shared/weights.font.schema.js";
import { DISPLAY_OPTIONS } from "../../../../../../shared/constants.js";

const localAxesSchema = z.tuple([
  z.union([z.number(), z.string()]),
  z.union([z.number(), z.string()]),
]);

export const localSrcSchema = z.object({
  src: z.string(),
  weight: weightSchema,
  italic: z.boolean().optional(),
  preload: z.boolean().optional(),
  defer: z.boolean().optional(),
  display: z.enum(DISPLAY_OPTIONS).optional(),
  axes: z
    .object({
      wght: localAxesSchema.optional(),
      wdth: localAxesSchema.optional(),
      ital: localAxesSchema.optional(),
      slnt: localAxesSchema.optional(),
      opsz: localAxesSchema.optional(),
    })
    .refine(
      (data) => Object.values(data).some((value) => value !== undefined),
      "At least one axis field (wght, wdth, ital, slnt, or opsz) must be provided"
    )
    .optional(),
});
