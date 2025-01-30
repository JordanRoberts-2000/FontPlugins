import { SubsetOptions } from "../../../types/pluginConfigType.js";
import { GoogleFont } from "../../fonts/google/google.font.schema.js";
import { GlobalSettings } from "../../settings/settings.schema.js";

export default function configureGoogleSubset(
  googleFont: Exclude<GoogleFont, string>,
  settings: GlobalSettings
): SubsetOptions[] {
  let subset = googleFont?.subsets ?? settings.google.subset ?? settings.subset;

  if (subset === "all") {
    // return all available google subsets from map
    // if still none, log a warning, the existing subsets and the one used, grab first()
  }

  if (typeof subset === "string") {
    // check if in google font map,
    // if not try settings.google.fallbackSubsets and fallback procedure, log a warning
    // return as array
    // if array is still empty throw an error
  }

  // if an array then check if all values are in google font map
  // remove any that arnt, if array is empty use fallback array
  // if no fallback array then use default fallback array

  return ["adlam"];
}
