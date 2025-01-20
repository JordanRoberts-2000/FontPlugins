import fetchFontMetaData from "./utils/fetchFontMetaData.js";
import generateFontDataJson from "./utils/generateFile/generateFontDataJson.js";
import generateFontDataMap from "./utils/generateFile/generateFontDataMap.js";
import generatePluginConfigType from "./utils/generateFile/generatePluginTypes/index.js";

export const scriptPrefix = "[Script - GeneratePluginConfigType]";

const googleFontsMetaDataUrl = "https://fonts.google.com/metadata/fonts";

const fontData = await fetchFontMetaData(googleFontsMetaDataUrl);

await generateFontDataJson(fontData, ["data"]);

await generateFontDataMap(fontData, [
  "data",
  // "packages/viteFontPlugin/src/utils",
]);

await generatePluginConfigType(fontData, [
  "data",
  // "packages/viteFontPlugin/src/types",
]);

console.log(
  `${scriptPrefix} Processed GoogleFont Url, updated font data successfully`
);
