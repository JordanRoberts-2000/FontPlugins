import { CdnFonts } from "../../../../../../oldAstroPlugin/legacy/fonts/fonts.cdn.schema.js";
import { Settings } from "../../../../../../oldAstroPlugin/legacy/settings/settings.schema.js";

export function configureCdnFonts(cdnFonts: CdnFonts[], settings: Settings) {
  return cdnFonts.map((cdnFont) => ({
    ...cdnFont,
    preload: cdnFont.preload || settings.defaultPreload,
    display: cdnFont.display || settings.defaultDisplay,

    urls: cdnFont.urls.map((url) => ({
      ...url,
      display: url.display ?? cdnFont.display ?? settings.defaultDisplay,
      preload: url.preload ?? cdnFont.preload ?? settings.defaultPreload,
      defer: url.defer ?? cdnFont.defer,
    })),
  }));
}
