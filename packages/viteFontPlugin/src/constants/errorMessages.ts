const ERRORS = {
  zod: {
    ensureDefault: (
      value: string,
      path: string[],
      defaultVal: String,
      err: string
    ) =>
      `Value '${value}' from ${
        path.length > 0 ? path.join(".") : "root"
      } is invalid. Defaulting to '${defaultVal}'. Error: ${err}`,

    removeDuplicates: (path: string[], duplicates: any[]) =>
      `Removed duplicate values from ${
        path.length > 0 ? path.join(".") : "root"
      }: ${duplicates.join(", ")}`,

    fontInvalid: (font: string, error: string) =>
      `Font '${font}' has invalid configuration, Error: ${error}`,
  },
};

export default ERRORS;
