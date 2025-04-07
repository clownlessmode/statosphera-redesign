import { Button } from "@shared/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

import { Eraser } from "lucide-react";

import { FC } from "react";
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
export const useIndicatorList = () => {
  return [
    {
      label: "Выручка",
      value: COLUMN_KEY.GROUP_PROCEEDS,
      children: [
        {
          label: "Выручка",
          value: COLUMN_KEY.PROCEEDS,
        },
        {
          label: "Выручка PM",
          value: COLUMN_KEY.PROCEEDS_LM,
        },
        {
          label: "Выручка MOM",
          value: COLUMN_KEY.PROCEEDS_MOM,
        },
        {
          label: "Выручка MOM%",
          value: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
        },
        {
          label: "Выручка PY",
          value: COLUMN_KEY.PROCEEDS_LY,
        },
        {
          label: "Выручка YOY",
          value: COLUMN_KEY.PROCEEDS_YOY,
        },
        {
          label: "Выручка YOY%",
          value: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
        },
      ],
    },
    {
      label: "Списания, руб",
      // disabled: mode === ModeVariant.CHECK,
      value: "writeOffGroup",
      children: [
        {
          label: "Списания, руб.",
          value: COLUMN_KEY.WRITE_OFF,
        },
        {
          label: "Списания, руб. PM",
          value: COLUMN_KEY.WRITE_OFF_LM,
        },
        {
          label: "Списания, руб. MOM",
          value: COLUMN_KEY.WRITE_OFF_MOM,
        },
        {
          label: "Списания, руб. MOM%",
          value: COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
        },
        {
          label: "Списания, руб. PY",
          value: COLUMN_KEY.WRITE_OFF_LY,
        },
        {
          label: "Списания, руб. YOY",
          value: COLUMN_KEY.WRITE_OFF_YOY,
        },
        {
          label: "Списания, руб. YOY%",
          value: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
        },
      ],
    },
    {
      label: "Списания %",
      value: "writeOffPercentGroup",
      // disabled: mode === ModeVariant.CHECK,
      children: [
        {
          label: "Списания %",
          value: COLUMN_KEY.WRITE_OFF_PERCENT,
        },
        {
          label: "Списания % PM",
          value: COLUMN_KEY.WRITE_OFF_PERCENT_LM,
        },
        {
          label: "Списания % MoM",
          value: COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT,
        },
        {
          label: "Списания % PY",
          value: COLUMN_KEY.WRITE_OFF_PERCENT_LY,
        },
        {
          label: "Списания % YoY",
          value: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_YOY,
        },
        {
          label: "Списания, руб. YOY%",
          value: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
        },
      ],
    },
    {
      label: "Наценка, руб.",
      value: COLUMN_KEY.GROUP_PROFIT,
      // disabled: mode === ModeVariant.CHECK,
      children: [
        {
          value: COLUMN_KEY.PROFIT,
          label: "Наценка, руб.",
        },
        {
          value: COLUMN_KEY.PROFIT_LM,
          label: "Наценка, руб. PM",
        },
        {
          value: COLUMN_KEY.PROFIT_MOM,
          label: "Наценка, руб. MoM",
        },
        {
          value: COLUMN_KEY.PROFIT_MOM_PERCENT,
          label: "Наценка, руб. MoM %",
        },
        {
          value: COLUMN_KEY.PROFIT_LY,
          label: "Наценка, руб. PY",
        },
        {
          value: COLUMN_KEY.PROFIT_YOY,
          label: "Наценка, руб. YoY",
        },
        {
          value: COLUMN_KEY.PROFIT_YOY_PERCENT,
          label: "Наценка, руб. YoY %",
        },
      ],
    },
    {
      label: "Наценка, %",
      value: COLUMN_KEY.GROUP_PROFIT_PERCENT,
      // disabled: mode === ModeVariant.CHECK,
      children: [
        {
          value: COLUMN_KEY.MARKUP_PERCENT,
          label: "Наценка %",
        },
        {
          value: COLUMN_KEY.MARKUP_PERCENT_LM,
          label: "Наценка % PM",
        },
        {
          value: COLUMN_KEY.MARKUP_PERCENT_MOM_PERCENT,
          label: "Наценка % MoM",
        },
        {
          value: COLUMN_KEY.MARKUP_PERCENT_LY,
          label: "Наценка % PY",
        },
        {
          value: COLUMN_KEY.MARKUP_PERCENT_YOY_PERCENT,
          label: "Наценка % YoY",
        },
      ],
    },
    {
      label: "Себестоимость",
      value: COLUMN_KEY.GROUP_COST_PRICE,
      // disabled: mode === ModeVariant.CHECK,
      children: [
        {
          value: COLUMN_KEY.COST_PRICE,
          label: "Себестоимость",
        },
        {
          value: COLUMN_KEY.COST_PRICE_LM,
          label: "Себестоимость PM",
        },
        {
          value: COLUMN_KEY.COST_PRICE_MOM,
          label: "Себестоимость MOM",
        },
        {
          value: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
          label: "Себестоимость MOM%",
        },
        {
          value: COLUMN_KEY.COST_PRICE_LY,
          label: "Себестоимость PY",
        },
        {
          value: COLUMN_KEY.COST_PRICE_YOY,
          label: "Себестоимость YOY",
        },
        {
          value: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
          label: "Себестоимость YoY %",
        },
      ],
    },
    {
      label: "Скидки, руб.",
      value: COLUMN_KEY.GROUP_DISCOUNT,
      children: [
        {
          label: "Скидка, руб.",
          value: COLUMN_KEY.DISCOUNT,
        },
        {
          label: "Скидки, руб. PM",
          value: COLUMN_KEY.DISCOUNT_LM,
        },
        {
          label: "Скидки, руб. MoM",
          value: COLUMN_KEY.DISCOUNT_MOM,
        },
        {
          label: "Скидки, руб. MoM %",
          value: COLUMN_KEY.DISCOUNT_MOM_PERCENT,
        },
        {
          value: COLUMN_KEY.DISCOUNT_LY,
          label: "Скидки, руб. PY",
        },
        {
          value: COLUMN_KEY.DISCOUNT_YOY,
          label: "Скидки, руб. YoY",
        },
        {
          value: COLUMN_KEY.DISCOUNT_YOY_PERCENT,
          label: "Скидки, руб. YoY%%",
        },
      ],
    },
    {
      label: "Скидка %",
      value: COLUMN_KEY.GROUP_DISCOUNT_PERCENT,
      children: [
        {
          value: COLUMN_KEY.DISCOUNT_PERCENT,
          label: "Скидка %",
        },
        {
          value: COLUMN_KEY.DISCOUNT_PERCENT_LM,
          label: "Скидки % PM",
        },
        {
          value: COLUMN_KEY.DISCOUNT_PERCENT_MOM_PERCENT,
          label: "Скидки % MoM",
        },
        {
          value: COLUMN_KEY.DISCOUNT_PERCENT_LY,
          label: "Скидки %  PY",
        },
        {
          value: COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT,
          label: "Скидки % YoY",
        },
      ],
    },
    {
      label: "Маржа %",
      value: "marginGroup",
      // disabled: mode === ModeVariant.CHECK,
      children: [
        {
          value: COLUMN_KEY.MARGIN_PERCENT,
          label: "Маржа %",
        },
        {
          value: COLUMN_KEY.MARGIN_PERCENT_LM,
          label: "Маржа % PM",
        },
        {
          value: COLUMN_KEY.MARGIN_PERCENT_MOM_PERCENT,
          label: "Маржа % MoM",
        },
        {
          value: COLUMN_KEY.MARGIN_PERCENT_LY,
          label: "Маржа % PY",
        },
        {
          value: COLUMN_KEY.MARGIN_PERCENT_YOY_PERCENT,
          label: "Маржа % YoY",
        },
      ],
    },
    {
      label: "Кол. Продаж",
      value: "salesUniqueGroup",
      children: [
        {
          label: "Кол. Продаж",
          value: COLUMN_KEY.SALES,
        },
        {
          label: "Кол. Продаж PM",
          value: COLUMN_KEY.SALES_LM,
        },
        {
          label: "Кол. Продаж MoM",
          value: COLUMN_KEY.SALES_MOM,
        },
        {
          label: "Кол. Продаж MoM%",
          value: COLUMN_KEY.SALES_MOM_PERCENT,
        },

        {
          label: "Кол. Продаж PY",
          value: COLUMN_KEY.SALES_LY,
        },
        {
          label: "Кол. Продаж YoY",
          value: COLUMN_KEY.SALES_YOY,
        },
        {
          label: "Кол. Продаж YoY%",
          value: COLUMN_KEY.SALES_YOY_PERCENT,
        },
      ],
    },
    {
      label: "Средний чек",
      value: "avgCheckGroup",
      // disabled: mode === ModeVariant.COMMERCIAL,
      children: [
        {
          value: COLUMN_KEY.AVG_CHECK,
          label: "Ср. чек",
        },
        {
          value: COLUMN_KEY.AVG_CHECK_LM,
          label: "Ср. Чек PM",
        },
        {
          value: COLUMN_KEY.AVG_CHECK_MOM,
          label: "Ср. Чек MoM",
        },
        {
          value: COLUMN_KEY.AVG_CHECK_MOM_PERCENT,
          label: "Ср. Чек MoM %",
        },
        {
          value: COLUMN_KEY.AVG_CHECK_LY,
          label: "Ср. Чек  PY",
        },
        {
          value: COLUMN_KEY.AVG_CHECK_YOY,
          label: "Ср. Чек YoY",
        },
        {
          value: COLUMN_KEY.AVG_CHECK_YOY_PERCENT,
          label: "Ср. Чек YoY %",
        },
      ],
    },
    {
      label: "Бонус",
      value: "bonusGroup",
      children: [
        {
          value: COLUMN_KEY.BONUS,
          label: "Бонус",
        },
        {
          value: COLUMN_KEY.BONUS_LM,
          label: "Бонус PM",
        },
        {
          value: COLUMN_KEY.BONUS_MOM,
          label: "Бонус MoM",
        },
        {
          value: COLUMN_KEY.BONUS_MOM_PERCENT,
          label: "Бонус MoM %",
        },
        {
          value: COLUMN_KEY.BONUS_LY,
          label: "Бонус  PY",
        },
        {
          value: COLUMN_KEY.BONUS_YOY,
          label: "Бонус YoY",
        },
        {
          value: COLUMN_KEY.BONUS_YOY_PERCENT,
          label: "Бонус YoY %",
        },
      ],
    },
    {
      label: "Бонус %",
      value: "bonusPercentGroup",
      children: [
        {
          value: COLUMN_KEY.BONUS_PERCENT,
          label: "Бонус %",
        },
        {
          value: COLUMN_KEY.BONUS_PERCENT_LM,
          label: "Бонус % PM",
        },
        {
          value: COLUMN_KEY.BONUS_PERCENT_MOM_PERCENT,
          label: "Бонус % MoM",
        },
        {
          value: COLUMN_KEY.BONUS_PERCENT_LY,
          label: "Бонус %  PY",
        },
        {
          value: COLUMN_KEY.BONUS_PERCENT_YOY_PERCENT,
          label: "Бонус % YoY",
        },
      ],
    },
    {
      label: "Вес",
      value: COLUMN_KEY.WEIGHT_GROUP,
      // disabled: mode === ModeVariant.CHECK,
      children: [
        {
          label: "Вес",
          value: COLUMN_KEY.WEIGHT,
        },
        {
          label: "Вес PM",
          value: COLUMN_KEY.WEIGHT_LM,
        },
        {
          label: "Вес MOM",
          value: COLUMN_KEY.WEIGHT_MOM,
        },
        {
          label: "Вес MOM%",
          value: COLUMN_KEY.WEIGHT_MOM_PERCENT,
        },
        {
          label: "Вес PY",
          value: COLUMN_KEY.WEIGHT_LY,
        },
        {
          label: "Вес YOY",
          value: COLUMN_KEY.WEIGHT_YOY,
        },
        {
          label: "Вес YOY%",
          value: COLUMN_KEY.WEIGHT_YOY_PERCENT,
        },
      ],
    },
  ];
};

export const useUniqueValues = () => {
  // const mode = useMode((s) => s.mode);

  return [
    {
      label: "Магазины",
      value: "storeUniqueGroup",
      children: [
        {
          label: "Магазины",
          value: COLUMN_KEY.UNIQUE_STORE,
        },
        {
          label: "Магазины PM",
          value: COLUMN_KEY.UNIQUE_STORE_LM,
        },
        {
          label: "Магазины PY",
          value: COLUMN_KEY.UNIQUE_STORE_LY,
        },
      ],
    },
    {
      label: "Каналы",
      value: "channelUniqueGroup",
      children: [
        {
          label: "Каналы",
          value: COLUMN_KEY.UNIQUE_CHANNEL,
        },
        {
          label: "Каналы PM",
          value: COLUMN_KEY.UNIQUE_CHANNEL_LM,
        },
        {
          label: "Каналы PY",
          value: COLUMN_KEY.UNIQUE_CHANNEL_LY,
        },
      ],
    },
    {
      label: "Регионы",
      value: "regionUniqueGroup",
      children: [
        {
          label: "Регионы",
          value: COLUMN_KEY.UNIQUE_REGION,
        },
        {
          label: "Регионы PM",
          value: COLUMN_KEY.UNIQUE_REGION_LM,
        },
        {
          label: "Регионы PY",
          value: COLUMN_KEY.UNIQUE_REGION_LY,
        },
      ],
    },
    {
      label: "Города",
      value: "cityUniqueGroup",
      children: [
        {
          label: "Города",
          value: COLUMN_KEY.UNIQUE_CITY,
        },
        {
          label: "Города PM",
          value: COLUMN_KEY.UNIQUE_CITY_LM,
        },
        {
          label: "Города PY",
          value: COLUMN_KEY.UNIQUE_CITY_LY,
        },
      ],
    },
    {
      label: "Номера карт",
      value: "cardNumberUniqueGroup",
      // disabled: mode === ModeVariant.COMMERCIAL,
      children: [
        {
          label: "Номера карт",
          value: COLUMN_KEY.UNIQUE_CARD_NUMBER,
        },
        {
          label: "Номера карт PM",
          value: COLUMN_KEY.UNIQUE_CARD_NUMBER_LM,
        },
        {
          label: "Номера карт PY",
          value: COLUMN_KEY.UNIQUE_CARD_NUMBER_LY,
        },
      ],
    },
    {
      label: "Чек",
      value: "checkUniqueGroup",
      // disabled: mode === ModeVariant.COMMERCIAL,
      children: [
        {
          label: "Чек",
          value: COLUMN_KEY.UNIQUE_CHECK,
        },
        {
          label: "Чек PM",
          value: COLUMN_KEY.UNIQUE_CHECK_LM,
        },
        {
          label: "Чек PY",
          value: COLUMN_KEY.UNIQUE_CHECK_LY,
        },
      ],
    },
  ];
};

const Indicators: FC = () => {
  // const indicators = useIndicatorList()
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Показатели</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Группируйте данные по нужным столбцам
          </CardDescription>
          <Button
            size={"sm"}
            className="text-muted-foreground"
            variant={"outline"}
          >
            Очистить фильтры <Eraser className="text-primary/80" />
          </Button>
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default Indicators;
