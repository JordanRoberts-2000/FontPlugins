import { numberToWeight } from "../../../../../shared/constants.js";
import type { WeightNumber } from "../../../../../shared/types.js";

export default function generateWeightSchema(
  weights: WeightNumber[],
  isItalic?: boolean
) {
  return `
z.union([
  ${isItalic ? "z.boolean()," : ""}
  z.literal("allSupportedWeights"),
  ${weights
    .map(
      (weight) =>
        `z.literal(${weight}),\nz.literal("${numberToWeight[weight]}"),`
    )
    .join("\n")}

  z
    .array(
      z.union([
        ${weights
          .map(
            (weight) =>
              `z.literal(${weight}),\nz.literal("${numberToWeight[weight]}"),`
          )
          .join("\n")}
      ])
    )
    .nonempty(),

  
  ${
    weights.length > 1
      ? `z.object({
    min: z.union([
      ${weights
        .slice(0, -1)
        .map(
          (weight) =>
            `z.literal(${weight}),\nz.literal("${numberToWeight[weight]}"),`
        )
        .join("\n")}
    ]),

    max: z.union([
      ${weights
        .slice(1)
        .map(
          (weight) =>
            `z.literal(${weight}),\nz.literal("${numberToWeight[weight]}"),`
        )
        .join("\n")}
    ]),
  }).refine(
          (input) => {
            const min = typeof input.min === "string" ? weightToNumber[input.min] : input.min;
            const max = typeof input.max === "string" ? weightToNumber[input.max] : input.max;
            return min < max;
          },
          {
            message: "min should be less than max",
          }      
        )
`
      : ""
  }])${!isItalic ? `.default([${weights}])` : ".optional()"}
   .transform((weight): Array<WeightNumber> => {
      const allWeights = [${weights}] as WeightNumber[];
  
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
        ${
          weights.length > 1
            ? `case typeof weight === "object" && "min" in weight: {
          const min =
            typeof weight.min === "string" ? weightToNumber[weight.min] : weight.min;
          const max =
            typeof weight.max === "string" ? weightToNumber[weight.max] : weight.max;
          return allWeights.filter((w) => w <= max && w >= min);
        }`
            : ""
        }
        default:
          return [${weights}];
      }
    })
`;
}
