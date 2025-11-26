import { GROUPINGS } from "@widgets/report/sheet/model/filters-store";

export const DAYS = [
  {
    label: "Год",
    value: GROUPINGS.YEAR,
  },
  {
    label: "Квартал",
    value: GROUPINGS.QUARTER,
  },
  {
    label: "Месяц",
    value: GROUPINGS.MONTH,
  },
  {
    label: "Неделя",
    value: GROUPINGS.WEEK,
  },
  {
    label: "День",
    value: GROUPINGS.DAY,
  },
];

export const GEO = [
  {
    label: "Город",
    value: GROUPINGS.CITY,
  },
  {
    label: "Регион",
    value: GROUPINGS.REGION,
  },
  {
    label: "Магазин",
    value: GROUPINGS.STORE,
  },
];

export const PRODUCT = [
  {
    label: "Номенклатура",
    value: GROUPINGS.PRODUCT,
  },
];
