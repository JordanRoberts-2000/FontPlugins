import { z } from "zod";
import Logger from "../../utils/logger.js";

/**
 * Zod helper that provides a default value and logs an error when validation fails.
 *
 * @template T - A Zod schema type.
 * @param schema - The Zod schema to validate the input against.
 * @param path - A path indicating which field failed (for logging purposes)
 * @param defaultValue - The default value to use when the validation fails.
 * @returns The enhanced Zod schema with a default value and error logging behavior.
 *
 * @example
 * const schema = z.string();
 * const validatedSchema = invalidFallback(schema, "path", "defaultValue");
 * const result = validatedSchema.parse(undefined); // Logs error and returns "defaultValue"
 */

export default function invalidFallback<T extends z.ZodType>(
  schema: T,
  path: string,
  defaultValue: z.infer<T>
) {
  return schema.default(defaultValue).catch(({ input, error }) => {
    Logger.error(
      `settings.${path} value '${input}' is invalid, defaulting to ${defaultValue}. Error: ${error}`
    );
    return defaultValue;
  });
}
