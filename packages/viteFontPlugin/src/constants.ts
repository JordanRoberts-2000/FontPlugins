export const FONTS_BUILD_FOLDER_NAME = "__google_fonts";
export const CSS_BUILD_FILE_NAME = "fonts.css";

export const LOGGER_PREFIX = "[@strawr/vite-font-plugin] - ";

export const DISPLAY_OPTIONS = [
  "auto",
  "block",
  "swap",
  "fallback",
  "optional",
] as const;

export const DEFAULT_CONFIG = {
  suppressNotOpenSourceWarnings: false,
  selfHost: true,
  handleCss: "inlineHead" as const,
  includeItalicsByDefault: true,
  defaultModifiedFallback: true,
  defaultPreload: false,
  defaultDisplay: "swap" as const,
};

export const SUBSET_PRIORITY_ARRAY = [
  "Latin",
  "Latin-Ext",
  "Cyrillic",
  "Greek",
  "Greek-Ext",
  "Vietnamese",
  "Cyrillic-Ext",
  "Hebrew",
  "Arabic",
  "Devanagari",
];

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
