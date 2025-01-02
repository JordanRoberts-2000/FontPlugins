// import { entireMetricsCollection } from "@capsizecss/metrics/entireMetricsCollection";
// import {
//   DEFAULT_SANS_SERIF_FONT,
//   DEFAULT_SERIF_FONT,
// } from "../../constants.js";

// export default function generateFallbackCss(fontName: string): string {
//   const { ascent, descent, lineGap, fallbackFont, sizeAdjust } =
//     calculateSizeAdjustValues(fontName);

//   return `
//   @font-face {
//     font-family: "${fontName}_Fallback";
//     ascent-override: ${ascent}%;
//     descent-override: ${descent}%;
//     line-gap-override: ${lineGap}%;
//     size-adjust: ${sizeAdjust}%;
//     src: local("${fallbackFont}");
//   }
// `;
// }

// function formatOverrideValue(val: number) {
//   return Math.abs(val * 100).toFixed(2);
// }

// function isKey(attemptedKey: string): boolean {
//   const soup =
//     entireMetricsCollection[
//       attemptedKey as keyof typeof entireMetricsCollection
//     ];
//   return (
//     entireMetricsCollection[
//       attemptedKey as keyof typeof entireMetricsCollection
//     ] !== undefined
//   );
// }
// const attempt: keyof typeof entireMetricsCollection = "hoop";
// const value: string | null = entireMetricsCollection[attempt];

// function calculateSizeAdjustValues(fontName: string) {
//   const fontMetrics = capsizeFontsMetricsJson[fontName];
//   if (!fontMetrics) throw new Error("aaahhh");
//   let { category, ascent, descent, lineGap, unitsPerEm, xWidthAvg } =
//     fontMetrics;
//   const mainFontAvgWidth = xWidthAvg / unitsPerEm;
//   const fallbackFont =
//     category === "serif" ? DEFAULT_SERIF_FONT : DEFAULT_SANS_SERIF_FONT;

//   const fallbackFontMetrics = entireMetricsCollection[fallbackFont.name];
//   const fallbackFontAvgWidth =
//     fallbackFontMetrics.xWidthAvg / fallbackFontMetrics.unitsPerEm;
//   let sizeAdjust = xWidthAvg ? mainFontAvgWidth / fallbackFontAvgWidth : 1;
//   ascent = formatOverrideValue(ascent / (unitsPerEm * sizeAdjust));
//   descent = formatOverrideValue(descent / (unitsPerEm * sizeAdjust));
//   lineGap = formatOverrideValue(lineGap / (unitsPerEm * sizeAdjust));

//   return {
//     ascent,
//     descent,
//     lineGap,
//     fallbackFont: fallbackFont.name,
//     sizeAdjust: formatOverrideValue(sizeAdjust),
//   };
// }
