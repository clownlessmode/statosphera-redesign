import { COLUMN_KEY, formatNumber, formatPercent } from "./table-columns";
import { ColDef } from "ag-grid-community";
export type Column = {
  label: string;
  value: string;
};

export type ColumnGroup = { children?: Column[] } & Column;

export type ColumnPickerProps = {
  columns: ColumnGroup[];
  selectedColumn: string[];
  expandedColumn: string[];
  selectColumn: (currentSelectedColumns: string[]) => void;
  unselectColumn: (unselectedColumns: string) => void;
  onExpandColumn: (expandedColumns: string[]) => void;
  listSelectedDisplayedColumns: { label: string; value: string }[];
};

export enum ColumnsKeyGroupings {
  IS_IM = "isIm",
  IM_TYPE_ORDER = "imTypeOrder",
  NAME_MANAGER = "nameManager",
  LEGAL_ENTITY = "legalEntity",
  IM_DELIVERY_METHOD = "imDeliveryMethod",
  IM_PAYMENT_METHOD = "imPaymentMethod",
  IM_STATUS_ORDER = "imStatusOrder",
  IM_RECEIVE_INTERVAL = "imReceiveInterval",
  IM_PROMO = "imPromo",
  SEX_LOYAL = "sexLoyal",
  LOYAL_AGE = "loyalAge",
  CITY = "city",
  REGION = "region",
  CHANNEL = "channel",
  GROUP = "group",
  PRODUCT = "product",
  STORE_CONDITION = "storeCondition",
  AGE_GROUP = "ageGroup",
  YEAR = "year",
  QUARTER = "quarter",
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
  CARD_NUMBER = "cardNumber",
  HOUR = "hour",
  TAB_NUMBER = "tabNumber",
  ID_CHECK = "idCheck",
  SUB_GROUPS = "subGroups",
  SUB_SUB_GROUPS = "subSubGroups",
  GROUPS_ECONOMIST = "groupsEconomist",
  GROUPS_FRANCHISE = "groupsFranchise",
  TYPE_PRODUCTS = "typeProducts",
  SEASONALITY_PRODUCTS = "seasonalityProducts",
  SUBDIVISION_PRODUCTS = "subDivisionProducts",
  TEAM_PRODUCTS = "teamProducts",
  DIRECTION_PRODUCTS = "directionProducts",
  CASH_BOX = "cashBox",
  MANAGER_AUTO = "managerAuto",
}

// Столбцы группировки
export const groupingColumns: ColumnGroup[] = [
  { label: "Магазин", value: "store" },
  { label: "Кассир", value: ColumnsKeyGroupings.TAB_NUMBER },
  { label: "Город", value: ColumnsKeyGroupings.CITY },
  { label: "Регион", value: ColumnsKeyGroupings.REGION },
  { label: "Канал", value: ColumnsKeyGroupings.CHANNEL },
  { label: "Номер карты", value: ColumnsKeyGroupings.CARD_NUMBER },
  { label: "Группа", value: ColumnsKeyGroupings.GROUP },
  { label: "Возраст магазина", value: ColumnsKeyGroupings.AGE_GROUP },
  { label: "Статус магазина", value: ColumnsKeyGroupings.STORE_CONDITION },
  { label: "Продукт", value: ColumnsKeyGroupings.PRODUCT },
  { label: "Год", value: ColumnsKeyGroupings.YEAR },
  { label: "Квартал", value: ColumnsKeyGroupings.QUARTER },
  { label: "Месяц", value: ColumnsKeyGroupings.MONTH },
  { label: "Неделя", value: ColumnsKeyGroupings.WEEK },
  { label: "День", value: ColumnsKeyGroupings.DAY },
  { label: "Час", value: ColumnsKeyGroupings.HOUR },
  { label: "Источник заказа", value: ColumnsKeyGroupings.IM_TYPE_ORDER },
  { label: "Способ доставки", value: ColumnsKeyGroupings.IM_DELIVERY_METHOD },
  { label: "Способ оплаты", value: ColumnsKeyGroupings.IM_PAYMENT_METHOD },
  { label: "Статусы", value: ColumnsKeyGroupings.IM_STATUS_ORDER },
  { label: "Промо", value: ColumnsKeyGroupings.IM_PROMO },
  { label: "Период доставки", value: ColumnsKeyGroupings.IM_RECEIVE_INTERVAL },
  { label: "Пол", value: ColumnsKeyGroupings.SEX_LOYAL },
  { label: "Возраст", value: ColumnsKeyGroupings.LOYAL_AGE },
  { label: "ID чека", value: ColumnsKeyGroupings.ID_CHECK },
  { label: "Структура продаж", value: ColumnsKeyGroupings.GROUPS_FRANCHISE },
  { label: "Подгруппа", value: ColumnsKeyGroupings.SUB_GROUPS },
  { label: "Подподгруппа", value: ColumnsKeyGroupings.SUB_SUB_GROUPS },
  { label: "Поставщик", value: ColumnsKeyGroupings.TYPE_PRODUCTS },
  { label: "Сезоность", value: ColumnsKeyGroupings.SEASONALITY_PRODUCTS },
  {
    label: "Структурное подразделение",
    value: ColumnsKeyGroupings.SUBDIVISION_PRODUCTS,
  },
  { label: "Команда", value: ColumnsKeyGroupings.TEAM_PRODUCTS },
  { label: "Направление", value: ColumnsKeyGroupings.DIRECTION_PRODUCTS },
  {
    label: "Справочник экономистов",
    value: ColumnsKeyGroupings.GROUPS_ECONOMIST,
  },
  { label: "Номер кассы", value: ColumnsKeyGroupings.CASH_BOX },
  { label: "Менеджер автозаказа", value: ColumnsKeyGroupings.MANAGER_AUTO },
];

export enum ColumnsKeyId {
  STORE_ID = "id_store",
  PRODUCT_ID = "id_product",
  GROUP_ID = "group_id",
  REGION_ID = "id_region",
  CITY_ID = "id_city",
  CASHIER_ID = "tab_num",
  SEASONALITY_PRODUCTS_ID = "idSeasonalityProducts",
  TEAM_PRODUCTS_ID = "idTeamProducts",
  TYPE_PRODUCTS_ID = "idTypeProducts",
  SUB_SUB_GROUPS_PRODUCTS_ID = "idSubSubGroups",
  SUB_ID_GROUPS = "idSubGroups",
  DIRECTION_PRODUCTS_ID = "idDirectionProducts",
  GROUPS_ECONOMIST_ID = "idGroupsEconomist",
  SUBDIVISION_PRODUCTS_ID = "idSubdivisionProducts",
  MANAGER_AUTO_ID = "idManagerAuto",
  GROUPS_FRANCHISE_ID = "idGroupsFranchise",
}

// Конфиг таблицы
export const tableConfig: ColDef<any>[] = [
  {
    field: ColumnsKeyId.SEASONALITY_PRODUCTS_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.MANAGER_AUTO_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.GROUPS_FRANCHISE_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.SUBDIVISION_PRODUCTS_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.GROUPS_ECONOMIST_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.TEAM_PRODUCTS_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.TYPE_PRODUCTS_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.SUB_SUB_GROUPS_PRODUCTS_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.DIRECTION_PRODUCTS_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.CASHIER_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.REGION_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.CITY_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.GROUP_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.STORE_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.PRODUCT_ID,
    hide: true,
  },
  {
    field: ColumnsKeyGroupings.CASH_BOX,
    headerName: "Номер кассы",
  },
  {
    field: ColumnsKeyGroupings.MANAGER_AUTO,
    headerName: "Менеджер автозаказа",
  },
  { headerName: "ID чека", field: ColumnsKeyGroupings.ID_CHECK },
  {
    headerName: "Структура продаж",
    field: ColumnsKeyGroupings.GROUPS_FRANCHISE,
  },
  { headerName: "Подгруппа", field: ColumnsKeyGroupings.SUB_GROUPS },
  { headerName: "Подподгруппа", field: ColumnsKeyGroupings.SUB_SUB_GROUPS },
  { headerName: "Поставщик", field: ColumnsKeyGroupings.TYPE_PRODUCTS },
  { headerName: "Сезоность", field: ColumnsKeyGroupings.SEASONALITY_PRODUCTS },
  {
    headerName: "Структурное подразделение",
    field: ColumnsKeyGroupings.SUBDIVISION_PRODUCTS,
  },
  { headerName: "Команда", field: ColumnsKeyGroupings.TEAM_PRODUCTS },
  { headerName: "Направление", field: ColumnsKeyGroupings.DIRECTION_PRODUCTS },
  {
    headerName: "Справочник экономистов",
    field: ColumnsKeyGroupings.GROUPS_ECONOMIST,
  },
  { headerName: "Юр. лицо", field: ColumnsKeyGroupings.LEGAL_ENTITY },
  { headerName: "Территориал", field: ColumnsKeyGroupings.NAME_MANAGER },
  {
    field: ColumnsKeyGroupings.SEX_LOYAL,
    headerName: "Пол",
  },
  {
    field: ColumnsKeyGroupings.LOYAL_AGE,
    headerName: "Возраст",
  },
  {
    field: ColumnsKeyGroupings.YEAR,
    headerName: "Год",
  },
  {
    field: ColumnsKeyGroupings.QUARTER,
    headerName: "Квартал",
  },
  {
    field: ColumnsKeyGroupings.MONTH,
    headerName: "Месяц",
  },
  {
    field: ColumnsKeyGroupings.WEEK,
    headerName: "Неделя",
  },
  {
    field: ColumnsKeyGroupings.DAY,
    headerName: "День",
  },
  {
    field: ColumnsKeyGroupings.HOUR,
    headerName: "Час",
  },
  {
    field: ColumnsKeyGroupings.REGION,
    headerName: "Регион",
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.CITY,
    headerName: "Город",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "store",
    headerName: "Магазин",
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.TAB_NUMBER,
    headerName: "Кассир",
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.CHANNEL,
    headerName: "Канал",
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.STORE_CONDITION,
    headerName: "Статус магазина",
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.AGE_GROUP,
    headerName: "Возраст магазина",
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.GROUP,
    headerName: "Группа",
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.PRODUCT,
    headerName: "Номенклатура",
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.CARD_NUMBER,
    headerName: "Номер карты",
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Источник заказа",
    field: ColumnsKeyGroupings.IM_TYPE_ORDER,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Способ доставки",
    field: ColumnsKeyGroupings.IM_DELIVERY_METHOD,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Способ оплаты",
    field: ColumnsKeyGroupings.IM_PAYMENT_METHOD,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Статусы",
    field: ColumnsKeyGroupings.IM_STATUS_ORDER,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Промо",
    field: ColumnsKeyGroupings.IM_PROMO,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Период доставки",
    field: ColumnsKeyGroupings.IM_RECEIVE_INTERVAL,
    cellStyle: { textAlign: "left" },
  },
  {
    field: COLUMN_KEY.PROCEEDS,
    headerName: "Выручка",
    headerTooltip: "Выручка",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROCEEDS]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],
      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_LM,
    headerName: "Выручка PM",
    headerTooltip: "В прошлом месяце",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROCEEDS_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_MOM,
    headerName: "Выручка MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROCEEDS_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
    headerName: "Выручка MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.PROCEEDS_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_LY,
    headerName: "Выручка PY",
    headerClass: "column",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROCEEDS_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_YOY,
    headerName: "Выручка YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROCEEDS_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
    headerName: "Выручка YoY %",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.PROCEEDS_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC,
    headerName: "Выручка QC",
    headerTooltip: "Выручка по кюаркоду",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROCEEDS_QC]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF,
    headerName: "Списания",
    headerTooltip: "Списания",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WRITE_OFF]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_LM,
    headerName: "Списания  PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WRITE_OFF_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_MOM,
    headerName: "Списания  MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WRITE_OFF_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
    headerName: "Списания  PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.WRITE_OFF_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_LY,
    headerName: "Списания  PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WRITE_OFF_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_YOY,
    headerName: "Списания YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WRITE_OFF_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT,
    headerName: "Списания %",
    headerTooltip: "Списания %",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.WRITE_OFF_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT_LM,
    headerName: "Списания % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.WRITE_OFF_PERCENT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
    headerName: "Списания, руб. YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.WRITE_OFF_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
    headerName: "Списания % YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT_LY,
    headerName: "Списания % PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.WRITE_OFF_PERCENT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT,
    headerName: "Списания % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROFIT,
    headerName: "Наценка, руб.",
    headerTooltip: "Наценка",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROFIT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROFIT_LM,
    headerName: "Наценка, руб. PM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROFIT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROFIT_MOM,
    headerName: "Наценка, руб. MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROFIT_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROFIT_MOM_PERCENT,
    headerName: "Наценка, руб. MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.PROFIT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROFIT_LY,
    headerName: "Наценка, руб. PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROFIT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROFIT_YOY,
    headerName: "Наценка, руб. YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.PROFIT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.PROFIT_YOY_PERCENT,
    headerName: "Наценка, руб. YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.PROFIT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT,
    headerName: "Наценка %",
    headerTooltip: "Наценка %",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARKUP_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_LM,
    headerName: "Наценка % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARKUP_PERCENT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_MOM_PERCENT,
    headerName: "Наценка % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARKUP_PERCENT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_LY,
    headerName: "Наценка % PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARKUP_PERCENT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_YOY_PERCENT,
    headerName: "Наценка % YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARKUP_PERCENT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE,
    headerName: "Себестоимость",
    headerTooltip: "Себестоимость",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.COST_PRICE]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_LM,
    headerName: "Себестоимость PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.COST_PRICE_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_MOM,
    headerName: "Себестоимость MOM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.COST_PRICE_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
    headerName: "Себестоимость MOM%",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.COST_PRICE_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_LY,
    headerName: "Себестоимость PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.COST_PRICE_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_YOY,
    headerName: "Себестоимость YOY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.COST_PRICE_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
    headerName: "Себестоимость YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.COST_PRICE_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT,
    headerName: "Скидка",
    headerTooltip: "Скидка",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.DISCOUNT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_LM,
    headerName: "Скидки PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.DISCOUNT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_MOM,
    headerName: "Скидки MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.DISCOUNT_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_MOM_PERCENT,
    headerName: "Скидки MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.DISCOUNT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_LY,
    headerName: "Скидки PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.DISCOUNT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_YOY,
    headerName: "Скидки YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.DISCOUNT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_YOY_PERCENT,
    headerName: "Скидки YoY%",
    headerTooltip: "Процент изменения по сравнению с прошлым годом %",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.DISCOUNT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT,
    headerName: "Скидка %",
    headerTooltip: "Скидка %",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.DISCOUNT_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_LM,
    headerName: "Скидки % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.DISCOUNT_PERCENT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_MOM_PERCENT,
    headerName: "Скидки % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.DISCOUNT_PERCENT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_LY,
    headerName: "Скидки %  PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.DISCOUNT_PERCENT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT,
    headerName: "Скидки % YoY",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT,
    headerName: "Маржа %",
    headerTooltip: "Маржа %",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARGIN_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_LM,
    headerName: "Маржа % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARGIN_PERCENT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_MOM_PERCENT,
    headerName: "Маржа % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARGIN_PERCENT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_LY,
    headerName: "Маржа % PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARGIN_PERCENT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_YOY_PERCENT,
    headerName: "Маржа % YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.MARGIN_PERCENT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK,
    headerName: "Ср. чек",
    headerTooltip: "Ср. чек",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.AVG_CHECK]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_LM,
    headerName: "Ср. Чек PM",
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.AVG_CHECK_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_MOM,
    headerName: "Ср. Чек MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.AVG_CHECK_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_MOM_PERCENT,
    headerName: "Ср. Чек MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.AVG_CHECK_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_LY,
    headerName: "Ср. Чек  PY",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.AVG_CHECK_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_YOY,
    headerName: "Ср. Чек YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.AVG_CHECK_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_YOY_PERCENT,
    headerName: "Ср. Чек YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.AVG_CHECK_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS,
    headerName: "Бонус",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.BONUS]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_LM,
    headerName: "Бонус PM",
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.BONUS_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_MOM,
    headerName: "Бонус MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.BONUS_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_MOM_PERCENT,
    headerName: "Бонус MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.BONUS_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_LY,
    headerName: "Бонус  PY",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.BONUS_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_YOY,
    headerName: "Бонус YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.BONUS_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_YOY_PERCENT,
    headerName: "Бонус YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.BONUS_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_PERCENT,
    headerName: "Бонус %",
    headerTooltip: "Бонус %",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.BONUS_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_PERCENT_LM,
    headerName: "Бонус % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.BONUS_PERCENT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_PERCENT_MOM_PERCENT,
    headerName: "Бонус % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.BONUS_PERCENT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_PERCENT_LY,
    headerName: "Бонус %  PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.BONUS_PERCENT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.BONUS_PERCENT_YOY_PERCENT,
    headerName: "Бонус % YoY",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.BONUS_PERCENT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WEIGHT,
    headerName: "Вес",
    headerTooltip: "Вес",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WEIGHT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WEIGHT_LM,
    headerName: "Вес PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WEIGHT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WEIGHT_MOM,
    headerName: "Вес MOM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WEIGHT_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WEIGHT_MOM_PERCENT,
    headerName: "Вес MOM%",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.WEIGHT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WEIGHT_LY,
    headerName: "Вес PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WEIGHT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WEIGHT_YOY,
    headerName: "Вес YOY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.WEIGHT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    field: COLUMN_KEY.WEIGHT_YOY_PERCENT,
    headerName: "Вес YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.WEIGHT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Кол. продаж",
    headerTooltip: "Кол. продаж",
    field: COLUMN_KEY.SALES,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.SALES]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Кол. продаж MoM",
    field: COLUMN_KEY.SALES_MOM,
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.SALES_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Кол. продаж MoM%",
    field: COLUMN_KEY.SALES_MOM_PERCENT,
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.SALES_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Кол. продаж PM",
    field: COLUMN_KEY.SALES_LM,
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.SALES_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Кол. продаж PY",
    field: COLUMN_KEY.SALES_LY,
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.SALES_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Кол. продаж YoY",
    field: COLUMN_KEY.SALES_YOY,
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.SALES_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Кол. продаж YoY%",
    field: COLUMN_KEY.SALES_YOY_PERCENT,
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.SALES_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. магазины",
    field: COLUMN_KEY.UNIQUE_STORE,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_STORE]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. магазины PM",
    field: COLUMN_KEY.UNIQUE_STORE_LM,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_STORE_LM]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. магазины PY",
    field: COLUMN_KEY.UNIQUE_STORE_LY,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_STORE_LY]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. номер карты",
    field: COLUMN_KEY.UNIQUE_CARD_NUMBER,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CARD_NUMBER]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. чек",
    field: COLUMN_KEY.UNIQUE_CHECK,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CHECK]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. чек PM",
    field: COLUMN_KEY.UNIQUE_CHECK_LM,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CHECK_LM]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. чек PY",
    field: COLUMN_KEY.UNIQUE_CHECK_LY,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CHECK_LY]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. регионы",
    field: COLUMN_KEY.UNIQUE_REGION,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_REGION]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. регионы PM",
    field: COLUMN_KEY.UNIQUE_REGION_LM,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_REGION_LM]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. регионы PY",
    field: COLUMN_KEY.UNIQUE_REGION_LY,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_REGION_LY]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. города",
    field: COLUMN_KEY.UNIQUE_CITY,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CITY]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. города PM",
    field: COLUMN_KEY.UNIQUE_CITY_LM,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CITY_LM]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. города PY",
    field: COLUMN_KEY.UNIQUE_CITY_LY,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CITY_LY]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. канал",
    field: COLUMN_KEY.UNIQUE_CHANNEL,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CHANNEL]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. канал PM",
    field: COLUMN_KEY.UNIQUE_CHANNEL_LM,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CHANNEL_LM]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. канал PY",
    field: COLUMN_KEY.UNIQUE_CHANNEL_LY,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CHANNEL_LY]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. номер карты PM",
    field: COLUMN_KEY.UNIQUE_CARD_NUMBER_LM,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CARD_NUMBER_LM]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
  {
    headerName: "Ун. номер карты PY",
    field: COLUMN_KEY.UNIQUE_CARD_NUMBER_LY,
    valueFormatter: (params: any) =>
      formatNumber(params.data?.[COLUMN_KEY.UNIQUE_CARD_NUMBER_LY]),
    filter: "agNumberColumnFilter",
    filterParams: {
      buttons: ["reset", "apply"],
      filterOptions: [
        {
          displayKey: "betweenExclusive",
          displayName: "Между",
          predicate: ([fv1, fv2]: any[], cellValue: any) =>
            cellValue == null || (fv1 < cellValue && fv2 > cellValue),
          numberOfInputs: 2,
        },
      ],

      maxNumConditions: 1,
    },
  },
];
