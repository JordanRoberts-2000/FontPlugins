import { describe, it, expect } from "vitest";
import { FontsMetadataSchema } from "./fontMetaData.schema.js";

describe("FontsMetadataSchema", () => {
  it("should validate and transform the font metadata correctly", () => {
    const input = {
      familyMetadataList: [
        {
          family: "Roboto",
          subsets: ["latin", "cyrillic"],
          fonts: {
            "400": {},
            "700": {},
            "400i": {},
            "700i": {},
          },
          axes: [{ tag: "wght" }, { tag: "ital" }],
          ignoreField: "ignore",
        },
      ],
    };

    const result = FontsMetadataSchema.parse(input);

    expect(result).toEqual({
      familyMetadataList: [
        {
          family: "Roboto",
          subsets: ["latin", "cyrillic"],
          weights: {
            roman: [400, 700],
            italic: [400, 700],
          },
          axes: ["wght", "ital"],
        },
      ],
    });
  });
});
