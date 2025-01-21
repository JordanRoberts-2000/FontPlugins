import { ZodEffects, ZodTypeAny } from "zod";
import Logger from "../../utils/logger.js";
import ERRORS from "../../constants/errorMessages.js";

/**
 * A Zod helper function that transforms an array by removing duplicate elements.
 * Optionally logs a warning if duplicates are found.
 *
 * @template T - The Zod schema type for array elements.
 * @param {T} schema - A Zod schema representing the array elements.
 * @param {Object} [config] - Optional configuration object.
 * @param {boolean} [config.warn=false] - Whether to log a warning when duplicates are removed.
 * @returns {ZodEffects<T, T[], T[]>} A Zod schema that enforces the removal of duplicate elements
 * and logs warnings if configured.
 *
 * @example
 * import { z } from "zod";
 * import removeDuplicates from "./removeDuplicates.js";
 *
 * const arraySchema = removeDuplicates(z.array(z.string()), { warn: true });
 * const result = arraySchema.parse(["a", "b", "b", "c"]);
 * console.log(result); // Output: ["a", "b", "c"]
 * // Logs: Removed duplicate values from field: b
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
      Logger.warn(
        ERRORS.zod.removeDuplicates(ctx.path as string[], [
          ...new Set(duplicates),
        ])
      );
    }

    return uniqueValues;
  });
}
