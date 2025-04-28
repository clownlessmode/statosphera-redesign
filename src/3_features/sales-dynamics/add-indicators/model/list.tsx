import { COLUMN_KEY } from "@shared/constants/table-columns";
import { CheckboxTreeItem } from "@shared/ui/checkbox-tree";
import {
  BarChart,
  ClipboardCheck,
  CheckCircle,
  BarChart2,
  ChartLine,
  DollarSign,
  Hash,
  Heart,
  Percent,
  ShoppingCart,
  Tag,
  TrendingUp,
  CalendarCheck,
  PieChart,
  CalendarDays,
  ClipboardList,
  Share2,
  Trash2,
  Package,
  QrCode,
  Star,
  Image,
} from "lucide-react";

export const useIndicatorList = (): CheckboxTreeItem[] => {
  return [
    {
      id: COLUMN_KEY.GROUP_PROCEEDS,
      label: "Выручка",
      value: COLUMN_KEY.GROUP_PROCEEDS,
      icon: DollarSign,
      children: [
        {
          id: COLUMN_KEY.PROCEEDS,
          label: "Выручка",
          value: COLUMN_KEY.PROCEEDS,
        },
        {
          id: COLUMN_KEY.PROCEEDS_LM,
          label: "Выручка PM",
          value: COLUMN_KEY.PROCEEDS_LM,
        },
        {
          id: COLUMN_KEY.PROCEEDS_MOM,
          label: "Выручка MoM",
          value: COLUMN_KEY.PROCEEDS_MOM,
        },
        {
          id: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
          label: "Выручка MoM %",
          value: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.PROCEEDS_LY,
          label: "Выручка PY",
          value: COLUMN_KEY.PROCEEDS_LY,
        },
        {
          id: COLUMN_KEY.PROCEEDS_YOY,
          label: "Выручка YoY",
          value: COLUMN_KEY.PROCEEDS_YOY,
        },
        {
          id: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
          label: "Выручка YoY %",
          value: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_TODAY_YEAR,
          label: "Выручка YTD",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_LAST_YEAR,
          label: "Выручка PYTD",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_YOY,
          label: "Выручка YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_YOY_PERCENT,
          label: "Выручка YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_PLAN_PROCEEDS,
      label: "Выручка планы",
      value: COLUMN_KEY.GROUP_PLAN_PROCEEDS,
      icon: ChartLine,
      children: [
        {
          id: COLUMN_KEY.PLAN_PROCEEDS,
          label: "Выручка Plan",
          value: COLUMN_KEY.PLAN_PROCEEDS,
        },
        {
          id: COLUMN_KEY.PLAN_PROCEEDS_EXECUTION_PERCENT,
          label: "Выручка PlanEx %",
          value: COLUMN_KEY.PLAN_PROCEEDS_EXECUTION_PERCENT,
        },
        {
          id: COLUMN_KEY.PLAN_PROCEEDS_FORECAST,
          label: "Выручка Forecast",
          value: COLUMN_KEY.PLAN_PROCEEDS_FORECAST,
        },
        {
          id: COLUMN_KEY.PLAN_PROCEEDS_FORECAST_PERCENT,
          label: "Выручка Forecast %",
          value: COLUMN_KEY.PLAN_PROCEEDS_FORECAST_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_PLAN,
          label: "Выручка Cplan",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_PLAN,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_EXECUTION_PERCENT,
          label: "Выручка CEx %",
          value: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_EXECUTION_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_FORECAST_PERCENT,
          label: "Выручка CForecast %",
          value: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_FORECAST_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_CHECK,
      label: "Чеки",
      value: COLUMN_KEY.GROUP_CHECK,
      icon: CheckCircle,
      children: [
        { id: COLUMN_KEY.CHECK, label: "Кол. Чеков", value: COLUMN_KEY.CHECK },
        {
          id: COLUMN_KEY.CHECK_LM,
          label: "Кол. Чеков PM",
          value: COLUMN_KEY.CHECK_LM,
        },
        {
          id: COLUMN_KEY.CHECK_MOM,
          label: "Кол. Чеков MoM",
          value: COLUMN_KEY.CHECK_MOM,
        },
        {
          id: COLUMN_KEY.CHECK_MOM_PERCENT,
          label: "Кол. Чеков MoM %",
          value: COLUMN_KEY.CHECK_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.CHECK_LY,
          label: "Кол. Чеков PY",
          value: COLUMN_KEY.CHECK_LY,
        },
        {
          id: COLUMN_KEY.CHECK_YOY,
          label: "Кол. Чеков YoY",
          value: COLUMN_KEY.CHECK_YOY,
        },
        {
          id: COLUMN_KEY.CHECK_YOY_PERCENT,
          label: "Кол. Чеков YoY %",
          value: COLUMN_KEY.CHECK_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_CHECK_TODAY_YEAR,
          label: "Кол. Чеков YTD",
          value: COLUMN_KEY.CUMULATIVE_CHECK_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_CHECK_LAST_YEAR,
          label: "Кол. Чеков PYTD",
          value: COLUMN_KEY.CUMULATIVE_CHECK_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_CHECK_YOY,
          label: "Кол. Чеков YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_CHECK_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_CHECK_YOY_PERCENT,
          label: "Кол. Чеков YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_CHECK_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_PLAN_CHECK,
      label: "Чеки планы",
      value: COLUMN_KEY.GROUP_PLAN_CHECK,
      icon: CalendarCheck,
      children: [
        {
          id: COLUMN_KEY.PLAN_CHECK,
          label: "Кол. Чеков Plan",
          value: COLUMN_KEY.PLAN_CHECK,
        },
        {
          id: COLUMN_KEY.PLAN_CHECK_EXECUTION_PERCENT,
          label: "Кол. Чеков PlanEx %",
          value: COLUMN_KEY.PLAN_CHECK_EXECUTION_PERCENT,
        },
        {
          id: COLUMN_KEY.PLAN_CHECK_FORECAST,
          label: "Кол. Чеков Forecast",
          value: COLUMN_KEY.PLAN_CHECK_FORECAST,
        },
        {
          id: COLUMN_KEY.PLAN_CHECK_FORECAST_PERCENT,
          label: "Кол. Чеков Forecast %",
          value: COLUMN_KEY.PLAN_CHECK_FORECAST_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_CHECK_PLAN,
          label: "Кол. Чеков CPlan",
          value: COLUMN_KEY.CUMULATIVE_CHECK_PLAN,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PLAN_CHECK_EXECUTION_PERCENT,
          label: "Кол. Чеков CEx %",
          value: COLUMN_KEY.CUMULATIVE_PLAN_CHECK_EXECUTION_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PLAN_CHECK_FORECAST_PERCENT,
          label: "Кол. Чеков CForecast %",
          value: COLUMN_KEY.CUMULATIVE_PLAN_CHECK_FORECAST_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_AVG_CHECK,
      label: "Средний чек",
      value: COLUMN_KEY.GROUP_AVG_CHECK,
      icon: PieChart,
      children: [
        {
          id: COLUMN_KEY.AVG_CHECK,
          label: "Ср. чек",
          value: COLUMN_KEY.AVG_CHECK,
        },
        {
          id: COLUMN_KEY.AVG_CHECK_LM,
          label: "Ср. Чек PM",
          value: COLUMN_KEY.AVG_CHECK_LM,
        },
        {
          id: COLUMN_KEY.AVG_CHECK_MOM,
          label: "Ср. Чек MoM",
          value: COLUMN_KEY.AVG_CHECK_MOM,
        },
        {
          id: COLUMN_KEY.AVG_CHECK_MOM_PERCENT,
          label: "Ср. Чек MoM %",
          value: COLUMN_KEY.AVG_CHECK_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.AVG_CHECK_LY,
          label: "Ср. Чек PY",
          value: COLUMN_KEY.AVG_CHECK_LY,
        },
        {
          id: COLUMN_KEY.AVG_CHECK_YOY,
          label: "Ср. Чек YoY",
          value: COLUMN_KEY.AVG_CHECK_YOY,
        },
        {
          id: COLUMN_KEY.AVG_CHECK_YOY_PERCENT,
          label: "Ср. Чек YoY %",
          value: COLUMN_KEY.AVG_CHECK_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_AVG_CHECK_TODAY_YEAR,
          label: "Ср. Чек YTD",
          value: COLUMN_KEY.CUMULATIVE_AVG_CHECK_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_AVG_CHECK_LAST_YEAR,
          label: "Ср. Чек PYTD",
          value: COLUMN_KEY.CUMULATIVE_AVG_CHECK_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_AVG_CHECK_YOY,
          label: "Ср. Чек YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_AVG_CHECK_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_AVG_CHECK_YOY_PERCENT,
          label: "Ср. Чек YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_AVG_CHECK_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_PLAN_AVG_CHECK,
      label: "Средний чек планы",
      value: COLUMN_KEY.GROUP_PLAN_AVG_CHECK,
      icon: CalendarDays,
      children: [
        {
          id: COLUMN_KEY.PLAN_AVG_CHECK,
          label: "Ср. Чек Plan",
          value: COLUMN_KEY.PLAN_AVG_CHECK,
        },
        {
          id: COLUMN_KEY.PLAN_AVG_CHECK_EXECUTION_PERCENT,
          label: "Ср. Чек PlanEx %",
          value: COLUMN_KEY.PLAN_AVG_CHECK_EXECUTION_PERCENT,
        },
        {
          id: COLUMN_KEY.PLAN_AVG_CHECK_FORECAST,
          label: "Ср. Чек Forecast",
          value: COLUMN_KEY.PLAN_AVG_CHECK_FORECAST,
        },
        {
          id: COLUMN_KEY.PLAN_AVG_CHECK_FORECAST_PERCENT,
          label: "Ср. Чек Forecast %",
          value: COLUMN_KEY.PLAN_AVG_CHECK_FORECAST_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_AVG_CHECK_PLAN,
          label: "Ср. Чек CPlan",
          value: COLUMN_KEY.CUMULATIVE_AVG_CHECK_PLAN,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PLAN_AVG_CHECK_EXECUTION_PERCENT,
          label: "Ср. Чек CEx %",
          value: COLUMN_KEY.CUMULATIVE_PLAN_AVG_CHECK_EXECUTION_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PLAN_AVG_CHECK_FORECAST_PERCENT,
          label: "Ср. Чек CForecast %",
          value: COLUMN_KEY.CUMULATIVE_PLAN_AVG_CHECK_FORECAST_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_CHECK_QC,
      label: "Выручка QC",
      value: COLUMN_KEY.GROUP_CHECK_QC,
      icon: ClipboardCheck,
      children: [
        {
          id: COLUMN_KEY.PROCEEDS_QC,
          label: "Выручка QC",
          value: COLUMN_KEY.PROCEEDS_QC,
        },
        {
          id: COLUMN_KEY.PROCEEDS_QC_LM,
          label: "Выручка QC PM",
          value: COLUMN_KEY.PROCEEDS_QC_LM,
        },
        {
          id: COLUMN_KEY.PROCEEDS_QC_MOM,
          label: "Выручка QC MoM",
          value: COLUMN_KEY.PROCEEDS_QC_MOM,
        },
        {
          id: COLUMN_KEY.PROCEEDS_QC_MOM_PERCENT,
          label: "Изменение выручки QC к прошлому месяцу %",
          value: COLUMN_KEY.PROCEEDS_QC_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.PROCEEDS_QC_LY,
          label: "Выручка QC PY",
          value: COLUMN_KEY.PROCEEDS_QC_LY,
        },
        {
          id: COLUMN_KEY.PROCEEDS_QC_YOY,
          label: "Выручка QC YoY",
          value: COLUMN_KEY.PROCEEDS_QC_YOY,
        },
        {
          id: COLUMN_KEY.PROCEEDS_QC_YOY_PERCENT,
          label: "Выручка QC YoY %",
          value: COLUMN_KEY.PROCEEDS_QC_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_TODAY_YEAR,
          label: "Выручка QC YTD",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_LAST_YEAR,
          label: "Выручка QC PYTD",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_YOY,
          label: "Выручка QC YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_YOY_PERCENT,
          label: "Выручка QC YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_PLAN_QC,
      label: "Выручка QC планы",
      value: COLUMN_KEY.GROUP_PLAN_QC,
      icon: ClipboardList,
      children: [
        {
          id: COLUMN_KEY.PLAN_PROCEEDS_QC,
          label: "Выручка QC Plan",
          value: COLUMN_KEY.PLAN_PROCEEDS_QC,
        },
        {
          id: COLUMN_KEY.PLAN_PROCEEDS_QC_EXECUTION_PERCENT,
          label: "Выручка QC PlanEx %",
          value: COLUMN_KEY.PLAN_PROCEEDS_QC_EXECUTION_PERCENT,
        },
        {
          id: COLUMN_KEY.PLAN_PROCEEDS_QC_FORECAST,
          label: "Выручка QC Forecast",
          value: COLUMN_KEY.PLAN_PROCEEDS_QC_FORECAST,
        },
        {
          id: COLUMN_KEY.PLAN_PROCEEDS_QC_FORECAST_PERCENT,
          label: "Выручка QC Forecast %",
          value: COLUMN_KEY.PLAN_PROCEEDS_QC_FORECAST_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_PLAN,
          label: "Выручка QC CPlan",
          value: COLUMN_KEY.CUMULATIVE_PROCEEDS_QC_PLAN,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_QC_EXECUTION_PERCENT,
          label: "Выручка QC CPlanEx %",
          value: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_QC_EXECUTION_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_QC_FORECAST_PERCENT,
          label: "Выручка QC CForecast %",
          value: COLUMN_KEY.CUMULATIVE_PLAN_PROCEEDS_QC_FORECAST_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.SHARE_OF_PAYMENTS_QC,
      label: "Доля платежей QC",
      value: COLUMN_KEY.SHARE_OF_PAYMENTS_QC,
      icon: Share2,
      children: [
        {
          id: COLUMN_KEY.SHARE_OF_PAYMENTS_QC,
          label: "Применение QC %",
          value: COLUMN_KEY.SHARE_OF_PAYMENTS_QC,
        },
        {
          id: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC,
          label: "Применение QC % Plan",
          value: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC,
        },
        {
          id: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_EXECUTION_PERCENT,
          label: "Применение QC % PlanEx",
          value: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_EXECUTION_PERCENT,
        },
        {
          id: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_FORECAST,
          label: "Применение QC % Forecast",
          value: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_FORECAST,
        },
        {
          id: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_FORECAST_PERCENT,
          label: "Применение QC % Forecast %",
          value: COLUMN_KEY.PLAN_SHARE_OF_PAYMENTS_QC_FORECAST_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_DISCOUNT,
      label: "Скидки, руб.",
      value: COLUMN_KEY.GROUP_DISCOUNT,
      icon: Tag,
      children: [
        {
          id: COLUMN_KEY.DISCOUNT,
          label: "Скидка, руб.",
          value: COLUMN_KEY.DISCOUNT,
        },
        {
          id: COLUMN_KEY.DISCOUNT_LM,
          label: "Скидки, руб. PM",
          value: COLUMN_KEY.DISCOUNT_LM,
        },
        {
          id: COLUMN_KEY.DISCOUNT_MOM,
          label: "Скидки, руб. MoM",
          value: COLUMN_KEY.DISCOUNT_MOM,
        },
        {
          id: COLUMN_KEY.DISCOUNT_MOM_PERCENT,
          label: "Скидки, руб. MoM %",
          value: COLUMN_KEY.DISCOUNT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.DISCOUNT_LY,
          label: "Скидки, руб. PY",
          value: COLUMN_KEY.DISCOUNT_LY,
        },
        {
          id: COLUMN_KEY.DISCOUNT_YOY,
          label: "Скидки, руб. YoY",
          value: COLUMN_KEY.DISCOUNT_YOY,
        },
        {
          id: COLUMN_KEY.DISCOUNT_YOY_PERCENT,
          label: "Скидки, руб. YoY%",
          value: COLUMN_KEY.DISCOUNT_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_DISCOUNT_TODAY_YEAR,
          label: "Скидки, руб. YTD",
          value: COLUMN_KEY.CUMULATIVE_DISCOUNT_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_DISCOUNT_LAST_YEAR,
          label: "Скидки, руб. PYTD",
          value: COLUMN_KEY.CUMULATIVE_DISCOUNT_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_DISCOUNT_YOY,
          label: "Скидки, руб. YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_DISCOUNT_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_DISCOUNT_YOY_PERCENT,
          label: "Скидки YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_DISCOUNT_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_DISCOUNT_PERCENT,
      label: "Скидки %",
      value: COLUMN_KEY.GROUP_DISCOUNT_PERCENT,
      icon: Percent,
      children: [
        {
          id: COLUMN_KEY.DISCOUNT_PERCENT,
          label: "Скидки %",
          value: COLUMN_KEY.DISCOUNT_PERCENT,
        },
        {
          id: COLUMN_KEY.DISCOUNT_PERCENT_LM,
          label: "Скидки % PM",
          value: COLUMN_KEY.DISCOUNT_PERCENT_LM,
        },
        {
          id: COLUMN_KEY.DISCOUNT_PERCENT_MOM_PERCENT,
          label: "Скидки % MoM",
          value: COLUMN_KEY.DISCOUNT_PERCENT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.DISCOUNT_PERCENT_LY,
          label: "Скидки % PY",
          value: COLUMN_KEY.DISCOUNT_PERCENT_LY,
        },
        {
          id: COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT,
          label: "Скидки % YoY",
          value: COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_TODAY_YEAR,
          label: "Скидки % YTD",
          value: COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_LAST_YEAR,
          label: "Скидки % PYTD",
          value: COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_YOY_PERCENT,
          label: "Скидки % YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_DISCOUNT_PERCENT_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_COST_PRICE,
      label: "Себестоимость",
      value: COLUMN_KEY.GROUP_COST_PRICE,
      icon: BarChart,
      children: [
        {
          id: COLUMN_KEY.COST_PRICE,
          label: "Себестоимость",
          value: COLUMN_KEY.COST_PRICE,
        },
        {
          id: COLUMN_KEY.COST_PRICE_LM,
          label: "Себестоимость PM",
          value: COLUMN_KEY.COST_PRICE_LM,
        },
        {
          id: COLUMN_KEY.COST_PRICE_MOM,
          label: "Себестоимость MOM",
          value: COLUMN_KEY.COST_PRICE_MOM,
        },
        {
          id: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
          label: "Sebestoimost MOM%",
          value: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.COST_PRICE_LY,
          label: "Себестоимость PY",
          value: COLUMN_KEY.COST_PRICE_LY,
        },
        {
          id: COLUMN_KEY.COST_PRICE_YOY,
          label: "Себестоимость YoY",
          value: COLUMN_KEY.COST_PRICE_YOY,
        },
        {
          id: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
          label: "Себестоимость YoY %",
          value: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_COST_PRICE_TODAY_YEAR,
          label: "Себестоимость YTD",
          value: COLUMN_KEY.CUMULATIVE_COST_PRICE_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_COST_PRICE_LAST_YEAR,
          label: "Себестоимость PYTD",
          value: COLUMN_KEY.CUMULATIVE_COST_PRICE_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_COST_PRICE_YOY,
          label: "Себестоимость YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_COST_PRICE_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_COST_PRICE_YOY_PERCENT,
          label: "Себес. YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_COST_PRICE_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_PROFIT,
      label: "Наценка, руб.",
      value: COLUMN_KEY.GROUP_PROFIT,
      icon: TrendingUp,
      children: [
        {
          id: COLUMN_KEY.PROFIT,
          label: "Наценка, руб.",
          value: COLUMN_KEY.PROFIT,
        },
        {
          id: COLUMN_KEY.PROFIT_LM,
          label: "Наценка, руб. PM",
          value: COLUMN_KEY.PROFIT_LM,
        },
        {
          id: COLUMN_KEY.PROFIT_MOM,
          label: "Наценка, руб. MoM",
          value: COLUMN_KEY.PROFIT_MOM,
        },
        {
          id: COLUMN_KEY.PROFIT_MOM_PERCENT,
          label: "Наценка, руб. MoM %",
          value: COLUMN_KEY.PROFIT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.PROFIT_LY,
          label: "Наценка, руб. PY",
          value: COLUMN_KEY.PROFIT_LY,
        },
        {
          id: COLUMN_KEY.PROFIT_YOY,
          label: "Наценка, руб. YoY",
          value: COLUMN_KEY.PROFIT_YOY,
        },
        {
          id: COLUMN_KEY.PROFIT_YOY_PERCENT,
          label: "Наценка, руб. YoY %",
          value: COLUMN_KEY.PROFIT_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROFIT_TODAY_YEAR,
          label: "Наценка, руб. YTD",
          value: COLUMN_KEY.CUMULATIVE_PROFIT_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROFIT_LAST_YEAR,
          label: "Наценка, руб. PYTD",
          value: COLUMN_KEY.CUMULATIVE_PROFIT_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROFIT_YOY,
          label: "Наценка, руб. YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_PROFIT_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_PROFIT_YOY_PERCENT,
          label: "Наценка, руб. YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_PROFIT_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_WRITE_OFF,
      label: "Списания, руб.",
      value: COLUMN_KEY.GROUP_WRITE_OFF,
      icon: Trash2,
      children: [
        {
          id: COLUMN_KEY.WRITE_OFF,
          label: "Списания, руб.",
          value: COLUMN_KEY.WRITE_OFF,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_LM,
          label: "Списания, руб. PM",
          value: COLUMN_KEY.WRITE_OFF_LM,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_MOM,
          label: "Списания MoM",
          value: COLUMN_KEY.WRITE_OFF_MOM,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
          label: "Списания, руб. MoM %",
          value: COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_LY,
          label: "Списания, руб. PY",
          value: COLUMN_KEY.WRITE_OFF_LY,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_YOY,
          label: "Списания, руб. YoY",
          value: COLUMN_KEY.WRITE_OFF_YOY,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
          label: "Списания, руб. YoY %",
          value: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_WRITE_OFF_TODAY_YEAR,
          label: "Списания, руб. YTD",
          value: COLUMN_KEY.CUMULATIVE_WRITE_OFF_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_WRITE_OFF_LAST_YEAR,
          label: "Списания, руб. PYTD",
          value: COLUMN_KEY.CUMULATIVE_WRITE_OFF_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_WRITE_OFF_YOY,
          label: "Списания, руб. YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_WRITE_OFF_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_WRITE_OFF_YOY_PERCENT,
          label: "Списания, руб. YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_WRITE_OFF_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_WRITE_OFF_PERCENT,
      label: "Списания %",
      value: COLUMN_KEY.GROUP_WRITE_OFF_PERCENT,
      icon: Percent,
      children: [
        {
          id: COLUMN_KEY.WRITE_OFF_PERCENT,
          label: "Списания %",
          value: COLUMN_KEY.WRITE_OFF_PERCENT,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_PERCENT_LM,
          label: "Списания % PM",
          value: COLUMN_KEY.WRITE_OFF_PERCENT_LM,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT,
          label: "Списания % MoM",
          value: COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_PERCENT_LY,
          label: "Списания % PY",
          value: COLUMN_KEY.WRITE_OFF_PERCENT_LY,
        },
        {
          id: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
          label: "Списания % YoY",
          value: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_TODAY_YEAR,
          label: "Списания % YTD",
          value: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_LAST_YEAR,
          label: "Списания % PYTD",
          value: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_YOY,
          label: "Списания % YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_YOY,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_MARGIN_PERCENT,
      label: "Маржа %",
      value: COLUMN_KEY.GROUP_MARGIN_PERCENT,
      icon: BarChart,
      children: [
        {
          id: COLUMN_KEY.MARGIN_PERCENT,
          label: "Маржа %",
          value: COLUMN_KEY.MARGIN_PERCENT,
        },
        {
          id: COLUMN_KEY.MARGIN_PERCENT_LM,
          label: "Маржа % PM",
          value: COLUMN_KEY.MARGIN_PERCENT_LM,
        },
        {
          id: COLUMN_KEY.MARGIN_PERCENT_MOM_PERCENT,
          label: "Маржа % MoM",
          value: COLUMN_KEY.MARGIN_PERCENT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.MARGIN_PERCENT_LY,
          label: "Маржа % PY",
          value: COLUMN_KEY.MARGIN_PERCENT_LY,
        },
        {
          id: COLUMN_KEY.MARGIN_PERCENT_YOY_PERCENT,
          label: "Маржа % YoY",
          value: COLUMN_KEY.MARGIN_PERCENT_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_TODAY_YEAR,
          label: "Маржа % YTD",
          value: COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_LAST_YEAR,
          label: "Маржа % PYTD",
          value: COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_YOY,
          label: "Маржа % YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_MARGIN_PERCENT_YOY,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_MARKUP_PERCENT,
      label: "Наценка %",
      value: COLUMN_KEY.GROUP_MARKUP_PERCENT,
      icon: BarChart2,
      children: [
        {
          id: COLUMN_KEY.MARKUP_PERCENT,
          label: "Наценка %",
          value: COLUMN_KEY.MARKUP_PERCENT,
        },
        {
          id: COLUMN_KEY.MARKUP_PERCENT_LM,
          label: "Наценка % PM",
          value: COLUMN_KEY.MARKUP_PERCENT_LM,
        },
        {
          id: COLUMN_KEY.MARKUP_PERCENT_MOM_PERCENT,
          label: "Наценка % MoM",
          value: COLUMN_KEY.MARKUP_PERCENT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.MARKUP_PERCENT_LY,
          label: "Наценка % PY",
          value: COLUMN_KEY.MARKUP_PERCENT_LY,
        },
        {
          id: COLUMN_KEY.MARKUP_PERCENT_YOY_PERCENT,
          label: "Наценка % YoY",
          value: COLUMN_KEY.MARKUP_PERCENT_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_TODAY_YEAR,
          label: "Наценка % YTD",
          value: COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_LAST_YEAR,
          label: "Наценка % PYTD",
          value: COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_YOY,
          label: "Наценка % YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_MARKUP_PERCENT_YOY,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_SKU_UNIQUE,
      label: "SKU в чеке",
      value: COLUMN_KEY.GROUP_SKU_UNIQUE,
      icon: Package,
      children: [
        {
          id: COLUMN_KEY.SKU_UNIQUE,
          label: "SKU в чеке",
          value: COLUMN_KEY.SKU_UNIQUE,
        },
        {
          id: COLUMN_KEY.SKU_UNIQUE_LM,
          label: "SKU в чеке PM",
          value: COLUMN_KEY.SKU_UNIQUE_LM,
        },
        {
          id: COLUMN_KEY.SKU_UNIQUE_MOM,
          label: "SKU в чеке MoM",
          value: COLUMN_KEY.SKU_UNIQUE_MOM,
        },
        {
          id: COLUMN_KEY.SKU_UNIQUE_MOM_PERCENT,
          label: "SKU в чеке MoM %",
          value: COLUMN_KEY.SKU_UNIQUE_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.SKU_UNIQUE_LY,
          label: "SKU в чеке PY",
          value: COLUMN_KEY.SKU_UNIQUE_LY,
        },
        {
          id: COLUMN_KEY.SKU_UNIQUE_YOY,
          label: "SKU в чеке YoY",
          value: COLUMN_KEY.SKU_UNIQUE_YOY,
        },
        {
          id: COLUMN_KEY.SKU_UNIQUE_YOY_PERCENT,
          label: "SKU в чеке YoY %",
          value: COLUMN_KEY.SKU_UNIQUE_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_TODAY_YEAR,
          label: "SKU в чеке YTD",
          value: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_LAST_YEAR,
          label: "SKU в чеке PYTD",
          value: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_YOY,
          label: "SKU в чеке YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_YOY_PERCENT,
          label: "SKU в чеке YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_SKU_UNIQUE_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_LEN_CHECK,
      label: "Длина чека",
      value: COLUMN_KEY.GROUP_LEN_CHECK,
      icon: Hash,
      children: [
        {
          id: COLUMN_KEY.LEN_CHECK,
          label: "Длина чека",
          value: COLUMN_KEY.LEN_CHECK,
        },
        {
          id: COLUMN_KEY.LEN_CHECK_LM,
          label: "Длина чека PM",
          value: COLUMN_KEY.LEN_CHECK_LM,
        },
        {
          id: COLUMN_KEY.LEN_CHECK_MOM,
          label: "Длина чека MoM",
          value: COLUMN_KEY.LEN_CHECK_MOM,
        },
        {
          id: COLUMN_KEY.LEN_CHECK_MOM_PERCENT,
          label: "Длина чека MoM %",
          value: COLUMN_KEY.LEN_CHECK_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.LEN_CHECK_LY,
          label: "Длина чека PY",
          value: COLUMN_KEY.LEN_CHECK_LY,
        },
        {
          id: COLUMN_KEY.LEN_CHECK_YOY,
          label: "Длина чека YoY",
          value: COLUMN_KEY.LEN_CHECK_YOY,
        },
        {
          id: COLUMN_KEY.LEN_CHECK_YOY_PERCENT,
          label: "Длина чека YoY %",
          value: COLUMN_KEY.LEN_CHECK_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_LEN_CHECK_TODAY_YEAR,
          label: "Длина чека YTD",
          value: COLUMN_KEY.CUMULATIVE_LEN_CHECK_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_LEN_CHECK_LAST_YEAR,
          label: "Длина чека PYTD",
          value: COLUMN_KEY.CUMULATIVE_LEN_CHECK_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_LEN_CHECK_YOY,
          label: "Длина чека YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_LEN_CHECK_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_LEN_CHECK_YOY_PERCENT,
          label: "Длина чека YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_LEN_CHECK_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_COUNT_CHECK_QR,
      label: "Чеки QC",
      value: COLUMN_KEY.GROUP_COUNT_CHECK_QR,
      icon: QrCode,
      children: [
        {
          id: COLUMN_KEY.COUNT_CHECK_QR,
          label: "Кол. Чеков QC",
          value: COLUMN_KEY.COUNT_CHECK_QR,
        },
        {
          id: COLUMN_KEY.COUNT_CHECK_QR_LM,
          label: "Кол. Чеков QC PM",
          value: COLUMN_KEY.COUNT_CHECK_QR_LM,
        },
        {
          id: COLUMN_KEY.COUNT_CHECK_QR_MOM,
          label: "Кол. Чеков QC MoM",
          value: COLUMN_KEY.COUNT_CHECK_QR_MOM,
        },
        {
          id: COLUMN_KEY.COUNT_CHECK_QR_MOM_PERCENT,
          label: "Кол. Чеков QC MoM %",
          value: COLUMN_KEY.COUNT_CHECK_QR_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.COUNT_CHECK_QR_LY,
          label: "Кол. Чеков QC PY",
          value: COLUMN_KEY.COUNT_CHECK_QR_LY,
        },
        {
          id: COLUMN_KEY.COUNT_CHECK_QR_YOY,
          label: "Кол. Чека QC YoY %",
          value: COLUMN_KEY.COUNT_CHECK_QR_YOY,
        },
        {
          id: COLUMN_KEY.COUNT_CHECK_QR_YOY_PERCENT,
          label: "Кол. чека QC YTDoPY %",
          value: COLUMN_KEY.COUNT_CHECK_QR_YOY_PERCENT,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_TODAY_YEAR,
          label: "Кол. чека QC YTD",
          value: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_TODAY_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_LAST_YEAR,
          label: "Кол. чека QC PYTD",
          value: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_LAST_YEAR,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_YOY,
          label: "Кол.чека QC YTDoPY",
          value: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_YOY,
        },
        {
          id: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_YOY_PERCENT,
          label: "Кол.чека QC YTDoPY %",
          value: COLUMN_KEY.CUMULATIVE_COUNT_CHECK_QR_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_APP_LOYAL_PERCENT,
      label: "Применение карт %",
      value: COLUMN_KEY.GROUP_APP_LOYAL_PERCENT,
      icon: Heart,
      children: [
        {
          id: COLUMN_KEY.APP_LOYAL_PERCENT,
          label: "Применение карт %",
          value: COLUMN_KEY.APP_LOYAL_PERCENT,
        },
        {
          id: COLUMN_KEY.APP_LOYAL_PERCENT_LM,
          label: "Применение карт % LM",
          value: COLUMN_KEY.APP_LOYAL_PERCENT_LM,
        },
        {
          id: COLUMN_KEY.APP_LOYAL_PERCENT_MOM,
          label: "Применение карт % MoM",
          value: COLUMN_KEY.APP_LOYAL_PERCENT_MOM,
        },
        {
          id: COLUMN_KEY.APP_LOYAL_PERCENT_LY,
          label: "Применение карт % LY",
          value: COLUMN_KEY.APP_LOYAL_PERCENT_LY,
        },
        {
          id: COLUMN_KEY.APP_LOYAL_PERCENT_YOY,
          label: "Применение карт % YoY",
          value: COLUMN_KEY.APP_LOYAL_PERCENT_YOY,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_CHECK_LOYAL,
      label: "Чеки по карте лояльности",
      value: COLUMN_KEY.GROUP_CHECK_LOYAL,
      icon: Star,
      children: [
        {
          id: COLUMN_KEY.CHECK_LOYAL,
          label: "Чеки лояльности",
          value: COLUMN_KEY.CHECK_LOYAL,
        },
        {
          id: COLUMN_KEY.CHECK_LOYAL_LM,
          label: "Чеки лояльности LM",
          value: COLUMN_KEY.CHECK_LOYAL_LM,
        },
        {
          id: COLUMN_KEY.CHECK_LOYAL_MOM,
          label: "Чеки лояльности MoM",
          value: COLUMN_KEY.CHECK_LOYAL_MOM,
        },
        {
          id: COLUMN_KEY.CHECK_LOYAL_MOM_PERCENT,
          label: "Чеки лояльности MoM %",
          value: COLUMN_KEY.CHECK_LOYAL_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.CHECK_LOYAL_LY,
          label: "Чеки лояльности LY",
          value: COLUMN_KEY.CHECK_LOYAL_LY,
        },
        {
          id: COLUMN_KEY.CHECK_LOYAL_YOY,
          label: "Чеки лояльности YoY",
          value: COLUMN_KEY.CHECK_LOYAL_YOY,
        },
        {
          id: COLUMN_KEY.CHECK_LOYAL_YOY_PERCENT,
          label: "Чеки лояльности YoY %",
          value: COLUMN_KEY.CHECK_LOYAL_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_PROCEEDS_IM,
      label: "Выручка ИМ",
      value: COLUMN_KEY.GROUP_PROCEEDS_IM,
      icon: Image,
      children: [
        {
          id: COLUMN_KEY.PROCEEDS_IM,
          label: "Выручка ИМ",
          value: COLUMN_KEY.PROCEEDS_IM,
        },
        {
          id: COLUMN_KEY.PROCEEDS_IM_LM,
          label: "Выручка ИМ PM",
          value: COLUMN_KEY.PROCEEDS_IM_LM,
        },
        {
          id: COLUMN_KEY.PROCEEDS_IM_MOM,
          label: "Выручка ИМ MoM",
          value: COLUMN_KEY.PROCEEDS_IM_MOM,
        },
        {
          id: COLUMN_KEY.PROCEEDS_IM_MOM_PERCENT,
          label: "Выручка ИМ PM %",
          value: COLUMN_KEY.PROCEEDS_IM_MOM_PERCENT,
        },
        {
          id: COLUMN_KEY.PROCEEDS_IM_LY,
          label: "Выручка ИМ PY",
          value: COLUMN_KEY.PROCEEDS_IM_LY,
        },
        {
          id: COLUMN_KEY.PROCEEDS_IM_YOY,
          label: "Выручка ИМ YoY",
          value: COLUMN_KEY.PROCEEDS_IM_YOY,
        },
        {
          id: COLUMN_KEY.PROCEEDS_IM_YOY_PERCENT,
          label: "Выручка ИМ YoY %",
          value: COLUMN_KEY.PROCEEDS_IM_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEY.GROUP_ONLINE_STORE_SHARE,
      label: "Доля продаж ИМ",
      value: COLUMN_KEY.GROUP_ONLINE_STORE_SHARE,
      icon: ShoppingCart,
      children: [
        {
          id: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT,
          label: "ИМ Доля продаж %",
          value: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT,
        },
        {
          id: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT_LY,
          label: "ИМ Доля продаж % PY",
          value: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT_LY,
        },
        {
          id: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT_YOY,
          label: "ИМ Доля продаж % YOY",
          value: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT_YOY,
        },
        {
          id: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT_LM,
          label: "ИМ Доля продаж % PM",
          value: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT_LM,
        },
        {
          id: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT_MOM,
          label: "ИМ Доля продаж % MoM",
          value: COLUMN_KEY.ONLINE_STORE_SHARE_PERCENT_MOM,
        },
      ],
    },
  ];
};
