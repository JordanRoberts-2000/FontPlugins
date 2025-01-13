export default function validateField(
  field: string | string[] | undefined,
  field2: string[]
) {
  if (Array.isArray(field)) {
    const validFields = field.filter((el) => field2.includes(el));
    if (validFields.length === field.length) {
      return validFields;
    } else {
      const invalidFields = field.filter((el) => !field2.includes(el));
      throw Error(`Invalid fields: ${invalidFields.join(", ")}`);
    }
  }
  if (field === "all") {
    return field2;
  }
  if (typeof field === "string") {
    if (field2.includes(field)) {
      return [field];
    } else {
      throw Error(`Invalid ${field}`);
    }
  }
}
