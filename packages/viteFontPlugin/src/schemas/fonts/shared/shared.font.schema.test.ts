import { describe, it, expect } from "vitest";
import { DISPLAY_OPTIONS } from "../../../../../../shared/constants.js";
import sharedFontSchema from "./shared.font.schema.js";

describe("sharedFontSchema", () => {
  it("should validate correct input", () => {
    const validInput = {
      className: "example-class",
      cssVariable: "--font-variable",
      fallback: "Arial, sans-serif",
      display: "swap",
    };

    const result = sharedFontSchema.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should prepend '--' to cssVariable if not provided", () => {
    const input = {
      cssVariable: "font-variable",
    };

    const result = sharedFontSchema.safeParse(input);

    expect(result.success).toBe(true);
    expect(result.data?.cssVariable).toBe("--font-variable");
  });

  it("should allow missing optional fields", () => {
    const input = {};

    const result = sharedFontSchema.safeParse(input);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({});
  });

  it("should fail if display is not one of the DISPLAY_OPTIONS", () => {
    const input = {
      display: "invalid-option",
    };

    const result = sharedFontSchema.safeParse(input);

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toContain(
      "Invalid enum value. Expected"
    );
  });

  it("should allow display values within DISPLAY_OPTIONS", () => {
    for (const option of DISPLAY_OPTIONS) {
      const input = {
        display: option,
      };

      const result = sharedFontSchema.safeParse(input);

      expect(result.success).toBe(true);
      expect(result.data?.display).toBe(option);
    }
  });
});
