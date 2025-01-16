import { z } from "zod";
import invalidFallback from "./invalidFallback.js";

vi.mock("../../utils/logger.js", () => ({
  default: {
    error: vi.fn(),
  },
}));

import Logger from "../../utils/logger.js";

describe("invalidFallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the default value when validation fails and logs an error", () => {
    const schema = z.number();
    const validatedSchema = invalidFallback(schema, "example.path", 42);

    const result = validatedSchema.parse("invalid");

    expect(result).toBe(42);
    expect(Logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "settings.example.path value 'invalid' is invalid, defaulting to 42. Error:"
      )
    );
  });

  it("does not log an error for valid input", () => {
    const schema = z.string();
    const validatedSchema = invalidFallback(schema, "example.path", "default");

    const result = validatedSchema.parse("valid");

    expect(result).toBe("valid");
    expect(Logger.error).not.toHaveBeenCalled();
  });

  it("returns the default value for undefined input and does not log an error", () => {
    const schema = z.string();
    const validatedSchema = invalidFallback(schema, "example.path", "default");

    const result = validatedSchema.parse(undefined);

    expect(result).toBe("default");
    expect(Logger.error).not.toHaveBeenCalled();
  });

  it("handles complex schemas", () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const defaultValue = { name: "John", age: 30 };
    const validatedSchema = invalidFallback(schema, "user.data", defaultValue);

    const result = validatedSchema.parse({ name: "John", age: "invalid" });
    expect(result).toEqual(defaultValue);
    expect(Logger.error).toHaveBeenCalled();
  });
});
