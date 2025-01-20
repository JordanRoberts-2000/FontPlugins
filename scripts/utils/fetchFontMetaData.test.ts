import fetchFontMetaData from "./fetchFontMetaData.js";
import attemptFetch from "../../shared/utils/attemptFetch.js";
import type { Mock } from "vitest";
import { scriptPrefix } from "../processGoogleFonts.js";

vi.mock("../../shared/utils/attemptFetch.js");

describe("fetchFontMetaData", () => {
  const mockUrl = "https://example.com/fonts";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully fetch and validate font metadata", async () => {
    const mockResponse = {
      familyMetadataList: [
        {
          family: "Roboto",
          subsets: ["latin", "menu", "cyrillic"],
          fonts: {
            "400": {},
            "700i": {},
          },
          axes: [{ tag: "wght" }, { tag: "ital" }],
          isOpenSource: true,
        },
      ],
    };

    const expectedResult = [
      {
        family: "Roboto",
        subsets: ["latin", "cyrillic"],
        weights: {
          roman: [400],
          italic: [700],
        },
        axes: ["wght", "ital"],
        isOpenSource: true,
      },
    ];

    (attemptFetch as Mock).mockResolvedValue(mockResponse);

    const result = await fetchFontMetaData(mockUrl);

    expect(attemptFetch).toHaveBeenCalledWith({
      url: mockUrl,
      parse: "JSON",
      retries: 3,
      errorPrefix: scriptPrefix,
    });

    expect(result).toEqual(expectedResult);
    expect(result[0].family).toBe("Roboto");
    expect(result[0].subsets).toEqual(["latin", "cyrillic"]);
    expect(result[0].weights).toEqual({
      roman: [400],
      italic: [700],
    });
    expect(result[0].axes).toEqual(["wght", "ital"]);
    expect(result[0].isOpenSource).toBe(true);
  });

  it("should throw error when validation fails due to missing required field", async () => {
    const mockInvalidResponse = {
      familyMetadataList: [
        {
          // missing 'family' field
          subsets: ["latin"],
          weights: {},
          axes: [{ tag: "wght" }],
          isOpenSource: true,
        },
      ],
    };

    (attemptFetch as Mock).mockResolvedValue(mockInvalidResponse);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(fetchFontMetaData(mockUrl)).rejects.toThrow(
      `${scriptPrefix} Failed to validate fontsMetaDataJSON`
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should throw error when validation fails due to wrong field type", async () => {
    const mockInvalidResponse = {
      familyMetadataList: [
        {
          family: "Roboto",
          subsets: "latin", // should be an array
          fonts: {},
          axes: [{ tag: "wght" }],
          isOpenSource: true,
        },
      ],
    };

    (attemptFetch as Mock).mockResolvedValue(mockInvalidResponse);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(fetchFontMetaData(mockUrl)).rejects.toThrow(
      `${scriptPrefix} Failed to validate fontsMetaDataJSON`
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should throw error when `attemptFetch` fails", async () => {
    // Mock fetch failure
    (attemptFetch as Mock).mockRejectedValue(new Error("Network error"));

    await expect(fetchFontMetaData(mockUrl)).rejects.toThrow("Network error");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
