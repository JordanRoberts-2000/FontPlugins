import { describe, it, expect } from "vitest";
import { localFontSchema } from "./local.font.schema.js";

describe("localFontSchema", () => {
  it("should pass with valid input", () => {
    const input = {
      name: "Open Sans",
      preload: true,
      defer: false,
      unicodeRange: "U+0000-00FF",
      optimize: {
        enabled: true,
        extractUnicodeRange: true,
        trimUnusedWeightsAndStyles: true,
        convertToWoff2: true,
      },
      src: [
        {
          src: "font.woff2",
          weight: 400,
          italic: false,
          preload: true,
          display: "swap",
          axes: {
            wght: [100, 900],
            wdth: [75, 125],
          },
        },
      ],
    };

    const { success, data } = localFontSchema.safeParse(input);
    expect(success).toBe(true);
    expect(data).toEqual(input);
  });

  it("should fail if name is missing", () => {
    const input = {
      preload: true,
      defer: false,
      unicodeRange: "U+0000-00FF",
      src: [
        {
          src: "font.woff2",
          weight: 400,
        },
      ],
    };

    const result = localFontSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["name"]);
    expect(result.error?.issues[0].message).toBe("Required");
  });

  it("should fail if src is missing or empty", () => {
    const input = {
      name: "Open Sans",
      preload: true,
      defer: false,
      unicodeRange: "U+0000-00FF",
    };

    const result = localFontSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["src"]);
    expect(result.error?.issues[0].message).toBe("Required");
  });

  it("should fail if optimize does not match the schema", () => {
    const input = {
      name: "Open Sans",
      preload: true,
      defer: false,
      unicodeRange: "U+0000-00FF",
      optimize: {
        enabled: true,
        invalidField: true, // Invalid field
      },
      src: [
        {
          src: "font.woff2",
          weight: 400,
        },
      ],
    };

    const result = localFontSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should fail if unicodeRange is empty", () => {
    const input = {
      name: "Open Sans",
      preload: true,
      defer: false,
      unicodeRange: "",
      src: [
        {
          src: "font.woff2",
          weight: 400,
        },
      ],
    };

    const result = localFontSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["unicodeRange"]);
  });

  it("should fail if src elements are invalid", () => {
    const input = {
      name: "Open Sans",
      src: [
        {
          src: "font.woff2",
          weight: 1000, // Invalid weight
        },
      ],
    };

    const result = localFontSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["src", 0, "weight"]);
  });
});
