import generateFontStatsJson from "./jsonFontStats.generate.js";
import fs from "fs/promises";
import { join } from "path";
import formatDate from "../../formatDate.js";
import type { FontData } from "../../fontMetaData/fontMetaData.schema.js";

vi.mock("fs/promises");
vi.mock("../../formatDate");
vi.mock("../../../processGoogleFonts.js", () => ({
  scriptPrefix: "[Mocked Script Prefix]",
}));

describe("generateFontStatsJson", () => {
  const mockFontData: FontData = [
    {
      family: "Roboto",
      subsets: ["latin", "cyrillic"],
      axes: ["wght", "ital"],
      weights: { italic: [100], roman: [400] },
    },
    {
      family: "Open Sans",
      subsets: ["latin", "greek"],
      axes: [],
      weights: { italic: [100], roman: [400] },
    },
    {
      family: "Noto Sans",
      subsets: ["latin"],
      axes: ["wght"],
      weights: { italic: [100], roman: [400] },
    },
  ];

  const mockDate = "2024-01-21";
  const mockFolderPaths = ["path1", "path2"];

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(formatDate).mockReturnValue(mockDate);
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
  });

  it("should generate correct stats from font data", async () => {
    await generateFontStatsJson(mockFontData, mockFolderPaths);

    const expectedJson = {
      metadata: {
        generatedOn: mockDate,
        description:
          "This file contains stats on fontData from 'https://fonts.google.com/metadata/fonts'",
      },
      stats: {
        numberOfGoogleFonts: 3,
        numberOfVariableFonts: 2,
        subsets: ["cyrillic", "greek", "latin"].sort(),
        axes: ["ital", "wght"].sort(),
      },
    };

    mockFolderPaths.forEach((path) => {
      expect(fs.writeFile).toHaveBeenCalledWith(
        join(path, "googleFontStats.json"),
        JSON.stringify(expectedJson, null, 2)
      );
    });

    expect(fs.writeFile).toHaveBeenCalledTimes(mockFolderPaths.length);
  });

  it("should handle empty font data", async () => {
    await generateFontStatsJson([], mockFolderPaths);

    const expectedJson = {
      metadata: {
        generatedOn: mockDate,
        description:
          "This file contains stats on fontData from 'https://fonts.google.com/metadata/fonts'",
      },
      stats: {
        numberOfGoogleFonts: 0,
        numberOfVariableFonts: 0,
        subsets: [],
        axes: [],
      },
    };

    expect(fs.writeFile).toHaveBeenCalledWith(
      join(mockFolderPaths[0], "googleFontStats.json"),
      JSON.stringify(expectedJson, null, 2)
    );
  });

  it("should handle empty folder paths array", async () => {
    await generateFontStatsJson(mockFontData, []);
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it("should throw error when file writing fails", async () => {
    const mockError = new Error("Write failed");
    vi.mocked(fs.writeFile).mockRejectedValue(mockError);

    await expect(
      generateFontStatsJson(mockFontData, mockFolderPaths)
    ).rejects.toThrow(/Error creating 'googleFontStats.json'/);
  });

  it("should handle multiple folder paths correctly", async () => {
    const multiplePaths = ["path1", "path2", "path3"];
    await generateFontStatsJson(mockFontData, multiplePaths);

    expect(fs.writeFile).toHaveBeenCalledTimes(multiplePaths.length);
    multiplePaths.forEach((path) => {
      expect(fs.writeFile).toHaveBeenCalledWith(
        join(path, "googleFontStats.json"),
        expect.any(String)
      );
    });
  });

  it("should deduplicate subsets and axes", async () => {
    const duplicateData: FontData = [
      {
        family: "Font1",
        subsets: ["latin", "latin", "cyrillic"],
        axes: ["wght", "wght", "ital"],
        weights: { italic: [100], roman: [400] },
      },
      {
        family: "Font2",
        subsets: ["latin", "cyrillic"],
        axes: ["wght", "ital"],
        weights: { italic: [100], roman: [400] },
      },
    ];

    await generateFontStatsJson(duplicateData, mockFolderPaths);

    const expectedJson = {
      metadata: {
        generatedOn: mockDate,
        description:
          "This file contains stats on fontData from 'https://fonts.google.com/metadata/fonts'",
      },
      stats: {
        numberOfGoogleFonts: 2,
        numberOfVariableFonts: 2,
        subsets: ["cyrillic", "latin"],
        axes: ["ital", "wght"],
      },
    };

    expect(fs.writeFile).toHaveBeenCalledWith(
      join(mockFolderPaths[0], "googleFontStats.json"),
      JSON.stringify(expectedJson, null, 2)
    );
  });
});
