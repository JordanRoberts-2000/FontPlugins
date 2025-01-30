import { z } from "zod";
import { fontSettingsSchema } from "../shared/fontSettings.schema.js";
import { optimizeSchema } from "../../shared/optimize.schema.js";

export const localSettingsSchema = fontSettingsSchema
  .omit({ includeItalicsByDefault: true })
  .partial()
  .extend({
    // disable: fontSettingsSchema.shape.disable.default(true),
    selfHostRemoteUrlsOnBuild: z.boolean(),
    optimize: optimizeSchema.partial(),
  });
