import { COLUMN_KEY } from "@shared/constants/table-columns";

import {
  ArrowUpRight,
  DollarSign,
  Minus,
  MinusCircle,
  Percent,
  Plus,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Tags,
  TicketPercent,
  TrendingDown,
  TrendingUp,
  Weight,
} from "lucide-react";

const all_indicators = [
  {
    id: COLUMN_KEY.GROUP_PROCEEDS,
    label: "Выручка, руб.",
    value: COLUMN_KEY.GROUP_PROCEEDS,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.PROCEEDS,
        label: "Выручка, руб.",
        value: COLUMN_KEY.PROCEEDS,
      },
      {
        id: COLUMN_KEY.PROCEEDS_LM,
        label: "Выручка, руб. PM",
        value: COLUMN_KEY.PROCEEDS_LM,
      },
      {
        id: COLUMN_KEY.PROCEEDS_MOM,
        label: "Выручка, руб. MOM",
        value: COLUMN_KEY.PROCEEDS_MOM,
      },
      {
        id: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
        label: "Выручка, руб. MOM%",
        value: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.PROCEEDS_LY,
        label: "Выручка, руб. PY",
        value: COLUMN_KEY.PROCEEDS_LY,
      },
      {
        id: COLUMN_KEY.PROCEEDS_YOY,
        label: "Выручка, руб. YOY",
        value: COLUMN_KEY.PROCEEDS_YOY,
      },
      {
        id: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
        label: "Выручка, руб. YOY%",
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
        id: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
        label: "Списания, руб. YOY",
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
    label: "Валовая прибыль, руб.",
    value: COLUMN_KEY.GROUP_PROFIT,
    icon: ArrowUpRight,
    children: [
      {
        id: COLUMN_KEY.PROFIT,
        label: "Валовая прибыль, руб.",
        value: COLUMN_KEY.PROFIT,
      },
      {
        id: COLUMN_KEY.PROFIT_LM,
        label: "Валовая прибыль, руб. PM",
        value: COLUMN_KEY.PROFIT_LM,
      },
      {
        id: COLUMN_KEY.PROFIT_MOM,
        label: "Валовая прибыль, руб. MoM",
        value: COLUMN_KEY.PROFIT_MOM,
      },
      {
        id: COLUMN_KEY.PROFIT_MOM_PERCENT,
        label: "Валовая прибыль, руб. MoM %",
        value: COLUMN_KEY.PROFIT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.PROFIT_LY,
        label: "Валовая прибыль, руб. PY",
        value: COLUMN_KEY.PROFIT_LY,
      },
      {
        id: COLUMN_KEY.PROFIT_YOY,
        label: "Валовая прибыль, руб. YoY",
        value: COLUMN_KEY.PROFIT_YOY,
      },
      {
        id: COLUMN_KEY.PROFIT_YOY_PERCENT,
        label: "Валовая прибыль, руб. YoY %",
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
    label: "Наценка без скидки, %",
    value: COLUMN_KEY.GROUP_MARKUP_PERCENT_DISCOUNT,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT,
        label: "Наценка без скидки, %",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LM,
        label: "Наценка без скидки, % PM",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LM,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_MOM_PERCENT,
        label: "Наценка без скидки, % MOM%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LY,
        label: "Наценка без скидки, % PY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LY,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_YOY,
        label: "Наценка без скидки, % YOY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_YOY,
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_MARKUP_DISCOUNT,
    label: "Валовая прибыль без скидки, руб.",
    value: COLUMN_KEY.GROUP_MARKUP_DISCOUNT,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT,
        label: "Валовая прибыль без скидки, руб.",
        value: COLUMN_KEY.MARKUP_DISCOUNT,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_LM,
        label: "Валовая прибыль без скидки, руб. PM",
        value: COLUMN_KEY.MARKUP_DISCOUNT_LM,
      },

      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_MOM_PERCENT,
        label: "Валовая прибыль без скидки, руб. MOM%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_LY,
        label: "Валовая прибыль без скидки, руб. PY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_LY,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_YOY,
        label: "Валовая прибыль без скидки, руб. YOY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_YOY,
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_YOY_PERCENT,
        label: "Валовая прибыль без скидки, руб. YOY%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_COST_PRICE,
    label: "Себестоимость, руб.",
    value: COLUMN_KEY.GROUP_COST_PRICE,
    icon: ShoppingBag,
    children: [
      {
        id: COLUMN_KEY.COST_PRICE,
        label: "Себестоимость, руб.",
        value: COLUMN_KEY.COST_PRICE,
      },
      {
        id: COLUMN_KEY.COST_PRICE_LM,
        label: "Себестоимость, руб. PM",
        value: COLUMN_KEY.COST_PRICE_LM,
      },
      {
        id: COLUMN_KEY.COST_PRICE_MOM,
        label: "Себестоимость, руб. MOM",
        value: COLUMN_KEY.COST_PRICE_MOM,
      },
      {
        id: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
        label: "Себестоимость, руб. MOM%",
        value: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.COST_PRICE_LY,
        label: "Себестоимость, руб. PY",
        value: COLUMN_KEY.COST_PRICE_LY,
      },
      {
        id: COLUMN_KEY.COST_PRICE_YOY,
        label: "Себестоимость, руб. YOY",
        value: COLUMN_KEY.COST_PRICE_YOY,
      },
      {
        id: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
        label: "Себестоимость, руб. YoY %",
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
        label: "Скидки, руб. YoY%",
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
    id: COLUMN_KEY.BONUS_ACCRUAL_GROUP,
    label: "Бонусы начисление, руб.",
    value: COLUMN_KEY.BONUS_ACCRUAL_GROUP,
    icon: Plus, // или другая подходящая иконка
    children: [
      {
        id: COLUMN_KEY.BONUS_ACCRUAL,
        label: "Бонусы начисление, руб.",
        value: COLUMN_KEY.BONUS_ACCRUAL,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_LM,
        label: "Бонусы начисление, руб. PM",
        value: COLUMN_KEY.BONUS_ACCRUAL_LM,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_MOM,
        label: "Бонусы начисление, руб. MOM",
        value: COLUMN_KEY.BONUS_ACCRUAL_MOM,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_MOM_PERCENT,
        label: "Бонусы начисление, руб. MOM%",
        value: COLUMN_KEY.BONUS_ACCRUAL_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_LY,
        label: "Бонусы начисление, руб. PY",
        value: COLUMN_KEY.BONUS_ACCRUAL_LY,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_YOY,
        label: "Бонусы начисление, руб. YOY",
        value: COLUMN_KEY.BONUS_ACCRUAL_YOY,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_YOY_PERCENT,
        label: "Бонусы начисление, руб. YOY%",
        value: COLUMN_KEY.BONUS_ACCRUAL_YOY_PERCENT,
      },
    ],
  },

  {
    id: COLUMN_KEY.BONUS_WRITEOFF_GROUP,
    label: "Бонусы списание, руб.",
    value: COLUMN_KEY.BONUS_WRITEOFF_GROUP,
    icon: Minus, // или другая подходящая иконка
    children: [
      {
        id: COLUMN_KEY.BONUS_WRITEOFF,
        label: "Бонусы списание, руб.",
        value: COLUMN_KEY.BONUS_WRITEOFF,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_LM,
        label: "Бонусы списание, руб. PM",
        value: COLUMN_KEY.BONUS_WRITEOFF_LM,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_MOM,
        label: "Бонусы списание, руб. MOM",
        value: COLUMN_KEY.BONUS_WRITEOFF_MOM,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_MOM_PERCENT,
        label: "Бонусы списание, руб. MOM%",
        value: COLUMN_KEY.BONUS_WRITEOFF_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_LY,
        label: "Бонусы списание, руб. PY",
        value: COLUMN_KEY.BONUS_WRITEOFF_LY,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_YOY,
        label: "Бонусы списание, руб. YOY",
        value: COLUMN_KEY.BONUS_WRITEOFF_YOY,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_YOY_PERCENT,
        label: "Бонусы списание, руб. YOY%",
        value: COLUMN_KEY.BONUS_WRITEOFF_YOY_PERCENT,
      },
    ],
  },

  {
    id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_GROUP,
    label: "Бонусы начисление, %",
    value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_GROUP,
    icon: TrendingUp, // или другая подходящая иконка
    children: [
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT,
        label: "Бонусы начисление, %",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LM,
        label: "Бонусы начисление, % PM",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LM,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM,
        label: "Бонусы начисление, % MOM",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM_PERCENT,
        label: "Бонусы начисление, % MOM%",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LY,
        label: "Бонусы начисление, % PY",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LY,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY,
        label: "Бонусы начисление, % YOY",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY,
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY_PERCENT,
        label: "Бонусы начисление, % YOY%",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY_PERCENT,
      },
    ],
  },

  {
    id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_GROUP,
    label: "Бонусы списание, %",
    value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_GROUP,
    icon: TrendingDown, // или другая подходящая иконка
    children: [
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT,
        label: "Бонусы списание, %",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LM,
        label: "Бонусы списание, % PM",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LM,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM,
        label: "Бонусы списание, % MOM",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM_PERCENT,
        label: "Бонусы списание, % MOM%",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LY,
        label: "Бонусы списание, % PY",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LY,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY,
        label: "Бонусы списание, % YOY",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY,
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY_PERCENT,
        label: "Бонусы списание, % YOY%",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY_PERCENT,
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
    label: "С/с остатков на начало дня, руб.",
    value: COLUMN_KEY.OPENING_BALANCE_GROUP,
    icon: MinusCircle,
    children: [
      {
        id: COLUMN_KEY.OPENING_BALANCE,
        label: "С/с остатков на начало дня, руб.",
        value: COLUMN_KEY.OPENING_BALANCE,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_LM,
        label: "С/с остатков на начало дня, руб. PM",
        value: COLUMN_KEY.OPENING_BALANCE_LM,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_MOM,
        label: "С/с остатков на начало дня, руб. MOM",
        value: COLUMN_KEY.OPENING_BALANCE_MOM,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_MOM_PERCENT,
        label: "С/с остатков на начало дня, руб. MOM%",
        value: COLUMN_KEY.OPENING_BALANCE_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_LY,
        label: "С/с остатков на начало дня, руб. PY",
        value: COLUMN_KEY.OPENING_BALANCE_LY,
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_YOY,
        label: "С/с остатков на начало дня, руб. YOY",
        value: COLUMN_KEY.OPENING_BALANCE_YOY,
      },
    ],
  },
  {
    id: COLUMN_KEY.FINAL_BALANCE_GROUP,
    label: "С/с остатков на конец дня, руб.",
    value: COLUMN_KEY.FINAL_BALANCE_GROUP,
    icon: MinusCircle,
    children: [
      {
        id: COLUMN_KEY.FINAL_BALANCE,
        label: "С/с остатков на конец дня, руб.",
        value: COLUMN_KEY.FINAL_BALANCE,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_LM,
        label: "С/с остатков на конец дня, руб. PM",
        value: COLUMN_KEY.FINAL_BALANCE_LM,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_MOM,
        label: "С/с остатков на конец дня, руб. MOM",
        value: COLUMN_KEY.FINAL_BALANCE_MOM,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_MOM_PERCENT,
        label: "С/с остатков на конец дня, руб. MOM%",
        value: COLUMN_KEY.FINAL_BALANCE_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_LY,
        label: "С/с остатков на конец дня, руб. PY",
        value: COLUMN_KEY.FINAL_BALANCE_LY,
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_YOY,
        label: "С/с остатков на конец дня, руб. YOY",
        value: COLUMN_KEY.FINAL_BALANCE_YOY,
      },
    ],
  },

  {
    id: COLUMN_KEY.GROUP_TURNOVER_GOODS,
    label: "Оборачиваемость, дней.",
    value: COLUMN_KEY.GROUP_TURNOVER_GOODS,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.TURNOVER_GOODS,
        label: "Оборачиваемость, дней.",
        value: COLUMN_KEY.TURNOVER_GOODS,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_LM,
        label: "Оборачиваемость, дней. PM",
        value: COLUMN_KEY.TURNOVER_GOODS_LM,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_MOM,
        label: "Оборачиваемость, дней. MOM",
        value: COLUMN_KEY.TURNOVER_GOODS_MOM,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_MOM_PERCENT,
        label: "Оборачиваемость, дней. MOM%",
        value: COLUMN_KEY.TURNOVER_GOODS_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_LY,
        label: "Оборачиваемость, дней. PY",
        value: COLUMN_KEY.TURNOVER_GOODS_LY,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_YOY,
        label: "Оборачиваемость, дней. YOY",
        value: COLUMN_KEY.TURNOVER_GOODS_YOY,
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_YOY_PERCENT,
        label: "Оборачиваемость, дней. YOY%",
        value: COLUMN_KEY.TURNOVER_GOODS_YOY_PERCENT,
      },
    ],
  },
  {
    id: COLUMN_KEY.ITR_GROUP,
    label: "Коэффициент оборачиваемости",
    value: COLUMN_KEY.ITR_GROUP,
    icon: MinusCircle,
    children: [
      {
        id: COLUMN_KEY.ITR,
        label: "Коэффициент оборачиваемости",
        value: COLUMN_KEY.ITR,
      },
      {
        id: COLUMN_KEY.ITR_LM,
        label: "Коэффициент оборачиваемости PM",
        value: COLUMN_KEY.ITR_LM,
      },
      {
        id: COLUMN_KEY.ITR_MOM,
        label: "Коэффициент оборачиваемости MOM",
        value: COLUMN_KEY.ITR_MOM,
      },
      {
        id: COLUMN_KEY.ITR_MOM_PERCENT,
        label: "Коэффициент оборачиваемости MOM%",
        value: COLUMN_KEY.ITR_MOM_PERCENT,
      },
      {
        id: COLUMN_KEY.ITR_LY,
        label: "Коэффициент оборачиваемости PY",
        value: COLUMN_KEY.ITR_LY,
      },
      {
        id: COLUMN_KEY.ITR_YOY,
        label: "Коэффициент оборачиваемости YOY",
        value: COLUMN_KEY.ITR_YOY,
      },
      {
        id: COLUMN_KEY.ITR_YOY_PERCENT,
        label: "Коэффициент оборачиваемости YOY%",
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
  excludeList: string[],
): IndicatorGroup[] {
  return source
    .filter((group) => !excludeList.includes(group.id))
    .map((group) => {
      const filteredChildren = group.children.filter(
        (child) => !excludeList.includes(child.id),
      );

      if (filteredChildren.length === 0) {
        return undefined;
      }

      return {
        ...group,
        children: filteredChildren,
      };
    })
    .filter((group): group is IndicatorGroup => Boolean(group));
}

export const useIndicatorList = (type: "check" | "commerce") => {
  const CHECK = excludeIndicators(all_indicators, [
    COLUMN_KEY.GROUP_TURNOVER_GOODS,
    "writeOffGroup",
    "writeOffPercentGroup",
    "writeOffWeightGroup",
    "writeOffCountGroup",
    "openingBalanceGroup",
    "finalBalanceGroup",
    "itrGroup",
  ]);
  const COMMERCE = excludeIndicators(all_indicators, [
    "avgCheckGroup",
    "checkGroup",
    COLUMN_KEY.BONUS_ACCRUAL_GROUP,
    COLUMN_KEY.BONUS_WRITEOFF_GROUP,
    COLUMN_KEY.BONUS_ACCRUAL_PERCENT_GROUP,
    COLUMN_KEY.BONUS_WRITEOFF_PERCENT_GROUP,
  ]);
  if (type === "check") {
    return CHECK;
  }
  return COMMERCE;
};

interface LabelValue {
  label: string;
  value: string;
}

export function getFirstIndicatorFromGroup(
  indicators: IndicatorGroup[],
  searchId: string,
): LabelValue | null {
  // Находим группу, в которой есть искомый показатель
  const group = indicators.find(
    (group) =>
      group.id === searchId ||
      group.children.some((child) => child.id === searchId),
  );

  if (!group) {
    return null;
  }

  // Возвращаем label и value первого элемента группы
  return {
    label: group.children[0].label,
    value: group.children[0].value,
  };
}
