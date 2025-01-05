import fetchFontMetaData from "../../utils/fetchFontMetaData.js";
import attemptFetch from "../../utils/attemptFetch.js";
import type { Mock } from "vitest";
import { prefix } from "../../utils/constants.js";

vi.mock("../../utils/attemptFetch.js");

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
          subsets: ["latin", "cyrillic"],
          fonts: {
            regular: { weight: 400 },
            bold: { weight: 700 },
          },
          axes: [{ tag: "wght" }, { tag: "ital" }],
          isOpenSource: true,
        },
      ],
    };

    (attemptFetch as Mock).mockResolvedValue(mockResponse);

    const result = await fetchFontMetaData(mockUrl);

    expect(attemptFetch).toHaveBeenCalledWith({
      url: mockUrl,
      parse: "JSON",
      retries: 3,
      errorPrefix: prefix,
    });

    expect(result).toEqual(mockResponse.familyMetadataList);
    expect(result[0].family).toBe("Roboto");
    expect(result[0].subsets).toEqual(["latin", "cyrillic"]);
  });

  it("should throw error when validation fails due to missing required field", async () => {
    const mockInvalidResponse = {
      familyMetadataList: [
        {
          // missing 'family' field
          subsets: ["latin"],
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
      `${prefix} Failed to validate fontsMetaDataJSON`
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
      `${prefix} Failed to validate fontsMetaDataJSON`
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
