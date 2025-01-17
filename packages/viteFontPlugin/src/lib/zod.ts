import { z, ZodEffects } from "zod";
import { fontData } from "../utils/googleFontDataMap.js";
import validateGoogleFont from "../schemas/utils/validateGoogleFont.js";

declare module "zod" {
  interface ZodString {
    googleFont(): ZodEffects<this, string, string>;
  }
}

z.ZodString.prototype.googleFont = function () {
  return validateGoogleFont(this, fontData);
};
