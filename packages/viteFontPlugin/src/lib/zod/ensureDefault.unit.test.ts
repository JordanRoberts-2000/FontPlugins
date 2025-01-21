import { describe, it, expect, beforeEach, vi } from "vitest";
import { z } from "zod";
import ensureDefault from "./ensureDefault.js";
import Logger from "../../utils/logger.js";

vi.mock("../../utils/logger.js", () => ({
  default: {
    error: vi.fn(),
  },
}));

describe("ensureDefault", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the valid input value when validation passes", () => {
    const schema = ensureDefault(z.string(), "default");
    const result = schema.parse("valid");
    expect(result).toBe("valid");
    expect(Logger.error).not.toHaveBeenCalled();
  });

  it("returns the default value and logs error when validation fails", () => {
    const schema = ensureDefault(z.number(), 42);
    const result = schema.parse("invalid" as any);

    expect(result).toBe(42);
    expect(Logger.error).toHaveBeenCalled();
  });

  it("returns the default value if undefined without invalidating", () => {
    const schema = ensureDefault(z.number(), 42);
    const { success, data } = schema.safeParse(undefined as any);

    expect(success).toBe(true);
    expect(data).toBe(42);
    expect(Logger.error).not.toHaveBeenCalled();
  });
});
