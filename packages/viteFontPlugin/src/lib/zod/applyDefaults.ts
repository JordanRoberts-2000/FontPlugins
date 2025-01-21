import { z } from "zod";
import { DeepPartial } from "../../types/index.js";
import Logger from "../../utils/logger.js";
import ensureDefault from "./ensureDefault.js";

export default function applyDefaults<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  defaults: DeepPartial<z.infer<z.ZodObject<T>>>
): z.ZodObject<{
  [K in keyof T]: z.ZodCatch<z.ZodDefault<z.ZodOptional<T[K]>>>;
}> {
  const transformedSchema = Object.fromEntries(
    Object.entries(schema.shape).map(([key, field]) => {
      if (!(key in defaults)) {
        Logger.fatal(`Key "${key}" is missing in defaultSettings object.`);
      }

      const defaultValue = defaults[key as keyof typeof defaults];

      if (field instanceof z.ZodObject) {
        return [
          key,

          ensureDefault(
            applyDefaults(field, defaultValue || {}).optional(),
            defaultValue
          ),
        ];
      }

      return [
        key,
        ensureDefault((field as z.ZodTypeAny).optional(), defaultValue),
      ];
    })
  ) as {
    [K in keyof T]: z.ZodCatch<z.ZodDefault<z.ZodOptional<T[K]>>>;
  };

  return z.object(transformedSchema);
}
