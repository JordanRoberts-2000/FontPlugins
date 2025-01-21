import { z } from "zod";
import sharedFontSchema from "../shared/shared.font.schema.js";
import { optimizeSchema } from "../../shared/optimize.schema.js";
import { localSrcSchema } from "./local.src.schema.js";

export const localFontSchema = sharedFontSchema.extend({
  name: z.string(),
  preload: z.boolean().optional(),
  defer: z.boolean().optional(),
  unicodeRange: z.string().min(1).optional(),
  optimize: optimizeSchema.optional(),
  src: z.array(localSrcSchema).min(1),
});
