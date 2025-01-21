import defaultSettings from "../../config/defaultSettings.js";
import Logger from "../../utils/logger.js";
import { settingsSchema, GlobalSettings } from "./settings.schema.js";

vi.mock("../../utils/logger.js", () => ({
  default: {
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe("settingsSchema", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("validates correct input", () => {
    const { data, success } = settingsSchema.safeParse(defaultSettings);

    expect(success).toBe(true);
    expect(data).toEqual(defaultSettings);
  });

  it("provides fallbacks for optional fields", () => {
    const input: GlobalSettings = {
      display: "block",
      preload: true,
      google: {
        disable: true,
      },
      local: {
        optimize: {
          enabled: false,
        },
      },
    };

    const { data, success } = settingsSchema.safeParse(input);

    expect(success).toBe(true);

    expect(data?.display).toBe("block");
    expect(data?.local.optimize.enabled).toBe(false);

    expect(data?.subset).toBe(defaultSettings.subset);
    expect(data?.css.method).toBe(defaultSettings.css?.method);
  });

  it("removes any duplicates from settings.google.fallbackSubsets", () => {
    const input: GlobalSettings = {
      display: "block",
      preload: true,
      google: {
        disable: true,
        fallbackSubsets: ["latin", "latin", "latin-ext"],
      },
      local: {
        optimize: {
          enabled: false,
        },
      },
    };

    const { data, success } = settingsSchema.safeParse(input);

    expect(success).toBe(true);
    expect(data?.google.fallbackSubsets).toEqual(["latin", "latin-ext"]);
    expect(Logger.warn).toBeCalled();
  });

  it("fallbacks to defaults and logs an error if any invalid field is given", () => {
    const input = {
      display: "block",
      preload: 53,
      google: {
        disable: true,
        fallbackSubsets: ["latin", "latin", "latin-ext"],
      },
      local: {
        optimize: {
          enabled: false,
        },
      },
    };

    const { data, success } = settingsSchema.safeParse(input);

    expect(success).toBe(true);
    expect(data?.preload).toEqual(defaultSettings.preload);
    expect(Logger.error).toBeCalled();
  });

  it("fallbacks to default settings if settings is not provided", () => {
    const { data, success } = settingsSchema.safeParse(undefined);
    expect(success).toBe(true);
    expect(data).toEqual(defaultSettings);
  });

  it("fallbacks to default settings if settings is invalid", () => {
    const { data, success } = settingsSchema.safeParse(43);
    expect(success).toBe(true);
    expect(data).toEqual(defaultSettings);
    expect(Logger.error).toHaveBeenCalled();
  });
});
