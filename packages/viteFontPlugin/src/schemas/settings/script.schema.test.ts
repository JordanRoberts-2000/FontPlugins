import scriptSchema from "./script.schema.js";
import { CONFIG_DEFAULT_SETTINGS } from "../../constants.js";

describe("scriptSchema", () => {
  it("validates a fully populated valid configuration", () => {
    const validConfig = {
      css: {
        disable: true,
        minify: true,
        outputPath: "./styles",
      },
      fontFiles: {
        disable: false,
        outputPath: "./fonts",
      },
    };

    const result = scriptSchema.safeParse(validConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validConfig);
  });

  it("applies defaults for missing optional fields", () => {
    const partialConfig = {
      css: {
        disable: false,
      },
    };

    const result = scriptSchema.safeParse(partialConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      css: {
        disable: false,
        minify: CONFIG_DEFAULT_SETTINGS.script.css.minify,
        outputPath: CONFIG_DEFAULT_SETTINGS.script.css.outputPath,
      },
      fontFiles: CONFIG_DEFAULT_SETTINGS.script.fontFiles,
    });
  });

  it("fallbacks to defaults for invalid fields", () => {
    const invalidConfig = {
      css: {
        disable: "not-a-boolean",
        minify: "not-a-boolean",
        outputPath: 123,
      },
      fontFiles: {
        disable: "not-a-boolean",
        outputPath: 456,
      },
    };

    const result = scriptSchema.safeParse(invalidConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(CONFIG_DEFAULT_SETTINGS.script);
  });

  it("fallbacks to defaults for invalid structures", () => {
    const completelyInvalidConfig = {
      css: "not-an-object",
      fontFiles: "not-an-object",
    };

    const result = scriptSchema.safeParse(completelyInvalidConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(CONFIG_DEFAULT_SETTINGS.script);
  });

  it("handles missing fields with defaults for both css and fontFiles", () => {
    const minimalConfig = {};

    const result = scriptSchema.safeParse(minimalConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(CONFIG_DEFAULT_SETTINGS.script);
  });
});
