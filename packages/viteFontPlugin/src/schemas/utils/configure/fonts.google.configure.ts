import {
  DisplayOptions,
  SubsetOptions,
} from "../../../types/pluginConfigType.js";
import {
  GoogleFont,
  GoogleFonts,
} from "../../fonts/google/google.font.schema.js";
import { GlobalSettings } from "../../settings/settings.schema.js";
import configureGoogleSubset from "./subsets.google.configure.js";

type ConfiguredGoogleFont = {
  display: DisplayOptions;
  subset: SubsetOptions[];
};

export default function configureGoogleFonts(
  googleFonts: GoogleFonts,
  settings: GlobalSettings
) {
  if (!googleFonts) return [];

  const configuredGoogleFonts = googleFonts.map((googleFont) => {
    if (typeof googleFont === "string") {
      // const configuredGoogleFont: ConfiguredGoogleFont = {
      //   display:
      //     settings.google.display ?? settings.display,
      //   subset: configureGoogleSubset(googleFont, settings),
      // };

      return googleFont;
    }

    const configuredGoogleFont: ConfiguredGoogleFont = {
      display:
        googleFont?.display ?? settings.google.display ?? settings.display,
      subset: configureGoogleSubset(googleFont, settings),
    };
  });
}
