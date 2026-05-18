/**
 * MultiSelect в write-off sheet хранит id как JSON.stringify([...ids]).
 * Пример: idGroupMain = ['[12,34]'] для «Кондитерские изделия».
 */
export function parseNumericFilterIds(values: string[] | undefined): number[] {
  if (!values?.length) return [];

  const ids: number[] = [];

  for (const item of values) {
    if (item == null || item === "") continue;

    const trimmed = String(item).trim();

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed) as unknown;
        if (Array.isArray(parsed)) {
          for (const v of parsed) {
            const n = Number(v);
            if (!Number.isNaN(n)) ids.push(n);
          }
          continue;
        }
      } catch {
        // fallback: разбор "[1, 2, 3]"
      }

      for (const part of trimmed.replace(/[[\]]/g, "").split(",")) {
        const n = Number(part.trim());
        if (!Number.isNaN(n)) ids.push(n);
      }
      continue;
    }

    const n = Number(trimmed);
    if (!Number.isNaN(n)) ids.push(n);
  }

  return [...new Set(ids)];
}

export function parseStringFilterIds(values: string[] | undefined): string[] {
  return parseNumericFilterIds(values).map(String);
}
