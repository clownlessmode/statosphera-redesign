/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { ColDef } from "ag-grid-community";

export enum COLUMN_KEY {
  //Коэффициент оборачиваемости ITR
  ITR_GROUP = "itrGroup",
  ITR = "itr",
  ITR_LM = "itrLM",
  ITR_MOM = "itrMoM",
  ITR_MOM_PERCENT = "itrMoMPercent",
  ITR_LY = "itrLY",
  ITR_YOY = "itrYoY",
  ITR_YOY_PERCENT = "itrYoYPercent",

  //Причины списания
  OPS = "ops",
  ACCOUNT_NAME = "accountName",

  // Бонусы начисление
  BONUS_ACCRUAL_GROUP = "bonusAccrualGroup",
  BONUS_ACCRUAL = "bonusAccrual",
  BONUS_ACCRUAL_LM = "bonusAccrualLM",
  BONUS_ACCRUAL_MOM = "bonusAccrualMoM",
  BONUS_ACCRUAL_MOM_PERCENT = "bonusAccrualMoMPercent",
  BONUS_ACCRUAL_LY = "bonusAccrualLY",
  BONUS_ACCRUAL_YOY = "bonusAccrualYoY",
  BONUS_ACCRUAL_YOY_PERCENT = "bonusAccrualYoYPercent",

  //Бонусы Списание
  BONUS_WRITEOFF_GROUP = "bonusWriteOffGroup",
  BONUS_WRITEOFF = "bonusWriteOff",
  BONUS_WRITEOFF_LM = "bonusWriteOffLM",
  BONUS_WRITEOFF_MOM = "bonusWriteOffMoM",
  BONUS_WRITEOFF_MOM_PERCENT = "bonusWriteOffMoMPercent",
  BONUS_WRITEOFF_LY = "bonusWriteOffLY",
  BONUS_WRITEOFF_YOY = "bonusWriteOffYoY",
  BONUS_WRITEOFF_YOY_PERCENT = "bonusWriteOffYoYPercent",

  // Бонусы начисление %
  BONUS_WRITEOFF_PERCENT_GROUP = "bonusWriteOffPercentGroup",
  BONUS_WRITEOFF_PERCENT = "bonusWriteOffPercent",
  BONUS_WRITEOFF_PERCENT_LM = "bonusWriteOffPercentLM",
  BONUS_WRITEOFF_PERCENT_MOM = "bonusWriteOffPercentMoM",
  BONUS_WRITEOFF_PERCENT_MOM_PERCENT = "bonusWriteOffPercentMoMPercent",
  BONUS_WRITEOFF_PERCENT_LY = "bonusWriteOffPercentLY",
  BONUS_WRITEOFF_PERCENT_YOY = "bonusWriteOffPercentYoY",
  BONUS_WRITEOFF_PERCENT_YOY_PERCENT = "bonusWriteOffPercentYoYPercent",

  // Бонусы списания %
  BONUS_ACCRUAL_PERCENT_GROUP = "bonusAccrualPercentGroup",
  BONUS_ACCRUAL_PERCENT = "bonusAccrualPercent",
  BONUS_ACCRUAL_PERCENT_LM = "bonusAccrualPercentLM",
  BONUS_ACCRUAL_PERCENT_MOM = "bonusAccrualPercentMoM",
  BONUS_ACCRUAL_PERCENT_MOM_PERCENT = "bonusAccrualPercentMoMPercent",
  BONUS_ACCRUAL_PERCENT_LY = "bonusAccrualPercentLY",
  BONUS_ACCRUAL_PERCENT_YOY = "bonusAccrualPercentYoY",
  BONUS_ACCRUAL_PERCENT_YOY_PERCENT = "bonusAccrualPercentYoYPercent",

  // остатки товара на начало дня
  OPENING_BALANCE_GROUP = "openingBalanceGroup",
  OPENING_BALANCE = "openingBalance",
  OPENING_BALANCE_LM = "openingBalanceLM",
  OPENING_BALANCE_MOM = "openingBalanceMoM",
  OPENING_BALANCE_MOM_PERCENT = "openingBalanceMoMPercent",
  OPENING_BALANCE_LY = "openingBalanceLY",
  OPENING_BALANCE_YOY = "openingBalanceYoY",

  // остатки товара на конец дня
  FINAL_BALANCE_GROUP = "finalBalanceGroup",
  FINAL_BALANCE = "finalBalance",
  FINAL_BALANCE_LM = "finalBalanceLM",
  FINAL_BALANCE_MOM = "finalBalanceMoM",
  FINAL_BALANCE_MOM_PERCENT = "finalBalanceMoMPercent",
  FINAL_BALANCE_LY = "finalBalanceLY",
  FINAL_BALANCE_YOY = "finalBalanceYoY",
  // Списания вес
  WRITEOFF_WEIGHT_GROUP = "writeOffWeightGroup",
  WRITEOFF_WEIGHT = "writeOffWeight",
  WRITEOFF_WEIGHT_LY = "writeOffWeightLY",
  WRITEOFF_WEIGHT_YOY = "writeOffWeightYoY",
  WRITEOFF_WEIGHT_PERCENT_YOY = "writeOffWeightYoYPercent",
  WRITEOFF_WEIGHT_LM = "writeOffWeightLM",
  WRITEOFF_WEIGHT_MOM = "writeOffWeightMoM",
  WRITEOFF_WEIGHT_PERCENT_MOM = "writeOffWeightMoMPercent",
  // Списания колличество
  WRITEOFF_COUNT_GROUP = "writeOffCountGroup",
  WRITEOFF_COUNT = "writeOffCount",
  WRITEOFF_COUNT_LY = "writeOffCountLY",
  WRITEOFF_COUNT_YOY = "writeOffCountYoY",
  WRITEOFF_COUNT_YOY_PERCENT = "writeOffCountYoYPercent",
  WRITEOFF_COUNT_LM = "writeOffCountLM",
  WRITEOFF_COUNT_MOM = "writeOffCountMoM",
  WRITEOFF_COUNT_MOM_PERCENT = "writeOffCountMoMPercent",
  // ----------------- Наценка без учета скидки -----------------
  GROUP_MARKUP_DISCOUNT = "groupMarkupDiscount",
  MARKUP_DISCOUNT = "markupDiscount",
  MARKUP_DISCOUNT_LM = "markupDiscountLM",
  MARKUP_DISCOUNT_MOM = "markupDiscountMoM",
  MARKUP_DISCOUNT_MOM_PERCENT = "markupDiscountMoMPercent",
  MARKUP_DISCOUNT_LY = "markupDiscountLY",
  MARKUP_DISCOUNT_YOY = "markupDiscountYoY",
  MARKUP_DISCOUNT_YOY_PERCENT = "markupDiscountYoYPercent",

  // ----------------- Наценка в процентах без скидки -----------------
  GROUP_MARKUP_PERCENT_DISCOUNT = "groupMarkupDiscountPercent",
  MARKUP_DISCOUNT_PERCENT = "markupDiscountPercent",
  MARKUP_DISCOUNT_PERCENT_LM = "markupDiscountPercentLM",
  MARKUP_DISCOUNT_PERCENT_MOM = "markupDiscountPercentMoM",
  MARKUP_DISCOUNT_PERCENT_MOM_PERCENT = "markupDiscountPercentMoMPercent",
  MARKUP_DISCOUNT_PERCENT_LY = "markupDiscountPercentLY",
  MARKUP_DISCOUNT_PERCENT_YOY = "markupDiscountPercentYoYPercent",

  // ----------------- Маржа в процентах без скидки -----------------
  GROUP_MARGIN_PERCENT_DISCOUNT = "groupMarginDiscountPercent",
  MARGIN_PERCENT_DISCOUNT = "marginDiscountPercent",
  MARGIN_PERCENT_DISCOUNT_LM = "marginDiscountPercentLM",
  MARGIN_PERCENT_DISCOUNT_MOM = "marginDiscountPercentMoM",

  MARGIN_PERCENT_DISCOUNT_MOM_PERCENT = "marginDiscountPercentMoMPercent", //not
  MARGIN_PERCENT_DISCOUNT_LY = "marginDiscountPercentLY",
  MARGIN_PERCENT_DISCOUNT_YOY = "marginDiscountPercentYoY",
  MARGIN_PERCENT_DISCOUNT_YOY_PERCENT = "marginDiscountPercentYoYPercent",
  // ----------------- Оборачиваемость остатков -----------------
  GROUP_TURNOVER_GOODS = "groupTurnoverGoods",
  TURNOVER_GOODS = "turnoverGoods",
  TURNOVER_GOODS_LM = "turnoverGoodsLM",
  TURNOVER_GOODS_MOM = "turnoverGoodsMoM",
  TURNOVER_GOODS_MOM_PERCENT = "turnoverGoodsMoMPercent",
  TURNOVER_GOODS_LY = "turnoverGoodsLY",
  TURNOVER_GOODS_YOY = "turnoverGoodsYoY",
  TURNOVER_GOODS_YOY_PERCENT = "turnoverGoodsYoYPercent",

  // ----------------- Вес -----------------
  WEIGHT_GROUP = "weightGroup",
  WEIGHT = "weight",
  WEIGHT_MOM = "weightMoM",
  WEIGHT_MOM_PERCENT = "weightMoMPercent",
  WEIGHT_LM = "weightLM",
  WEIGHT_LY = "weightLY",
  WEIGHT_YOY = "weightYoY",
  WEIGHT_YOY_PERCENT = "weightYoYPercent",

  // ----------------- Уникальные показатели -----------------
  GROUP_UNIQUE_STORE = "uniqueStoreGroup",
  UNIQUE_STORE = "uniqueStore",
  UNIQUE_STORE_LM = "uniqueStoreLM",
  UNIQUE_STORE_LY = "uniqueStoreLY",

  GROUP_UNIQUE_CITY = "unique_city_group",
  UNIQUE_CITY = "uniqueCity",
  UNIQUE_CITY_LM = "uniqueCityLM",
  UNIQUE_CITY_LY = "uniqueCityLY",

  GROUP_UNIQUE_REGION = "uniqueRegionGroup",
  UNIQUE_REGION = "uniqueRegion",
  UNIQUE_REGION_LM = "uniqueRegionLM",
  UNIQUE_REGION_LY = "uniqueRegionLY",

  GROUP_UNIQUE_CARD_NUMBER = "uniqueCardNumberGroup",
  UNIQUE_CARD_NUMBER = "uniqueCardNumber",
  UNIQUE_CARD_NUMBER_LM = "uniqueCardNumberLM",
  UNIQUE_CARD_NUMBER_LY = "uniqueCardNumberLY",

  GROUP_UNIQUE_CHANNEL = "uniqueChannelGroup",
  UNIQUE_CHANNEL = "uniqueChannel",
  UNIQUE_CHANNEL_LM = "uniqueChannelLM",
  UNIQUE_CHANNEL_LY = "uniqueChannelLY",

  GROUP_UNIQUE_CHECK = "uniqueCheckGroup",
  UNIQUE_CHECK = "uniqueCheck",
  UNIQUE_CHECK_LM = "uniqueCheckLM",
  UNIQUE_CHECK_LY = "uniqueCheckLY",

  // ----------------- Продажи -----------------
  GROUP_SALES = "salesGroup",
  SALES = "countSales",
  SALES_LM = "countSalesLM",
  SALES_LY = "countSalesLY",
  SALES_MOM = "countSalesMoM",
  SALES_MOM_PERCENT = "countSalesMoMPercent",
  SALES_YOY = "countSalesYoY",
  SALES_YOY_PERCENT = "countSalesYoYPercent",

  // ----------------- Выручка -----------------
  GROUP_PROCEEDS = "groupProceeds",
  GROUP_PLAN_PROCEEDS = "groupPlanProceeds",
  STORE = "store",
  STORE_NAME = "storeName",
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

  // ----------------- Выручка планы -----------------
  PLAN_PROCEEDS = "planProceeds",
  PLAN_PROCEEDS_EXECUTION_PERCENT = "planProceedsExecutionPercent",
  PLAN_PROCEEDS_FORECAST = "planProceedsForecast",
  PLAN_PROCEEDS_FORECAST_PERCENT = "planProceedsForecastPercent",
  CUMULATIVE_PROCEEDS_PLAN = "cumulativeProceedsPlan",
  CUMULATIVE_PLAN_PROCEEDS_EXECUTION_PERCENT = "cumulativePlanProceedsExecutionPercent",
  CUMULATIVE_PLAN_PROCEEDS_FORECAST_PERCENT = "cumulativePlanProceedsForecastPercent",

  // ----------------- Чеки -----------------
  GROUP_CHECK = "groupCheck",
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

  // ----------------- Чеки планы -----------------
  GROUP_PLAN_CHECK = "groupPlanCheck",
  PLAN_CHECK = "planCheck",
  PLAN_CHECK_EXECUTION_PERCENT = "planCheckExecutionPercent",
  PLAN_CHECK_FORECAST = "planCheckForecast",
  PLAN_CHECK_FORECAST_PERCENT = "planCheckForecastPercent",
  CUMULATIVE_CHECK_PLAN = "cumulativeCheckPlan",
  CUMULATIVE_PLAN_CHECK_EXECUTION_PERCENT = "cumulativePlanCheckExecutionPercent",
  CUMULATIVE_PLAN_CHECK_FORECAST_PERCENT = "cumulativePlanCheckForecastPercent",

  // ----------------- Средний чек -----------------
  GROUP_AVG_CHECK = "groupAvgCheck",
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

  // ----------------- Средний чек планы -----------------
  GROUP_PLAN_AVG_CHECK = "groupPlanAvgCheck",
  PLAN_AVG_CHECK = "planAvgCheck",
  PLAN_AVG_CHECK_EXECUTION_PERCENT = "planAvgCheckExecutionPercent",
  PLAN_AVG_CHECK_FORECAST = "planAvgCheckForecast",
  PLAN_AVG_CHECK_FORECAST_PERCENT = "planAvgCheckForecastPercent",
  CUMULATIVE_AVG_CHECK_PLAN = "cumulativeAvgCheckPlan",
  CUMULATIVE_PLAN_AVG_CHECK_EXECUTION_PERCENT = "cumulativePlanAvgCheckExecutionPercent",
  CUMULATIVE_PLAN_AVG_CHECK_FORECAST_PERCENT = "cumulativePlanAvgCheckForecastPercent",

  // ------------------------ Бонусы -------------------------
  GROUP_BONUS = "bonusGroup",
  BONUS = "bonus",
  BONUS_LM = "bonusLM",
  BONUS_MOM = "bonusMoM",
  BONUS_MOM_PERCENT = "bonusMoMPercent",
  BONUS_LY = "bonusLY",
  BONUS_YOY = "bonusYoY",
  BONUS_YOY_PERCENT = "bonusYoYPercent",

  GROUP_BONUS_PERCENT = "bonusPercentGroup",
  BONUS_PERCENT = "bonusPercent",
  BONUS_PERCENT_LM = "bonusPercentLM",
  BONUS_PERCENT_MOM_PERCENT = "bonusPercentMoMPercent",
  BONUS_PERCENT_LY = "bonusPercentLY",
  BONUS_PERCENT_YOY_PERCENT = "bonusPercentYoYPercent",

  // ------------------------ Чеки QC -------------------
  GROUP_CHECK_QC = "groupCheckQc",
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

  // --------------------- Чеки QC планы ---------------------
  GROUP_PLAN_CHECK_QC = "groupPlanCheckQc",
  GROUP_PLAN_QC = "groupPlanQc",
  PLAN_PROCEEDS_QC = "planProceedsQc",
  PLAN_PROCEEDS_QC_EXECUTION_PERCENT = "planProceedsQcExecutionPercent",
  PLAN_PROCEEDS_QC_FORECAST = "planProceedsQcForecast",
  PLAN_PROCEEDS_QC_FORECAST_PERCENT = "planProceedsQcForecastPercent",
  CUMULATIVE_PROCEEDS_QC_PLAN = "cumulativeProceedsQcPlan",
  CUMULATIVE_PLAN_PROCEEDS_QC_EXECUTION_PERCENT = "cumulativePlanProceedsQcExecutionPercent",
  CUMULATIVE_PLAN_PROCEEDS_QC_FORECAST_PERCENT = "cumulativePlanProceedsQcForecastPercent",

  // ------------------- Доля платежей QC ---------------------
  SHARE_OF_PAYMENTS_QC = "shareOfPaymentsQc",
  PLAN_SHARE_OF_PAYMENTS_QC = "planShareOfPaymentsQc",
  PLAN_SHARE_OF_PAYMENTS_QC_EXECUTION_PERCENT = "planShareOfPaymentsQcExecutionPercent",
  PLAN_SHARE_OF_PAYMENTS_QC_FORECAST = "planShareOfPaymentsQcForecast",
  PLAN_SHARE_OF_PAYMENTS_QC_FORECAST_PERCENT = "planShareOfPaymentsQcForecastPercent",

  // ----------------- Выручка для фермера -----------------
  GROUP_FARMER_PRICE = "groupFarmerPrice",
  FARMER_PRICE = "farmerPrice",
  FARMER_PRICE_LM = "farmerPriceLM",
  FARMER_PRICE_MOM = "farmerPriceMoM",
  FARMER_PRICE_MOM_PERCENT = "farmerPriceMoMPercent",
  FARMER_PRICE_LY = "farmerPriceLY",
  FARMER_PRICE_YOY = "farmerPriceYoY",
  FARMER_PRICE_YOY_PERCENT = "farmerPriceYoYPercent",

  // ----------------- Ночные магазины (показатели) -----------------

  // Выручка (день)
  GROUP_PROCEEDS_DAY = "groupProceedsDay",
  PROCEEDS_DAY = "proceedsDay",
  PROCEEDS_DAY_LY = "proceedsDayLY",
  PROCEEDS_DAY_YOY = "proceedsDayYoY",
  PROCEEDS_DAY_YOY_PERCENT = "proceedsDayYoYPercent",
  PROCEEDS_DAY_LM = "proceedsDayLM",
  PROCEEDS_DAY_MOM = "proceedsDayMoM",
  PROCEEDS_DAY_MOM_PERCENT = "proceedsDayMoMPercent",

  // Выручка (ночь)
  GROUP_PROCEEDS_NIGHT = "groupProceedsNight",
  PROCEEDS_NIGHT = "proceedsNight",
  PROCEEDS_NIGHT_LY = "proceedsNightLY",
  PROCEEDS_NIGHT_YOY = "proceedsNightYoY",
  PROCEEDS_NIGHT_YOY_PERCENT = "proceedsNightYoYPercent",
  PROCEEDS_NIGHT_LM = "proceedsNightLM",
  PROCEEDS_NIGHT_MOM = "proceedsNightMoM",
  PROCEEDS_NIGHT_MOM_PERCENT = "proceedsNightMoMPercent",

  // Процент выручки (ночь)
  GROUP_PERCENTAGE_PROCEEDS_NIGHT = "groupPercentageProceedsNight",
  PERCENTAGE_PROCEEDS_NIGHT = "percentageProceedsNight",
  PERCENTAGE_PROCEEDS_NIGHT_LY = "percentageProceedsNightLY",
  PERCENTAGE_PROCEEDS_NIGHT_YOY = "percentageProceedsNightYoY",
  PERCENTAGE_PROCEEDS_NIGHT_LM = "percentageProceedsNightLM",
  PERCENTAGE_PROCEEDS_NIGHT_MOM = "percentageProceedsNightMoM",

  // Валовая прибыль (день)
  GROUP_PROFIT_DAY = "groupProfitDay",
  PROFIT_DAY = "profitDay",
  PROFIT_DAY_LM = "profitDayLM",
  PROFIT_DAY_MOM = "profitDayMoM",
  PROFIT_DAY_MOM_PERCENT = "profitDayMoMPercent",
  PROFIT_DAY_LY = "profitDayLY",
  PROFIT_DAY_YOY = "profitDayYoY",
  PROFIT_DAY_YOY_PERCENT = "profitDayYoYPercent",

  // Валовая прибыль (ночь)
  GROUP_PROFIT_NIGHT = "groupProfitNight",
  PROFIT_NIGHT = "profitNight",
  PROFIT_NIGHT_LM = "profitNightLM",
  PROFIT_NIGHT_MOM = "profitNightMoM",
  PROFIT_NIGHT_MOM_PERCENT = "profitNightMoMPercent",
  PROFIT_NIGHT_LY = "profitNightLY",
  PROFIT_NIGHT_YOY = "profitNightYoY",
  PROFIT_NIGHT_YOY_PERCENT = "profitNightYoYPercent",

  // Процент прибыли (ночь)
  GROUP_PERCENTAGE_PROFIT_NIGHT = "groupPercentageProfitNight",
  PERCENTAGE_PROFIT_NIGHT = "percentageProfitNight",
  PERCENTAGE_PROFIT_NIGHT_LY = "percentageProfitNightLY",
  PERCENTAGE_PROFIT_NIGHT_YOY = "percentageProfitNightYoY",
  PERCENTAGE_PROFIT_NIGHT_LM = "percentageProfitNightLM",
  PERCENTAGE_PROFIT_NIGHT_MOM = "percentageProfitNightMoM",

  // Наценка (день)
  GROUP_MARKUP_PERCENT_DAY = "groupMarkupPercentDay",
  MARKUP_PERCENT_DAY = "markupPercentDay",
  MARKUP_PERCENT_DAY_LY = "markupPercentDayLY",
  MARKUP_PERCENT_DAY_YOY = "markupPercentDayYoY",
  MARKUP_PERCENT_DAY_YOY_PERCENT = "markupPercentDayYoYPercent",
  MARKUP_PERCENT_DAY_LM = "markupPercentDayLM",
  MARKUP_PERCENT_DAY_MOM = "markupPercentDayMoM",
  MARKUP_PERCENT_DAY_MOM_PERCENT = "markupPercentDayMoMPercent",

  // Наценка (ночь)
  GROUP_MARKUP_PERCENT_NIGHT = "groupMarkupPercentNight",
  MARKUP_PERCENT_NIGHT = "markupPercentNight",
  MARKUP_PERCENT_NIGHT_LY = "markupPercentNightLY",
  MARKUP_PERCENT_NIGHT_YOY = "markupPercentNightYoY",
  MARKUP_PERCENT_NIGHT_YOY_PERCENT = "markupPercentNightYoYPercent",
  MARKUP_PERCENT_NIGHT_LM = "markupPercentNightLM",
  MARKUP_PERCENT_NIGHT_MOM = "markupPercentNightMoM",
  MARKUP_PERCENT_NIGHT_MOM_PERCENT = "markupPercentNightMoMPercent",

  // Наценка без скидки (день)
  GROUP_MARKUP_DISCOUNT_PERCENT_DAY = "groupMarkupDiscountPercentDay",
  MARKUP_DISCOUNT_PERCENT_DAY = "markupDiscountPercentDay",
  MARKUP_DISCOUNT_PERCENT_DAY_LM = "markupDiscountPercentDayLM",
  MARKUP_DISCOUNT_PERCENT_DAY_MOM = "markupDiscountPercentDayMoM",
  MARKUP_DISCOUNT_PERCENT_DAY_LY = "markupDiscountPercentDayLY",
  MARKUP_DISCOUNT_PERCENT_DAY_YOY = "markupDiscountPercentDayYoY",

  // Наценка без скидки (ночь)
  GROUP_MARKUP_DISCOUNT_PERCENT_NIGHT = "groupMarkupDiscountPercentNight",
  MARKUP_DISCOUNT_PERCENT_NIGHT = "markupDiscountPercentNight",
  MARKUP_DISCOUNT_PERCENT_NIGHT_LM = "markupDiscountPercentNightLM",
  MARKUP_DISCOUNT_PERCENT_NIGHT_MOM = "markupDiscountPercentNightMoM",
  MARKUP_DISCOUNT_PERCENT_NIGHT_LY = "markupDiscountPercentNightLY",
  MARKUP_DISCOUNT_PERCENT_NIGHT_YOY = "markupDiscountPercentNightYoY",

  // Себестоимость (день)
  GROUP_COST_PRICE_DAY = "groupCostPriceDay",
  COST_PRICE_DAY = "costPriceDay",
  COST_PRICE_DAY_LM = "costPriceDayLM",
  COST_PRICE_DAY_MOM = "costPriceDayMoM",
  COST_PRICE_DAY_MOM_PERCENT = "costPriceDayMoMPercent",
  COST_PRICE_DAY_LY = "costPriceDayLY",
  COST_PRICE_DAY_YOY = "costPriceDayYoY",
  COST_PRICE_DAY_YOY_PERCENT = "costPriceDayYoYPercent",

  // Себестоимость (ночь)
  GROUP_COST_PRICE_NIGHT = "groupCostPriceNight",
  COST_PRICE_NIGHT = "costPriceNight",
  COST_PRICE_NIGHT_LM = "costPriceNightLM",
  COST_PRICE_NIGHT_MOM = "costPriceNightMoM",
  COST_PRICE_NIGHT_MOM_PERCENT = "costPriceNightMoMPercent",
  COST_PRICE_NIGHT_LY = "costPriceNightLY",
  COST_PRICE_NIGHT_YOY = "costPriceNightYoY",
  COST_PRICE_NIGHT_YOY_PERCENT = "costPriceNightYoYPercent",

  // Скидки (день)
  GROUP_DISCOUNT_DAY = "groupDiscountDay",
  DISCOUNT_DAY = "discountDay",
  DISCOUNT_DAY_LY = "discountDayLY",
  DISCOUNT_DAY_YOY = "discountDayYoY",
  DISCOUNT_DAY_YOY_PERCENT = "discountDayYoYPercent",
  DISCOUNT_DAY_LM = "discountDayLM",
  DISCOUNT_DAY_MOM = "discountDayMoM",
  DISCOUNT_DAY_MOM_PERCENT = "discountDayMoMPercent",

  // Скидки (ночь)
  GROUP_DISCOUNT_NIGHT = "groupDiscountNight",
  DISCOUNT_NIGHT = "discountNight",
  DISCOUNT_NIGHT_LY = "discountNightLY",
  DISCOUNT_NIGHT_YOY = "discountNightYoY",
  DISCOUNT_NIGHT_YOY_PERCENT = "discountNightYoYPercent",
  DISCOUNT_NIGHT_LM = "discountNightLM",
  DISCOUNT_NIGHT_MOM = "discountNightMoM",
  DISCOUNT_NIGHT_MOM_PERCENT = "discountNightMoMPercent",

  // Скидки в процентах (день)
  GROUP_DISCOUNT_PERCENT_DAY = "groupDiscountPercentDay",
  DISCOUNT_PERCENT_DAY = "discountPercentDay",
  DISCOUNT_PERCENT_DAY_LY = "discountPercentDayLY",
  DISCOUNT_PERCENT_DAY_YOY_PERCENT = "discountPercentDayYoYPercent",
  DISCOUNT_PERCENT_DAY_LM = "discountPercentDayLM",
  DISCOUNT_PERCENT_DAY_MOM_PERCENT = "discountPercentDayMoMPercent",

  // Скидки в процентах (ночь)
  GROUP_DISCOUNT_PERCENT_NIGHT = "groupDiscountPercentNight",
  DISCOUNT_PERCENT_NIGHT = "discountPercentNight",
  DISCOUNT_PERCENT_NIGHT_LY = "discountPercentNightLY",
  DISCOUNT_PERCENT_NIGHT_YOY_PERCENT = "discountPercentNightYoYPercent",
  DISCOUNT_PERCENT_NIGHT_LM = "discountPercentNightLM",
  DISCOUNT_PERCENT_NIGHT_MOM_PERCENT = "discountPercentNightMoMPercent",

  // Количество продаж (день)
  GROUP_COUNT_SALES_DAY = "groupCountSalesDay",
  COUNT_SALES_DAY = "countSalesDay",
  COUNT_SALES_DAY_LM = "countSalesDayLM",
  COUNT_SALES_DAY_MOM = "countSalesDayMoM",
  COUNT_SALES_DAY_MOM_PERCENT = "countSalesDayMoMPercent",
  COUNT_SALES_DAY_LY = "countSalesDayLY",
  COUNT_SALES_DAY_YOY = "countSalesDayYoY",
  COUNT_SALES_DAY_YOY_PERCENT = "countSalesDayYoYPercent",

  // Количество продаж (ночь)
  GROUP_COUNT_SALES_NIGHT = "groupCountSalesNight",
  COUNT_SALES_NIGHT = "countSalesNight",
  COUNT_SALES_NIGHT_LM = "countSalesNightLM",
  COUNT_SALES_NIGHT_MOM = "countSalesNightMoM",
  COUNT_SALES_NIGHT_MOM_PERCENT = "countSalesNightMoMPercent",
  COUNT_SALES_NIGHT_LY = "countSalesNightLY",
  COUNT_SALES_NIGHT_YOY = "countSalesNightYoY",
  COUNT_SALES_NIGHT_YOY_PERCENT = "countSalesNightYoYPercent",

  // Средний чек (день)
  GROUP_AVG_CHECK_DAY = "groupAvgCheckDay",
  AVG_CHECK_DAY = "avgCheckDay",
  AVG_CHECK_DAY_LM = "avgCheckDayLM",
  AVG_CHECK_DAY_MOM = "avgCheckDayMoM",
  AVG_CHECK_DAY_MOM_PERCENT = "avgCheckDayMoMPercent",
  AVG_CHECK_DAY_LY = "avgCheckDayLY",
  AVG_CHECK_DAY_YOY = "avgCheckDayYoY",
  AVG_CHECK_DAY_YOY_PERCENT = "avgCheckDayYoYPercent",

  // Средний чек (ночь)
  GROUP_AVG_CHECK_NIGHT = "groupAvgCheckNight",
  AVG_CHECK_NIGHT = "avgCheckNight",
  AVG_CHECK_NIGHT_LM = "avgCheckNightLM",
  AVG_CHECK_NIGHT_MOM = "avgCheckNightMoM",
  AVG_CHECK_NIGHT_MOM_PERCENT = "avgCheckNightMoMPercent",
  AVG_CHECK_NIGHT_LY = "avgCheckNightLY",
  AVG_CHECK_NIGHT_YOY = "avgCheckNightYoY",
  AVG_CHECK_NIGHT_YOY_PERCENT = "avgCheckNightYoYPercent",

  // ----------------- Ночные магазины (уникальные значения) -----------------

  // Количество уникальных городов
  UNIQUE_CITY_NS = "uniqueCityNightStore",
  UNIQUE_CITY_NS_LY = "uniqueCityNightStoreLY",
  UNIQUE_CITY_NS_LM = "uniqueCityNightStoreLM",

  // Количество уникальных каналов
  UNIQUE_CHANNEL_NS = "uniqueChannelNightStore",
  UNIQUE_CHANNEL_NS_LY = "uniqueChannelNightStoreLY",
  UNIQUE_CHANNEL_NS_LM = "uniqueChannelNightStoreLM",

  // Количество уникальных магазинов
  UNIQUE_STORE_NS = "uniqueStoreNightStore",
  UNIQUE_STORE_NS_LY = "uniqueStoreNightStoreLY",
  UNIQUE_STORE_NS_LM = "uniqueStoreNightStoreLM",

  // Количество уникальных номеров карт (день)
  UNIQUE_CARD_NUMBER_DAY = "uniqueCardNumberDay",
  UNIQUE_CARD_NUMBER_DAY_LY = "uniqueCardNumberDayLY",
  UNIQUE_CARD_NUMBER_DAY_LM = "uniqueCardNumberDayLM",

  // Количество уникальных номеров карт (ночь)
  UNIQUE_CARD_NUMBER_NIGHT = "uniqueCardNumberNight",
  UNIQUE_CARD_NUMBER_NIGHT_LY = "uniqueCardNumberNightLY",
  UNIQUE_CARD_NUMBER_NIGHT_LM = "uniqueCardNumberNightLM",

  // Количество уникальных регионов
  UNIQUE_REGION_NS = "uniqueRegionNightStore",
  UNIQUE_REGION_NS_LY = "uniqueRegionNightStoreLY",
  UNIQUE_REGION_NS_LM = "uniqueRegionNightStoreLM",

  // Количество уникальных чеков (день)
  UNIQUE_CHECK_DAY = "uniqueCheckDay",
  UNIQUE_CHECK_DAY_LY = "uniqueCheckDayLY",
  UNIQUE_CHECK_DAY_LM = "uniqueCheckDayLM",

  // Количество уникальных чеков (ночь)
  UNIQUE_CHECK_NIGHT = "uniqueCheckNight",
  UNIQUE_CHECK_NIGHT_LY = "uniqueCheckNightLY",
  UNIQUE_CHECK_NIGHT_LM = "uniqueCheckNightLM",

  // -----------------------------------------------
  GROUP_DISCOUNT = "groupDiscount",
  DISCOUNT = "discount",
  DISCOUNT_LM = "discountLM",
  DISCOUNT_MOM = "discountMoM",
  DISCOUNT_MOM_PERCENT = "discountMoMPercent",
  DISCOUNT_LY = "discountLY",
  DISCOUNT_YOY = "discountYoY",
  DISCOUNT_YOY_PERCENT = "discountYoYPercent",
  GROUP_DISCOUNT_FOREST = "groupDiscountPrice",
  DISCOUNT_FOREST = "discountPrice",
  DISCOUNT_FOREST_LM = "discountPriceLM",
  DISCOUNT_FOREST_MOM = "discountPriceMoM",
  DISCOUNT_FOREST_MOM_PERCENT = "discountPriceMoMPercent",
  DISCOUNT_FOREST_LY = "discountPriceLY",
  DISCOUNT_FOREST_YOY = "discountPriceYoY",
  DISCOUNT_FOREST_YOY_PERCENT = "discountPriceYoYPercent",
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
  PROCEEDS_QC_LM = "proceedsQcLM",
  GROUP_PROFIT = "groupProfit",
  GROUP_PROFIT_PERCENT = "groupProfitPercent",
  PROFIT = "profit",
  PROFIT_LM = "profitLM",
  PROFIT_MOM = "profitMoM",
  PROFIT_MOM_PERCENT = "profitMoMPercent",
  PROFIT_LY = "profitLY",
  PROFIT_YOY = "profitYoY",
  GROUP_WRITE_OFF = "groupWriteOff",
  GROUP_WRITE_OFF_PERCENT = "groupWriteOffPercent",
  GROUP_MARGIN_PERCENT = "groupMarginPercent",
  GROUP_MARKUP_PERCENT = "groupMarkupPercent",
  GROUP_SKU_UNIQUE = "groupSkuUnique",
  GROUP_LEN_CHECK = "groupLenCheck",
  GROUP_COUNT_CHECK_QR = "groupCountCheckQr",
  GROUP_APP_LOYAL_PERCENT = "groupAppLoyalPercent",
  GROUP_CHECK_LOYAL = "groupCheckLoyal",
  GROUP_PROCEEDS_IM = "groupProceedsIm",
  GROUP_ONLINE_STORE_SHARE = "groupOnlineStoreShare",
  GROUP_ONLINE_STORE_SHARE_PERCENT_LY = "groupOnlineStoreSharePercentLY",
  GROUP_ONLINE_STORE_SHARE_PERCENT_YOY = "groupOnlineStoreSharePercentYoY",
  GROUP_ONLINE_STORE_SHARE_PERCENT_LM = "groupOnlineStoreSharePercentLM",
  GROUP_ONLINE_STORE_SHARE_PERCENT_MOM = "groupOnlineStoreSharePercentMoM",
  PROFIT_YOY_PERCENT = "profitYoYPercent",
  CUMULATIVE_DISCOUNT_PERCENT_YOY_PERCENT = "cumulativeDiscountPercentYoYPercent",
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
  ONLINE_STORE_SHARE_PERCENT = "onlineStoreSharePercent",
  ONLINE_STORE_SHARE_PERCENT_LY = "onlineStoreSharePercentLY",
  ONLINE_STORE_SHARE_PERCENT_YOY = "onlineStoreSharePercentYoY",
  ONLINE_STORE_SHARE_PERCENT_LM = "onlineStoreSharePercentLM",
  ONLINE_STORE_SHARE_PERCENT_MOM = "onlineStoreSharePercentMoM",
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
  CUMULATIVE_LEN_CHECK_YOY_PERCENT = "cumulativeLenCheckYoYPercent",
  APP_LOYAL_PERCENT = "appLoyalPercent",
  APP_LOYAL_PERCENT_LM = "appLoyalPercentLM",
  APP_LOYAL_PERCENT_MOM = "appLoyalPercentMoM",
  APP_LOYAL_PERCENT_LY = "appLoyalPercentLY",
  APP_LOYAL_PERCENT_YOY = "appLoyalPercentYoY",
  AMOUNT_WRITE_OFF = "amountWriteOff",
  AMOUNT_WRITE_OFF_LY = "amountWriteOffLY",
  AMOUNT_WRITE_OFF_YOY = "amountWriteOffYoY",
  AMOUNT_WRITE_OFF_YOY_PERCENT = "amountWriteOffYoYPercent",
  AMOUNT_WRITE_OFF_LM = "amountWriteOffLM",
  AMOUNT_WRITE_OFF_MOM = "amountWriteOffMoM",
  AMOUNT_WRITE_OFF_MOM_PERCENT = "amountWriteOffMoMPercent",
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
  DISCOUNT_TYPE = "discountType",

  PROCEEDS_OFFLINE = "proceeds_offline",
  PROCEEDS_ALL = "proceedsAll",

  // ----------------- Количество заказов ИМ -----------------
  GROUP_ORDERS_COUNT = "groupOrdersCount",
  ONLINE_COUNT_ORDERS = "onlineCountOrders",
  ORDINARY_COUNT_ORDERS = "ordinaryCountOrders",
  PICKUP_COUNT_ORDERS = "pickupCountOrders",
  KUPER_COUNT_ORDERS = "kuperCountOrders",
  COMPLETED_ONLINE_COUNT_ORDERS = "completedOnlineCountOrders",
  COMPLETED_ORDINARY_COUNT_ORDERS = "completedOrdinaryCountOrders",
  COMPLETED_PICKUP_COUNT_ORDERS = "completedPickupCountOrders",
  COMPLETED_KUPER_COUNT_ORDERS = "completedKuperCountOrders",
  CLOSED_ONLINE_COUNT_ORDERS = "closedOnlineCountOrders",
  CLOSED_ORDINARY_COUNT_ORDERS = "closedOrdinaryCountOrders",
  CLOSED_PICKUP_COUNT_ORDERS = "closedPickupCountOrders",

  // ----------------- Выручка ИМ -----------------
  ORDINARY_PROCEEDS = "ordinaryProceeds",
  PICKUP_PROCEEDS = "pickupProceeds",
  KUPER_PROCEEDS = "kuperProceeds",

  // ----------------- Среднее количество товаров в чеке ИМ -----------------
  AVG_ITEMS_PER_CHECK = "avgItemsPerCheck",

  // ----------------- Дискретность ИМ -----------------
  UNIQUE_CUSTOMERS = "uniqueCustomers",
  UNIQUE_COMPLETED_CUSTOMERS = "uniqueCompletedCustomers",
  TOTAL_ORDERS = "totalOrders",
  DISCRETENESS = "discreteness",

  // ----------------- Процент отмены заказов ИМ -----------------
  CANCELLATION_PERCENTAGE = "cancellationPercentage",
  CANCELLATION_PERCENTAGE_ALL = "cancellationPercentageAll",
  CANCELLATION_PERCENTAGE_PICKUP = "cancellationPercentagePickup",
  CANCELLATION_PERCENTAGE_ORDINARY = "cancellationPercentageOrdinary",

  // ----------------- Доставка ИМ -----------------
  DELIVERY_IM_COUNT = "deliveryImCount",
}

export const formatNumber = (
  value: number | string | null | undefined,
): string => {
  if (value === null || value === undefined || value === "") return "-";

  const num =
    typeof value === "string"
      ? parseFloat(value.replace(/[^\d.-]/g, ""))
      : value;

  if (isNaN(num)) return "-";

  // Проверяем, есть ли дробная часть
  const hasDecimals = num % 1 !== 0;

  // Форматируем число
  let formatted: string;

  if (hasDecimals) {
    // Если есть дробная часть, оставляем до 2 знаков после запятой
    const parts = num.toFixed(2).split(".");
    // Убираем лишние нули в конце дробной части
    parts[1] = parts[1].replace(/0+$/, "");

    // Добавляем пробелы для разделения тысяч
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    // Если дробная часть стала пустой после удаления нулей, возвращаем только целую часть
    formatted = parts[1] ? parts.join(",") : parts[0];
  } else {
    // Если число целое, просто добавляем пробелы
    formatted = Math.floor(num)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return formatted;
};
export const formatPercent = (value: number) => (value ? value + "%" : "-");

export const tableColumns: ColDef<any>[] = [
  // Бонусы начисление
  {
    field: COLUMN_KEY.BONUS_ACCRUAL,
    headerName: "Бонусы начисление",
    headerTooltip: "Бонусы начисление",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_LM,
    headerName: "Бонусы начисление PM",
    headerTooltip: "Бонусы начисление PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_MOM,
    headerName: "Бонусы начисление MoM",
    headerTooltip: "Бонусы начисление MoM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_MOM_PERCENT,
    headerName: "Бонусы начисление MoM %",
    headerTooltip: "Бонусы начисление MoM %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_LY,
    headerName: "Бонусы начисление LY",
    headerTooltip: "Бонусы начисление LY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_YOY,
    headerName: "Бонусы начисление YoY",
    headerTooltip: "Бонусы начисление YoY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_YOY_PERCENT,
    headerName: "Бонусы начисление YoY %",
    headerTooltip: "Бонусы начисление YoY %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },

  // Бонусы списание
  {
    field: COLUMN_KEY.BONUS_WRITEOFF,
    headerName: "Бонусы списание",
    headerTooltip: "Бонусы списание",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_LM,
    headerName: "Бонусы списание PM",
    headerTooltip: "Бонусы списание PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_MOM,
    headerName: "Бонусы списание MoM",
    headerTooltip: "Бонусы списание MoM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_MOM_PERCENT,
    headerName: "Бонусы списание MoM %",
    headerTooltip: "Бонусы списание MoM %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_LY,
    headerName: "Бонусы списание LY",
    headerTooltip: "Бонусы списание LY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_YOY,
    headerName: "Бонусы списание YoY",
    headerTooltip: "Бонусы списание YoY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_YOY_PERCENT,
    headerName: "Бонусы списание YoY %",
    headerTooltip: "Бонусы списание YoY %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },

  // Бонусы списание %
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_PERCENT,
    headerName: "Бонусы списание %",
    headerTooltip: "Бонусы списание %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LM,
    headerName: "Бонусы списание % PM",
    headerTooltip: "Бонусы списание % PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM,
    headerName: "Бонусы списание % MoM",
    headerTooltip: "Бонусы списание % MoM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM_PERCENT,
    headerName: "Бонусы списание % MoM %",
    headerTooltip: "Бонусы списание % MoM %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LY,
    headerName: "Бонусы списание % LY",
    headerTooltip: "Бонусы списание % LY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY,
    headerName: "Бонусы списание % YoY",
    headerTooltip: "Бонусы списание % YoY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY_PERCENT,
    headerName: "Бонусы списание % YoY %",
    headerTooltip: "Бонусы списание % YoY %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },

  // Бонусы начисление %
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_PERCENT,
    headerName: "Бонусы начисление %",
    headerTooltip: "Бонусы начисление %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LM,
    headerName: "Бонусы начисление % PM",
    headerTooltip: "Бонусы начисление % PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM,
    headerName: "Бонусы начисление % MoM",
    headerTooltip: "Бонусы начисление % MoM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM_PERCENT,
    headerName: "Бонусы начисление % MoM %",
    headerTooltip: "Бонусы начисление % MoM %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LY,
    headerName: "Бонусы начисление % LY",
    headerTooltip: "Бонусы начисление % LY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY,
    headerName: "Бонусы начисление % YoY",
    headerTooltip: "Бонусы начисление % YoY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY_PERCENT,
    headerName: "Бонусы начисление % YoY %",
    headerTooltip: "Бонусы начисление % YoY %",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.ITR,
    headerName: "Коэффициент оборачиваемости ",
    headerTooltip: "Коэффициент оборачиваемости ITR",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.ITR_LM,
    headerName: "Коэффициент оборачиваемости PM",
    headerTooltip: "Коэффициент оборачиваемости PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.ITR_MOM,
    headerName: "Коэффициент оборачиваемости MOM",
    headerTooltip: "Коэффициент оборачиваемости MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.ITR_MOM_PERCENT,
    headerName: "Коэффициент оборачиваемости MOM%",
    headerTooltip: "Коэффициент оборачиваемости MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.ITR_LY,
    headerName: "Коэффициент оборачиваемости PY",
    headerTooltip: "Коэффициент оборачиваемости PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.ITR_YOY,
    headerName: "Коэффициент оборачиваемости YOY",
    headerTooltip: "Коэффициент оборачиваемости YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.ITR_YOY_PERCENT,
    headerName: "Коэффициент оборачиваемости YOY%",
    headerTooltip: "Коэффициент оборачиваемости YOY%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },

  {
    field: COLUMN_KEY.OPENING_BALANCE,
    headerName: "Остатки на начало дня",
    headerTooltip: "Остатки на начало дня",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.OPENING_BALANCE_LM,
    headerName: "Остатки на начало дня PM",
    headerTooltip: "Остатки на начало дня PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.OPENING_BALANCE_MOM,
    headerName: "Остатки на начало дня MOM",
    headerTooltip: "Остатки на начало дня MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.OPENING_BALANCE_MOM_PERCENT,
    headerName: "Остатки на начало дня MOM%",
    headerTooltip: "Остатки на начало дня MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.OPENING_BALANCE_LY,
    headerName: "Остатки на начало дня PY",
    headerTooltip: "Остатки на начало дня PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.OPENING_BALANCE_YOY,
    headerName: "Остатки на начало дня YOY",
    headerTooltip: "Остатки на начало дня YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },

  {
    field: COLUMN_KEY.FINAL_BALANCE,
    headerName: "Остатки на конец дня",
    headerTooltip: "Остатки на конец дня",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.FINAL_BALANCE_LM,
    headerName: "Остатки на конец дня PM",
    headerTooltip: "Остатки на конец дня PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.FINAL_BALANCE_MOM,
    headerName: "Остатки на конец дня MOM",
    headerTooltip: "Остатки на конец дня MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.FINAL_BALANCE_MOM_PERCENT,
    headerName: "Остатки на конец дня MOM%",
    headerTooltip: "Остатки на конец дня MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.FINAL_BALANCE_LY,
    headerName: "Остатки на конец дня PY",
    headerTooltip: "Остатки на конец дня PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.FINAL_BALANCE_YOY,
    headerName: "Остатки на конец дня YOY",
    headerTooltip: "Остатки на конец дня YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },

  {
    field: COLUMN_KEY.WRITEOFF_WEIGHT,
    headerName: "Списания, вес",
    headerTooltip: "Списания, вес",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_WEIGHT_LM,
    headerName: "Списания, вес PM",
    headerTooltip: "Списания, вес PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_WEIGHT_MOM,
    headerName: "Списания, вес MOM",
    headerTooltip: "Списания, вес MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_MOM,
    headerName: "Списания, вес MOM%",
    headerTooltip: "Списания, вес MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_WEIGHT_LY,
    headerName: "Списания, вес PY",
    headerTooltip: "Списания, вес PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_WEIGHT_YOY,
    headerName: "Списания, вес YOY",
    headerTooltip: "Списания, вес YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_YOY,
    headerName: "Списания, вес YOY%",
    headerTooltip: "Списания, вес YOY%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },

  {
    field: COLUMN_KEY.WRITEOFF_COUNT,
    headerName: "Списания, кол-во",
    headerTooltip: "Списания, кол-во",
    type: "numericColumn",
    valueFormatter: (params: any) => {
      if (params.value == null) return "";
      return params.value.toLocaleString("ru-RU");
    },
  },
  {
    field: COLUMN_KEY.WRITEOFF_COUNT_LM,
    headerName: "Списания, кол-во PM",
    headerTooltip: "Списания, кол-во PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_COUNT_MOM,
    headerName: "Списания, кол-во MOM",
    headerTooltip: "Списания, кол-во MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_COUNT_MOM_PERCENT,
    headerName: "Списания, кол-во MOM%",
    headerTooltip: "Списания, кол-во MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_COUNT_LY,
    headerName: "Списания, кол-во PY",
    headerTooltip: "Списания, кол-во PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_COUNT_YOY,
    headerName: "Списания, кол-во YOY",
    headerTooltip: "Списания, кол-во YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITEOFF_COUNT_YOY_PERCENT,
    headerName: "Списания, кол-во YOY%",
    headerTooltip: "Списания, кол-во YOY%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },

  {
    field: COLUMN_KEY.TURNOVER_GOODS,
    headerName: "Оборачиваемость остатков",
    headerTooltip: "Оборачиваемость остатков",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_LM,
    headerName: "Оборачиваемость остатков PM",
    headerTooltip: "Оборачиваемость остатков PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_MOM,
    headerName: "Оборачиваемость остатков MOM",
    headerTooltip: "Оборачиваемость остатков MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_MOM_PERCENT,
    headerName: "Оборачиваемость остатков MOM%",
    headerTooltip: "Оборачиваемость остатков MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_LY,
    headerName: "Оборачиваемость остатков PY",
    headerTooltip: "Оборачиваемость остатков PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_YOY,
    headerName: "Оборачиваемость остатков YOY",
    headerTooltip: "Оборачиваемость остатков YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_YOY_PERCENT,
    headerName: "Оборачиваемость остатков YOY%",
    headerTooltip: "Оборачиваемость остатков YOY%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT,
    headerName: "Маржа % без учета скидки",
    headerTooltip: "Маржа % без учета скидки",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LM,
    headerName: "Маржа % без учета скидки PM",
    headerTooltip: "Маржа % без учета скидки PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_MOM,
    headerName: "Маржа % без учета скидки MOM",
    headerTooltip: "Маржа % без учета скидки MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_MOM_PERCENT,
    headerName: "Маржа % без учета скидки MOM%",
    headerTooltip: "Маржа % без учета скидки MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LY,
    headerName: "Маржа % без учета скидки PY",
    headerTooltip: "Маржа % без учета скидки PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_YOY,
    headerName: "Маржа % без учета скидки YOY",
    headerTooltip: "Маржа % без учета скидки YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  // {
  //   field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_YOY_PERCENT,
  //   headerName: "Наценка % без учета скидки YOY%",
  //   headerTooltip: "Наценка % без учета скидки YOY%",
  //   cellDataType: "number",
  //   valueFormatter: (params: any) =>
  //     formatNumber(params.data[COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_YOY_PERCENT]),
  // },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT,
    headerName: "Наценка % без учета скидки",
    headerTooltip: "Наценка % без учета скидки",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.PROCEEDS_OFFLINE,
    headerName: "Выручка Офлайн",
    headerTooltip: "Выручка Офлайн",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LM,
    headerName: "Наценка % без учета скидки PM",
    headerTooltip: "Наценка % без учета скидки PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },

  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_MOM_PERCENT,
    headerName: "Наценка % без учета скидки MOM%",
    headerTooltip: "Наценка % без учета скидки MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_MOM,
    headerName: "Наценка % без учета скидки MOM",
    headerTooltip: "Наценка % без учета скидки MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LY,
    headerName: "Наценка % без учета скидки PY",
    headerTooltip: "Наценка % без учета скидки PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_YOY,
    headerName: "Наценка % без учета скидки YOY",
    headerTooltip: "Наценка % без учета скидки YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT,
    headerName: "Наценка без учета скидки",
    headerTooltip: "Наценка без учета скидки",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_LM,
    headerName: "Наценка без учета скидки PM",
    headerTooltip: "Наценка без учета скидки PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_MOM,
    headerName: "Наценка без учета скидки MOM",
    headerTooltip: "Наценка без учета скидки MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_MOM_PERCENT,
    headerName: "Наценка без учета скидки MOM%",
    headerTooltip: "Наценка без учета скидки MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_LY,
    headerName: "Наценка без учета скидки PY",
    headerTooltip: "Наценка без учета скидки PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_YOY,
    headerName: "Наценка без учета скидки YOY",
    headerTooltip: "Наценка без учета скидки YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_YOY_PERCENT,
    headerName: "Наценка без учета скидки YOY%",
    headerTooltip: "Наценка без учета скидки YOY%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },

  {
    field: COLUMN_KEY.TURNOVER_GOODS_MOM_PERCENT,
    headerName: "Оборачиваемость остатков MOM%",
    headerTooltip: "Оборачиваемость остатков MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_LY,
    headerName: "Оборачиваемость остатков PY",
    headerTooltip: "Оборачиваемость остатков PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_YOY,
    headerName: "Оборачиваемость остатков YOY",
    headerTooltip: "Оборачиваемость остатков YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_YOY_PERCENT,
    headerName: "Оборачиваемость остатков YOY%",
    headerTooltip: "Оборачиваемость остатков YOY%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_MOM,
    headerName: "Оборачиваемость остатков MOM",
    headerTooltip: "Оборачиваемость остатков MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS_LM,
    headerName: "Оборачиваемость остатков PM",
    headerTooltip: "Оборачиваемость остатков PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TURNOVER_GOODS,
    headerName: "Оборачиваемость остатков",
    headerTooltip: "Оборачиваемость остатков",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.STORE_NAME,
    headerName: "Магазин",
    cellStyle: { textAlign: "left" },
    pinned: "left",
    resizable: true,
    wrapText: true,
    autoHeight: true,
    suppressHeaderMenuButton: true,
  },
  {
    field: COLUMN_KEY.PROCEEDS,
    headerName: "Выручка",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PLAN_AVG_CHECK_EXECUTION_PERCENT,
    headerName: "Ср. Чек PlanEx %",
    headerTooltip: "Текущее выполнение выполнения плана",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PLAN_AVG_CHECK_FORECAST_PERCENT,
    headerName: "Ср. Чек Forecast %",
    headerTooltip: "Прогноз выполнения на конец месяца %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PROCEEDS_Q_C_LM,
    headerTooltip: "В прошлом месяце",
    headerName: "Выручка QC PM",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC_MOM,
    headerName: "Выручка QC MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC_MOM_PERCENT,
    headerName: "Изменение выручки QC к прошлому месяцу %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC_YOY,
    headerName: "Выручка QC YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PROCEEDS_QC_YOY_PERCENT,
    headerName: "Выручка QC YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PLAN_PROCEEDS_QC_EXECUTION_PERCENT,
    headerName: "Выручка QC PlanEx %",
    headerTooltip: "Текущее выполнение выполнения плана",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_FOREST,
    headerName: "Скидка, руб.",
    headerTooltip: "Скидка",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_FOREST_LM,
    headerName: "Скидки, руб. PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_FOREST_MOM,
    headerName: "Скидки, руб. MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
      return null;
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_FOREST_MOM_PERCENT,
    headerName: "Скидки, руб. MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_FOREST_LY,
    headerName: "Скидки, руб. PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_FOREST_YOY,
    headerName: "Скидки, руб. YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_FOREST_YOY_PERCENT,
    headerName: "Скидки, руб. YoY%",
    headerTooltip: "Процент изменения по сравнению с прошлым годом %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT,
    headerName: "Скидка %",
    headerTooltip: "Скидка %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.WRITE_OFF_LM,
    headerName: "Списания, руб. PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.OPS,
    headerName: "Причина списания",
    headerTooltip: "Причина списания",
    minWidth: 180,
    pinned: "left",
    cellDataType: "string",
    valueGetter: (params) => params.data?.ops,
  },
  {
    field: COLUMN_KEY.ACCOUNT_NAME,
    headerName: "Причина списания",
    headerTooltip: "Причина списания",
    minWidth: 180,
    pinned: "left",
    cellDataType: "string",
    valueGetter: (params) => params.data?.accountName,
  },
  {
    field: COLUMN_KEY.PROCEEDS_IM_LM,
    headerName: "Выручка ИМ PM",
    headerTooltip: "Выручка интернет-магазина за последний месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  // ----------------- Количество заказов ИМ -----------------
  {
    field: COLUMN_KEY.ONLINE_COUNT_ORDERS,
    headerName: "Заказы онлайн",
    headerTooltip: "Количество онлайн заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.ORDINARY_COUNT_ORDERS,
    headerName: "Заказы обычные",
    headerTooltip: "Количество обычных заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PICKUP_COUNT_ORDERS,
    headerName: "Заказы самовывоз",
    headerTooltip: "Количество заказов на самовывоз",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.KUPER_COUNT_ORDERS,
    headerName: "Заказы купер",
    headerTooltip: "Количество заказов купер",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.COMPLETED_ONLINE_COUNT_ORDERS,
    headerName: "Завершенные онлайн",
    headerTooltip: "Количество завершенных онлайн заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.COMPLETED_ORDINARY_COUNT_ORDERS,
    headerName: "Завершенные обычные",
    headerTooltip: "Количество завершенных обычных заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.COMPLETED_PICKUP_COUNT_ORDERS,
    headerName: "Завершенные самовывоз",
    headerTooltip: "Количество завершенных заказов на самовывоз",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.COMPLETED_KUPER_COUNT_ORDERS,
    headerName: "Завершенные купер",
    headerTooltip: "Количество завершенных заказов купер",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.CLOSED_ONLINE_COUNT_ORDERS,
    headerName: "Закрытые онлайн",
    headerTooltip: "Количество закрытых онлайн заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.CLOSED_ORDINARY_COUNT_ORDERS,
    headerName: "Закрытые обычные",
    headerTooltip: "Количество закрытых обычных заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.CLOSED_PICKUP_COUNT_ORDERS,
    headerName: "Закрытые самовывоз",
    headerTooltip: "Количество закрытых заказов на самовывоз",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  // ----------------- Выручка ИМ -----------------
  {
    field: COLUMN_KEY.ORDINARY_PROCEEDS,
    headerName: "Выручка обычные",
    headerTooltip: "Выручка от обычных заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PICKUP_PROCEEDS,
    headerName: "Выручка самовывоз",
    headerTooltip: "Выручка от заказов на самовывоз",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.KUPER_PROCEEDS,
    headerName: "Выручка купер",
    headerTooltip: "Выручка от заказов купер",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.PROCEEDS_ALL,
    headerName: "Общая выручка сети",
    headerTooltip: "Общая выручка сети",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.AVG_ITEMS_PER_CHECK,
    headerName: "Среднее количество товаров в чеке",
    headerTooltip: "Среднее количество товаров в чеке интернет-магазина",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.UNIQUE_CUSTOMERS,
    headerName: "Уникальные клиенты",
    headerTooltip: "Количество уникальных клиентов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.UNIQUE_COMPLETED_CUSTOMERS,
    headerName: "Уникальные завершенные клиенты",
    headerTooltip: "Количество уникальных клиентов с завершенными заказами",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.TOTAL_ORDERS,
    headerName: "Всего заказов",
    headerTooltip: "Общее количество заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.DISCRETENESS,
    headerName: "Дискретность",
    headerTooltip:
      "Дискретность (отношение общего количества заказов к уникальным клиентам)",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.CANCELLATION_PERCENTAGE,
    headerName: "Процент отмены",
    headerTooltip: "Процент отмененных заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.CANCELLATION_PERCENTAGE_ALL,
    headerName: "Процент отмены все",
    headerTooltip: "Процент отмененных заказов (все типы)",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.CANCELLATION_PERCENTAGE_PICKUP,
    headerName: "Процент отмены самовывоз",
    headerTooltip: "Процент отмененных заказов на самовывоз",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.CANCELLATION_PERCENTAGE_ORDINARY,
    headerName: "Процент отмены обычные",
    headerTooltip: "Процент отмененных обычных заказов",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.DELIVERY_IM_COUNT,
    headerName: "Доставка ИМ",
    headerTooltip: "Количество доставок интернет-магазина",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.AMOUNT_WRITE_OFF,
    headerName: "Списания, кол-во PM",
    headerTooltip: "Списания, кол-во PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.AMOUNT_WRITE_OFF_MOM,
    headerName: "Списания, кол-во MOM",
    headerTooltip: "Списания, кол-во MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.AMOUNT_WRITE_OFF_MOM_PERCENT,
    headerName: "Списания, кол-во MOM%",
    headerTooltip: "Списания, кол-во MOM%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.AMOUNT_WRITE_OFF_LY,
    headerName: "Списания, кол-во PY",
    headerTooltip: "Списания, кол-во PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.AMOUNT_WRITE_OFF_YOY,
    headerName: "Списания, кол-во YOY",
    headerTooltip: "Списания, кол-во YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
  },
  {
    field: COLUMN_KEY.AMOUNT_WRITE_OFF_YOY_PERCENT,
    headerName: "Списания, кол-во YOY%",
    headerTooltip: "Списания, кол-во YOY%",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.PROCEEDS_DAY,
    headerName: "Дневная выручка",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_DAY_LM,
    headerName: "Дневная выручка PM",
    headerTooltip: "В прошлом месяце",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },

  {
    field: COLUMN_KEY.PROCEEDS_DAY_MOM,
    headerName: "Дневная выручка MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_DAY_MOM_PERCENT,
    headerName: "Дневная выручка MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_DAY_LY,
    headerName: "Дневная выручка PY",
    headerClass: "column",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_DAY_YOY,
    headerName: "Дневная выручка YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_DAY_YOY_PERCENT,
    headerName: "Дневная выручка YoY %",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_NIGHT,
    headerName: "Ночная выручка",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_NIGHT_LM,
    headerName: "Ночная выручка PM",
    headerTooltip: "В прошлом месяце",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },

  {
    field: COLUMN_KEY.PROCEEDS_NIGHT_MOM,
    headerName: "Ночная выручка MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_NIGHT_MOM_PERCENT,
    headerName: "Ночная выручка MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_NIGHT_LY,
    headerName: "Ночная выручка PY",
    headerClass: "column",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_NIGHT_YOY,
    headerName: "Ночная выручка YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROCEEDS_NIGHT_YOY_PERCENT,
    headerName: "Ночная выручка YoY %",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT,
    headerName: "Ночная выручка %",
    headerTooltip: "Ночная выручка %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_LM,
    headerName: "Ночная выручка % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_MOM,
    headerName: "Ночная выручка % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_LY,
    headerName: "Ночная выручка %  PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_YOY,
    headerName: "Ночная выручка % YoY",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_DAY,
    headerName: "Дневная валовая прибыль, руб.",
    headerTooltip: "Валовая прибыль",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_DAY_LM,
    headerName: "Дневная валовая прибыль PM, руб.",
    headerTooltip: "Валовая прибыль за предыдущий месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_DAY_MOM,
    headerName: "Дневная валовая прибыль MoM, руб.",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_DAY_MOM_PERCENT,
    headerName: "Дневная валовая прибыль MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_DAY_LY,
    headerName: "Дневная валовая прибыль PY, руб.",
    headerTooltip: "Валовая прибыль за прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_DAY_YOY,
    headerName: "Дневная валовая прибыль YoY, руб.",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_DAY_YOY_PERCENT,
    headerName: "Дневная валовая прибыль YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_NIGHT,
    headerName: "Ночная валовая прибыль, руб.",
    headerTooltip: "Валовая прибыль",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_NIGHT_LM,
    headerName: "Ночная валовая прибыль PM, руб.",
    headerTooltip: "Валовая прибыль за предыдущий месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_NIGHT_MOM,
    headerName: "Ночная валовая прибыль MoM, руб.",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_NIGHT_MOM_PERCENT,
    headerName: "Ночная валовая прибыль MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_NIGHT_LY,
    headerName: "Ночная валовая прибыль PY, руб.",
    headerTooltip: "Валовая прибыль за прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_NIGHT_YOY,
    headerName: "Ночная валовая прибыль YoY, руб.",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.PROFIT_NIGHT_YOY_PERCENT,
    headerName: "Ночная валовая прибыль YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT,
    headerName: "Ночная прибыль %",
    headerTooltip: "Ночная прибыль %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_LM,
    headerName: "Ночная прибыль % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_MOM,
    headerName: "Ночная прибыль % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_LY,
    headerName: "Ночная прибыль % PY",
    headerTooltip: "Наценка за прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_YOY,
    headerName: "Ночная прибыль % YoY",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_DAY,
    headerName: "Дневная наценка %",
    headerTooltip: "Наценка %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_DAY_LM,
    headerName: "Дневная наценка % PM",
    headerTooltip: "Наценка за предыдущий месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_DAY_MOM,
    headerName: "Дневная наценка % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_DAY_MOM_PERCENT,
    headerName: "Дневная наценка % MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_DAY_LY,
    headerName: "Дневная наценка % PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_DAY_YOY,
    headerName: "Дневная наценка % YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_DAY_YOY_PERCENT,
    headerName: "Дневная наценка % YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_NIGHT,
    headerName: "Ночная наценка %",
    headerTooltip: "Наценка %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_NIGHT_LM,
    headerName: "Ночная наценка % PM",
    headerTooltip: "Наценка за предыдущий месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_NIGHT_MOM,
    headerName: "Ночная наценка % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_NIGHT_MOM_PERCENT,
    headerName: "Ночная наценка % MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_NIGHT_LY,
    headerName: "Ночная наценка % PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_NIGHT_YOY,
    headerName: "Ночная наценка % YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_PERCENT_NIGHT_YOY_PERCENT,
    headerName: "Ночная наценка % YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY,
    headerName: "Дневная наценка % без скидки",
    headerTooltip: "Наценка % без учета скидки",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_LM,
    headerName: "Дневная наценка % без скидки PM",
    headerTooltip: "Наценка % без учета скидки PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_MOM,
    headerName: "Дневная наценка % без скидки MOM",
    headerTooltip: "Наценка % без учета скидки MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_LY,
    headerName: "Дневная наценка % без скидки PY",
    headerTooltip: "Наценка % без учета скидки PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_YOY,
    headerName: "Дневная наценка % без скидки YOY",
    headerTooltip: "Наценка % без учета скидки YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT,
    headerName: "Ночная наценка % без скидки",
    headerTooltip: "Наценка % без учета скидки",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_LM,
    headerName: "Ночная наценка % без скидки PM",
    headerTooltip: "Наценка % без учета скидки PM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_MOM,
    headerName: "Ночная наценка % без скидки MOM",
    headerTooltip: "Наценка % без учета скидки MOM",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_LY,
    headerName: "Ночная наценка % без скидки PY",
    headerTooltip: "Наценка % без скидки PY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_YOY,
    headerName: "Ночная наценка % без скидки YOY",
    headerTooltip: "Наценка % без учета скидки YOY",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
  },
  {
    field: COLUMN_KEY.COST_PRICE_DAY,
    headerName: "Дневная себестоимость, руб.",
    headerTooltip: "Себестоимость",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_DAY_LM,
    headerName: "Дневная себестоимость, руб. PM",
    headerTooltip: "Прошлый месяц",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_DAY_MOM,
    headerName: "Дневная себестоимость, руб. MOM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_DAY_MOM_PERCENT,
    headerName: "Дневная себестоимость, руб. MOM%",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_DAY_LY,
    headerName: "Дневная себестоимость, руб. PY",
    headerTooltip: "Прошлый год",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_DAY_YOY,
    headerName: "Дневная себестоимость, руб. YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_DAY_YOY_PERCENT,
    headerName: "Дневная себестоимость, руб. YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_NIGHT,
    headerName: "Ночная себестоимость, руб.",
    headerTooltip: "Себестоимость",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_NIGHT_LM,
    headerName: "Ночная себестоимость, руб. PM",
    headerTooltip: "Прошлый месяц",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_NIGHT_MOM,
    headerName: "Ночная себестоимость, руб. MOM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_NIGHT_MOM_PERCENT,
    headerName: "Ночная себестоимость, руб. MOM%",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_NIGHT_LY,
    headerName: "Ночная себестоимость, руб. PY",
    headerTooltip: "Прошлый год",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_NIGHT_YOY,
    headerName: "Ночная себестоимость, руб. YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? Number(params.value).toLocaleString("ru-RU") : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      }
    },
  },
  {
    field: COLUMN_KEY.COST_PRICE_NIGHT_YOY_PERCENT,
    headerName: "Ночная себестоимость, руб. YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_DAY,
    headerName: "Дневная скидка, руб.",
    headerTooltip: "Скидка",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_DAY_LM,
    headerName: "Дневная скидка, руб. PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_DAY_MOM,
    headerName: "Дневная скидка, руб. MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_DAY_MOM_PERCENT,
    headerName: "Дневная скидка, руб. MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_DAY_LY,
    headerName: "Дневная скидка, руб. PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_DAY_YOY,
    headerName: "Дневная скидка, руб. YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_DAY_YOY_PERCENT,
    headerName: "Дневная скидка, руб. YoY%",
    headerTooltip: "Процент изменения по сравнению с прошлым годом %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_NIGHT,
    headerName: "Ночная скидка, руб.",
    headerTooltip: "Скидка",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_NIGHT_LM,
    headerName: "Ночная скидка, руб. PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_NIGHT_MOM,
    headerName: "Ночная скидка, руб. MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_NIGHT_MOM_PERCENT,
    headerName: "Ночная скидка, руб. MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_NIGHT_LY,
    headerName: "Ночная скидка, руб. PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_NIGHT_YOY,
    headerName: "Ночная скидка, руб. YoY",
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_NIGHT_YOY_PERCENT,
    headerName: "Ночная скидка, руб. YoY%",
    headerTooltip: "Процент изменения по сравнению с прошлым годом %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.DISCOUNT_PERCENT_DAY,
    headerName: "Дневная скидка %",
    headerTooltip: "Скидка %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_DAY_LM,
    headerName: "Дневная скидка % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_DAY_MOM_PERCENT,
    headerName: "Дневная скидка % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_DAY_LY,
    headerName: "Дневная скидка %  PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_DAY_YOY_PERCENT,
    headerName: "Дневная скидка % YoY",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT,
    headerName: "Ночная скидка %",
    headerTooltip: "Скидка %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_LM,
    headerName: "Ночная скидка % PM",
    headerTooltip: "Прошлый месяц",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_MOM_PERCENT,
    headerName: "Ночная скидка % MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_LY,
    headerName: "Ночная скидка %  PY",
    headerTooltip: "Прошлый год",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    field: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_YOY_PERCENT,
    headerName: "Ночная скидка % YoY",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "#DE5656" };
      } else if (params.value > 100) {
        return { color: "#71DE56" };
      }
    },
  },
  {
    headerName: "Дневное кол. продаж",
    headerTooltip: "Кол. продаж",
    field: COLUMN_KEY.COUNT_SALES_DAY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Дневное кол. продаж MoM",
    field: COLUMN_KEY.COUNT_SALES_DAY_MOM,
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Дневное кол. продаж MoM%",
    field: COLUMN_KEY.COUNT_SALES_DAY_MOM_PERCENT,
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    headerName: "Дневное кол. продаж PM",
    field: COLUMN_KEY.COUNT_SALES_DAY_LM,
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Дневное кол. продаж PY",
    field: COLUMN_KEY.COUNT_SALES_DAY_LY,
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Дневное кол. продаж YoY",
    field: COLUMN_KEY.COUNT_SALES_DAY_YOY,
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Дневное кол. продаж YoY%",
    field: COLUMN_KEY.COUNT_SALES_DAY_YOY_PERCENT,
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    headerName: "Ночное кол. продаж",
    headerTooltip: "Кол. продаж",
    field: COLUMN_KEY.COUNT_SALES_NIGHT,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ночное кол. продаж MoM",
    field: COLUMN_KEY.COUNT_SALES_NIGHT_MOM,
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ночное кол. продаж MoM%",
    field: COLUMN_KEY.COUNT_SALES_NIGHT_MOM_PERCENT,
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    headerName: "Ночное кол. продаж PM",
    field: COLUMN_KEY.COUNT_SALES_NIGHT_LM,
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ночное кол. продаж PY",
    field: COLUMN_KEY.COUNT_SALES_NIGHT_LY,
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ночное кол. продаж YoY",
    field: COLUMN_KEY.COUNT_SALES_NIGHT_YOY,
    headerTooltip: "Изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ночное кол. продаж YoY%",
    field: COLUMN_KEY.COUNT_SALES_NIGHT_YOY_PERCENT,
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_DAY,
    headerName: "Дневной ср. чек",
    headerTooltip: "Ср. чек",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_DAY_LM,
    headerName: "Дневной ср. чек PM",
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_DAY_MOM,
    headerName: "Дневной ср. чек MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_DAY_MOM_PERCENT,
    headerName: "Дневной ср. чек MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_DAY_LY,
    headerName: "Дневной ср. чек  PY",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_DAY_YOY,
    headerName: "Дневной ср. чек YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_DAY_YOY_PERCENT,
    headerName: "Дневной ср. чек YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_NIGHT,
    headerName: "Ночной ср. чек",
    headerTooltip: "Ср. чек",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_NIGHT_LM,
    headerName: "Ночной ср. чек PM",
    headerTooltip: "В прошлом месяце",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_NIGHT_MOM,
    headerName: "Ночной ср. чек MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_NIGHT_MOM_PERCENT,
    headerName: "Ночной ср. чек MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_NIGHT_LY,
    headerName: "Ночной ср. чек  PY",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_NIGHT_YOY,
    headerName: "Ночной ср. чек YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.AVG_CHECK_NIGHT_YOY_PERCENT,
    headerName: "Ночной ср. чек YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
];

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
  STORE = "store",
  SECTOR = "sector",
  FORMAT_STORE = "formatStore",
  DISCOUNT_TYPE = "discountType",
  TYPE = "type",
  IS_IM = "isIm",
  IM_TYPE_ORDER = "imTypeOrder",
  NAME_MANAGER = "nameManager",
  LEGAL_ENTITY = "legalEntity",
  IM_DELIVERY_METHOD = "imDeliveryMethod",
  IM_PAYMENT_METHOD = "imPaymentMethod",
  PAYMENT_METHOD = "typePayment",
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
  MEASURE_UNIT = "dishMeasureUnit",
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
  GROUP_FOREST = "idGroupProduct",
  SUB_GROUPS_FOREST = "oneLvlGroupProduct",
  SUB_SUB_GROUPS_FOREST = "twoLvlGroupProduct",
  SUB_SUB_SUB_GROUPS_FOREST = "threeLvlGroupProduct",
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
  { label: "Магазин", value: ColumnsKeyGroupings.STORE },
  { label: "Сектор", value: ColumnsKeyGroupings.SECTOR },
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
  { label: "Способ оплаты", value: ColumnsKeyGroupings.PAYMENT_METHOD },
  { label: "Статусы", value: ColumnsKeyGroupings.IM_STATUS_ORDER },
  { label: "Промо", value: ColumnsKeyGroupings.IM_PROMO },
  { label: "Период доставки", value: ColumnsKeyGroupings.IM_RECEIVE_INTERVAL },
  { label: "Пол", value: ColumnsKeyGroupings.SEX_LOYAL },
  { label: "Возраст", value: ColumnsKeyGroupings.LOYAL_AGE },
  { label: "ID чека", value: ColumnsKeyGroupings.ID_CHECK },
  { label: "Структура продаж", value: ColumnsKeyGroupings.GROUPS_FRANCHISE },
  { label: "Подгруппа", value: ColumnsKeyGroupings.SUB_GROUPS },
  { label: "Подподгруппа", value: ColumnsKeyGroupings.SUB_SUB_GROUPS },
  { label: "Группа", value: ColumnsKeyGroupings.GROUP_FOREST },
  { label: "Подгруппа", value: ColumnsKeyGroupings.SUB_GROUPS_FOREST },
  { label: "Подподгруппа", value: ColumnsKeyGroupings.SUB_SUB_GROUPS_FOREST },
  {
    label: "Подподподгруппа",
    value: ColumnsKeyGroupings.SUB_SUB_SUB_GROUPS_FOREST,
  },
  { label: "Тип поставщика", value: ColumnsKeyGroupings.TYPE_PRODUCTS },
  { label: "Сезоность", value: ColumnsKeyGroupings.SEASONALITY_PRODUCTS },
  {
    label: "Структурное подразделение",
    value: ColumnsKeyGroupings.SUBDIVISION_PRODUCTS,
  },
  { label: "Тип чека", value: ColumnsKeyGroupings.TYPE },

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
  ONE_LVL_GROUP_PRODUCT_ID = "idOneLvlGroupProduct",
  TWO_LVL_GROUP_PRODUCT_ID = "idTwoLvlGroupProduct",
  THREE_LVL_GROUP_PRODUCT_ID = "idThreeLvlGroupProduct",
}
// Конфиг таблицы
export const tableConfig: ColDef<any>[] = [
  {
    field: ColumnsKeyId.ONE_LVL_GROUP_PRODUCT_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.TWO_LVL_GROUP_PRODUCT_ID,
    hide: true,
  },
  {
    field: ColumnsKeyId.THREE_LVL_GROUP_PRODUCT_ID,
    hide: true,
  },
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
  {
    field: ColumnsKeyGroupings.TYPE,
    headerName: "Тип чека",
  },
  {
    field: ColumnsKeyGroupings.FORMAT_STORE,
    headerName: "Формат магазина",
  },
  { headerName: "ID чека", field: ColumnsKeyGroupings.ID_CHECK },
  {
    headerName: "Структура продаж",
    field: ColumnsKeyGroupings.GROUPS_FRANCHISE,
  },
  { headerName: "Подгруппа", field: ColumnsKeyGroupings.SUB_GROUPS },
  { headerName: "Подподгруппа", field: ColumnsKeyGroupings.SUB_SUB_GROUPS },
  { headerName: "Подгруппа", field: ColumnsKeyGroupings.SUB_GROUPS_FOREST },
  {
    headerName: "Подподгруппа",
    field: ColumnsKeyGroupings.SUB_SUB_GROUPS_FOREST,
  },
  {
    headerName: "Подподподгруппа",
    field: ColumnsKeyGroupings.SUB_SUB_SUB_GROUPS_FOREST,
  },
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
  { headerName: "Партнер", field: ColumnsKeyGroupings.NAME_MANAGER },
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
    field: ColumnsKeyGroupings.DISCOUNT_TYPE,
    headerName: "Тип скидки",
    width: 300,
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
    field: ColumnsKeyGroupings.SECTOR,
    headerName: "Сектор",
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
    headerName: "Группа",
    field: ColumnsKeyGroupings.GROUP_FOREST,
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.PRODUCT,
    headerName: "Номенклатура",
    cellStyle: { textAlign: "left" },
  },
  {
    field: ColumnsKeyGroupings.MEASURE_UNIT,
    headerName: "Еденица измерения",
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
    headerName: "Способ оплаты",
    field: ColumnsKeyGroupings.PAYMENT_METHOD,
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.FARMER_PRICE,
    headerName: "Выручка",
    headerTooltip: "Выручка",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.FARMER_PRICE_LM,
    headerName: "Выручка PM",
    headerTooltip: "В прошлом месяце",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.FARMER_PRICE_MOM,
    headerName: "Выручка MoM",
    headerTooltip: "Изменение по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.FARMER_PRICE_MOM_PERCENT,
    headerName: "Выручка MoM %",
    headerTooltip: "Процент изменения по сравнению с прошлым месяцем",
    cellDataType: "number",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.FARMER_PRICE_LY,
    headerName: "Выручка PY",
    headerClass: "column",
    headerTooltip: "В прошлом году",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.FARMER_PRICE_YOY,
    headerName: "Выручка YoY",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.FARMER_PRICE_YOY_PERCENT,
    headerName: "Выручка YoY %",
    headerTooltip: "Изменение по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.WRITE_OFF,
    headerName: "Списания",
    headerTooltip: "Списания",
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
    headerName: "Списания, руб. YoY %",
    headerTooltip: "Процент изменения по сравнению с прошлым годом",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
    field: COLUMN_KEY.WRITE_OFF_PERCENT,
    headerName: "Списания %",
    headerTooltip: "Списания %",
    valueFormatter: (params: any) =>
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatPercent(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.UNIQUE_STORE_NS,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.UNIQUE_STORE_NS_LM,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.UNIQUE_STORE_NS_LY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. ночные номера карт",
    field: COLUMN_KEY.UNIQUE_CARD_NUMBER_NIGHT,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. ночные номера карт PM",
    field: COLUMN_KEY.UNIQUE_CARD_NUMBER_NIGHT_LM,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. ночные номера карт PY",
    field: COLUMN_KEY.UNIQUE_CARD_NUMBER_NIGHT_LY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. дневные номера карт",
    field: COLUMN_KEY.UNIQUE_CARD_NUMBER_DAY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. дневные номера карт PM",
    field: COLUMN_KEY.UNIQUE_CARD_NUMBER_DAY_LM,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. дневные номера карт PY",
    field: COLUMN_KEY.UNIQUE_CARD_NUMBER_DAY_LY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. ночные чеки",
    field: COLUMN_KEY.UNIQUE_CHECK_NIGHT,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. ночные чеки PM",
    field: COLUMN_KEY.UNIQUE_CHECK_NIGHT_LM,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. ночные чеки PY",
    field: COLUMN_KEY.UNIQUE_CHECK_NIGHT_LY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. дневные чеки",
    field: COLUMN_KEY.UNIQUE_CHECK_DAY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. дневные чеки PM",
    field: COLUMN_KEY.UNIQUE_CHECK_DAY_LM,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. дневные чеки PY",
    field: COLUMN_KEY.UNIQUE_CHECK_DAY_LY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.UNIQUE_REGION_NS,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.UNIQUE_REGION_NS_LM,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.UNIQUE_REGION_NS_LY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.UNIQUE_CITY_NS,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.UNIQUE_CITY_NS_LM,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    field: COLUMN_KEY.UNIQUE_CITY_NS_LY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. каналы",
    field: COLUMN_KEY.UNIQUE_CHANNEL_NS,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. каналы PM",
    field: COLUMN_KEY.UNIQUE_CHANNEL_NS_LM,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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
    headerName: "Ун. каналы PY",
    field: COLUMN_KEY.UNIQUE_CHANNEL_NS_LY,
    valueFormatter: (params: any) =>
      params.value != null ? formatNumber(params.value) : "",
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

export function mergeColumnDefsWithPriority(
  primary: ColDef[],
  secondary: ColDef[],
): ColDef[] {
  const result: Record<string, ColDef> = {};

  // Сначала добавляем вторичные (менее приоритетные)
  for (const col of secondary) {
    if (col.field) {
      result[col.field] = col;
    }
  }

  // Затем переопределяем приоритетными
  for (const col of primary) {
    if (col.field) {
      result[col.field] = col;
    }
  }

  return Object.values(result);
}

export const columnDefs = mergeColumnDefsWithPriority(
  tableColumns,
  tableConfig,
);
