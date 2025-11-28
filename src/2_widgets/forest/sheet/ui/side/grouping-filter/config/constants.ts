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
    label: "Группа",
    value: GROUPINGS.GROUP,
  },
  {
    label: "Подгруппа",
    value: GROUPINGS.SUBGROUPS,
  },
  {
    label: "Подподгруппа",
    value: GROUPINGS.SUBSUBGROUPS,
  },
  {
    label: "Номенклатура",
    value: GROUPINGS.PRODUCT,
  },
];
export const LOYAL = [
  {
    label: "Номер карты",
    value: GROUPINGS.CARD_NUMBER,
  },
  {
    label: "Пол",
    value: GROUPINGS.IM_SEX_LOYAL,
    disabled: true,
  },
  {
    label: "Возраст",
    value: GROUPINGS.LOYAL_AGE,
    disabled: true,
  },
  {
    label: "Тип скидки",
    value: GROUPINGS.DISCOUNT_TYPE,
    disabled: true,
  },
];

export const ONLINE = [
  {
    label: "Способ оплаты",
    value: GROUPINGS.IM_PAYMENT_METHOD,
  },
  {
    label: "Период доставки",
    value: GROUPINGS.IM_RECEIVE_INTERVAL,
    disabled: true,
  },
];

export const ID = [
  {
    label: "ID чека",
    value: GROUPINGS.ID_CHECK,
  },
  {
    label: "Номер кассы",
    value: GROUPINGS.CASH_BOX,
  },
];
