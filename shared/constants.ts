export const CSS_METHODS = ["inlineHead", "externalBuildFiles"] as const;

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

export const ignoredSubsets = [
  "menu",
  "japanese",
  "korean",
  "chinese-simplified",
  "chinese-hongkong",
  "chinese-traditional",
];
