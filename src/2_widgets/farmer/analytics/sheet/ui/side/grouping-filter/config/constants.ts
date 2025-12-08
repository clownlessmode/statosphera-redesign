import { GROUPINGS } from "@widgets/farmer/analytics/sheet/model/filters-store";

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
  {
    label: "Час",
    value: GROUPINGS.HOUR,
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
];
export const SHOP = [
  {
    label: "Магазин",
    value: GROUPINGS.STORE,
  },
  {
    label: "Период деятельности магазина",
    value: GROUPINGS.AGE_GROUP,
  },
  {
    label: "Статус магазина",
    value: GROUPINGS.STORE_CONDITION,
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
    label: "Сезон",
    value: GROUPINGS.SEASONALITY_PRODUCT,
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
  },
  {
    label: "Возраст",
    value: GROUPINGS.LOYAL_AGE,
  },
];

export const ONLINE = [
  {
    label: "Источник заказа",
    value: GROUPINGS.IM_TYPE_ORDER,
  },
  {
    label: "Способ доставки",
    value: GROUPINGS.IM_DELIVERY_METHOD,
  },
  {
    label: "Способ оплаты",
    value: GROUPINGS.IM_PAYMENT_METHOD,
  },
  {
    label: "Статус",
    value: GROUPINGS.IM_STATUS_ORDER,
  },
  {
    label: "Промо",
    value: GROUPINGS.IM_PROMO,
  },
  {
    label: "Период доставки",
    value: GROUPINGS.IM_RECEIVE_INTERVAL,
  },
];

export const ID = [
  {
    label: "ID чека",
    value: GROUPINGS.ID_CHECK,
  },
  {
    label: "Тип чека",
    value: GROUPINGS.TYPE,
  },
];
