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

export default async function attemptFetch<T extends AttemptFetchOptions>({
  url,
  options = { method: "GET" },
  parse,
  retries = 3,
  delay = 1000,
  errorPrefix,
}: T): Promise<AttemptFetchReturnType<T>> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch, status: ${response.status} ${response.statusText}`,
        );
      }

      if (parse) {
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
            }Failed to parse '${url}' to ${parse}, Error: ${parseError}`,
          );
        }
      }

      return response as AttemptFetchReturnType<T>;
    } catch (fetchError) {
      attempt++;
      if (attempt >= retries) {
        throw new Error(
          `${
            errorPrefix ? `${errorPrefix} ` : ""
          }Failed to fetch '${url}' after ${retries} attempts: ${fetchError}`,
        );
      }
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
