import { z } from "zod";
import { invalidFallback } from "../utils/index.js";
import { CONFIG_DEFAULT_SETTINGS } from "../../constants.js";

const preconnectSchema = z.object({
  google: invalidFallback(
    z.boolean().optional(),
    "preconnect.google",
    CONFIG_DEFAULT_SETTINGS.preconnect.google
  ),
  custom: invalidFallback(
    z
      .union([z.literal(false), z.array(z.string()).nonempty(), z.string()])
      .optional(),
    "preconnect.custom",
    CONFIG_DEFAULT_SETTINGS.preconnect.custom
  ),
});

export default preconnectSchema;
