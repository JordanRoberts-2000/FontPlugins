import { z } from "zod";
import sharedFontSchema from "./fonts.shared.schema.js";
import urlSchema from "./fonts.url.schema.js";

const remoteFontsSchema = z.array(
  sharedFontSchema.extend({
    name: z.string(),
    preload: z.boolean().optional(),
    selfHost: z.boolean().optional(),
    convertToWoff2: z.boolean().optional(),
    optimize: z.boolean().optional(),
    defer: z.boolean().optional(),
    unicodeRange: z.string().optional(),
    urls: z.array(urlSchema).nonempty(),
  })
);

export default remoteFontsSchema;
