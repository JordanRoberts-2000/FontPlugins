import { z } from "zod";
import { DEFAULT_CONFIG, DISPLAY_OPTIONS } from "../constants.js";
import PluginLogger from "../utils/logger.js";

const configSchema = z
  .object({
    suppressNotOpenSourceWarnings: z
      .boolean()
      .default(DEFAULT_CONFIG.suppressNotOpenSourceWarnings)
      .catch(({ input, error }) => {
        PluginLogger.error(
          `config.suppressNotOpenSourceWarnings value '${input}' is invalid, defaulting to ${DEFAULT_CONFIG.suppressNotOpenSourceWarnings}. Error: ${error}`
        );
        return DEFAULT_CONFIG.suppressNotOpenSourceWarnings;
      }),
    selfHost: z
      .boolean()
      .default(DEFAULT_CONFIG.selfHost)
      .catch(({ input, error }) => {
        PluginLogger.error(
          `config.selfHost value '${input}' is invalid, defaulting to ${DEFAULT_CONFIG.selfHost}. Error: ${error}`
        );
        return DEFAULT_CONFIG.selfHost;
      }),
    handleCss: z
      .enum(["inlineHead", "buildFile"])
      .default(DEFAULT_CONFIG.handleCss)
      .catch(({ input, error }) => {
        PluginLogger.error(
          `config.handleCss value '${input}' is invalid, defaulting to ${DEFAULT_CONFIG.handleCss}. Error: ${error}`
        );
        return DEFAULT_CONFIG.handleCss;
      }),
    includeItalicsByDefault: z
      .boolean()
      .default(DEFAULT_CONFIG.includeItalicsByDefault)
      .catch(({ input, error }) => {
        PluginLogger.error(
          `config.includeItalicsByDefault value '${input}' is invalid, defaulting to ${DEFAULT_CONFIG.includeItalicsByDefault}. Error: ${error}`
        );
        return DEFAULT_CONFIG.includeItalicsByDefault;
      }),
    defaultModifiedFallback: z
      .boolean()
      .default(DEFAULT_CONFIG.defaultModifiedFallback)
      .catch(({ input, error }) => {
        PluginLogger.error(
          `config.defaultModifiedFallback value '${input}' is invalid, defaulting to ${DEFAULT_CONFIG.defaultModifiedFallback}. Error: ${error}`
        );
        return DEFAULT_CONFIG.defaultModifiedFallback;
      }),
    defaultPreload: z.boolean().default(DEFAULT_CONFIG.defaultPreload),
    defaultDisplay: z
      .enum(DISPLAY_OPTIONS)
      .default(DEFAULT_CONFIG.defaultDisplay)
      .catch(({ input, error }) => {
        PluginLogger.error(
          `config.defaultDisplay value '${input}' is invalid, defaulting to ${DEFAULT_CONFIG.defaultDisplay}. Error: ${error}`
        );
        return DEFAULT_CONFIG.defaultDisplay;
      }),
  })
  .strict()
  .default(DEFAULT_CONFIG)
  .catch(({ input, error }) => {
    PluginLogger.error(
      `Config value '${input}' is invalid, continuing with defaults. Error: ${error}`
    );
    return DEFAULT_CONFIG;
  });

export type ConfigSchema = z.infer<typeof configSchema>;

export default configSchema;
