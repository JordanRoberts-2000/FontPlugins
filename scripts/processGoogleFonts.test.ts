import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fetchFontMetaData from "./utils/fetchFontMetaData.js";
import generateFontDataJson from "./utils/generateFile/generateFontDataJson.js";
import generateFontDataMap from "./utils/generateFile/generateFontDataMap.js";
import { scriptPrefix } from "./processGoogleFonts.js";
import generatePluginTypes from "./utils/generateFile/generatePluginTypes/index.js";

vi.mock("../../utils/fetchFontMetaData.js");
vi.mock("../../utils/generateFile/generateFontDataJson.js");
vi.mock("../../utils/generateFile/generateFontDataMap.js");
vi.mock("../../utils/generateFile/generatePluginConfigType.js");

describe("Google Font Metadata Processing Script", () => {
  const googleFontsMetaDataUrl = "https://fonts.google.com/metadata/fonts";
  const mockFontData = [
    {
      family: "Roboto",
      subsets: ["latin", "cyrillic"],
      weights: {
        roman: [400, 700],
        italic: [400],
      },
      axes: ["wght", "ital"],
      isOpenSource: true,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should process Google Font metadata and generate files", async () => {
    const logSpy = vi.spyOn(console, "log");

    vi.mocked(fetchFontMetaData).mockResolvedValue(mockFontData);
    vi.mocked(generateFontDataJson).mockResolvedValue();
    vi.mocked(generateFontDataMap).mockResolvedValue();
    vi.mocked(generatePluginTypes).mockResolvedValue();

    await import("./processGoogleFonts.js");

    expect(fetchFontMetaData).toHaveBeenCalledWith(googleFontsMetaDataUrl);
    expect(generateFontDataJson).toHaveBeenCalledWith(mockFontData);
    expect(generateFontDataMap).toHaveBeenCalledWith(mockFontData);
    expect(generatePluginTypes).toHaveBeenCalledWith(mockFontData);

    expect(logSpy).toHaveBeenCalledWith(
      `${scriptPrefix} Processed GoogleFont Url, updated font data successfully`
    );

    logSpy.mockRestore();
  });
});
