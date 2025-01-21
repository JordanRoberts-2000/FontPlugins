import { z } from "zod";
import sharedFontSchema from "../shared/shared.font.schema.js";
import { optimizeSchema } from "../../shared/optimize.schema.js";
import { localSrcSchema } from "./local.src.schema.js";
import ERRORS from "../../../constants/errorMessages.js";
import Logger from "../../../utils/logger.js";

export const localFontSchema = z
  .union([
    z.null(),
    sharedFontSchema.extend({
      name: z.string(),
      preload: z.boolean().optional(),
      defer: z.boolean().optional(),
      unicodeRange: z.string().min(1).optional(),
      optimize: optimizeSchema.optional(),
      src: z.array(localSrcSchema).min(1),
    }),
  ])
  .catch(({ input, error }) => {
    const font = input?.name ?? "unknown";
    Logger.error(ERRORS.zod.fontInvalid(font, error.errors[0].message));
    return null;
  });
