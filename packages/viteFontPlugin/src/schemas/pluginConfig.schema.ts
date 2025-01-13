import { z } from "zod";
import configSchema from "./config.schema.js";
import fontsSchema from "./fonts.schema.js";
import { processFontObject, processFontString } from "./utils/processFonts.js";

const pluginConfigSchema = z
  .object({
    config: configSchema,
    fonts: fontsSchema,
  })
  .superRefine(({ config, fonts }) => {
    const processedFonts = fonts.map((fontData) => {
      if (typeof fontData === "string") {
        processFontString(fontData, config);
      } else {
        processFontObject(fontData, config);
      }
    });
    return {
      config: {
        suppressNotOpenSourceWarnings: config.suppressNotOpenSourceWarnings,
        selfHost: config.selfHost,
        handleCss: config.handleCss,
      },
      fonts: processedFonts,
    };
  });

export default pluginConfigSchema;
