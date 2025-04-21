import { divideNumberSpaces } from "@shared/ui/graphs/stacked-line/formatter-tooltip";
import { ColDef } from "ag-grid-community";

export enum COLUMN_KEY {
  // ----------------- ВЕС -----------------
  WEIGHT_GROUP = "weightGroup",
  WEIGHT = "weight",
  WEIGHT_MOM = "weightMoM",
  WEIGHT_MOM_PERCENT = "weightMoMPercent",
  WEIGHT_LM = "weightLM",
  WEIGHT_LY = "weightLY",
  WEIGHT_YOY = "weightYoY",
  WEIGHT_YOY_PERCENT = "weightYoYPercent",

  // ----------------- Уникальные показатели -----------------
  UNIQUE_STORE = "uniqueStore",
  UNIQUE_STORE_LM = "uniqueStoreLM",
  UNIQUE_STORE_LY = "uniqueStoreLY",

  GROUP_UNIQUE_CITY = "unique_city_group",
  UNIQUE_CITY = "uniqueCity",
  UNIQUE_CITY_LM = "uniqueCityLM",
  UNIQUE_CITY_LY = "uniqueCityLY",

  UNIQUE_REGION = "uniqueRegion",
  UNIQUE_REGION_LM = "uniqueRegionLM",
  UNIQUE_REGION_LY = "uniqueRegionLY",

  UNIQUE_CARD_NUMBER = "uniqueCardNumber",
  UNIQUE_CARD_NUMBER_LM = "uniqueCardNumberLM",
  UNIQUE_CARD_NUMBER_LY = "uniqueCardNumberLY",

  UNIQUE_CHANNEL = "uniqueChannel",
  UNIQUE_CHANNEL_LM = "uniqueChannelLM",
  UNIQUE_CHANNEL_LY = "uniqueChannelLY",

  UNIQUE_CHECK = "uniqueCheck",
  UNIQUE_CHECK_LM = "uniqueCheckLM",
  UNIQUE_CHECK_LY = "uniqueCheckLY",

  SALES = "countSales",
  SALES_LM = "countSalesLM",
  SALES_LY = "countSalesLY",
  SALES_MOM = "countSalesMoM",
  SALES_MOM_PERCENT = "countSalesMoMPercent",
  SALES_YOY = "countSalesYoY",
  SALES_YOY_PERCENT = "countSalesYoYPercent",

  // ----------------- Выручка -----------------
  GROUP_PROCEEDS = "groupProceeds",
  STORE_NAME = "storename",
  PROCEEDS = "proceeds",
  PROCEEDS_LM = "proceedsLM",
  PROCEEDS_MOM = "proceedsMoM",
  PROCEEDS_MOM_PERCENT = "proceedsMoMPercent",
  PROCEEDS_LY = "proceedsLY",
  PROCEEDS_YOY = "proceedsYoY",
  PROCEEDS_YOY_PERCENT = "proceedsYoYPercent",
  CUMULATIVE_PROCEEDS_TODAY_YEAR = "cumulativeProceedsTodayYear",
  CUMULATIVE_PROCEEDS_LAST_YEAR = "cumulativeProceedsLastYear",
  CUMULATIVE_PROCEEDS_YOY = "cumulativeProceedsYoY",
  CUMULATIVE_PROCEEDS_YOY_PERCENT = "cumulativeProceedsYoYPercent",
  // -------------------------------------------

  // ----------------- Выручка планы -----------------
  PLAN_PROCEEDS = "planProceeds",
  PLAN_PROCEEDS_EXECUTION_PERCENT = "planProceedsExecutionPercent",
  PLAN_PROCEEDS_FORECAST = "planProceedsForecast",
  PLAN_PROCEEDS_FORECAST_PERCENT = "planProceedsForecastPercent",
  CUMULATIVE_PROCEEDS_PLAN = "cumulativeProceedsPlan",
  CUMULATIVE_PLAN_PROCEEDS_EXECUTION_PERCENT = "cumulativePlanProceedsExecutionPercent",
  CUMULATIVE_PLAN_PROCEEDS_FORECAST_PERCENT = "cumulativePlanProceedsForecastPercent",
  // -------------------------------------------

  // ----------------- Чеки -----------------
  CHECK = "check",
  CHECK_LM = "checkLM",
  CHECK_MOM = "checkMoM",
  CHECK_MOM_PERCENT = "checkMoMPercent",
  CHECK_LY = "checkLY",
  CHECK_YOY = "checkYoY",
  CHECK_YOY_PERCENT = "checkYoYPercent",
  CUMULATIVE_CHECK_TODAY_YEAR = "cumulativeCheckTodayYear",
  CUMULATIVE_CHECK_LAST_YEAR = "cumulativeCheckLastYear",
  CUMULATIVE_CHECK_YOY = "cumulativeCheckYoY",
  CUMULATIVE_CHECK_YOY_PERCENT = "cumulativeCheckYoYPercent",
  // -----------------------------------------

  // ----------------- Чеки планы -----------------
  PLAN_CHECK = "planCheck",
  PLAN_CHECK_EXECUTION_PERCENT = "planCheckExecutionPercent",
  PLAN_CHECK_FORECAST = "planCheckForecast",
  PLAN_CHECK_FORECAST_PERCENT = "planCheckForecastPercent",
  CUMULATIVE_CHECK_PLAN = "cumulativeCheckPlan",
  CUMULATIVE_PLAN_CHECK_EXECUTION_PERCENT = "cumulativePlanCheckExecutionPercent",
  CUMULATIVE_PLAN_CHECK_FORECAST_PERCENT = "cumulativePlanCheckForecastPercent",
  // -----------------------------------------

  // ----------------- Средний чек -----------------
  AVG_CHECK = "avgCheck",
  AVG_CHECK_LM = "avgCheckLM",
  AVG_CHECK_MOM = "avgCheckMoM",
  AVG_CHECK_MOM_PERCENT = "avgCheckMoMPercent",
  AVG_CHECK_LY = "avgCheckLY",
  AVG_CHECK_YOY = "avgCheckYoY",
  AVG_CHECK_YOY_PERCENT = "avgCheckYoYPercent",
  CUMULATIVE_AVG_CHECK_TODAY_YEAR = "cumulativeAvgCheckTodayYear",
  CUMULATIVE_AVG_CHECK_LAST_YEAR = "cumulativeAvgCheckLastYear",
  CUMULATIVE_AVG_CHECK_YOY = "cumulativeAvgCheckYoY",
  CUMULATIVE_AVG_CHECK_YOY_PERCENT = "cumulativeAvgCheckYoYPercent",
  // -----------------------------------------------

  // ----------------- Средний чек планы -----------------
  PLAN_AVG_CHECK = "planAvgCheck",
  PLAN_AVG_CHECK_EXECUTION_PERCENT = "planAvgCheckExecutionPercent",
  PLAN_AVG_CHECK_FORECAST = "planAvgCheckForecast",
  PLAN_AVG_CHECK_FORECAST_PERCENT = "planAvgCheckForecastPercent",
  CUMULATIVE_AVG_CHECK_PLAN = "cumulativeAvgCheckPlan",
  CUMULATIVE_PLAN_AVG_CHECK_EXECUTION_PERCENT = "cumulativePlanAvgCheckExecutionPercent",
  CUMULATIVE_PLAN_AVG_CHECK_FORECAST_PERCENT = "cumulativePlanAvgCheckForecastPercent",
  // -----------------------------------------------

  // Бонусы
  BONUS = "bonus",
  BONUS_LM = "bonusLM",
  BONUS_MOM = "bonusMoM",
  BONUS_MOM_PERCENT = "bonusMoMPercent",
  BONUS_LY = "bonusLY",
  BONUS_YOY = "bonusYoY",
  BONUS_YOY_PERCENT = "bonusYoYPercent",

  BONUS_PERCENT = "bonusPercent",
  BONUS_PERCENT_LM = "bonusPercentLM",
  BONUS_PERCENT_MOM_PERCENT = "bonusPercentMoMPercent",
  BONUS_PERCENT_LY = "bonusPercentLY",
  BONUS_PERCENT_YOY_PERCENT = "bonusPercentYoYPercent",

  // ------------------------ Чеки QC -------------------
  PROCEEDS_QC = "proceedsQc",
  PROCEEDS_Q_C_LM = "proceedsQcLM",
  PROCEEDS_QC_MOM = "proceedsQcMoM",
  PROCEEDS_QC_MOM_PERCENT = "proceedsQcMoMPercent",
  PROCEEDS_QC_LY = "proceedsQcLY",
  PROCEEDS_QC_YOY = "proceedsQcYoY",
  PROCEEDS_QC_YOY_PERCENT = "proceedsQcYoYPercent",
  CUMULATIVE_PROCEEDS_QC_TODAY_YEAR = "cumulativeProceedsQcTodayYear",
  CUMULATIVE_PROCEEDS_QC_LAST_YEAR = "cumulativeProceedsQcLastYear",
  CUMULATIVE_PROCEEDS_QC_YOY = "cumulativeProceedsQcYoY",
  CUMULATIVE_PROCEEDS_QC_YOY_PERCENT = "cumulativeProceedsQcYoYPercent",
  // -----------------------------------------------

  // --------------------- Чеки QC планы ---------------------
  PLAN_PROCEEDS_QC = "planProceedsQc",
  PLAN_PROCEEDS_QC_EXECUTION_PERCENT = "planProceedsQcExecutionPercent",
  PLAN_PROCEEDS_QC_FORECAST = "planProceedsQcForecast",
  PLAN_PROCEEDS_QC_FORECAST_PERCENT = "planProceedsQcForecastPercent",
  CUMULATIVE_PROCEEDS_QC_PLAN = "cumulativeProceedsQcPlan",
  CUMULATIVE_PLAN_PROCEEDS_QC_EXECUTION_PERCENT = "cumulativePlanProceedsQcExecutionPercent",
  CUMULATIVE_PLAN_PROCEEDS_QC_FORECAST_PERCENT = "cumulativePlanProceedsQcForecastPercent",
  // -----------------------------------------------

  // ------------------- Доля платежей QC ---------------------
  SHARE_OF_PAYMENTS_QC = "shareOfPaymentsQc",
  PLAN_SHARE_OF_PAYMENTS_QC = "planShareOfPaymentsQc",
  PLAN_SHARE_OF_PAYMENTS_QC_EXECUTION_PERCENT = "planShareOfPaymentsQcExecutionPercent",
  PLAN_SHARE_OF_PAYMENTS_QC_FORECAST = "planShareOfPaymentsQcForecast",
  PLAN_SHARE_OF_PAYMENTS_QC_FORECAST_PERCENT = "planShareOfPaymentsQcForecastPercent",
  // -----------------------------------------------
  GROUP_DISCOUNT = "groupDiscount",
  DISCOUNT = "discount",
  DISCOUNT_LM = "discountLM",
  DISCOUNT_MOM = "discountMoM",
  DISCOUNT_MOM_PERCENT = "discountMoMPercent",
  DISCOUNT_LY = "discountLY",
  DISCOUNT_YOY = "discountYoY",
  DISCOUNT_YOY_PERCENT = "discountYoYPercent",
  CUMULATIVE_DISCOUNT_TODAY_YEAR = "cumulativeDiscountTodayYear",
  CUMULATIVE_DISCOUNT_LAST_YEAR = "cumulativeDiscountLastYear",
  CUMULATIVE_DISCOUNT_YOY = "cumulativeDiscountYoY",
  GROUP_DISCOUNT_PERCENT = "groupDiscountPercent",
  DISCOUNT_PERCENT = "discountPercent",
  DISCOUNT_PERCENT_LM = "discountPercentLM",
  DISCOUNT_PERCENT_MOM_PERCENT = "discountPercentMoMPercent",
  DISCOUNT_PERCENT_LY = "discountPercentLY",
  DISCOUNT_PERCENT_YOY_PERCENT = "discountPercentYoYPercent",
  CUMULATIVE_DISCOUNT_YOY_PERCENT = "cumulativeDiscountYoYPercent",
  CUMULATIVE_DISCOUNT_PERCENT_TODAY_YEAR = "cumulativeDiscountPercentTodayYear",
  CUMULATIVE_DISCOUNT_PERCENT_LAST_YEAR = "cumulativeDiscountPercentLastYear",
  GROUP_COST_PRICE = "groupCostPrice",
  COST_PRICE = "costPrice",
  COST_PRICE_LM = "costPriceLM",
  COST_PRICE_MOM = "costPriceMoM",
  COST_PRICE_MOM_PERCENT = "costPriceMoMPercent",
  COST_PRICE_LY = "costPriceLY",
  COST_PRICE_YOY = "costPriceYoY",
  COST_PRICE_YOY_PERCENT = "costPriceYoYPercent",
  CUMULATIVE_COST_PRICE_TODAY_YEAR = "cumulativeCostPriceTodayYear",
  CUMULATIVE_COST_PRICE_LAST_YEAR = "cumulativeCostPriceLastYear",
  CUMULATIVE_COST_PRICE_YOY = "cumulativeCostPriceYoY",
  CUMULATIVE_COST_PRICE_YOY_PERCENT = "cumulativeCostPriceYoYPercent",

  GROUP_PROFIT = "groupProfit",
  GROUP_PROFIT_PERCENT = "groupProfitPercent",
  PROFIT = "profit",
  PROFIT_LM = "profitLM",
  PROFIT_MOM = "profitMoM",
  PROFIT_MOM_PERCENT = "profitMoMPercent",
  PROFIT_LY = "profitLY",
  PROFIT_YOY = "profitYoY",
  PROFIT_YOY_PERCENT = "profitYoYPercent",
  CUMULATIVE_PROFIT_TODAY_YEAR = "cumulativeProfitTodayYear",
  CUMULATIVE_PROFIT_LAST_YEAR = "cumulativeProfitLastYear",
  CUMULATIVE_PROFIT_YOY = "cumulativeProfitYoY",
  CUMULATIVE_PROFIT_YOY_PERCENT = "cumulativeProfitYoYPercent",
  WRITE_OFF = "writeOff",
  WRITE_OFF_LM = "writeOffLM",
  WRITE_OFF_MOM = "writeOffMoM",
  WRITE_OFF_MOM_PERCENT = "writeOffMoMPercent",
  WRITE_OFF_LY = "writeOffLY",
  WRITE_OFF_YOY = "writeOffYoY",
  WRITE_OFF_YOY_PERCENT = "writeOffYoYPercent",
  CUMULATIVE_WRITE_OFF_TODAY_YEAR = "cumulativeWriteOffTodayYear",
  CUMULATIVE_WRITE_OFF_LAST_YEAR = "cumulativeWriteOffLastYear",
  CUMULATIVE_WRITE_OFF_YOY = "cumulativeWriteOffYoY",
  CUMULATIVE_WRITE_OFF_YOY_PERCENT = "cumulativeWriteOffYoYPercent",
  WRITE_OFF_PERCENT = "writeOffPercent",
  WRITE_OFF_PERCENT_LM = "writeOffPercentLM",
  WRITE_OFF_PERCENT_MOM_PERCENT = "writeOffPercentMoMPercent",
  WRITE_OFF_PERCENT_LY = "writeOffPercentLY",
  WRITE_OFF_PERCENT_YOY_PERCENT = "writeOffPercentYoYPercent",
  CUMULATIVE_WRITE_OFF_PERCENT_TODAY_YEAR = "cumulativeWriteOffPercentTodayYear",
  CUMULATIVE_WRITE_OFF_PERCENT_LAST_YEAR = "cumulativeWriteOffPercentLastYear",
  CUMULATIVE_WRITE_OFF_PERCENT_YOY = "cumulativeWriteOffPercentYoY",
  MARGIN_PERCENT = "marginPercent",
  MARGIN_PERCENT_LM = "marginPercentLM",
  MARGIN_PERCENT_MOM_PERCENT = "marginPercentMoMPercent",
  MARGIN_PERCENT_LY = "marginPercentLY",
  MARGIN_PERCENT_YOY_PERCENT = "marginPercentYoYPercent",
  CUMULATIVE_MARGIN_PERCENT_TODAY_YEAR = "cumulativeMarginPercentTodayYear",
  CUMULATIVE_MARGIN_PERCENT_LAST_YEAR = "cumulativeMarginPercentLastYear",
  CUMULATIVE_MARGIN_PERCENT_YOY = "cumulativeMarginPercentYoY",
  MARKUP_PERCENT = "markupPercent",
  MARKUP_PERCENT_LM = "markupPercentLM",
  MARKUP_PERCENT_MOM_PERCENT = "markupPercentMoMPercent",
  MARKUP_PERCENT_LY = "markupPercentLY",
  MARKUP_PERCENT_YOY_PERCENT = "markupPercentYoYPercent",
  CUMULATIVE_MARKUP_PERCENT_TODAY_YEAR = "cumulativeMarkupPercentTodayYear",
  CUMULATIVE_MARKUP_PERCENT_LAST_YEAR = "cumulativeMarkupPercentLastYear",
  CUMULATIVE_MARKUP_PERCENT_YOY = "cumulativeMarkupPercentYoY",
  SKU_UNIQUE = "skuUnique",
  SKU_UNIQUE_LM = "skuUniqueLM",
  SKU_UNIQUE_MOM = "skuUniqueMoM",
  SKU_UNIQUE_MOM_PERCENT = "skuUniqueMoMPercent",
  SKU_UNIQUE_LY = "skuUniqueLY",
  SKU_UNIQUE_YOY = "skuUniqueYoY",
  SKU_UNIQUE_YOY_PERCENT = "skuUniqueYoYPercent",
  CUMULATIVE_SKU_UNIQUE_TODAY_YEAR = "cumulativeSkuUniqueTodayYear",
  CUMULATIVE_SKU_UNIQUE_LAST_YEAR = "cumulativeSkuUniqueLastYear",
  CUMULATIVE_SKU_UNIQUE_YOY = "cumulativeSkuUniqueYoY",
  CUMULATIVE_SKU_UNIQUE_YOY_PERCENT = "cumulativeSkuUniqueYoYPercent",
  LEN_CHECK = "lenCheck",
  LEN_CHECK_LM = "lenCheckLM",
  LEN_CHECK_MOM = "lenCheckMoM",
  LEN_CHECK_MOM_PERCENT = "lenCheckMoMPercent",
  LEN_CHECK_LY = "lenCheckLY",
  LEN_CHECK_YOY = "lenCheckYoY",
  LEN_CHECK_YOY_PERCENT = "lenCheckYoYPercent",
  CUMULATIVE_LEN_CHECK_TODAY_YEAR = "cumulativeLenCheckTodayYear",
  CUMULATIVE_LEN_CHECK_LAST_YEAR = "cumulativeLenCheckLastYear",
  CUMULATIVE_LEN_CHECK_YOY = "cumulativeLenCheckYoY",
  cumulativeLenCheckYoYPercent = "cumulativeLenCheckYoYPercent",
  COUNT_CHECK_QR = "countCheckQr",
  COUNT_CHECK_QR_LM = "countCheckQrLM",
  COUNT_CHECK_QR_MOM = "countCheckQrMoM",
  COUNT_CHECK_QR_MOM_PERCENT = "countCheckQrMoMPercent",
  COUNT_CHECK_QR_LY = "countCheckQrLY",
  COUNT_CHECK_QR_YOY = "countCheckQrYoY",
  COUNT_CHECK_QR_YOY_PERCENT = "countCheckQrYoYPercent",
  CUMULATIVE_COUNT_CHECK_QR_TODAY_YEAR = "cumulativeCountCheckQrTodayYear",
  CUMULATIVE_COUNT_CHECK_QR_LAST_YEAR = "cumulativeCountCheckQrLastYear",
  CUMULATIVE_COUNT_CHECK_QR_YOY = "cumulativeCountCheckQrYoY",
  CUMULATIVE_COUNT_CHECK_QR_YOY_PERCENT = "cumulativeCountCheckQrYoYPercent",

  // Доля продаж им
  ONLINE_STORE_GROUP = "onlineStoreGroup",
  ONLINE_STORE_SHARE = "onlineStoreSharePercent",
  ONLINE_STORE_SHARE_LY = "onlineStoreSharePercentLY",
  ONLINE_STORE_SHARE_YOY = "onlineStoreSharePercentYoY",
  ONLINE_STORE_SHARE_LM = "onlineStoreSharePercentLM",
  ONLINE_STORE_SHARE_MOM = "onlineStoreSharePercentMoM",

  // Применение карты лояльности
  APP_LOYAL = "appLoyalPercent",
  APP_LOYAL_LM = "appLoyalPercentLM",
  APP_LOYAL_MOM = "appLoyalPercentMoM",
  APP_LOYAL_LY = "appLoyalPercentLY",
  APP_LOYAL_YOY = "appLoyalPercentYoY",

  // чеки карты по карте лояльности
  CHECK_LOYAL = "checkLoyal",
  CHECK_LOYAL_LM = "checkLoyalLM",
  CHECK_LOYAL_MOM = "checkLoyalMoM",
  CHECK_LOYAL_MOM_PERCENT = "checkLoyalMoMPercent",
  CHECK_LOYAL_LY = "checkLoyalLY",
  CHECK_LOYAL_YOY = "checkLoyalYoY",
  CHECK_LOYAL_YOY_PERCENT = "checkLoyalYoYPercent",

  // выручка интернет магазина
  PROCEEDS_IM = "proceedsIm",
  PROCEEDS_IM_LM = "proceedsImLM",
  PROCEEDS_IM_MOM = "proceedsImMoM",
  PROCEEDS_IM_MOM_PERCENT = "proceedsImMoMPercent",
  PROCEEDS_IM_LY = "proceedsImLY",
  PROCEEDS_IM_YOY = "proceedsImYoY",
  PROCEEDS_IM_YOY_PERCENT = "proceedsImYoYPercent",
}

export const formatNumber = (value: number) =>
  value ? divideNumberSpaces(value) : "-";
export const formatPercent = (value: number) => (value ? value + "%" : "-");

export const tableColumns: ColDef<any>[] = [
  {
    field: COLUMN_KEY.STORE_NAME,
    headerName: "Магазин",
    cellStyle: { textAlign: "left" },
    pinned: "left",
    width: 340,
    suppressHeaderMenuButton: true,
  },
  {
    field: COLUMN_KEY.PROCEEDS,
    headerName: "Выручка",
    headerTooltip: "Выручка",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_LM,
    headerName: "Выручка PM",
    headerTooltip: "В прошлом месяце",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_MOM,
    headerName: "Выручка MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
    headerName: "Выручка MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PROCEEDS_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_LY,
    headerName: "Выручка PY",
    headerClass: "column",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_YOY,
    headerName: "Выручка YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
    headerName: "Выручка YoY %",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PROCEEDS_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_TODAY_YEAR,
    headerName: "Выручка YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_LAST_YEAR,
    headerName: "Выручка PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_YOY,
    headerName: "Выручка YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_YOY_PERCENT,
    headerName: "Выручка YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_PROCEEDS,
    headerName: "Выручка Plan",
    headerTooltip: "План",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_PROCEEDS]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_PROCEEDS_EXECUTION_PERCENT,
    headerName: "Выручка PlanEx %",
    headerTooltip: "Текущее выполнение плана",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PLAN_PROCEEDS_EXECUTION_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_PROCEEDS_FORECAST,
    headerName: "Выручка Forecast",
    headerTooltip: "Прогноз выполнения на конец месяца",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_PROCEEDS_FORECAST]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_PROCEEDS_FORECAST_PERCENT,
    headerName: "Выручка Forecast %",
    headerTooltip: "Прогноз выполнения на конец месяца %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PLAN_PROCEEDS_FORECAST_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_PLAN,
    headerName: "Выручка Cplan",
    headerTooltip: "План накопительный с начала текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_PLAN]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_EXECUTION_PERCENT,
    headerName: "Выручка CEx %",
    headerTooltip: "Процент выполнение плана накопительно с начала года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_EXECUTION_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_FORECAST_PERCENT,
    headerName: "Выручка CForecast %",
    headerTooltip:
      "Прогноза на конец месяца накопительный с начала текущего года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_FORECAST_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK,
    headerName: "Кол. Чеков",
    headerTooltip: "Кол. Чеков",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.CHECK_LM,
    headerName: "Кол. Чеков PM",
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.CHECK_MOM,
    headerName: "Кол. Чеков MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.CHECK_MOM_PERCENT,
    headerName: "Кол. Чеков MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CHECK_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK_LY,
    headerName: "Кол. Чеков  PY",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.CHECK_YOY,
    headerName: "Кол. Чеков YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK_YOY_PERCENT,
    headerName: "Кол. Чеков YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CHECK_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_CHECK_TODAY_YEAR,
    headerName: "Кол. Чеков YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_CHECK_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_CHECK_LAST_YEAR,
    headerName: "Кол. Чеков PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_CHECK_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_CHECK_YOY,
    headerName: "Кол. Чеков YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_CHECK_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_CHECK_YOY_PERCENT,
    headerName: "Кол. Чеков YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_CHECK_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_CHECK,
    headerName: "Кол. Чеков Plan",
    headerTooltip: "План",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_CHECK]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.PLAN_CHECK_EXECUTION_PERCENT,
    headerName: "Кол. Чеков PlanEx %",
    headerTooltip: "Текущее выполнение выполнения плана",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PLAN_CHECK_EXECUTION_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.PLAN_CHECK_FORECAST,
    headerName: "Кол. Чеков Forecast",
    headerTooltip: "Прогноз выполнения на конец месяца",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_CHECK_FORECAST]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.PLAN_CHECK_FORECAST_PERCENT,
    headerName: "Кол. Чеков Forecast %",
    headerTooltip: "Прогноз выполнения на конец месяца %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PLAN_CHECK_FORECAST_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_CHECK_PLAN,
    headerName: "Кол. Чеков CPlan",
    headerTooltip: "План накопительный с начала текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_CHECK_PLAN]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PLAN_CHECK_EXECUTION_PERCENT,
    headerName: "Кол. Чеков CEx %",
    headerTooltip: "Процент выполнение плана накопительно с начала года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_PLAN_CHECK_EXECUTION_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PLAN_CHECK_FORECAST_PERCENT,
    headerName: "Кол. Чеков CForecast %",
    headerTooltip:
      "Прогноза на конец месяца накопительный с начала текущего года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_PLAN_CHECK_FORECAST_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK,
    headerName: "Ср. чек",
    headerTooltip: "Ср. чек",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.AVG_CHECK]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_LM,
    headerName: "Ср. Чек PM",
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.AVG_CHECK_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_MOM,
    headerName: "Ср. Чек MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.AVG_CHECK_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_MOM_PERCENT,
    headerName: "Ср. Чек MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.AVG_CHECK_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_LY,
    headerName: "Ср. Чек  PY",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.AVG_CHECK_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_YOY,
    headerName: "Ср. Чек YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.AVG_CHECK_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.AVG_CHECK_YOY_PERCENT,
    headerName: "Ср. Чек YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.AVG_CHECK_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_AVG_CHECK_TODAY_YEAR,
    headerName: "Ср. Чек YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_AVG_CHECK_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_AVG_CHECK_LAST_YEAR,
    headerName: "Ср. Чек PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_AVG_CHECK_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_AVG_CHECK_YOY,
    headerName: "Ср. Чек YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_AVG_CHECK_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_AVG_CHECK_YOY_PERCENT,
    headerName: "Ср. Чек YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_AVG_CHECK_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_AVG_CHECK,
    headerName: "Ср. Чек Plan",
    headerTooltip: "План",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_AVG_CHECK]),
  },
  {
    field: COLUMN_KEY.PLAN_AVG_CHECK_EXECUTION_PERCENT,
    headerName: "Ср. Чек PlanEx %",
    headerTooltip: "Текущее выполнение выполнения плана",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PLAN_AVG_CHECK_EXECUTION_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_AVG_CHECK_FORECAST,
    headerName: "Ср. Чек Forecast",
    headerTooltip: "Прогноз выполнения на конец месяца",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_AVG_CHECK_FORECAST]),
  },
  {
    field: COLUMN_KEY.PLAN_AVG_CHECK_FORECAST_PERCENT,
    headerName: "Ср. Чек Forecast %",
    headerTooltip: "Прогноз выполнения на конец месяца %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PLAN_AVG_CHECK_FORECAST_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_AVG_CHECK_PLAN,
    headerName: "Ср. Чек CPlan",
    headerTooltip: "План накопительный с начала текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_AVG_CHECK_PLAN]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PLAN_AVG_CHECK_EXECUTION_PERCENT,
    headerName: "Ср. Чек CEx %",
    headerTooltip: "Процент выполнение плана накопительно с начала года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_PLAN_AVG_CHECK_EXECUTION_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PLAN_AVG_CHECK_FORECAST_PERCENT,
    headerName: "Ср. Чек CForecast %",
    headerTooltip:
      "Прогноза на конец месяца накопительный с начала текущего года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_PLAN_AVG_CHECK_FORECAST_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC,
    headerName: "Выручка QC",
    headerTooltip: "Выручка по кюаркоду",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_QC]),
  },
  {
    field: COLUMN_KEY.PROCEEDS_Q_C_LM,
    headerTooltip: "В прошлом месяце",
    headerName: "Выручка QC PM",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_Q_C_LM]),
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC_MOM,
    headerName: "Выручка QC MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_QC_MOM]),
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC_MOM_PERCENT,
    headerName: "Изменение выручки QC к прошлому месяцу %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PROCEEDS_QC_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC_LY,
    headerName: "Выручка QC PY ",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_QC_LY]),
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC_YOY,
    headerName: "Выручка QC YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_QC_YOY]),
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC_YOY_PERCENT,
    headerName: "Выручка QC YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PROCEEDS_QC_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_TODAY_YEAR,
    headerName: "Выручка QC YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_LAST_YEAR,
    headerName: "Выручка QC PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_YOY,
    headerName: "Выручка QC YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_YOY_PERCENT,
    headerName: "Выручка QC YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_PROCEEDS_QC,
    headerName: "Выручка QC Plan",
    headerTooltip: "План",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_PROCEEDS_QC]),
  },
  {
    field: COLUMN_KEY.PLAN_PROCEEDS_QC_EXECUTION_PERCENT,
    headerName: "Выручка QC PlanEx %",
    headerTooltip: "Текущее выполнение выполнения плана",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PLAN_PROCEEDS_QC_EXECUTION_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_PROCEEDS_QC_FORECAST,
    headerName: "Выручка QC Forecast",
    headerTooltip: "Прогноз выполнения на конец месяца",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_PROCEEDS_QC_FORECAST]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_PROCEEDS_QC_FORECAST_PERCENT,
    headerName: "Выручка QC Forecast %",
    headerTooltip: "Прогноз выполнения на конец месяца %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PLAN_PROCEEDS_QC_FORECAST_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_PLAN,
    headerName: "Выручка QC CPlan",
    headerTooltip: "Накопительный план с начала года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_PLAN]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_QC_EXECUTION_PERCENT,
    headerName: "Выручка QC CPlanEx %",
    headerTooltip:
      "Прогноз накопительный с начала текущего года с учетом текщего месясяца",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_QC_EXECUTION_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_QC_FORECAST_PERCENT,
    headerName: "Выручка QC CForecast %",
    headerTooltip:
      "Прогноз на конец месяца накопительный с начала текущего года",
    valueFormatter: (params: any) =>
      formatNumber(
        params.data[COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_QC_FORECAST_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.SHARE_OF_PAYMENTS_QC,
    headerName: "Применение QC %",
    headerTooltip: "Применение оплаты по Qc",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.SHARE_OF_PAYMENTS_QC]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC,
    headerName: "Применение QC % Plan",
    headerTooltip: "План применения оплаты по Qc",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_EXECUTION_PERCENT,
    headerName: "Применение QC % PlanEx",
    headerTooltip: "Текущее выполнение плана",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_EXECUTION_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_FORECAST,
    headerName: "Применение QC % Forecast",
    headerTooltip: "Прогноз выполнения на конец месяца",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_FORECAST]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_FORECAST_PERCENT,
    headerName: "Применение QC % Forecast %",
    headerTooltip: "Прогноз выполнения на конец месяца %",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_FORECAST_PERCENT]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },

  {
    field: COLUMN_KEY.DISCOUNT,
    headerName: "Скидка, руб.",
    headerTooltip: "Скидка",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.DISCOUNT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_LM,
    headerName: "Скидки, руб. PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.DISCOUNT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_MOM,
    headerName: "Скидки, руб. MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.DISCOUNT_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_MOM_PERCENT,
    headerName: "Скидки, руб. MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.DISCOUNT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_LY,
    headerName: "Скидки, руб. PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.DISCOUNT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_YOY,
    headerName: "Скидки, руб. YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.DISCOUNT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_YOY_PERCENT,
    headerName: "Скидки, руб. YoY%",
    headerTooltip: "Процент изменения по сравнению с прошлым годом %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.DISCOUNT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_DISCOUNT_TODAY_YEAR,
    headerName: "Скидки, руб. YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_DISCOUNT_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_DISCOUNT_LAST_YEAR,
    headerName: "Скидки, руб. PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_DISCOUNT_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_DISCOUNT_YOY,
    headerName: "Скидки, руб. YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_DISCOUNT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT,
    headerName: "Скидка %",
    headerTooltip: "Скидка %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.DISCOUNT_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_LM,
    headerName: "Скидки % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.DISCOUNT_PERCENT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_MOM_PERCENT,
    headerName: "Скидки % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.DISCOUNT_PERCENT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_LY,
    headerName: "Скидки %  PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.DISCOUNT_PERCENT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT,
    headerName: "Скидки % YoY",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_DISCOUNT_YOY_PERCENT,
    headerName: "Скидки YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_DISCOUNT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_TODAY_YEAR,
    headerName: "Скидки % YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_TODAY_YEAR]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_LAST_YEAR,
    headerName: "Скидки % PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_LAST_YEAR]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE,
    headerName: "Себестоимость",
    headerTooltip: "Себестоимость",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.COST_PRICE]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_LM,
    headerName: "Себестоимость PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.COST_PRICE_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_MOM,
    headerName: "Себестоимость MOM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.COST_PRICE_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
    headerName: "Себестоимость MOM%",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.COST_PRICE_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_LY,
    headerName: "Себестоимость PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.COST_PRICE_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_YOY,
    headerName: "Себестоимость YOY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.COST_PRICE_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
    headerName: "Себестоимость YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.COST_PRICE_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_COST_PRICE_TODAY_YEAR,
    headerName: "Себестоимость YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_COST_PRICE_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_COST_PRICE_LAST_YEAR,
    headerName: "Себестоимость  PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_COST_PRICE_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_COST_PRICE_YOY,
    headerName: "Себестоимость YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_COST_PRICE_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_COST_PRICE_YOY_PERCENT,
    headerName: "Себес. YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_COST_PRICE_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT,
    headerName: "Наценка, руб.",
    headerTooltip: "Наценка",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROFIT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_LM,
    headerName: "Наценка, руб. PM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROFIT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_MOM,
    headerName: "Наценка, руб. MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROFIT_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_MOM_PERCENT,
    headerName: "Наценка, руб. MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PROFIT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_LY,
    headerName: "Наценка, руб. PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROFIT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_YOY,
    headerName: "Наценка, руб. YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROFIT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_YOY_PERCENT,
    headerName: "Наценка, руб. YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PROFIT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROFIT_TODAY_YEAR,
    headerName: "Наценка, руб. YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROFIT_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROFIT_LAST_YEAR,
    headerName: "Наценка, руб. PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROFIT_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROFIT_YOY,
    headerName: "Наценка, руб. YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_PROFIT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_PROFIT_YOY_PERCENT,
    headerName: "Наценка, руб. YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_PROFIT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF,
    headerName: "Списания, руб.",
    headerTooltip: "Списания",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.WRITE_OFF]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_LM,
    headerName: "Списания, руб. PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.WRITE_OFF_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_MOM,
    headerName: "Списания  MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.WRITE_OFF_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
    headerName: "Списания, руб. MoM %",
    headerTooltip:
      "Процент изменения списания в рублях по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.WRITE_OFF_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_LY,
    headerName: "Списания, руб.  PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.WRITE_OFF_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_YOY,
    headerName: "Списания, руб. YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.WRITE_OFF_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
    headerName: "Списания, руб. YoY %",
    headerTooltip:
      "Процент изменения списания в рублях по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.WRITE_OFF_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_WRITE_OFF_TODAY_YEAR,
    headerName: "Списания, руб. YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_WRITE_OFF_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_WRITE_OFF_LAST_YEAR,
    headerName: "Списания, руб. PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_WRITE_OFF_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_WRITE_OFF_YOY,
    headerName: "Списания, руб. YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_WRITE_OFF_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_WRITE_OFF_YOY_PERCENT,
    headerName: "Списания, руб. YTDoPY %",
    headerTooltip:
      "Процент изменения списания в рублях накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_WRITE_OFF_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT,
    headerName: "Списания %",
    headerTooltip: "Списания %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.WRITE_OFF_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT_LM,
    headerName: "Списания % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.WRITE_OFF_PERCENT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT,
    headerName: "Списания % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT_LY,
    headerName: "Списания % PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.WRITE_OFF_PERCENT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
    headerName: "Списания % YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_TODAY_YEAR,
    headerName: "Списания, руб. YTD %",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_TODAY_YEAR]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_LAST_YEAR,
    headerName: "Списания % PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_LAST_YEAR]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_YOY,
    headerName: "Списания % YTDoPY",
    headerTooltip: "Накопительный итог прошлый год", // ИСПРАВИТЬ !!!!
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#71DE56" };
      } else if (params.value > 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT,
    headerName: "Маржа %",
    headerTooltip: "Маржа %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARGIN_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_LM,
    headerName: "Маржа % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARGIN_PERCENT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_MOM_PERCENT,
    headerName: "Маржа % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARGIN_PERCENT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_LY,
    headerName: "Маржа % PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARGIN_PERCENT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_YOY_PERCENT,
    headerName: "Маржа % YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARGIN_PERCENT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_TODAY_YEAR,
    headerName: "Маржа % YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_TODAY_YEAR]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_LAST_YEAR,
    headerName: "Маржа % PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_LAST_YEAR]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_YOY,
    headerName: "Маржа % YTDoPY",
    headerTooltip: "Накопительный итог прошлый год", // Исправить
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT,
    headerName: "Наценка %",
    headerTooltip: "Наценка %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARKUP_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_LM,
    headerName: "Наценка % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARKUP_PERCENT_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_MOM_PERCENT,
    headerName: "Наценка % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARKUP_PERCENT_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_LY,
    headerName: "Наценка % PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARKUP_PERCENT_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_YOY_PERCENT,
    headerName: "Наценка % YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.MARKUP_PERCENT_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_TODAY_YEAR,
    headerName: "Наценка % YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_TODAY_YEAR]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_LAST_YEAR,
    headerName: "Наценка % PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatPercent(
        params.data[COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_LAST_YEAR]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_YOY,
    headerName: "Наценка % YTDoPY",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.SKU_UNIQUE,
    headerName: "SKU в чеке",
    headerTooltip: "SKU в чеке",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.SKU_UNIQUE]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.SKU_UNIQUE_LM,
    headerName: "SKU в чеке PM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.SKU_UNIQUE_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.SKU_UNIQUE_MOM,
    headerName: "SKU в чеке MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.SKU_UNIQUE_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.SKU_UNIQUE_MOM_PERCENT,
    headerName: "SKU в чеке MoM %",
    headerTooltip: "Процент изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.SKU_UNIQUE_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.SKU_UNIQUE_LY,
    headerName: "SKU в чеке PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.SKU_UNIQUE_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.SKU_UNIQUE_YOY,
    headerName: "SKU в чеке YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.SKU_UNIQUE_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.SKU_UNIQUE_YOY_PERCENT,
    headerName: "SKU в чеке YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.SKU_UNIQUE_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_TODAY_YEAR,
    headerName: "SKU в чеке YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_LAST_YEAR,
    headerName: "SKU в чеке PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_YOY,
    headerName: "SKU в чеке YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_YOY_PERCENT,
    headerName: "SKU в чеке YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.LEN_CHECK,
    headerName: "Длина чека",
    headerTooltip: "Длина чека",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.LEN_CHECK]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.LEN_CHECK_LM,
    headerName: "Длина чека  PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.LEN_CHECK_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.LEN_CHECK_MOM,
    headerName: "Длина чека MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.LEN_CHECK_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.LEN_CHECK_MOM_PERCENT,
    headerName: "Длина чека MoM %",
    headerTooltip:
      "Процентное изменение длины чека по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.LEN_CHECK_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.LEN_CHECK_LY,
    headerName: "Длина чека PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.LEN_CHECK_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.LEN_CHECK_YOY,
    headerName: "Длина чека YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.LEN_CHECK_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.LEN_CHECK_YOY_PERCENT,
    headerName: "Длина чека YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.LEN_CHECK_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_LEN_CHECK_TODAY_YEAR,
    headerName: "Длина чека YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_LEN_CHECK_TODAY_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_LEN_CHECK_LAST_YEAR,
    headerName: "Длина чека PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_LEN_CHECK_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_LEN_CHECK_YOY,
    headerName: "Длина чека YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_LEN_CHECK_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.cumulativeLenCheckYoYPercent,
    headerName: "Длина чека YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.cumulativeLenCheckYoYPercent]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.COUNT_CHECK_QR,
    headerName: "Кол. Чеков  QC",
    headerTooltip: "Кол. Чеков  QC",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.COUNT_CHECK_QR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COUNT_CHECK_QR_LM,
    headerName: "Кол. Чеков  QC PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.COUNT_CHECK_QR_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COUNT_CHECK_QR_MOM,
    headerName: "Кол. Чеков  QC MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.COUNT_CHECK_QR_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COUNT_CHECK_QR_MOM_PERCENT,
    headerName: "Кол. Чеков  QC MoM %",
    headerTooltip: "Процент Изменение по сравнению с прошлым месяцем %",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.COUNT_CHECK_QR_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.COUNT_CHECK_QR_LY,
    headerName: "Кол. Чеков  QC PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.COUNT_CHECK_QR_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COUNT_CHECK_QR_YOY,
    headerName: "Кол. Чеков QC YoY %",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.COUNT_CHECK_QR_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.COUNT_CHECK_QR_YOY_PERCENT,
    headerName: "Кол. чека QC YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.COUNT_CHECK_QR_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_TODAY_YEAR,
    headerName: "Кол. чека QC YTD",
    headerTooltip: "Накопительный итог с начало текущего года",
    valueFormatter: (params: any) =>
      formatNumber(
        params.data[COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_TODAY_YEAR]
      ),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_LAST_YEAR,
    headerName: "Кол. чека QC PYTD",
    headerTooltip: "Накопительный итог прошлый год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_LAST_YEAR]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_YOY,
    headerName: "Кол.чека QC YTDoPY",
    headerTooltip:
      "Изменение накопительного итога по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_YOY_PERCENT,
    headerName: "Кол.чека QC YTDoPY %",
    headerTooltip:
      "Процент изменение накопительного итога по сравнению с прошлым годом ",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    headerName: "ИМ Доля продаж %",
    headerTooltip: "ИМ Доля продаж%",
    field: COLUMN_KEY.ONLINE_STORE_SHARE,
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.ONLINE_STORE_SHARE]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    headerName: "ИМ Доля продаж % PM",
    field: COLUMN_KEY.ONLINE_STORE_SHARE_LM,
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.ONLINE_STORE_SHARE_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    headerName: "ИМ Доля продаж % MoM",
    field: COLUMN_KEY.ONLINE_STORE_SHARE_MOM,
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.ONLINE_STORE_SHARE_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    headerName: "ИМ Доля продаж % PY",
    field: COLUMN_KEY.ONLINE_STORE_SHARE_LY,
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.ONLINE_STORE_SHARE_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    headerName: "ИМ Доля продаж % YOY",
    field: COLUMN_KEY.ONLINE_STORE_SHARE_YOY,
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data?.[COLUMN_KEY.ONLINE_STORE_SHARE_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.APP_LOYAL,
    headerName: "Применение карт %",
    headerTooltip: "Применение карты лояльности",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.APP_LOYAL]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.APP_LOYAL_LM,
    headerName: "Применение карт % LM",
    headerTooltip: "Количество лояльных клиентов за последний месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.APP_LOYAL_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.APP_LOYAL_MOM,
    headerName: "Применение карт % MoM",
    headerTooltip: "Изменение лояльности по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.APP_LOYAL_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.APP_LOYAL_LY,
    headerName: "Применение карт % LY",
    headerTooltip: "Количество лояльных клиентов за последний год",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.APP_LOYAL_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.APP_LOYAL_YOY,
    headerName: "Применение карт % YoY",
    headerTooltip: "Изменение лояльности по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.APP_LOYAL_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK_LOYAL,
    headerName: "Чеки лояльности",
    headerTooltip: "Количество чеков лояльности",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK_LOYAL]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK_LOYAL_LM,
    headerName: "Чеки лояльности LM",
    headerTooltip: "Количество чеков лояльности за последний месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK_LOYAL_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK_LOYAL_MOM,
    headerName: "Чеки лояльности MoM",
    headerTooltip: "Изменение чеков лояльности по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK_LOYAL_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK_LOYAL_MOM_PERCENT,
    headerName: "Чеки лояльности MoM %",
    headerTooltip:
      "Процент изменения чеков лояльности по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CHECK_LOYAL_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK_LOYAL_LY,
    headerName: "Чеки лояльности LY",
    headerTooltip: "Количество чеков лояльности за последний год",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK_LOYAL_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK_LOYAL_YOY,
    headerName: "Чеки лояльности YoY",
    headerTooltip: "Изменение чеков лояльности по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.CHECK_LOYAL_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.CHECK_LOYAL_YOY_PERCENT,
    headerName: "Чеки лояльности YoY %",
    headerTooltip:
      "Процент изменения чеков лояльности по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.CHECK_LOYAL_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_IM,
    headerName: "Выручка ИМ",
    headerTooltip: "Выручка интернет-магазина",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_IM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_IM_LM,
    headerName: "Выручка ИМ PM",
    headerTooltip: "Выручка интернет-магазина за последний месяц",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_IM_LM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_IM_MOM,
    headerName: "Выручка ИМ MoM",
    headerTooltip:
      "Изменение выручки интернет-магазина по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_IM_MOM]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_IM_MOM_PERCENT,
    headerName: "Выручка ИМ PM %",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PROCEEDS_IM_MOM_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_IM_YOY,
    headerName: "Выручка ИМ YoY",
    headerTooltip:
      "Изменение выручки интернет-магазина по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_IM_YOY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_IM_YOY_PERCENT,
    headerName: "Выручка ИМ YoY %",
    headerTooltip:
      "Процент изменения выручки интернет-магазина по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      formatPercent(params.data[COLUMN_KEY.PROCEEDS_IM_YOY_PERCENT]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_IM_LY,
    headerName: "Выручка ИМ PY",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      formatNumber(params.data[COLUMN_KEY.PROCEEDS_IM_LY]),
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
];
