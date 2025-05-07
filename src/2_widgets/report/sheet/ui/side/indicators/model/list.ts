import { COLUMN_KEY } from "@shared/constants/table-columns";
// import { sortGroups } from "@shared/lib/sort-groups";
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

const all_indicators = [
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
        label: "Выручка MOM",
        value: COLUMN_KEY.PROCEEDS_MOM,
      },
      {
        id: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
        label: "Выручка MOM%",
        value: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.PROCEEDS_LY,
        label: "Выручка PY",
        value: COLUMN_KEY.PROCEEDS_LY,
      },
      {
        id: COLUMN_KEY.PROCEEDS_YOY,
        label: "Выручка YOY",
        value: COLUMN_KEY.PROCEEDS_YOY,
      },
      {
        id: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
        label: "Выручка YOY%",
        value: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
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
        label: "Списания, руб. MOM",
        value: COLUMN_KEY.WRITE_OFF_MOM,
      },
      {
        id: COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
        label: "Списания, руб. MOM%",
        value: COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.WRITE_OFF_LY,
        label: "Списания, руб. PY",
        value: COLUMN_KEY.WRITE_OFF_LY,
      },
      {
        id: COLUMN_KEY.WRITE_OFF_YOY,
        label: "Списания, руб. YOY",
        value: COLUMN_KEY.WRITE_OFF_YOY,
      },
      {
        id: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
        label: "Списания, руб. YOY%",
        value: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
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
        id: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_YOY,
        label: "Списания % YoY",
        value: COLUMN_KEY.CUMULATIVE_WRITE_OFF_PERCENT_YOY,
      },
      {
        id: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
        label: "Списания, руб. YOY%",
        value: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.WRITEOFF_WEIGHT_GROUP,
    label: "Списания, вес",
    value: COLUMN_KEY.WRITEOFF_WEIGHT_GROUP,
    icon: MinusCircle,
    children: [
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT,
        label: "Списания, вес",
        value: COLUMN_KEY.WRITEOFF_WEIGHT,
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_LM,
        label: "Списания, вес PM",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_LM,
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_MOM,
        label: "Списания, вес MOM",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_MOM,
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_MOM,
        label: "Списания, вес MOM%",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_MOM,
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_LY,
        label: "Списания, вес PY",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_LY,
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_YOY,
        label: "Списания, вес YOY",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_YOY,
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_YOY,
        label: "Списания, вес YOY%",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_YOY,
      },
    ],
  },
  {
    id: COLUMN_KEY.WRITEOFF_COUNT_GROUP,
    label: "Списания, кол-во",
    value: COLUMN_KEY.WRITEOFF_COUNT_GROUP,
    icon: MinusCircle,
    children: [
      {
        id: COLUMN_KEY.WRITEOFF_COUNT,
        label: "Списания, кол-во",
        value: COLUMN_KEY.WRITEOFF_COUNT,
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_LM,
        label: "Списания, кол-во PM",
        value: COLUMN_KEY.WRITEOFF_COUNT_LM,
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_MOM,
        label: "Списания, кол-во MOM",
        value: COLUMN_KEY.WRITEOFF_COUNT_MOM,
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_MOM_PERCENT,
        label: "Списания, кол-во MOM%",
        value: COLUMN_KEY.WRITEOFF_COUNT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_LY,
        label: "Списания, кол-во PY",
        value: COLUMN_KEY.WRITEOFF_COUNT_LY,
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_YOY,
        label: "Списания, кол-во YOY",
        value: COLUMN_KEY.WRITEOFF_COUNT_YOY,
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_YOY_PERCENT,
        label: "Списания, кол-во YOY%",
        value: COLUMN_KEY.WRITEOFF_COUNT_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_PROFIT,
    label: "Наценка, руб.",
    value: COLUMN_KEY.GROUP_PROFIT,
    icon: ArrowUpRight,
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
    ],
  },
  {
    id: COLUMN_KEY.GROUP_PROFIT_PERCENT,
    label: "Наценка, %",
    value: COLUMN_KEY.GROUP_PROFIT_PERCENT,
    icon: Tag,
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
    ],
  },
  {
    id: COLUMN_KEY.GROUP_MARKUP_PERCENT_DISCOUNT,
    label: "Наценка % без учета скидки",
    value: COLUMN_KEY.GROUP_MARKUP_PERCENT_DISCOUNT,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT,
        label: "Наценка % без учета скидки",
        value: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT,
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_LM,
        label: "Наценка % без учета скидки PM",
        value: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_LM,
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_MOM,
        label: "Наценка % без учета скидки MOM",
        value: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_MOM,
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_MOM_PERCENT,
        label: "Наценка % без учета скидки MOM%",
        value: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_LY,
        label: "Наценка % без учета скидки PY",
        value: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_LY,
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_YOY,
        label: "Наценка % без учета скидки YOY",
        value: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_YOY,
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_YOY_PERCENT,
        label: "Наценка % без учета скидки YOY%",
        value: COLUMN_KEY.MARKUP_PERCENT_DISCOUNT_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_MARKUP_DISCOUNT,
    label: "Наценка без учета скидки",
    value: COLUMN_KEY.GROUP_MARKUP_DISCOUNT,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT,
        label: "Наценка без учета скидки",
        value: COLUMN_KEY.MARKUP_DISCOUNT,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_LM,
        label: "Наценка без учета скидки PM",
        value: COLUMN_KEY.MARKUP_DISCOUNT_LM,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_MOM,
        label: "Наценка без учета скидки MOM",
        value: COLUMN_KEY.MARKUP_DISCOUNT_MOM,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_MOM_PERCENT,
        label: "Наценка без учета скидки MOM%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_LY,
        label: "Наценка без учета скидки PY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_LY,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_YOY,
        label: "Наценка без учета скидки YOY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_YOY,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_YOY_PERCENT,
        label: "Наценка без учета скидки YOY%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_COST_PRICE,
    label: "Себестоимость",
    value: COLUMN_KEY.GROUP_COST_PRICE,
    icon: ShoppingBag,
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
        label: "Себестоимость MOM%",
        value: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.COST_PRICE_LY,
        label: "Себестоимость PY",
        value: COLUMN_KEY.COST_PRICE_LY,
      },
      {
        id: COLUMN_KEY.COST_PRICE_YOY,
        label: "Себестоимость YOY",
        value: COLUMN_KEY.COST_PRICE_YOY,
      },
      {
        id: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
        label: "Себестоимость YoY %",
        value: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_DISCOUNT,
    label: "Скидки, руб.",
    value: COLUMN_KEY.GROUP_DISCOUNT,
    icon: Tags,
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
        label: "Скидки, руб. YoY%%",
        value: COLUMN_KEY.DISCOUNT_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_DISCOUNT_PERCENT,
    label: "Скидка %",
    value: COLUMN_KEY.GROUP_DISCOUNT_PERCENT,
    icon: TicketPercent,
    children: [
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT,
        label: "Скидка %",
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
        label: "Скидки %  PY",
        value: COLUMN_KEY.DISCOUNT_PERCENT_LY,
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT,
        label: "Скидки % YoY",
        value: COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT,
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
    ],
  },
  {
    id: COLUMN_KEY.GROUP_MARGIN_PERCENT_DISCOUNT,
    label: "Маржа % без учета скидки",
    value: COLUMN_KEY.GROUP_MARGIN_PERCENT_DISCOUNT,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT,
        label: "Маржа % без учета скидки",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT,
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LM,
        label: "Маржа % без учета скидки PM",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LM,
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_MOM,
        label: "Маржа % без учета скидки MOM",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_MOM,
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_MOM_PERCENT,
        label: "Маржа % без учета скидки MOM%",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LY,
        label: "Маржа % без учета скидки PY",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LY,
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_YOY,
        label: "Маржа % без учета скидки YOY",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_YOY,
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_YOY_PERCENT,
        label: "Маржа % без учета скидки YOY%",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_YOY_PERCENT,
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
        id: COLUMN_KEY.SALES,
        label: "Кол. Продаж",
        value: COLUMN_KEY.SALES,
      },
      {
        id: COLUMN_KEY.SALES_LM,
        label: "Кол. Продаж PM",
        value: COLUMN_KEY.SALES_LM,
      },
      {
        id: COLUMN_KEY.SALES_MOM,
        label: "Кол. Продаж MoM",
        value: COLUMN_KEY.SALES_MOM,
      },
      {
        id: COLUMN_KEY.SALES_MOM_PERCENT,
        label: "Кол. Продаж MoM%",
        value: COLUMN_KEY.SALES_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.SALES_LY,
        label: "Кол. Продаж PY",
        value: COLUMN_KEY.SALES_LY,
      },
      {
        id: COLUMN_KEY.SALES_YOY,
        label: "Кол. Продаж YoY",
        value: COLUMN_KEY.SALES_YOY,
      },
      {
        id: COLUMN_KEY.SALES_YOY_PERCENT,
        label: "Кол. Продаж YoY%",
        value: COLUMN_KEY.SALES_YOY_PERCENT,
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
        label: "Ср. Чек  PY",
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
    ],
  },
  {
    id: "bonusGroup",
    label: "Бонус",
    value: "bonusGroup",
    icon: Gift,
    children: [
      { id: COLUMN_KEY.BONUS, label: "Бонус", value: COLUMN_KEY.BONUS },
      {
        id: COLUMN_KEY.BONUS_LM,
        label: "Бонус PM",
        value: COLUMN_KEY.BONUS_LM,
      },
      {
        id: COLUMN_KEY.BONUS_MOM,
        label: "Бонус MoM",
        value: COLUMN_KEY.BONUS_MOM,
      },
      {
        id: COLUMN_KEY.BONUS_MOM_PERCENT,
        label: "Бонус MoM %",
        value: COLUMN_KEY.BONUS_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.BONUS_LY,
        label: "Бонус  PY",
        value: COLUMN_KEY.BONUS_LY,
      },
      {
        id: COLUMN_KEY.BONUS_YOY,
        label: "Бонус YoY",
        value: COLUMN_KEY.BONUS_YOY,
      },
      {
        id: COLUMN_KEY.BONUS_YOY_PERCENT,
        label: "Бонус YoY %",
        value: COLUMN_KEY.BONUS_YOY_PERCENT,
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
        id: COLUMN_KEY.BONUS_PERCENT,
        label: "Бонус %",
        value: COLUMN_KEY.BONUS_PERCENT,
      },
      {
        id: COLUMN_KEY.BONUS_PERCENT_LM,
        label: "Бонус % PM",
        value: COLUMN_KEY.BONUS_PERCENT_LM,
      },
      {
        id: COLUMN_KEY.BONUS_PERCENT_MOM_PERCENT,
        label: "Бонус % MoM",
        value: COLUMN_KEY.BONUS_PERCENT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.BONUS_PERCENT_LY,
        label: "Бонус %  PY",
        value: COLUMN_KEY.BONUS_PERCENT_LY,
      },
      {
        id: COLUMN_KEY.BONUS_PERCENT_YOY_PERCENT,
        label: "Бонус % YoY",
        value: COLUMN_KEY.BONUS_PERCENT_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.WEIGHT_GROUP,
    label: "Вес",
    value: COLUMN_KEY.WEIGHT_GROUP,
    icon: Weight,
    children: [
      { id: COLUMN_KEY.WEIGHT, label: "Вес", value: COLUMN_KEY.WEIGHT },
      {
        id: COLUMN_KEY.WEIGHT_LM,
        label: "Вес PM",
        value: COLUMN_KEY.WEIGHT_LM,
      },
      {
        id: COLUMN_KEY.WEIGHT_MOM,
        label: "Вес MOM",
        value: COLUMN_KEY.WEIGHT_MOM,
      },
      {
        id: COLUMN_KEY.WEIGHT_MOM_PERCENT,
        label: "Вес MOM%",
        value: COLUMN_KEY.WEIGHT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.WEIGHT_LY,
        label: "Вес PY",
        value: COLUMN_KEY.WEIGHT_LY,
      },
      {
        id: COLUMN_KEY.WEIGHT_YOY,
        label: "Вес YOY",
        value: COLUMN_KEY.WEIGHT_YOY,
      },
      {
        id: COLUMN_KEY.WEIGHT_YOY_PERCENT,
        label: "Вес YOY%",
        value: COLUMN_KEY.WEIGHT_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.OPENING_BALANCE_GROUP,
    label: "Остатки на начало дня",
    value: COLUMN_KEY.OPENING_BALANCE_GROUP,
    icon: MinusCircle,
    children: [
      {
        id: COLUMN_KEY.OPENING_BALANCE,
        label: "Остатки на начало дня",
        value: COLUMN_KEY.OPENING_BALANCE,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_LM,
        label: "Остатки на начало дня PM",
        value: COLUMN_KEY.OPENING_BALANCE_LM,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_MOM,
        label: "Остатки на начало дня MOM",
        value: COLUMN_KEY.OPENING_BALANCE_MOM,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_MOM_PERCENT,
        label: "Остатки на начало дня MOM%",
        value: COLUMN_KEY.OPENING_BALANCE_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_LY,
        label: "Остатки на начало дня PY",
        value: COLUMN_KEY.OPENING_BALANCE_LY,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_YOY,
        label: "Остатки на начало дня YOY",
        value: COLUMN_KEY.OPENING_BALANCE_YOY,
      },
    ],
  },
  {
    id: COLUMN_KEY.FINAL_BALANCE_GROUP,
    label: "Остатки на конец дня",
    value: COLUMN_KEY.FINAL_BALANCE_GROUP,
    icon: MinusCircle,
    children: [
      {
        id: COLUMN_KEY.FINAL_BALANCE,
        label: "Остатки на конец дня",
        value: COLUMN_KEY.FINAL_BALANCE,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_LM,
        label: "Остатки на конец дня PM",
        value: COLUMN_KEY.FINAL_BALANCE_LM,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_MOM,
        label: "Остатки на конец дня MOM",
        value: COLUMN_KEY.FINAL_BALANCE_MOM,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_MOM_PERCENT,
        label: "Остатки на конец дня MOM%",
        value: COLUMN_KEY.FINAL_BALANCE_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_LY,
        label: "Остатки на конец дня PY",
        value: COLUMN_KEY.FINAL_BALANCE_LY,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_YOY,
        label: "Остатки на конец дня YOY",
        value: COLUMN_KEY.FINAL_BALANCE_YOY,
      },
    ],
  },

  {
    id: COLUMN_KEY.GROUP_TURNOVER_GOODS,
    label: "Оборачиваемость остатков",
    value: COLUMN_KEY.GROUP_TURNOVER_GOODS,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.TURNOVER_GOODS,
        label: "Оборачиваемость остатков",
        value: COLUMN_KEY.TURNOVER_GOODS,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_LM,
        label: "Оборачиваемость остатков PM",
        value: COLUMN_KEY.TURNOVER_GOODS_LM,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_MOM,
        label: "Оборачиваемость остатков MOM",
        value: COLUMN_KEY.TURNOVER_GOODS_MOM,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_MOM_PERCENT,
        label: "Оборачиваемость остатков MOM%",
        value: COLUMN_KEY.TURNOVER_GOODS_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_LY,
        label: "Оборачиваемость остатков PY",
        value: COLUMN_KEY.TURNOVER_GOODS_LY,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_YOY,
        label: "Оборачиваемость остатков YOY",
        value: COLUMN_KEY.TURNOVER_GOODS_YOY,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_YOY_PERCENT,
        label: "Оборачиваемость остатков YOY%",
        value: COLUMN_KEY.TURNOVER_GOODS_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.ITR_GROUP,
    label: "Коэффициент оборачиваемости ITR",
    value: COLUMN_KEY.ITR_GROUP,
    icon: MinusCircle,
    children: [
      {
        id: COLUMN_KEY.ITR,
        label: "Коэффициент оборачиваемости ITR",
        value: COLUMN_KEY.ITR,
      },
      {
        id: COLUMN_KEY.ITR_LM,
        label: "Коэффициент оборачиваемости ITR PM",
        value: COLUMN_KEY.ITR_LM,
      },
      {
        id: COLUMN_KEY.ITR_MOM,
        label: "Коэффициент оборачиваемости ITR MOM",
        value: COLUMN_KEY.ITR_MOM,
      },
      {
        id: COLUMN_KEY.ITR_MOM_PERCENT,
        label: "Коэффициент оборачиваемости ITR MOM%",
        value: COLUMN_KEY.ITR_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.ITR_LY,
        label: "Коэффициент оборачиваемости ITR PY",
        value: COLUMN_KEY.ITR_LY,
      },
      {
        id: COLUMN_KEY.ITR_YOY,
        label: "Коэффициент оборачиваемости ITR YOY",
        value: COLUMN_KEY.ITR_YOY,
      },
      {
        id: COLUMN_KEY.ITR_YOY_PERCENT,
        label: "Коэффициент оборачиваемости ITR YOY%",
        value: COLUMN_KEY.ITR_YOY_PERCENT,
      },
    ],
  },
];
interface IndicatorGroup {
  id: string;
  label: string;
  value: string;
  icon: any;
  children: { id: string; label: string; value: string }[];
}

export function excludeIndicators(
  source: IndicatorGroup[],
  excludeList: string[]
): IndicatorGroup[] {
  return source
    .filter((group) => !excludeList.includes(group.id)) // убираем группы
    .map((group) => {
      const filteredChildren = group.children.filter(
        (child) => !excludeList.includes(child.id)
      );

      // Если после удаления детей ничего не осталось, вернем undefined
      if (filteredChildren.length === 0) {
        return undefined;
      }

      return {
        ...group,
        children: filteredChildren,
      };
    })
    .filter((group): group is IndicatorGroup => Boolean(group)); // правильная фильтрация
}

export const useIndicatorList = (type: "check" | "commerce") => {
  // const filtered = sortGroups(all_indicators);
  const check = excludeIndicators(all_indicators, [
    COLUMN_KEY.GROUP_TURNOVER_GOODS,
    "writeOffGroup",
    "writeOffPercentGroup",
    "writeOffWeightGroup",
    "writeOffCountGroup",
    "openingBalanceGroup",
    "finalBalanceGroup",
    "itrGroup",
  ]);
  const commerce = excludeIndicators(all_indicators, [
    "avgCheckGroup",
    "checkGroup",
  ]);
  if (type === "check") {
    return check;
  }
  return commerce;
};
