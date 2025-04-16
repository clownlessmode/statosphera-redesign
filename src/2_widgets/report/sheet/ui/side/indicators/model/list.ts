import { COLUMN_KEYS } from "@shared/constants/column-keys";
import {
  ArrowUpRight,
  DollarSign,
  Gift,
  MinusCircle,
  Percent,
  PercentCircle,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Tags,
  TicketPercent,
  TrendingUp,
  Weight,
} from "lucide-react";

export const useIndicatorList = () => {
  return [
    {
      id: COLUMN_KEYS.GROUP_PROCEEDS,
      label: "Выручка",
      value: COLUMN_KEYS.GROUP_PROCEEDS,
      icon: DollarSign,
      children: [
        {
          id: COLUMN_KEYS.PROCEEDS,
          label: "Выручка",
          value: COLUMN_KEYS.PROCEEDS,
        },
        {
          id: COLUMN_KEYS.PROCEEDS_LM,
          label: "Выручка PM",
          value: COLUMN_KEYS.PROCEEDS_LM,
        },
        {
          id: COLUMN_KEYS.PROCEEDS_MOM,
          label: "Выручка MOM",
          value: COLUMN_KEYS.PROCEEDS_MOM,
        },
        {
          id: COLUMN_KEYS.PROCEEDS_MOM_PERCENT,
          label: "Выручка MOM%",
          value: COLUMN_KEYS.PROCEEDS_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.PROCEEDS_LY,
          label: "Выручка PY",
          value: COLUMN_KEYS.PROCEEDS_LY,
        },
        {
          id: COLUMN_KEYS.PROCEEDS_YOY,
          label: "Выручка YOY",
          value: COLUMN_KEYS.PROCEEDS_YOY,
        },
        {
          id: COLUMN_KEYS.PROCEEDS_YOY_PERCENT,
          label: "Выручка YOY%",
          value: COLUMN_KEYS.PROCEEDS_YOY_PERCENT,
        },
      ],
    },
    {
      id: "writeOffGroup",
      label: "Списания, руб",
      value: "writeOffGroup",
      icon: MinusCircle,
      children: [
        {
          id: COLUMN_KEYS.WRITE_OFF,
          label: "Списания, руб.",
          value: COLUMN_KEYS.WRITE_OFF,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_LM,
          label: "Списания, руб. PM",
          value: COLUMN_KEYS.WRITE_OFF_LM,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_MOM,
          label: "Списания, руб. MOM",
          value: COLUMN_KEYS.WRITE_OFF_MOM,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_MOM_PERCENT,
          label: "Списания, руб. MOM%",
          value: COLUMN_KEYS.WRITE_OFF_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_LY,
          label: "Списания, руб. PY",
          value: COLUMN_KEYS.WRITE_OFF_LY,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_YOY,
          label: "Списания, руб. YOY",
          value: COLUMN_KEYS.WRITE_OFF_YOY,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_YOY_PERCENT,
          label: "Списания, руб. YOY%",
          value: COLUMN_KEYS.WRITE_OFF_YOY_PERCENT,
        },
      ],
    },
    {
      id: "writeOffPercentGroup",
      label: "Списания %",
      value: "writeOffPercentGroup",
      icon: Percent,
      children: [
        {
          id: COLUMN_KEYS.WRITE_OFF_PERCENT,
          label: "Списания %",
          value: COLUMN_KEYS.WRITE_OFF_PERCENT,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_PERCENT_LM,
          label: "Списания % PM",
          value: COLUMN_KEYS.WRITE_OFF_PERCENT_LM,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_PERCENT_MOM_PERCENT,
          label: "Списания % MoM",
          value: COLUMN_KEYS.WRITE_OFF_PERCENT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_PERCENT_LY,
          label: "Списания % PY",
          value: COLUMN_KEYS.WRITE_OFF_PERCENT_LY,
        },
        {
          id: COLUMN_KEYS.CUMULATIVE_WRITE_OFF_PERCENT_YOY,
          label: "Списания % YoY",
          value: COLUMN_KEYS.CUMULATIVE_WRITE_OFF_PERCENT_YOY,
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_PERCENT_YOY_PERCENT,
          label: "Списания, руб. YOY%",
          value: COLUMN_KEYS.WRITE_OFF_PERCENT_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_PROFIT,
      label: "Наценка, руб.",
      value: COLUMN_KEYS.GROUP_PROFIT,
      icon: ArrowUpRight,
      children: [
        {
          id: COLUMN_KEYS.PROFIT,
          label: "Наценка, руб.",
          value: COLUMN_KEYS.PROFIT,
        },
        {
          id: COLUMN_KEYS.PROFIT_LM,
          label: "Наценка, руб. PM",
          value: COLUMN_KEYS.PROFIT_LM,
        },
        {
          id: COLUMN_KEYS.PROFIT_MOM,
          label: "Наценка, руб. MoM",
          value: COLUMN_KEYS.PROFIT_MOM,
        },
        {
          id: COLUMN_KEYS.PROFIT_MOM_PERCENT,
          label: "Наценка, руб. MoM %",
          value: COLUMN_KEYS.PROFIT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.PROFIT_LY,
          label: "Наценка, руб. PY",
          value: COLUMN_KEYS.PROFIT_LY,
        },
        {
          id: COLUMN_KEYS.PROFIT_YOY,
          label: "Наценка, руб. YoY",
          value: COLUMN_KEYS.PROFIT_YOY,
        },
        {
          id: COLUMN_KEYS.PROFIT_YOY_PERCENT,
          label: "Наценка, руб. YoY %",
          value: COLUMN_KEYS.PROFIT_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_PROFIT_PERCENT,
      label: "Наценка, %",
      value: COLUMN_KEYS.GROUP_PROFIT_PERCENT,
      icon: Tag,
      children: [
        {
          id: COLUMN_KEYS.MARKUP_PERCENT,
          label: "Наценка %",
          value: COLUMN_KEYS.MARKUP_PERCENT,
        },
        {
          id: COLUMN_KEYS.MARKUP_PERCENT_LM,
          label: "Наценка % PM",
          value: COLUMN_KEYS.MARKUP_PERCENT_LM,
        },
        {
          id: COLUMN_KEYS.MARKUP_PERCENT_MOM_PERCENT,
          label: "Наценка % MoM",
          value: COLUMN_KEYS.MARKUP_PERCENT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.MARKUP_PERCENT_LY,
          label: "Наценка % PY",
          value: COLUMN_KEYS.MARKUP_PERCENT_LY,
        },
        {
          id: COLUMN_KEYS.MARKUP_PERCENT_YOY_PERCENT,
          label: "Наценка % YoY",
          value: COLUMN_KEYS.MARKUP_PERCENT_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_COST_PRICE,
      label: "Себестоимость",
      value: COLUMN_KEYS.GROUP_COST_PRICE,
      icon: ShoppingBag,
      children: [
        {
          id: COLUMN_KEYS.COST_PRICE,
          label: "Себестоимость",
          value: COLUMN_KEYS.COST_PRICE,
        },
        {
          id: COLUMN_KEYS.COST_PRICE_LM,
          label: "Себестоимость PM",
          value: COLUMN_KEYS.COST_PRICE_LM,
        },
        {
          id: COLUMN_KEYS.COST_PRICE_MOM,
          label: "Себестоимость MOM",
          value: COLUMN_KEYS.COST_PRICE_MOM,
        },
        {
          id: COLUMN_KEYS.COST_PRICE_MOM_PERCENT,
          label: "Себестоимость MOM%",
          value: COLUMN_KEYS.COST_PRICE_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.COST_PRICE_LY,
          label: "Себестоимость PY",
          value: COLUMN_KEYS.COST_PRICE_LY,
        },
        {
          id: COLUMN_KEYS.COST_PRICE_YOY,
          label: "Себестоимость YOY",
          value: COLUMN_KEYS.COST_PRICE_YOY,
        },
        {
          id: COLUMN_KEYS.COST_PRICE_YOY_PERCENT,
          label: "Себестоимость YoY %",
          value: COLUMN_KEYS.COST_PRICE_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_DISCOUNT,
      label: "Скидки, руб.",
      value: COLUMN_KEYS.GROUP_DISCOUNT,
      icon: Tags,
      children: [
        {
          id: COLUMN_KEYS.DISCOUNT,
          label: "Скидка, руб.",
          value: COLUMN_KEYS.DISCOUNT,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_LM,
          label: "Скидки, руб. PM",
          value: COLUMN_KEYS.DISCOUNT_LM,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_MOM,
          label: "Скидки, руб. MoM",
          value: COLUMN_KEYS.DISCOUNT_MOM,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_MOM_PERCENT,
          label: "Скидки, руб. MoM %",
          value: COLUMN_KEYS.DISCOUNT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_LY,
          label: "Скидки, руб. PY",
          value: COLUMN_KEYS.DISCOUNT_LY,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_YOY,
          label: "Скидки, руб. YoY",
          value: COLUMN_KEYS.DISCOUNT_YOY,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_YOY_PERCENT,
          label: "Скидки, руб. YoY%%",
          value: COLUMN_KEYS.DISCOUNT_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_DISCOUNT_PERCENT,
      label: "Скидка %",
      value: COLUMN_KEYS.GROUP_DISCOUNT_PERCENT,
      icon: TicketPercent,
      children: [
        {
          id: COLUMN_KEYS.DISCOUNT_PERCENT,
          label: "Скидка %",
          value: COLUMN_KEYS.DISCOUNT_PERCENT,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_PERCENT_LM,
          label: "Скидки % PM",
          value: COLUMN_KEYS.DISCOUNT_PERCENT_LM,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_PERCENT_MOM_PERCENT,
          label: "Скидки % MoM",
          value: COLUMN_KEYS.DISCOUNT_PERCENT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_PERCENT_LY,
          label: "Скидки %  PY",
          value: COLUMN_KEYS.DISCOUNT_PERCENT_LY,
        },
        {
          id: COLUMN_KEYS.DISCOUNT_PERCENT_YOY_PERCENT,
          label: "Скидки % YoY",
          value: COLUMN_KEYS.DISCOUNT_PERCENT_YOY_PERCENT,
        },
      ],
    },
    {
      id: "marginGroup",
      label: "Маржа %",
      value: "marginGroup",
      icon: TrendingUp,
      children: [
        {
          id: COLUMN_KEYS.MARGIN_PERCENT,
          label: "Маржа %",
          value: COLUMN_KEYS.MARGIN_PERCENT,
        },
        {
          id: COLUMN_KEYS.MARGIN_PERCENT_LM,
          label: "Маржа % PM",
          value: COLUMN_KEYS.MARGIN_PERCENT_LM,
        },
        {
          id: COLUMN_KEYS.MARGIN_PERCENT_MOM_PERCENT,
          label: "Маржа % MoM",
          value: COLUMN_KEYS.MARGIN_PERCENT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.MARGIN_PERCENT_LY,
          label: "Маржа % PY",
          value: COLUMN_KEYS.MARGIN_PERCENT_LY,
        },
        {
          id: COLUMN_KEYS.MARGIN_PERCENT_YOY_PERCENT,
          label: "Маржа % YoY",
          value: COLUMN_KEYS.MARGIN_PERCENT_YOY_PERCENT,
        },
      ],
    },
    {
      id: "salesUniqueGroup",
      label: "Кол. Продаж",
      value: "salesUniqueGroup",
      icon: ShoppingCart,
      children: [
        {
          id: COLUMN_KEYS.SALES,
          label: "Кол. Продаж",
          value: COLUMN_KEYS.SALES,
        },
        {
          id: COLUMN_KEYS.SALES_LM,
          label: "Кол. Продаж PM",
          value: COLUMN_KEYS.SALES_LM,
        },
        {
          id: COLUMN_KEYS.SALES_MOM,
          label: "Кол. Продаж MoM",
          value: COLUMN_KEYS.SALES_MOM,
        },
        {
          id: COLUMN_KEYS.SALES_MOM_PERCENT,
          label: "Кол. Продаж MoM%",
          value: COLUMN_KEYS.SALES_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.SALES_LY,
          label: "Кол. Продаж PY",
          value: COLUMN_KEYS.SALES_LY,
        },
        {
          id: COLUMN_KEYS.SALES_YOY,
          label: "Кол. Продаж YoY",
          value: COLUMN_KEYS.SALES_YOY,
        },
        {
          id: COLUMN_KEYS.SALES_YOY_PERCENT,
          label: "Кол. Продаж YoY%",
          value: COLUMN_KEYS.SALES_YOY_PERCENT,
        },
      ],
    },
    {
      id: "avgCheckGroup",
      label: "Средний чек",
      value: "avgCheckGroup",
      icon: Receipt,
      children: [
        {
          id: COLUMN_KEYS.AVG_CHECK,
          label: "Ср. чек",
          value: COLUMN_KEYS.AVG_CHECK,
        },
        {
          id: COLUMN_KEYS.AVG_CHECK_LM,
          label: "Ср. Чек PM",
          value: COLUMN_KEYS.AVG_CHECK_LM,
        },
        {
          id: COLUMN_KEYS.AVG_CHECK_MOM,
          label: "Ср. Чек MoM",
          value: COLUMN_KEYS.AVG_CHECK_MOM,
        },
        {
          id: COLUMN_KEYS.AVG_CHECK_MOM_PERCENT,
          label: "Ср. Чек MoM %",
          value: COLUMN_KEYS.AVG_CHECK_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.AVG_CHECK_LY,
          label: "Ср. Чек  PY",
          value: COLUMN_KEYS.AVG_CHECK_LY,
        },
        {
          id: COLUMN_KEYS.AVG_CHECK_YOY,
          label: "Ср. Чек YoY",
          value: COLUMN_KEYS.AVG_CHECK_YOY,
        },
        {
          id: COLUMN_KEYS.AVG_CHECK_YOY_PERCENT,
          label: "Ср. Чек YoY %",
          value: COLUMN_KEYS.AVG_CHECK_YOY_PERCENT,
        },
      ],
    },
    {
      id: "bonusGroup",
      label: "Бонус",
      value: "bonusGroup",
      icon: Gift,
      children: [
        { id: COLUMN_KEYS.BONUS, label: "Бонус", value: COLUMN_KEYS.BONUS },
        {
          id: COLUMN_KEYS.BONUS_LM,
          label: "Бонус PM",
          value: COLUMN_KEYS.BONUS_LM,
        },
        {
          id: COLUMN_KEYS.BONUS_MOM,
          label: "Бонус MoM",
          value: COLUMN_KEYS.BONUS_MOM,
        },
        {
          id: COLUMN_KEYS.BONUS_MOM_PERCENT,
          label: "Бонус MoM %",
          value: COLUMN_KEYS.BONUS_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.BONUS_LY,
          label: "Бонус  PY",
          value: COLUMN_KEYS.BONUS_LY,
        },
        {
          id: COLUMN_KEYS.BONUS_YOY,
          label: "Бонус YoY",
          value: COLUMN_KEYS.BONUS_YOY,
        },
        {
          id: COLUMN_KEYS.BONUS_YOY_PERCENT,
          label: "Бонус YoY %",
          value: COLUMN_KEYS.BONUS_YOY_PERCENT,
        },
      ],
    },
    {
      id: "bonusPercentGroup",
      label: "Бонус %",
      value: "bonusPercentGroup",
      icon: PercentCircle,
      children: [
        {
          id: COLUMN_KEYS.BONUS_PERCENT,
          label: "Бонус %",
          value: COLUMN_KEYS.BONUS_PERCENT,
        },
        {
          id: COLUMN_KEYS.BONUS_PERCENT_LM,
          label: "Бонус % PM",
          value: COLUMN_KEYS.BONUS_PERCENT_LM,
        },
        {
          id: COLUMN_KEYS.BONUS_PERCENT_MOM_PERCENT,
          label: "Бонус % MoM",
          value: COLUMN_KEYS.BONUS_PERCENT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.BONUS_PERCENT_LY,
          label: "Бонус %  PY",
          value: COLUMN_KEYS.BONUS_PERCENT_LY,
        },
        {
          id: COLUMN_KEYS.BONUS_PERCENT_YOY_PERCENT,
          label: "Бонус % YoY",
          value: COLUMN_KEYS.BONUS_PERCENT_YOY_PERCENT,
        },
      ],
    },
    {
      id: COLUMN_KEYS.WEIGHT_GROUP,
      label: "Вес",
      value: COLUMN_KEYS.WEIGHT_GROUP,
      icon: Weight,
      children: [
        { id: COLUMN_KEYS.WEIGHT, label: "Вес", value: COLUMN_KEYS.WEIGHT },
        {
          id: COLUMN_KEYS.WEIGHT_LM,
          label: "Вес PM",
          value: COLUMN_KEYS.WEIGHT_LM,
        },
        {
          id: COLUMN_KEYS.WEIGHT_MOM,
          label: "Вес MOM",
          value: COLUMN_KEYS.WEIGHT_MOM,
        },
        {
          id: COLUMN_KEYS.WEIGHT_MOM_PERCENT,
          label: "Вес MOM%",
          value: COLUMN_KEYS.WEIGHT_MOM_PERCENT,
        },
        {
          id: COLUMN_KEYS.WEIGHT_LY,
          label: "Вес PY",
          value: COLUMN_KEYS.WEIGHT_LY,
        },
        {
          id: COLUMN_KEYS.WEIGHT_YOY,
          label: "Вес YOY",
          value: COLUMN_KEYS.WEIGHT_YOY,
        },
        {
          id: COLUMN_KEYS.WEIGHT_YOY_PERCENT,
          label: "Вес YOY%",
          value: COLUMN_KEYS.WEIGHT_YOY_PERCENT,
        },
      ],
    },
  ];
};
