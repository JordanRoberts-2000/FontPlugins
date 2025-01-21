import { SUBSETS_OPTIONS } from "../../../../shared/constants.js";

export const FONTS_BUILD_FOLDER_NAME = "__google_fonts";
export const CSS_BUILD_FILE_NAME = "fonts.css";

export const LOGGER_PREFIX = "[@strawr/vite-font-plugin] - ";

export const SUBSET_FALLBACK_ARRAY = [
  "latin",
  "latin-ext",
  "cyrillic",
  "greek",
  "greek-ext",
  "vietnamese",
  "cyrillic-ext",
  "hebrew",
  "arabic",
  "devanagari",
] as [(typeof SUBSETS_OPTIONS)[number], ...(typeof SUBSETS_OPTIONS)[number][]];

export const DEFAULT_SERIF_FONT = {
  name: "timesNewRoman",
  xAvgCharWidth: 821,
  azAvgWidth: 854.3953488372093,
  unitsPerEm: 2048,
};
export const DEFAULT_SANS_SERIF_FONT = {
  name: "arial",
  xAvgCharWidth: 904,
  azAvgWidth: 934.5116279069767,
  unitsPerEm: 2048,
};
