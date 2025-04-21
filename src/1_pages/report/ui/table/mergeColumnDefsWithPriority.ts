import { ColDef } from "ag-grid-community";

/**
 * Объединяет массивы колонок с приоритетом одного из них
 * @param primary - приоритетный массив (например, tableConfig)
 * @param secondary - дополнительный массив (например, tableColumns)
 * @returns Объединённый массив ColDef[]
 */
export function mergeColumnDefsWithPriority(
  primary: ColDef[],
  secondary: ColDef[]
): ColDef[] {
  const result: Record<string, ColDef> = {};

  // Сначала добавляем вторичные (менее приоритетные)
  for (const col of secondary) {
    if (col.field) {
      result[col.field] = col;
    }
  }

  // Затем переопределяем приоритетными
  for (const col of primary) {
    if (col.field) {
      result[col.field] = col;
    }
  }

  return Object.values(result);
}
