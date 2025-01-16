import { z } from "zod";
import urlSchema from "./fonts.url.schema.js";
import sharedFontSchema from "./fonts.shared.schema.js";

const pathSchema = urlSchema.omit({ fontUrl: true, selfHost: true }).extend({
  path: z.string().min(1),
});

const localFontsSchema = z.array(
  sharedFontSchema.extend({
    name: z.string(),
    preload: z.boolean().optional(),
    convertToWoff2: z.boolean().optional(),
    optimize: z.boolean().optional(),
    defer: z.boolean().optional(),
    unicodeRange: z.string().optional(),
    paths: z.array(pathSchema).nonempty(),
  })
);

export default localFontsSchema;
