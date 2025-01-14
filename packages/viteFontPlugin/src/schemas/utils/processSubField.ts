export default function processSubField(
  fieldName: string,
  userInputField: string | string[] | undefined,
  fontDataField: string[]
) {
  if (Array.isArray(userInputField)) {
    const { validFields, invalidFields } = userInputField.reduce<{
      validFields: string[];
      invalidFields: string[];
    }>(
      (acc, field) => {
        if (fontDataField.includes(field)) {
          acc.validFields.push(field);
        } else {
          acc.invalidFields.push(field);
        }
        return acc;
      },
      { validFields: [], invalidFields: [] }
    );

    if (!validFields.length) {
      throw new Error(`No valid ${fieldName} provided.`);
    }

    if (invalidFields.length > 0) {
      console.warn(
        `Ignoring invalid ${fieldName}: ${invalidFields.join(", ")}`
      );
    }

    return validFields;
  }
  if (userInputField === "all") {
    return fontDataField;
  }
  if (typeof userInputField === "string") {
    if (fontDataField.includes(userInputField)) {
      return [userInputField];
    } else {
      throw Error(`Invalid ${fieldName}: ${userInputField}`);
    }
  }
  throw Error(`Invalid ${fieldName}: ${userInputField}`);
}
