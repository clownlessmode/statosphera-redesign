/** Метрики таблицы (values / sort.colId) */
export enum PARTNER_VALUES {
  ORDERED_COUNT = "orderedCount",
  SHIPPED_COUNT = "shippedCount",
  ORDERED_SUM = "orderedSum",
  SHIPPED_SUM = "shippedSum",
  NOT_SHIPPED_COUNT = "notShippedCount",
  NOT_SHIPPED_PROFIT = "notShippedProfit",
  SHIPMENT_PERCENT = "shipmentPercent",
}

export const PARTNER_METRICS = [
  PARTNER_VALUES.ORDERED_COUNT,
  PARTNER_VALUES.SHIPPED_COUNT,
  PARTNER_VALUES.ORDERED_SUM,
  PARTNER_VALUES.SHIPPED_SUM,
  PARTNER_VALUES.NOT_SHIPPED_COUNT,
  PARTNER_VALUES.NOT_SHIPPED_PROFIT,
  PARTNER_VALUES.SHIPMENT_PERCENT,
] as const;

export type PartnerMetric = (typeof PARTNER_METRICS)[number];

export const PARTNER_GRAPH_METRICS = [
  "notShippedProfit",
  "shippedCount",
  "notShippedCount",
  "shippedSum",
  "shipmentPercent",
] as const;

export type PartnerGraphMetric = (typeof PARTNER_GRAPH_METRICS)[number];

export const PARTNER_TABLE_GROUPS = [
  "day",
  "week",
  "month",
  "quarter",
  "year",
  "store",
  "product",
  "directionProducts",
  "group",
  "subGroups",
  "subSubGroups",
  "groupsFranchise",
] as const;

export type PartnerTableGroup = (typeof PARTNER_TABLE_GROUPS)[number];

export const PARTNER_GRAPH_GRANULARITY = [
  "day",
  "week",
  "month",
  "quarter",
  "year",
] as const;

export type PartnerGraphGranularity =
  (typeof PARTNER_GRAPH_GRANULARITY)[number];

export const PARTNER_ROW_FOCUS_KINDS = [
  "product",
  "group",
  "subgroup",
  "subsubgroup",
  "manufacturer",
] as const;

export type PartnerRowFocusKind = (typeof PARTNER_ROW_FOCUS_KINDS)[number];
