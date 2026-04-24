import { GROUPINGS } from "@widgets/report/sheet/model/filters-store";

export const GEO = [
  {
    label: "Город",
    value: GROUPINGS.CITY,
  },
  {
    label: "Регион",
    value: GROUPINGS.REGION,
  },
];
export const SHOP = [
  {
    label: "Магазин",
    value: GROUPINGS.STORE,
  },
  {
    label: "Канал",
    value: GROUPINGS.CHANNEL,
  },
  {
    label: "Период деятельности магазина",
    value: GROUPINGS.AGE_GROUP,
  },
  {
    label: "Статус магазина",
    value: GROUPINGS.STORE_CONDITION,
  },
  {
    label: "Юр.лицо",
    value: "legalEntity",
  },
  {
    label: "Партнер",
    value: "nameManager",
  },
  {
    label: "Формат магазина",
    value: "formatStore",
  },
];
