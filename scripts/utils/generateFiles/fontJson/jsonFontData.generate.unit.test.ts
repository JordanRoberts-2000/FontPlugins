import generateFontDataJson from "./jsonFontData.generate.js";
import fs from "fs/promises";
import { join } from "path";
import formatDate from "../../formatDate.js";
import type { FontData } from "../../fontMetaData/fontMetaData.schema.js";

vi.mock("fs/promises");
vi.mock("../../formatDate");
vi.mock("../../../processGoogleFonts.js", () => ({
  scriptPrefix: "[Mocked Script Prefix]",
}));

describe("generateFontDataJson", () => {
  const mockFontData: FontData = [
    {
      family: "Roboto",
      subsets: ["latin", "cyrillic"],
      axes: ["wght", "ital"],
      weights: { italic: [100], roman: [400] },
    },
    {
      family: "Open Sans",
      subsets: ["latin"],
      axes: [],
      weights: { italic: [200], roman: [300] },
    },
  ];

  const mockDate = "2024-01-21";
  const mockFolderPaths = ["path1", "path2"];

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(formatDate).mockReturnValue(mockDate);
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
  });

  it("should generate font data JSON files in specified folders", async () => {
    await generateFontDataJson(mockFontData, mockFolderPaths);

    const expectedJson = {
      metadata: {
        generatedOn: mockDate,
        description:
          "This file contains modified json fontData from 'https://fonts.google.com/metadata/fonts'",
      },
      fonts: mockFontData,
    };

    mockFolderPaths.forEach((path) => {
      expect(fs.writeFile).toHaveBeenCalledWith(
        join(path, "googleFontData.json"),
        JSON.stringify(expectedJson, null, 2)
      );
    });

    expect(fs.writeFile).toHaveBeenCalledTimes(mockFolderPaths.length);
  });

  it("should handle empty font data", async () => {
    await generateFontDataJson([], mockFolderPaths);

    const expectedJson = {
      metadata: {
        generatedOn: mockDate,
        description:
          "This file contains modified json fontData from 'https://fonts.google.com/metadata/fonts'",
      },
      fonts: [],
    };

    expect(fs.writeFile).toHaveBeenCalledWith(
      join(mockFolderPaths[0], "googleFontData.json"),
      JSON.stringify(expectedJson, null, 2)
    );
  });

  it("should handle empty folder paths array", async () => {
    await generateFontDataJson(mockFontData, []);
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it("should throw error when file writing fails", async () => {
    const mockError = new Error("Write failed");
    vi.mocked(fs.writeFile).mockRejectedValue(mockError);

    await expect(
      generateFontDataJson(mockFontData, mockFolderPaths)
    ).rejects.toThrow(/Error creating 'googleFontData.json'/);
  });

  it("should handle multiple folder paths correctly", async () => {
    const multiplePaths = ["path1", "path2", "path3"];
    await generateFontDataJson(mockFontData, multiplePaths);

    expect(fs.writeFile).toHaveBeenCalledTimes(multiplePaths.length);
    multiplePaths.forEach((path) => {
      expect(fs.writeFile).toHaveBeenCalledWith(
        join(path, "googleFontData.json"),
        expect.any(String)
      );
    });
  });
});
