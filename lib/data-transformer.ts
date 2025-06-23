export class DataTransformers {
  static objectToFormData(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: Record<string, any>,
    formData = new FormData(),
    parentKey = ""
  ): FormData {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const value = obj[key];
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      if (!value) continue;

      if (value instanceof Date) {
        formData.append(fullKey, value.toISOString());
      } else if (value instanceof File) {
        formData.append(fullKey, value);
      } else if (typeof value === "object" && value !== null) {
        this.objectToFormData(value, formData, fullKey);
      } else {
        formData.append(fullKey, value);
      }
    }
    return formData;
  }
}
