import { z } from "zod";
import { fontSettingsSchema } from "../shared/fontSettings.schema.js";
import { optimizeSchema } from "../../shared/optimize.schema.js";

export const localSettingsSchema = fontSettingsSchema
  .omit({ includeItalicsByDefault: true })
  .extend({
    selfHostRemoteUrlsOnBuild: z.boolean(),
    optimize: optimizeSchema,
  });
