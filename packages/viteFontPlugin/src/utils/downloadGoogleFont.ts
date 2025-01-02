// const baseUrl = 'https://fonts.googleapis.com/css2?family=';
// const v = {display: "swap", fontName: "inter", weight: "400"};

// const url = `${baseUrl}${v.fontName}:wght@${v.weight}&display=${v.display}`

// const downloadGoogleFont = async (
//   url: string,
//   filePath: string,
//   subset: string | null
// ) => {
//   const res = await fetch(url, {
//     headers: {
//       "user-agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
//     },
//   });
//   const text = await res.text();

//   const urlPattern = /url\(([^)]+)\)/;
//   const unicodeRangeRegex = /unicode-range:\s*([^;]+);/;
//   if (subset === null) {
//     const match = text.match(urlPattern);
//     const match2 = text.match(unicodeRangeRegex);
//     const googleWoffUrl = match ? match[1] : null;
//     const unicodeRange = match2 ? match2[1] : null;
//     await downloadWoff2File(googleWoffUrl, filePath);
//     return unicodeRange;
//   } else {
//     const retrieveSubset = getFontSubset(text, subset);
//     const match = retrieveSubset.match(urlPattern);
//     const match2 = retrieveSubset.match(unicodeRangeRegex);
//     const googleWoffUrl = match ? match[1] : null;
//     const unicodeRange = match2 ? match2[1] : null;
//     await downloadWoff2File(googleWoffUrl, filePath);
//     return unicodeRange;
//   }
// };

// async function downloadWoff2File(url, filePath) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch url: ${url}`);
//   }
//   const fileStream = fs.createWriteStream(filePath);
//   await new Promise((resolve, reject) => {
//     // @ts-ignore
//     Readable.fromWeb(response.body).pipe(fileStream);
//     fileStream.on("error", reject);
//     fileStream.on("finish", resolve);
//   });
// }

// function getFontSubset(cssString: string, subset: string) {
//   const urlRegex = new RegExp(
//     `\\/\\*\\s*${subset}\\s*\\*\\/\\s*@font-face\\s*\\{[^}]*\\}`,
//     "g"
//   );
//   const urlMatch = cssString.match(urlRegex);
//   return urlMatch[0];
// }

// await downloadGoogleFont(url, "eggs", null);
// console.log("executed successfully")
