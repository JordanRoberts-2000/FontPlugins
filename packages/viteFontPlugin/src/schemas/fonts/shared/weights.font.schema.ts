import { z } from "zod";

export const weightSchema = z.union([
  z.literal(100),
  z.literal(200),
  z.literal(300),
  z.literal(400),
  z.literal(500),
  z.literal(600),
  z.literal(700),
  z.literal(800),
  z.literal(900),
  z.literal("Thin"),
  z.literal("Extra Light"),
  z.literal("Light"),
  z.literal("Normal"),
  z.literal("Medium"),
  z.literal("Semi Bold"),
  z.literal("Bold"),
  z.literal("Extra Bold"),
  z.literal("Black"),
]);

export const baseWeightSchema = z.union([
  z.literal("allSupportedWeights"),
  weightSchema,
  z.array(weightSchema).min(1),
  z
    .object({
      min: weightSchema,
      max: weightSchema,
    })
    .refine(({ min, max }) => min < max, {
      message: "Invalid weight: max !> min",
    }),
]);

export const googleLoadOptionsWeightSchema = z
  .union([
    z.boolean(),
    z
      .object({
        italic: z
          .union([weightSchema, z.array(weightSchema).min(1)])
          .optional(),
        regular: z
          .union([weightSchema, z.array(weightSchema).min(1)])
          .optional(),
      })
      .refine(
        (data) => data.italic !== undefined || data.regular !== undefined,
        "At least one of 'italic' or 'regular' must be provided"
      ),
  ])
  .optional();

export const regularWeightSchema = z.union([
  baseWeightSchema,
  z.literal("variable"),
  z.tuple([z.literal("allSupportedWeights"), z.literal("variable")]),
]);

export const italicWeightSchema = z.union([baseWeightSchema, z.boolean()]);
