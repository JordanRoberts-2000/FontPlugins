import { ZodEffects, ZodTypeAny } from "zod";

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
