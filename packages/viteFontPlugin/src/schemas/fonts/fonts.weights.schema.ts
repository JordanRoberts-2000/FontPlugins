import { z } from "zod";

export const numericFontWeightSchema = z.union([
  z.literal(100),
  z.literal(200),
  z.literal(300),
  z.literal(400),
  z.literal(500),
  z.literal(600),
  z.literal(700),
  z.literal(800),
  z.literal(900),
]);

const baseWeightSchema = z.union([
  z.literal("allSupportedWeights"),
  numericFontWeightSchema,
  z.array(numericFontWeightSchema),
  z
    .object({
      min: numericFontWeightSchema,
      max: numericFontWeightSchema,
    })
    .refine(({ min, max }) => min < max, {
      message: "Invalid weight: max !> min",
    }),
]);

export const weightSchema = z.union([
  baseWeightSchema,
  z.literal("variable"),
  z.tuple([z.literal("allSupportedWeights"), z.literal("variable")]),
]);

export const italicSchema = z.union([baseWeightSchema, z.boolean()]);
