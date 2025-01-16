export const FONTS_BUILD_FOLDER_NAME = "__google_fonts";
export const CSS_BUILD_FILE_NAME = "fonts.css";

export const LOGGER_PREFIX = "[@strawr/vite-font-plugin] - ";

export const CSS_METHOD_OPTIONS = ["inlineHead", "externalBuildFiles"] as const;

export const SUBSET_PRIORITY_ARRAY = [
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
// This type means: at least one element of the enum type, followed by any number of additional elements

export const CONFIG_DEFAULT_SETTINGS = {
  suppressNotOpenSourceWarnings: false,
  preconnect: {
    google: true,
    custom: false as const,
  },
  subsetPriority: SUBSET_PRIORITY_ARRAY,
  defaultPreload: false,
  defaultDisplay: "swap" as const,
  convertToWoff2ByDefault: true,
  optimizeByDefault: true,
  adjustedFallbackByDefault: true,
  includeItalicsByDefault: true,
  selfHostByDefault: true,
  plugin: {
    disable: false,
    css: {
      method: "inlineHead" as (typeof CSS_METHOD_OPTIONS)[number],
      minify: true,
    },
    fontFiles: {
      optimise: true,
      convertToWoff2: true,
    },
  },
  script: {
    css: {
      disable: false,
      minify: false,
      outputPath: ".",
    },
    fontFiles: {
      disable: false,
      outputPath: ".",
    },
  },
};

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

export const DISPLAY_OPTIONS = [
  "auto",
  "block",
  "swap",
  "fallback",
  "optional",
] as const;

export const AXES_OPTIONS = ["wght", "ital", "slnt", "opsz", "wdth"] as const;

export const SUBSETS_OPTIONS = [
  "latin",
  "latin-ext",
  "cyrillic",
  "cyrillic-ext",
  "greek",
  "greek-ext",
  "vietnamese",
  "hebrew",
  "arabic",
  "devanagari",
  "thai",
  "bengali",
  "tamil",
  "telugu",
  "kannada",
  "gujarati",
  "khmer",
  "sinhala",
  "oriya",
  "malayalam",
  "gurmukhi",
  "japanese",
  "korean",
  "chinese-simplified",
  "chinese-traditional",
] as const;
