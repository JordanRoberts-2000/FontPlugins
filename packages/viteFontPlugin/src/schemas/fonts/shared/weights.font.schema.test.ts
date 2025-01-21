import {
  weightSchema,
  baseWeightSchema,
  googleLoadOptionsWeightSchema,
  regularWeightSchema,
  italicWeightSchema,
} from "./weights.font.schema.js";

describe("Weight Schemas", () => {
  describe("weightSchema", () => {
    it("should validate valid weight values", () => {
      const validWeights = [
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        "Thin",
        "Extra Light",
        "Light",
        "Normal",
        "Medium",
        "Semi Bold",
        "Bold",
        "Extra Bold",
        "Black",
      ];

      validWeights.forEach((weight) => {
        const result = weightSchema.safeParse(weight);
        expect(result.success).toBe(true);
        expect(result.data).toBe(weight);
      });
    });

    it("should reject invalid weight values", () => {
      const invalidWeights = [50, 1000, "Invalid", null, {}, []];

      invalidWeights.forEach((weight) => {
        const result = weightSchema.safeParse(weight);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("baseWeightSchema", () => {
    it("should validate valid base weight values", () => {
      const validBaseWeights = [
        "allSupportedWeights",
        100,
        300,
        "Bold",
        ["Thin", 400, "Medium"],
        { min: 300, max: 800 },
      ];

      validBaseWeights.forEach((baseWeight) => {
        const result = baseWeightSchema.safeParse(baseWeight);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(baseWeight);
      });
    });

    it("should reject invalid base weight values", () => {
      const invalidBaseWeights = [
        "unsupportedWeight",
        { min: 800, max: 300 }, // Invalid because max < min
        { min: "Bold", max: 200 },
        ["Invalid", 1000],
        [],
        null,
      ];

      invalidBaseWeights.forEach((baseWeight) => {
        const result = baseWeightSchema.safeParse(baseWeight);
        expect(result.success).toBe(false);
      });
    });

    it("should check min < max when object provided, converting string weights if needed", () => {
      const validObjectWeights = [
        { min: 300, max: 800 },
        { min: 300, max: "Bold" },
        { min: "Extra Light", max: 300 },
        { min: "Extra Light", max: "Bold" },
      ];

      const invalidObjectWeights = [
        { max: 300, min: 800 },
        { max: 300, min: "Bold" },
        { max: "Extra Light", min: 300 },
        { max: "Extra Light", min: "Bold" },
      ];

      validObjectWeights.forEach((objectWeight) => {
        const result = baseWeightSchema.safeParse(objectWeight);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(objectWeight);
      });

      invalidObjectWeights.forEach((objectWeight) => {
        const result = baseWeightSchema.safeParse(objectWeight);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("googleLoadOptionsWeightSchema", () => {
    it("should validate valid Google load options", () => {
      const validGoogleLoadOptions = [
        true,
        false,
        { italic: 400 },
        { regular: [100, "Bold"] },
        { italic: ["Thin"], regular: ["Medium"] },
        { italic: undefined, regular: [300, 200] },
      ];

      validGoogleLoadOptions.forEach((option) => {
        const result = googleLoadOptionsWeightSchema.safeParse(option);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(option);
      });
    });

    it("should reject invalid Google load options", () => {
      const invalidGoogleLoadOptions = [
        { italic: null, regular: null },
        { other: 400 },
        null,
        {},
        { italic: [], regular: [] },
        { italic: undefined, regular: undefined },
      ];

      invalidGoogleLoadOptions.forEach((option) => {
        const result = googleLoadOptionsWeightSchema.safeParse(option);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("regularWeightSchema", () => {
    it("should validate valid regular weight values", () => {
      const validRegularWeights = [
        "allSupportedWeights",
        "variable",
        [100, 300, "Medium"],
        ["allSupportedWeights", "variable"],
      ];

      validRegularWeights.forEach((weight) => {
        const result = regularWeightSchema.safeParse(weight);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(weight);
      });
    });

    it("should reject invalid regular weight values", () => {
      const invalidRegularWeights = [
        "unsupportedWeight",
        { min: 900, max: 200 },
        null,
        ["variable", 1000],
      ];

      invalidRegularWeights.forEach((weight) => {
        const result = regularWeightSchema.safeParse(weight);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("italicWeightSchema", () => {
    it("should validate valid italic weight values", () => {
      const validItalicWeights = [
        true,
        false,
        "allSupportedWeights",
        [100, 400, "Thin"],
        { min: 200, max: 700 },
      ];

      validItalicWeights.forEach((italicWeight) => {
        const result = italicWeightSchema.safeParse(italicWeight);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(italicWeight);
      });
    });

    it("should reject invalid italic weight values", () => {
      const invalidItalicWeights = [
        "unsupportedWeight",
        { min: 800, max: 300 },
        null,
        ["unsupportedWeight"],
      ];

      invalidItalicWeights.forEach((italicWeight) => {
        const result = italicWeightSchema.safeParse(italicWeight);
        expect(result.success).toBe(false);
      });
    });
  });
});
