import removeDuplicates from "./removeDuplicates.js";

vi.mock("../../utils/logger.js", () => ({
  default: {
    warn: vi.fn(),
  },
}));

import Logger from "../../utils/logger.js";

describe("removeDuplicates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("removes duplicates and logs a warning", () => {
    const arr = [1, 2, 2, 3, 3, 3];
    const result = removeDuplicates(arr, "testContext");
    expect(result).toEqual([1, 2, 3]);
    expect(Logger.warn).toHaveBeenCalled();
  });

  it("does not log a warning if there are no duplicates", () => {
    const arr = [1, 2, 3];
    const result = removeDuplicates(arr, "testContext");
    expect(result).toEqual([1, 2, 3]);
    expect(Logger.warn).not.toHaveBeenCalled();
  });

  it("handles an empty array", () => {
    const arr: number[] = [];
    const result = removeDuplicates(arr, "testContext");
    expect(result).toEqual([]);
    expect(Logger.warn).not.toHaveBeenCalled();
  });
});
