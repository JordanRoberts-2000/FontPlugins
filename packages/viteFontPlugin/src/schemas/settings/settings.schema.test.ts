import settingsSchema from "./settings.schema.js";
import { CONFIG_DEFAULT_SETTINGS } from "../../constants.js";

describe("settingsSchema", () => {
  it("validates a fully populated valid configuration", () => {
    const validConfig = {
      suppressNotOpenSourceWarnings: true,
      preconnect: {
        google: true,
        custom: ["cdn.example.com"],
      },
      subsetPriority: ["latin", "latin-ext"],
      defaultDisplay: "swap",
      defaultPreload: true,
      convertToWoff2ByDefault: true,
      optimizeByDefault: true,
      adjustedFallbackByDefault: false,
      includeItalicsByDefault: false,
      selfHostByDefault: true,
      plugin: {
        disable: false,
        css: {
          method: "inlineHead",
          minify: true,
        },
        fontFiles: {
          optimise: true,
          convertToWoff2: true,
        },
      },
      script: {
        css: {
          disable: false,
          minify: false,
          outputPath: "./styles",
        },
        fontFiles: {
          disable: false,
          outputPath: "./fonts",
        },
      },
    };

    const result = settingsSchema.safeParse(validConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validConfig);
  });

  it("applies defaults for missing optional fields", () => {
    const partialConfig = {
      subsetPriority: ["latin"],
    };

    const result = settingsSchema.safeParse(partialConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      ...CONFIG_DEFAULT_SETTINGS,
      subsetPriority: ["latin"],
    });
  });

  it("fallbacks to defaults for invalid fields", () => {
    const invalidConfig = {
      suppressNotOpenSourceWarnings: "not-a-boolean",
      subsetPriority: ["invalid-subset"],
      defaultDisplay: "invalid",
    };

    const result = settingsSchema.safeParse(invalidConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(CONFIG_DEFAULT_SETTINGS);
  });

  it("removes any duplicates from subsetPriority array", () => {
    const configWithDuplicates = {
      subsetPriority: ["latin", "latin", "latin-ext", "latin-ext"],
    };

    const result = settingsSchema.safeParse(configWithDuplicates);

    expect(result.success).toBe(true);
    expect(result.data?.subsetPriority).toEqual(["latin", "latin-ext"]);
  });

  it("handles entirely missing configuration with defaults", () => {
    const minimalConfig = {};

    const result = settingsSchema.safeParse(minimalConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(CONFIG_DEFAULT_SETTINGS);
  });
});
