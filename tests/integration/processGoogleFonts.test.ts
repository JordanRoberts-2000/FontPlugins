import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fetchFontMetaData from "../../utils/fetchFontMetaData.js";
import generateFontDataJson from "../../utils/generateFile/generateFontDataJson.js";
import generateFontDataMap from "../../utils/generateFile/generateFontDataMap.js";
import generatePluginConfigType from "../../utils/generateFile/generatePluginConfigType.js";
import { prefix } from "../../utils/constants.js";

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
    vi.mocked(generatePluginConfigType).mockResolvedValue();

    await import("../../scripts/processGoogleFonts.js");

    expect(fetchFontMetaData).toHaveBeenCalledWith(googleFontsMetaDataUrl);
    expect(generateFontDataJson).toHaveBeenCalledWith(mockFontData);
    expect(generateFontDataMap).toHaveBeenCalledWith(mockFontData);
    expect(generatePluginConfigType).toHaveBeenCalledWith(mockFontData);

    expect(logSpy).toHaveBeenCalledWith(
      `${prefix} Processed GoogleFont Url, updated font data successfully`
    );

    logSpy.mockRestore();
  });
});
