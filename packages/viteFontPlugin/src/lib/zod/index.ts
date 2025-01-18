import { z } from "zod";
import { fontData } from "../../utils/googleFontDataMap.js";
import validateGoogleFont from "./customMethods/validateGoogleFont.js";
import { removeDuplicates } from "../../schemas/utils/index.js";
import ensureDefault from "./customMethods/ensureDefault.js";

declare module "zod" {
  interface ZodString {
    googleFont(): z.ZodEffects<this, string, string>;
  }

  interface ZodArray<T extends z.ZodTypeAny> {
    removeDuplicates(config?: {
      warn: boolean;
    }): z.ZodEffects<this, z.infer<this>, z.input<this>>;
  }

  interface ZodType<
    Output = any,
    Def extends z.ZodTypeDef = z.ZodTypeDef,
    Input = Output
  > {
    ensureDefault<T extends z.ZodType<Output, Def, Input>>(
      this: T,
      defaultValue: Output
    ): z.ZodCatch<z.ZodDefault<T>>;
  }

  interface ZodObject<T extends z.ZodRawShape> {
    withEnsuredDefaults(
      settings: Partial<z.infer<z.ZodObject<T>>>
    ): z.ZodObject<{
      [K in keyof T]: z.ZodCatch<z.ZodDefault<z.ZodOptional<T[K]>>>;
    }>;
  }
}

z.ZodString.prototype.googleFont = function () {
  return validateGoogleFont(this, fontData);
};

z.ZodArray.prototype.removeDuplicates = function (config?: { warn: boolean }) {
  return removeDuplicates(this, config);
};

z.ZodType.prototype.ensureDefault = function <
  T extends z.ZodType<any, any, any>
>(this: T, defaultValue: z.infer<T>) {
  return ensureDefault(this, defaultValue);
};

z.ZodObject.prototype.withEnsuredDefaults = function (settings) {
  const transformedSchema = Object.fromEntries(
    Object.entries(this.shape).map(([key, field]) => [
      key,
      (field as z.ZodTypeAny)
        .optional() // Make it optional
        .default(settings[key]) // Add a default value
        .catch(() => settings[key]), // Catch invalid values
    ])
  ) as {
    [K in keyof typeof this.shape]: z.ZodCatch<
      z.ZodDefault<z.ZodOptional<(typeof this.shape)[K]>>
    >;
  };

  return z.object(transformedSchema) as z.ZodObject<{
    [K in keyof typeof this.shape]: z.ZodCatch<
      z.ZodDefault<z.ZodOptional<(typeof this.shape)[K]>>
    >;
  }>;
};
