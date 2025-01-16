import pluginSchema from "./plugin.schema.js";
import { CONFIG_DEFAULT_SETTINGS } from "../../constants.js";

describe("pluginSchema", () => {
  it("validates a fully populated valid configuration", () => {
    const validConfig = {
      disable: false,
      css: {
        method: "inlineHead",
        minify: true,
      },
      fontFiles: {
        optimise: true,
        convertToWoff2: true,
      },
    };

    const result = pluginSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validConfig);
  });

  it("applies defaults for missing optional fields", () => {
    const partialConfig = {
      css: {
        method: "inlineHead",
      },
    };

    const result = pluginSchema.safeParse(partialConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      disable: CONFIG_DEFAULT_SETTINGS.plugin.disable,
      css: {
        method: "inlineHead",
        minify: CONFIG_DEFAULT_SETTINGS.plugin.css.minify,
      },
      fontFiles: CONFIG_DEFAULT_SETTINGS.plugin.fontFiles,
    });
  });

  it("fallbacks to defaults for invalid fields", () => {
    const invalidConfig = {
      fish: "invalid-field",
      disable: "not-a-boolean",
      css: {
        method: "invalid-method",
        minify: "not-a-boolean",
      },
      fontFiles: {
        optimise: "not-a-boolean",
      },
    };

    const result = pluginSchema.safeParse(invalidConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(CONFIG_DEFAULT_SETTINGS.plugin);
  });
});
