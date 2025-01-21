type AttemptFetchOptions = {
  url: string;
  options?: RequestInit;
  parse?: "JSON" | "text" | "blob" | "arrayBuffer" | "formData";
  retries?: number;
  delay?: number;
  errorPrefix?: string;
};

type AttemptFetchReturnType<T extends AttemptFetchOptions> =
  T["parse"] extends "JSON"
    ? JSON
    : T["parse"] extends "text"
    ? string
    : T["parse"] extends "blob"
    ? Blob
    : T["parse"] extends "arrayBuffer"
    ? ArrayBuffer
    : T["parse"] extends "formData"
    ? FormData
    : Response;
/**
 * @description A utility function for fetching data with retries and optional response parsing.
 * @throws Will throw an error if the fetch fails after all retries or if parsing fails.
 * 
 * @property {string} url - The URL to fetch.
 * @property {RequestInit} [options] - Fetch options, such as headers and method. Defaults to `{ method: "GET" }`.
 * @property {"JSON" | "text" | "blob" | "arrayBuffer" | "formData"} [parse] - The desired response parsing format.
 * @property {number} [retries=3] - Number of retry attempts in case of failure.
 * @property {number} [delay=1000] - Delay in milliseconds between retries.
 * @property {string} [errorPrefix] - Optional prefix for error messages.

 * @example
 * const data = await attemptFetch({
 *   url: "https://api.example.com/data",
 *   parse: "JSON",
 *   retries: 5,
 *   delay: 2000,
 * });
 */

export default async function attemptFetch<T extends AttemptFetchOptions>({
  url,
  options = { method: "GET" },
  parse,
  retries = 3,
  delay = 1000,
  errorPrefix,
}: T): Promise<AttemptFetchReturnType<T>> {
  let attempt = 0;
  let response: Response | null = null;

  // Attempt to fetch url
  while (attempt < retries) {
    try {
      response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch, status: ${response.status} ${response.statusText}`
        );
      }
      break;
    } catch (fetchError) {
      attempt++;
      if (attempt >= retries) {
        throw new Error(
          `${
            errorPrefix ? `${errorPrefix} ` : ""
          }Failed to fetch '${url}' after ${retries} attempts: ${fetchError}`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // If parse option provided attempt parse
  if (response && parse) {
    try {
      switch (parse) {
        case "JSON":
          return (await response.json()) as AttemptFetchReturnType<T>;
        case "text":
          return (await response.text()) as AttemptFetchReturnType<T>;
        case "blob":
          return (await response.blob()) as AttemptFetchReturnType<T>;
        case "arrayBuffer":
          return (await response.arrayBuffer()) as AttemptFetchReturnType<T>;
        case "formData":
          return (await response.formData()) as AttemptFetchReturnType<T>;
      }
    } catch (parseError) {
      throw new Error(
        `${
          errorPrefix ? `${errorPrefix} ` : ""
        }Failed to parse '${url}' to ${parse}, Error: ${parseError}`
      );
    }
  } else {
    return response as AttemptFetchReturnType<T>;
  }
}
