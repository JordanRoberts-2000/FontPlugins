import { describe, it, expect } from "vitest";
import { googleFontSchema } from "./google.font.schema.js";
import Logger from "../../../utils/logger.js";

vi.mock("../../../utils/logger.js", () => ({
  default: {
    error: vi.fn(),
  },
}));

describe("googleFontSchema", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validFont = "Roboto";
  const validInput = {
    font: "Inter",
    includeItalics: true,
    weights: {
      min: 200,
      max: 300,
    },
    axes: ["opsz", "wdth"],
    className: "font",
    cssVariable: "--serif",
    defer: {
      italic: [200, 400],
      regular: 400,
    },
    preload: {
      italic: 900,
      regular: [400],
    },
    display: "block",
    fallback: "oof",
    includeAdjustedFallback: false,
    selfHost: false,
    subsets: "all",
  };

  it("should validate valid font string", () => {
    const result = googleFontSchema.safeParse(validFont);

    expect(result.success).toBe(true);
    expect(result.data).toBe(validFont);
  });

  it("should validate valid font object", () => {
    const result = googleFontSchema.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("logs an error and returns null if font is invalid", () => {
    const result = googleFontSchema.safeParse({
      ...validInput,
      font: "InvalidFont",
    });

    expect(result.success).toBe(true);
    expect(result.data).toBe(null);
    expect(Logger.error).toHaveBeenCalled();
  });

  it("should reject invalid subsets", () => {
    const result = googleFontSchema.safeParse({
      ...validInput,
      subsets: ["invalidSubset"],
    });

    expect(result.success).toBe(true);
    expect(result.data).toBe(null);
    expect(Logger.error).toHaveBeenCalled();
  });

  it("should reject invalid axes", () => {
    const result = googleFontSchema.safeParse({
      ...validInput,
      axes: ["invalidAxis"],
    });

    expect(result.success).toBe(true);
    expect(result.data).toBe(null);
    expect(Logger.error).toHaveBeenCalled();
  });

  it("should reject invalid preload options", () => {
    const result = googleFontSchema.safeParse({
      ...validInput,
      preload: { regular: "invalidWeight" },
    });

    expect(result.success).toBe(true);
    expect(result.data).toBe(null);
    expect(Logger.error).toHaveBeenCalled();
  });

  it("should allow optional fields to be omitted", () => {
    const input = { font: validFont };
    const result = googleFontSchema.safeParse(input);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(input);
  });

  it("should reject completely invalid input", () => {
    const result = googleFontSchema.safeParse({ invalidField: "value" });

    expect(result.success).toBe(true);
    expect(result.data).toBe(null);
    expect(Logger.error).toHaveBeenCalled();
  });
});
