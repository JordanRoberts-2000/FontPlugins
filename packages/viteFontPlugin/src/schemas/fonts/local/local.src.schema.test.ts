import { describe, it, expect } from "vitest";
import { localSrcSchema } from "./local.src.schema.js";

describe("localSrcSchema", () => {
  it("should pass with valid input including axes", () => {
    const input = {
      src: "font.woff2",
      weight: 400,
      italic: true,
      preload: true,
      defer: false,
      display: "swap",
      axes: {
        wght: [100, 900],
        slnt: [-10, 0],
      },
    };

    const { success, data } = localSrcSchema.safeParse(input);
    expect(success).toBe(true);
    expect(data).toEqual(input);
  });

  it("should fail if axes object is provided but empty", () => {
    const input = {
      src: "font.woff2",
      weight: 400,
      axes: {},
    };

    const result = localSrcSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "At least one axis field (wght, wdth, ital, slnt, or opsz) must be provided"
    );
  });

  it("should pass without axes object", () => {
    const input = {
      src: "font.woff2",
      weight: 400,
    };

    const { success, data } = localSrcSchema.safeParse(input);
    expect(success).toBe(true);
    expect(data).toEqual(input);
  });

  it("should fail if src is missing", () => {
    const input = {
      weight: 400,
      italic: true,
    };

    const result = localSrcSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Required");
  });

  it("should fail if weight is invalid", () => {
    const input = {
      src: "font.woff2",
      weight: 1000, // Invalid weight
    };

    const result = localSrcSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});
