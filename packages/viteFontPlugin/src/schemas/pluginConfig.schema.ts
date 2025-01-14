import { z } from "zod";
import configSchema from "./config.schema.js";
import fontsSchema from "./fonts.schema.js";
import processFontString from "./utils/processFontString.js";
import PluginLogger from "../utils/logger.js";
import { DEFAULT_CONFIG } from "../constants.js";
import processFontObject from "./utils/processFontObject.js";

const pluginConfigSchema = z
  .object({
    config: configSchema,
    fonts: fontsSchema,
  })
  .catch(({ input, error }) => {
    if (!input) {
      PluginLogger.warn("No PluginConfig provided");
    } else {
      PluginLogger.error(
        `PluginConfig value '${input}' invalid. Error: ${error}`
      );
    }
    return {
      config: DEFAULT_CONFIG,
      fonts: [],
    };
  })
  .superRefine(({ config, fonts }) => {
    if (!fonts.length) {
      PluginLogger.warn("Fonts array provided is empty");
    }
    const processedFonts = fonts
      .filter((fontData) => fontData !== null)
      .map((fontData) => {
        if (typeof fontData === "string") {
          processFontString(fontData, config);
        } else {
          processFontObject(fontData, config);
        }
      })
      .filter((fontData) => fontData !== null);
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
