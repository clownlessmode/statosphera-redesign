import type { ColDef } from "ag-grid-community";
import type { PartnerMetric, PartnerTableGroup } from "../api/types";
import { partnerFieldLabel } from "./labels";

const PERCENT_FIELDS = /Percent$/;
const SUM_FIELDS = /Sum$|Profit$/;

const COMPARISON_SUFFIXES = [
  "_lm",
  "_ly",
  "_momPercent",
  "_yoyPercent",
] as const;

const DIMENSION_FIELDS = new Set<string>([
  "day",
  "week",
  "month",
  "quarter",
  "year",
  "store",
  "product",
  "product_name",
  "store_name",
  "directionProducts",
  "group",
  "subGroups",
  "subSubGroups",
  "groupsFranchise",
  "idProduct",
  "manufacturer",
]);

function formatCellValue(field: string, value: unknown): string {
  if (value == null || value === "") return "––";
  if (typeof value === "boolean") return value ? "Да" : "Нет";
  if (typeof value === "number") {
    if (PERCENT_FIELDS.test(field)) {
      return `${value.toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%`;
    }
    if (SUM_FIELDS.test(field)) {
      return value.toLocaleString("ru-RU", {
        maximumFractionDigits: 2,
      });
    }
    return value.toLocaleString("ru-RU");
  }
  return String(value);
}

function isDimensionField(field: string): boolean {
  return DIMENSION_FIELDS.has(field);
}

/** Поля колонок строго по запросу: group[] + values[] (+ LM/LY/MoM/YoM если есть в строке) */
export function getPartnerTableFields(options: {
  group: PartnerTableGroup[] | string[];
  values: PartnerMetric[] | string[];
  sampleRow?: Record<string, unknown>;
}): string[] {
  const { group, values, sampleRow } = options;
  const fields: string[] = [];

  for (const dim of group) {
    if (!fields.includes(dim)) {
      fields.push(dim);
    }
  }

  for (const metric of values) {
    if (!fields.includes(metric)) {
      fields.push(metric);
    }
    for (const suffix of COMPARISON_SUFFIXES) {
      const comparisonField = `${metric}${suffix}`;
      if (
        sampleRow &&
        comparisonField in sampleRow &&
        !fields.includes(comparisonField)
      ) {
        fields.push(comparisonField);
      }
    }
  }

  return fields;
}

export function buildPartnerColumnDefs(options: {
  group: PartnerTableGroup[] | string[];
  values: PartnerMetric[] | string[];
  sampleRow?: Record<string, unknown>;
}): ColDef[] {
  const fields = getPartnerTableFields(options);

  return fields.map((field) => ({
    field,
    headerName: partnerFieldLabel(field),
    sortable: true,
    resizable: true,
    minWidth:
      field.includes("name") || field === "product" || field === "store"
        ? 180
        : 120,
    cellStyle: {
      textAlign: isDimensionField(field) ? "left" : "right",
    },
    valueFormatter: (params) => formatCellValue(field, params.value),
  }));
}
