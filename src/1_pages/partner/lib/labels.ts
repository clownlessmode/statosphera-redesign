import { PARTNER_VALUES } from "../api/types/partner-enums";
import type { PartnerGraphMetric, PartnerMetric } from "../api/types";

/** Базовые подписи метрик (как в PARTNER_VALUES на бэке) */
export const PARTNER_METRIC_LABELS: Record<PartnerMetric | string, string> = {
  [PARTNER_VALUES.ORDERED_COUNT]: "Кол-во заказанного",
  [PARTNER_VALUES.SHIPPED_COUNT]: "Кол-во отгруженного",
  [PARTNER_VALUES.ORDERED_SUM]: "Сумма заказанного",
  [PARTNER_VALUES.SHIPPED_SUM]: "Сумма отгруженного",
  [PARTNER_VALUES.NOT_SHIPPED_COUNT]: "Кол-во не отгруженного",
  [PARTNER_VALUES.NOT_SHIPPED_PROFIT]: "Недополученная прибыль",
  [PARTNER_VALUES.SHIPMENT_PERCENT]: "Процент отгрузки",
};

export const PARTNER_GRAPH_METRIC_LABELS: Record<
  PartnerGraphMetric | string,
  string
> = {
  [PARTNER_VALUES.NOT_SHIPPED_PROFIT]:
    PARTNER_METRIC_LABELS[PARTNER_VALUES.NOT_SHIPPED_PROFIT],
  [PARTNER_VALUES.SHIPPED_COUNT]:
    PARTNER_METRIC_LABELS[PARTNER_VALUES.SHIPPED_COUNT],
  [PARTNER_VALUES.NOT_SHIPPED_COUNT]:
    PARTNER_METRIC_LABELS[PARTNER_VALUES.NOT_SHIPPED_COUNT],
  [PARTNER_VALUES.SHIPPED_SUM]:
    PARTNER_METRIC_LABELS[PARTNER_VALUES.SHIPPED_SUM],
  [PARTNER_VALUES.SHIPMENT_PERCENT]:
    PARTNER_METRIC_LABELS[PARTNER_VALUES.SHIPMENT_PERCENT],
};

export const PARTNER_DIMENSION_LABELS: Record<string, string> = {
  day: "День",
  week: "Неделя",
  month: "Месяц",
  quarter: "Квартал",
  year: "Год",
  store: "Магазин",
  product: "Товар",
  directionProducts: "Направление",
  group: "Группа",
  subGroups: "Подгруппа",
  subSubGroups: "Подподгруппа",
  groupsFranchise: "Франшиза",
  idProduct: "Код товара",
  store_name: "Магазин",
  product_name: "Товар",
};

/** Суффиксы сравнения периодов — короткие приписки LM / LY / MoM / YoY */
const SUFFIX_LABELS: Record<string, string> = {
  _lm: " LM",
  _ly: " LY",
  _momPercent: " MoM%",
  _yoyPercent: " YoY%",
};

export function partnerFieldLabel(field: string): string {
  if (PARTNER_DIMENSION_LABELS[field]) {
    return PARTNER_DIMENSION_LABELS[field];
  }

  for (const [suffix, label] of Object.entries(SUFFIX_LABELS)) {
    if (field.endsWith(suffix)) {
      const base = field.slice(0, -suffix.length);
      const baseLabel =
        PARTNER_METRIC_LABELS[base] ?? PARTNER_DIMENSION_LABELS[base] ?? base;
      return `${baseLabel}${label}`;
    }
  }

  return PARTNER_METRIC_LABELS[field] ?? field;
}
