import { z } from "zod";
import removeDuplicates from "./removeDuplicates.js";
import Logger from "../../utils/logger.js";

vi.mock("../../utils/logger", () => ({
  default: {
    warn: vi.fn(),
  },
}));

describe("removeDuplicates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("removes duplicates and logs a warning if has warn config", () => {
    const schema = removeDuplicates(z.array(z.number()), { warn: true });
    const result = schema.parse([1, 2, 2, 3, 3, 3]);

    expect(result).toEqual([1, 2, 3]);
    expect(Logger.warn).toHaveBeenCalledWith(
      "Removed duplicate values from root: 2, 3"
    );
  });

  it("removes duplicates silently if no warn config", () => {
    const schema = removeDuplicates(z.array(z.number()));
    const result = schema.parse([1, 2, 2, 3, 3, 3]);

    expect(result).toEqual([1, 2, 3]);
    expect(Logger.warn).not.toHaveBeenCalled();
  });

  it("does not log a warning if there are no duplicates", () => {
    const schema = removeDuplicates(z.array(z.number()), { warn: true });
    const result = schema.parse([1, 2, 3]);

    expect(result).toEqual([1, 2, 3]);
    expect(Logger.warn).not.toHaveBeenCalled();
  });

  it("handles an empty array", () => {
    const schema = removeDuplicates(z.array(z.number()), { warn: true });
    const result = schema.parse([]);

    expect(result).toEqual([]);
    expect(Logger.warn).not.toHaveBeenCalled();
  });
});
