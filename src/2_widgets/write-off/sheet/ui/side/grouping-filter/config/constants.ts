import { GROUPINGS } from "@widgets/write-off/sheet/model/filters-store";

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

export const WRITE_OFF = [
  {
    label: "Тип списания",
    value: GROUPINGS.WRITE_OFF_TYPE,
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
  {
    label: "Сектор",
    value: GROUPINGS.SECTOR,
  },
];
export const PRODUCT = [
  {
    label: "Cтруктура продаж",
    value: GROUPINGS.GROUP_FRANCHISE,
  },
  // {
  //   label: "Структурное подразделение",
  //   value: GROUPINGS.SUBDIVISION_PRODUCT,
  // },
  {
    label: "Группа",
    value: GROUPINGS.GROUP,
  },
  // {
  //   label: "Команда",
  //   value: GROUPINGS.TEAM_PRODUCT,
  // },
  {
    label: "Подгруппа",
    value: GROUPINGS.SUBGROUPS,
  },
  {
    label: "Направление",
    value: GROUPINGS.DIRECTION_PRODUCT,
  },
  {
    label: "Подподгруппа",
    value: GROUPINGS.SUBSUBGROUPS,
  },
  {
    label: "Тип поставщика",
    value: "typeProducts",
  },
  {
    label: "Номенклатура",
    value: GROUPINGS.PRODUCT,
  },
  {
    label: "Сезон",
    value: GROUPINGS.SEASONALITY_PRODUCT,
  },
  {
    label: "Менеджер автозаказа",
    value: GROUPINGS.MANAGER_AUTO,
  },
  {
    label: "Справочник экономиста",
    value: GROUPINGS.GROUP_ECONOMIST,
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
  {
    label: "Тип скидки",
    value: GROUPINGS.DISCOUNT_TYPE,
  },
];

export const PERSONAL = [
  {
    label: "Кассиры",
    value: "tabNumber",
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
    label: "Номер кассы",
    value: GROUPINGS.CASH_BOX,
  },
  {
    label: "Тип чека",
    value: GROUPINGS.TYPE,
  },
];
