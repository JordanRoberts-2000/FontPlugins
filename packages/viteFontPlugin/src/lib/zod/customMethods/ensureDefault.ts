import { z } from "zod";

export default function ensureDefault<T extends z.ZodType>(
  schema: T,
  defaultValue: z.infer<T>
): z.ZodCatch<z.ZodDefault<T>> {
  return schema.default(defaultValue).catch((context) => {
    console.error(
      `Value '${context.input}' is invalid. Defaulting to '${defaultValue}'. Error: ${context.error.message}`
    );
    return defaultValue;
  });
}
