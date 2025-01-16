import { z } from "zod";
import { DISPLAY_OPTIONS } from "../../constants.js";

const sharedFontSchema = z.object({
  className: z.string().optional(),
  cssVariable: z
    .string()
    .transform((varName) =>
      varName.startsWith("--") ? varName : "--" + varName
    )
    .optional(),
  fallback: z.string().optional(),
  display: z.enum(DISPLAY_OPTIONS).optional(),
});

export default sharedFontSchema;
