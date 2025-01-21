import { z } from "zod";
import applyDefaults from "./applyDefaults.js";
import Logger from "../../utils/logger.js";

vi.mock("../../utils/logger.js", () => ({
  default: {
    fatal: vi.fn((message) => {
      throw new Error(message);
    }),
    error: vi.fn(),
  },
}));

describe("applyDefaults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("applies defaults to a flat schema", () => {
    const schema = z.object({
      key1: z.string(),
      key2: z.number(),
    });

    const defaults = {
      key1: "default string",
      key2: 42,
    };

    const transformedSchema = applyDefaults(schema, defaults);

    const result = transformedSchema.parse({});
    expect(result).toEqual({ key1: "default string", key2: 42 });
  });

  it("applies defaults to a nested schema", () => {
    const schema = z.object({
      key1: z.string(),
      nested: z.object({
        key2: z.number(),
      }),
    });

    const defaults = {
      key1: "default string",
      nested: {
        key2: 42,
      },
    };

    const transformedSchema = applyDefaults(schema, defaults);

    const result = transformedSchema.parse({});
    expect(result).toEqual({ key1: "default string", nested: { key2: 42 } });
  });

  it("throws an error if a key is missing in defaults variable", () => {
    const schema = z.object({
      key1: z.string(),
      key2: z.number(),
    });

    const defaults = {
      key1: "default string",
    };

    expect(() => applyDefaults(schema, defaults)).toThrowError();
    expect(Logger.fatal).toHaveBeenCalled();
  });

  it("ignores any additional fields of defaults variable", () => {
    const schema = z.object({
      key1: z.string(),
    });

    const defaults = {
      key1: "default string",
      key2: 54,
    };

    const input = { key1: "oof" };

    const transformedSchema = applyDefaults(schema, defaults);
    const { success, data } = transformedSchema.safeParse(input);

    expect(success).toBe(true);
    expect(data).toEqual(input);
  });

  it("catches invalid values and applies defaults, logging an error", () => {
    const schema = z.object({
      key1: z.string(),
      key2: z.number(),
    });

    const defaults = {
      key1: "default string",
      key2: 42,
    };

    const transformedSchema = applyDefaults(schema, defaults);

    const result = transformedSchema.parse({ key1: "valid", key2: "invalid" });
    expect(result).toEqual({ key1: "valid", key2: 42 });
    expect(Logger.error).toHaveBeenCalled();
  });
});
