export function processArrayableValue(value: any, defaultValue: any): string[] {
  return value
    ? value.map((id: any) =>
        typeof id === "string" ? id : String(JSON.stringify([id])),
      )
    : defaultValue;
}
