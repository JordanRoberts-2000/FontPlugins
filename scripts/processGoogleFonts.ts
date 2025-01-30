import attemptFetch from "../shared/utils/attemptFetch.js";
import parseFontMetaData from "./utils/fontMetaData/fontMetaData.parse.js";
import generateFontDataJson from "./utils/generateFiles/fontJson/jsonFontData.generate.js";
import generateFontDataMap from "./utils/generateFiles/fontMap/fontDataMap.generate.js";
import generateFontStatsJson from "./utils/generateFiles/fontJson/jsonFontStats.generate.js";
import generatePluginConfigType from "./utils/generateFiles/fontTypes/pluginType.generate.js";
import generateZodSchema from "./utils/generateFiles/fontSchema/googleFonts.generate.schema.js";

export const scriptPrefix = "[Script - GeneratePluginConfigType]";

const googleFontsMetaDataUrl = "https://fonts.google.com/metadata/fonts";

const fontsMetaDataJSON = await attemptFetch({
  url: googleFontsMetaDataUrl,
  parse: "JSON",
  retries: 3,
  errorPrefix: scriptPrefix,
});

const fontData = parseFontMetaData(fontsMetaDataJSON);

await generateZodSchema(fontData, [
  "packages/viteFontPlugin/src/schemas/fonts/google",
]);

await generateFontStatsJson(fontData, ["data"]);

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
