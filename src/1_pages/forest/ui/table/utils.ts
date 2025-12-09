export function calculateTotalRow(data: any[]): Record<string, any> {
  if (!data || data.length === 0) return {};

  const totalRow: Record<string, any> = {};
  const keys = Object.keys(data[0]);

  for (const key of keys) {
    const first = data[0][key];
    if (typeof first === "number") {
      totalRow[key] = data.reduce((sum, row) => {
        const v = row[key];
        return sum + (typeof v === "number" ? v : 0);
      }, 0);
    } else {
      totalRow[key] = "";
    }
  }

  return totalRow;
}
