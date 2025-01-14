import processFontWeight from "../../src/schemas/utils/processFontWeight.js";
import { FontData } from "../../src/utils/googleFontDataMap.js";

describe("processFontWeight", () => {
  const mockFontData: FontData = {
    axes: ["wght"],
    subsets: [],
    weights: {
      roman: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      italic: [],
    },
    isOpenSource: true,
  };

  it("should return string 'variable' if fontWeight is undefined and variable option exists", () => {
    expect(processFontWeight(undefined, mockFontData)).toBe("variable");
  });

  it("should return all available weights if fontWeight is undefined and no variable option exists", () => {
    const fontDataWithoutAxes = { ...mockFontData, axes: [] };
    expect(processFontWeight(undefined, fontDataWithoutAxes)).toBe(
      mockFontData.weights.roman
    );
  });

  it("should return 'variable' if fontWeight is 'variable' and axes are available", () => {
    expect(processFontWeight("variable", mockFontData)).toBe("variable");
  });

  it("should throw an error if fontWeight is 'variable' but no axes are available", () => {
    const fontDataWithoutAxes = { ...mockFontData, axes: [] };
    expect(() => processFontWeight("variable", fontDataWithoutAxes)).toThrow(
      "Font does not support variable weights"
    );
  });

  it("should return roman weights if fontWeight is 'all'", () => {
    expect(processFontWeight("all", mockFontData)).toBe(
      mockFontData.weights.roman
    );
  });

  it("should return an array with the weight if fontWeight is a valid number", () => {
    expect(processFontWeight(400, mockFontData)).toEqual([400]);
  });

  it("should throw an error if fontWeight is a number not in roman weights", () => {
    expect(() => processFontWeight(50, mockFontData)).toThrow(
      "Invalid weight: 50"
    );
  });

  it("should return the array if fontWeight is a valid array of weights", () => {
    expect(processFontWeight([300, 400, 500], mockFontData)).toEqual([
      300, 400, 500,
    ]);
  });

  it("should throw an error if fontWeight is an array with invalid weights", () => {
    expect(() => processFontWeight([1000, 400], mockFontData)).toThrow(
      "Invalid weights: 1000"
    );
  });

  it("should return a range of weights if fontWeight is an object with min and max", () => {
    expect(processFontWeight({ min: 200, max: 500 }, mockFontData)).toEqual([
      200, 300, 400, 500,
    ]);
  });

  it("should throw an error if fontWeight is an object with an invalid range", () => {
    expect(() =>
      processFontWeight({ min: 600, max: 500 }, mockFontData)
    ).toThrow("Invalid weight range: min 600 to 500");
  });

  it("should throw an error if fontWeight is an object with min or max not in roman weights", () => {
    expect(() =>
      processFontWeight({ min: 50, max: 400 }, mockFontData)
    ).toThrow("Invalid weight range: min 50 to 400");
  });

  it("should throw an error for invalid weight input", () => {
    expect(() => processFontWeight("invalid" as any, mockFontData)).toThrow(
      "Invalid weight input"
    );
  });
});
