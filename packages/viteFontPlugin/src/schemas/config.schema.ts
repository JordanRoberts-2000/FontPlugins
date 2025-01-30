import { z } from "zod";
import { settingsSchema } from "./settings/settings.schema.js";
import { googleFontsSchema } from "./fonts/google/googleFontsSchema.js";

const configSchema = z.object({
  settings: settingsSchema,
  googleFonts: googleFontsSchema,
  // localFonts: z.array(localFontSchema).optional(),
  // remoteFonts: z.array(localFontSchema).optional(),
  // cdnFonts: z.array(localFontSchema).optional(),
});

type InputType = z.input<typeof configSchema>;

const input: InputType = {
  settings: {
    google: {},
  },
  googleFonts: ["42dot Sans", "ABeeZee"],
};

const { success, data } = configSchema.safeParse(input);

console.log(data, success);
