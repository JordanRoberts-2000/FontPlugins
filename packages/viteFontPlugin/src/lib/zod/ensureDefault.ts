import { z } from "zod";
import Logger from "../../utils/logger.js";
import ERRORS from "../../constants/errorMessages.js";

/**
 * A Zod helper function that applies a default value to a schema and logs an error if the validation fails.
 *
 * @template T - The Zod schema type being extended with default and error handling.
 * @param {T} schema - A Zod schema to which the default value will be applied.
 * @param {z.infer<T>} defaultValue - The default value to use if the input value is invalid.
 * @returns {z.ZodCatch<z.ZodDefault<T>>} A new Zod schema that enforces the default value and logs an error for invalid inputs.
 *
 * @example
 * import { z } from "zod";
 * import ensureDefault from "./ensureDefault.js";
 *
 * const schema = ensureDefault(z.string(), "defaultFont");
 *
 * const result = schema.safeParse(undefined);
 * console.log(result.success); // Output: true
 * console.log(result.data); // Output: "defaultFont"
 *
 * const invalidResult = schema.safeParse(42);
 * console.log(invalidResult.success); // Output: true
 * console.log(invalidResult.data); // Output: "defaultFont"
 * // Logs: Value '42' from root is invalid. Defaulting to 'defaultFont'. Error: Expected string, received number
 *
 * @example
 * const schema = ensureDefault(z.number(), 42);
 * const result = schema.safeParse(undefined);
 * console.log(result.data); // Output: 42
 */

export default function ensureDefault<T extends z.ZodType>(
  schema: T,
  defaultValue: z.infer<T>
): z.ZodCatch<z.ZodDefault<T>> {
  return schema.default(defaultValue).catch(({ input, error }) => {
    Logger.error(
      ERRORS.zod.ensureDefault(
        input as string,
        error.issues[0].path as string[],
        defaultValue,
        error.issues[0].message
      )
    );
    return defaultValue;
  });
}
