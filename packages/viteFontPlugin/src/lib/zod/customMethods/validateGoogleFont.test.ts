import { z } from "zod";
import validateGoogleFont from "./validateGoogleFont.js";

describe("validateGoogleFont", () => {
  const fontData = new Map([
    ["Roboto", {}],
    ["Open Sans", {}],
    ["Arial", {}],
  ]);

  const schema = validateGoogleFont(z.string(), fontData);

  it("should pass for a valid font-family", () => {
    const result = schema.safeParse("Roboto");
    expect(result.success).toBe(true);
    expect(result.data).toBe("Roboto");
  });

  it("should fail for an invalid font-family", () => {
    const result = schema.safeParse("InvalidFont");
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Invalid font-family: InvalidFont"
    );
  });
});
