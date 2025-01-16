import { z } from "zod";
import sharedFontSchema from "./fonts.shared.schema.js";
import urlSchema from "./fonts.url.schema.js";

const cdnFontsSchema = z.array(
  sharedFontSchema.extend({
    name: z.string(),
    preload: z.boolean().optional(),
    defer: z.boolean().optional().default(false),
    unicodeRange: z.string().optional(),
    urls: z
      .array(
        urlSchema.omit({ optimize: true, selfHost: true, convertToWoff2: true })
      )
      .min(1),
  })
);

export type CdnFonts = z.infer<typeof cdnFontsSchema>;

export default cdnFontsSchema;
