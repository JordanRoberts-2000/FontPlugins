import configSchema from "../../src/schemas/config.schema.js";

describe("configSchema", () => {
  it("should apply default values when no input is provided", () => {
    const result = configSchema.parse({});
    expect(result).toEqual({
      suppressNotOpenSourceWarnings: false,
      selfHost: true,
      handleCss: "inlineHead",
      includeItalicsByDefault: true,
      defaultModifiedFallback: true,
      defaultPreload: false,
      defaultDisplay: "swap",
    });
  });

  it("should override defaults when values are provided", () => {
    const input = {
      suppressNotOpenSourceWarnings: true,
      selfHost: false,
      handleCss: "buildFile",
      includeItalicsByDefault: false,
      defaultModifiedFallback: false,
      defaultPreload: true,
      defaultDisplay: "block",
    };
    const result = configSchema.parse(input);
    expect(result).toEqual(input);
  });

  it("should validate handleCss against allowed values", () => {
    const validInputs = ["inlineHead", "buildFile"];
    validInputs.forEach((value) => {
      const result = configSchema.safeParse({ handleCss: value });
      expect(result.success).toBe(true);
      expect(result.data!.handleCss).toBe(value);
    });

    const invalidInput = { handleCss: "invalidValue" };
    const result = configSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain("Invalid enum value");
  });

  it("should validate defaultDisplay against allowed values", () => {
    const validInputs = ["auto", "block", "swap", "fallback", "optional"];
    validInputs.forEach((value) => {
      const result = configSchema.safeParse({ defaultDisplay: value });
      expect(result.success).toBe(true);
      expect(result.data!.defaultDisplay).toBe(value);
    });

    const invalidInput = { defaultDisplay: "invalidValue" };
    const result = configSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain("Invalid enum value");
  });

  it("should validate boolean fields", () => {
    const validInput = {
      suppressNotOpenSourceWarnings: true,
      selfHost: false,
      includeItalicsByDefault: false,
      defaultModifiedFallback: false,
      defaultPreload: true,
    };
    const result = configSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      ...validInput,
      handleCss: "inlineHead", // Default not overridden
      defaultDisplay: "swap", // Default not overridden
    });

    const invalidInput = { suppressNotOpenSourceWarnings: "notBoolean" };
    const invalidResult = configSchema.safeParse(invalidInput);
    expect(invalidResult.success).toBe(false);
    expect(invalidResult.error?.issues[0]?.message).toContain(
      "Expected boolean"
    );
  });

  it("should reject invalid field names", () => {
    const invalidInput = { invalidField: true };
    const result = configSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain("Unrecognized key");
  });
});
