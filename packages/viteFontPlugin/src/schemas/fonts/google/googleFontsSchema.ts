import { z } from "zod";
import { weightToNumber } from "../../../../../../shared/constants.js";
import { WeightNumber } from "../../../../../../shared/types.js";

export const googleFontsSchema = z.array(
  z
    .discriminatedUnion("font", [
      z.object({
        font: z.literal("42dot Sans"),
        weights: z
          .union([
            z.literal("allSupportedWeights"),

            z
              .array(
                z.union([
                  z.literal(400),
                  z.literal("Normal"),
                  z.literal(500),
                  z.literal("Medium"),
                  z.literal(600),
                  z.literal("Semi Bold"),
                  z.literal(700),
                  z.literal("Bold"),
                  z.literal(800),
                  z.literal("Extra Bold"),
                ])
              )
              .nonempty(),

            z
              .object({
                min: z.union([
                  z.literal(300),
                  z.literal("Light"),
                  z.literal(400),
                  z.literal("Normal"),
                  z.literal(500),
                  z.literal("Medium"),
                  z.literal(600),
                  z.literal("Semi Bold"),
                  z.literal(700),
                  z.literal("Bold"),
                ]),

                max: z.union([
                  z.literal(400),
                  z.literal("Normal"),
                  z.literal(500),
                  z.literal("Medium"),
                  z.literal(600),
                  z.literal("Semi Bold"),
                  z.literal(700),
                  z.literal("Bold"),
                  z.literal(800),
                  z.literal("Extra Bold"),
                ]),
              })
              .refine(
                (input) => {
                  const min =
                    typeof input.min === "string"
                      ? weightToNumber[input.min]
                      : input.min;
                  const max =
                    typeof input.max === "string"
                      ? weightToNumber[input.max]
                      : input.max;
                  return min < max;
                },
                {
                  message: "min should be less than max",
                }
              ),
          ])
          .default([300, 400, 500, 600, 700, 800])
          .transform((weight): Array<WeightNumber> => {
            const allWeights = [300, 400, 500, 600, 700, 800] as WeightNumber[];

            switch (true) {
              case weight === "allSupportedWeights":
                return [...allWeights];
              case typeof weight === "number":
                return [weight];
              case typeof weight === "string":
                return [weightToNumber[weight]];
              case Array.isArray(weight): {
                return [
                  ...new Set(
                    weight.map((w) => {
                      if (typeof w === "string") {
                        return weightToNumber[w];
                      }
                      return w;
                    })
                  ),
                ] as Array<WeightNumber>;
              }
              case typeof weight === "object" && "min" in weight: {
                const min =
                  typeof weight.min === "string"
                    ? weightToNumber[weight.min]
                    : weight.min;
                const max =
                  typeof weight.max === "string"
                    ? weightToNumber[weight.max]
                    : weight.max;
                return allWeights.filter((w) => w <= max && w >= min);
              }
              default:
                return [300, 400, 500, 600, 700, 800];
            }
          }),
      }),

      z.object({
        font: z.literal("ABeeZee"),
        weights: z
          .union([
            z.literal("allSupportedWeights"),
            z.literal(400),
            z.literal("Normal"),

            z.array(z.union([z.literal(400), z.literal("Normal")])).nonempty(),
          ])
          .default([400])
          .transform((weight): Array<WeightNumber> => {
            const allWeights = [400] as WeightNumber[];

            switch (true) {
              case weight === "allSupportedWeights":
                return [...allWeights];
              case typeof weight === "number":
                return [weight];
              case typeof weight === "string":
                return [weightToNumber[weight]];
              case Array.isArray(weight): {
                return [
                  ...new Set(
                    weight.map((w) => {
                      if (typeof w === "string") {
                        return weightToNumber[w];
                      }
                      return w;
                    })
                  ),
                ] as Array<WeightNumber>;
              }

              default:
                return [400];
            }
          }),
        italics: z
          .union([
            z.boolean(),
            z.literal("allSupportedWeights"),
            z.literal(400),
            z.literal("Normal"),

            z.array(z.union([z.literal(400), z.literal("Normal")])).nonempty(),
          ])
          .optional()
          .transform((weight): Array<WeightNumber> => {
            const allWeights = [400] as WeightNumber[];

            switch (true) {
              case weight === "allSupportedWeights":
                return [...allWeights];
              case typeof weight === "number":
                return [weight];
              case typeof weight === "string":
                return [weightToNumber[weight]];
              case Array.isArray(weight): {
                return [
                  ...new Set(
                    weight.map((w) => {
                      if (typeof w === "string") {
                        return weightToNumber[w];
                      }
                      return w;
                    })
                  ),
                ] as Array<WeightNumber>;
              }

              default:
                return [400];
            }
          }),
      }),
    ])
    .transform((input) => {
      if ("italics" in input) {
        console.log("Italics available:", input.italics);
      }
      return input;
    })
    .or(
      z.union([
        z.literal("42dot Sans").transform(() => ({
          font: "42dot Sans",
          weights: [300, 400, 500, 600, 700, 800],
        })),
        z.literal("ABeeZee").transform(() => ({
          font: "ABeeZee",
          weights: [400],
          italics: [400],
        })),
      ])
    )
);
