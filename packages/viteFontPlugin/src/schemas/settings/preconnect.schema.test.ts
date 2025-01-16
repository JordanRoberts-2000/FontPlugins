import preconnectSchema from "./preconnect.schema.js";
import { CONFIG_DEFAULT_SETTINGS } from "../../constants.js";

describe("preconnectSchema", () => {
  it("validates a fully populated valid configuration", () => {
    const validConfig = {
      google: true,
      custom: ["cdn.example.com", "cdn.another.com"],
    };

    const result = preconnectSchema.safeParse(validConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validConfig);
  });

  it("applies defaults for missing fields", () => {
    const partialConfig = {
      custom: false,
    };

    const result = preconnectSchema.safeParse(partialConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      google: CONFIG_DEFAULT_SETTINGS.preconnect.google,
      custom: false,
    });
  });

  it("fallbacks to defaults for invalid fields", () => {
    const invalidConfig = {
      google: "not-a-boolean",
      custom: 123,
    };

    const result = preconnectSchema.safeParse(invalidConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(CONFIG_DEFAULT_SETTINGS.preconnect);
  });

  it("allows a single custom URL as a string", () => {
    const configWithStringUrl = {
      custom: "cdn.example.com",
    };

    const result = preconnectSchema.safeParse(configWithStringUrl);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      google: CONFIG_DEFAULT_SETTINGS.preconnect.google,
      custom: "cdn.example.com",
    });
  });

  it("handles an empty array for custom field", () => {
    const invalidConfig = {
      custom: [],
    };

    const result = preconnectSchema.safeParse(invalidConfig);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(CONFIG_DEFAULT_SETTINGS.preconnect);
  });
});
