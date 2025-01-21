import { ZodEffects, ZodTypeAny } from "zod";

/**
 * A Zod helper function that validates whether a given font-family exists in the provided font data.
 *
 * @template T - The Zod schema type being validated.
 * @param {T} schema - A Zod schema representing the font-family field.
 * @param {Map<string, unknown>} fontData - A Map containing valid font-family names as keys.
 * @returns {ZodEffects<T, string, string>} A Zod schema that validates font-family names against the provided font data.
 *
 * @example
 * import { z } from "zod";
 * import validateGoogleFont from "./validateGoogleFont.js";
 *
 * const fontData = new Map([
 *   ["Roboto", {}],
 *   ["Open Sans", {}],
 *   ["Arial", {}],
 * ]);
 *
 * const schema = validateGoogleFont(z.string(), fontData);
 *
 * const result = schema.safeParse("Roboto");
 * console.log(result.success); // Output: true
 *
 * const invalidResult = schema.safeParse("InvalidFont");
 * console.log(invalidResult.success); // Output: false
 * console.log(invalidResult.error.issues[0].message); // Output: Invalid font-family: InvalidFont
 */

export default function validateGoogleFont<T extends ZodTypeAny>(
  schema: T,
  fontData: Map<string, unknown>
): ZodEffects<T, string, string> {
  return schema.refine(
    (family) => fontData.has(family),
    (family) => ({
      message: `Invalid font-family: ${family}`,
    })
  );
}
