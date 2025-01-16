import { describe, it, expect } from "vitest";
import { generateFontsSchema } from "../../src/schemas/legacyFontsSchema.js";

describe("FontsSchema", () => {
  const mockFontData = new Map([
    ["Roboto", {}],
    ["Inter", {}],
  ]);

  const fontsSchema = generateFontsSchema(mockFontData);

  const expectInvalid = (input: unknown) => {
    const result = fontsSchema.safeParse(input);
    expect(result.success).toBe(false);
  };

  describe("Font String Validation", () => {
    it("should validate an array of valid font names", () => {
      const validInput = ["Roboto", "Inter"];
      const result = fontsSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validInput);
    });

    it("should reject invalid font names", () => {
      expectInvalid(["InvalidFont"]);
    });
  });

  describe("Weight Validation", () => {
    it("should validate numeric weights as single values, arrays, and ranges", () => {
      const validInputs = [
        { font: "Roboto", weight: 400 },
        { font: "Roboto", weight: [100, 200, 400] },
        { font: "Roboto", weight: { min: 300, max: 700 } },
      ];
      validInputs.forEach((input) => {
        const result = fontsSchema.safeParse([input]);
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid weight types and ranges", () => {
      const invalidInputs = [
        { font: "Roboto", weight: { min: 700, max: 300 } },
        { font: "Roboto", weight: { min: 300, max: 300 } },
        { font: "Roboto", weight: { min: 100, max: "invalid" } },
        { font: "Roboto", weight: "invalid" },
        { font: "Roboto", weight: 50 },
        { font: "Roboto", weight: true },
        { font: "Roboto", weight: [100, "variable"] },
      ];
      invalidInputs.forEach((input) => expectInvalid([input]));
    });
  });

  describe("Italic Validation", () => {
    it("should validate italic as boolean, numeric weights, arrays, and ranges", () => {
      const validInputs = [
        { font: "Roboto", italic: true },
        { font: "Roboto", italic: [100, 200, 400] },
        { font: "Roboto", italic: { min: 300, max: 700 } },
      ];
      validInputs.forEach((input) => {
        const result = fontsSchema.safeParse([input]);
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid italic types and ranges", () => {
      const invalidInputs = [
        { font: "Roboto", italic: { min: 700, max: 300 } },
        { font: "Roboto", italic: { min: 300, max: 300 } },
        { font: "Roboto", italic: { min: 100, max: "invalid" } },
        { font: "Roboto", italic: "variable" },
        { font: "Roboto", italic: 50 },
        { font: "Roboto", italic: [100, 50] },
      ];
      invalidInputs.forEach((input) => expectInvalid([input]));
    });
  });

  describe("Field Defaults", () => {
    it("should apply defaults for optional fields in font objects", () => {
      const validInput = [{ font: "Inter" }];
      const result = fontsSchema.parse(validInput);
      expect(result).toEqual([
        {
          font: "Inter",
          modifiedFallback: undefined, // Default not explicitly set
          subsets: [], // Default applied
          axes: [], // Default applied
        },
      ]);
    });
  });

  describe("Comprehensive Edge Cases", () => {
    it("should reject completely invalid structures", () => {
      expectInvalid("Invalid");
      expectInvalid(42);
      expectInvalid({ font: "Roboto" });
    });

    it("should reject empty arrays", () => {
      expectInvalid([]);
    });
  });
});
