import { ZodEffects, ZodTypeAny } from "zod";
import Logger from "../../../utils/logger.js";

/**
 * Zod helper that will remove duplicates from an array and log a warning.
 * @param arr - The input array
 * @param context - A string indicating which field failed (for logging purposes)
 * @returns A unique array
 */

export default function removeDuplicates<T extends ZodTypeAny>(
  schema: T,
  config?: { warn: boolean }
): ZodEffects<T, T[], T[]> {
  return schema.transform((arr: T[], ctx) => {
    const uniqueValues = Array.from(new Set(arr));

    if (uniqueValues.length < arr.length && config?.warn) {
      const duplicates = arr.filter(
        (value, index) => arr.indexOf(value) !== index
      );
      console.warn(
        `Removed duplicate values from ${ctx.path.join(".")}: ${duplicates.join(
          ", "
        )}`
      );
    }

    return uniqueValues;
  });
}
