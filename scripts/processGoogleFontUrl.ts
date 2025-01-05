import { prefix } from "../utils/constants.js";
import fetchFontMetaData from "../utils/fetchFontMetaData.js";
import generateFontDataJson from "../utils/generateFile/generateFontDataJson.js";
import generateFontDataMap from "../utils/generateFile/generateFontDataMap.js";
import generatePluginConfigType from "../utils/generateFile/generatePluginConfigType.js";

const googleFontsMetaDataUrl = "https://fonts.google.com/metadata/fonts";

const fontData = await fetchFontMetaData(googleFontsMetaDataUrl);

await generateFontDataJson(fontData);

await generateFontDataMap(fontData);

await generatePluginConfigType(fontData);

console.log(
  `${prefix} Processed GoogleFont Url, updated font data successfully`
);
