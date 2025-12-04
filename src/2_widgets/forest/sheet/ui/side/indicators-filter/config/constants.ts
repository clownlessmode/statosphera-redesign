import { COLUMN_KEY } from "@shared/constants/table-columns";

import {
  ArrowUpRight,
  DollarSign,
  MinusCircle,
  Percent,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Tags,
  TicketPercent,
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
        tooltip:
          "Общая сумма денежных средств, полученная от продажи товаров за выбранный период",
      },
      {
        id: COLUMN_KEY.PROCEEDS_LM,
        label: "Выручка, руб. PM",
        value: COLUMN_KEY.PROCEEDS_LM,
        tooltip:
          "Выручка за предыдущий месяц. Позволяет сравнить текущие результаты с прошлым месяцем",
      },
      {
        id: COLUMN_KEY.PROCEEDS_MOM,
        label: "Выручка, руб. MOM",
        value: COLUMN_KEY.PROCEEDS_MOM,
        tooltip:
          "Разница в выручке между текущим и предыдущим месяцем в абсолютных значениях",
      },
      {
        id: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
        label: "Выручка, руб. MOM%",
        value: COLUMN_KEY.PROCEEDS_MOM_PERCENT,
        tooltip:
          "Процентное изменение выручки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.PROCEEDS_LY,
        label: "Выручка, руб. PY",
        value: COLUMN_KEY.PROCEEDS_LY,
        tooltip:
          "Выручка за аналогичный период прошлого года для годового сравнения",
      },
      {
        id: COLUMN_KEY.PROCEEDS_YOY,
        label: "Выручка, руб. YOY",
        value: COLUMN_KEY.PROCEEDS_YOY,
        tooltip:
          "Разница в выручке между текущим периодом и аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
        label: "Выручка, руб. YOY%",
        value: COLUMN_KEY.PROCEEDS_YOY_PERCENT,
        tooltip:
          "Процентное изменение выручки по сравнению с аналогичным периодом прошлого года",
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
        tooltip:
          "Стоимость товаров, списанных по различным причинам (порча, истечение срока годности, потери)",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_LM,
        label: "Списания, руб. PM",
        value: COLUMN_KEY.WRITE_OFF_LM,
        tooltip:
          "Сумма списаний за предыдущий месяц для сравнения динамики потерь",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_MOM,
        label: "Списания, руб. MOM",
        value: COLUMN_KEY.WRITE_OFF_MOM,
        tooltip:
          "Изменение суммы списаний по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
        label: "Списания, руб. MOM%",
        value: COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
        tooltip:
          "Процентное изменение списаний относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_LY,
        label: "Списания, руб. PY",
        value: COLUMN_KEY.WRITE_OFF_LY,
        tooltip: "Сумма списаний за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_YOY,
        label: "Списания, руб. YOY",
        value: COLUMN_KEY.WRITE_OFF_YOY,
        tooltip:
          "Изменение суммы списаний по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
        label: "Списания, руб. YOY%",
        value: COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
        tooltip:
          "Процентное изменение списаний относительно аналогичного периода прошлого года",
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
        tooltip:
          "Процент списаний от общей выручки. Показывает долю потерь в общем объеме продаж",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_PERCENT_LM,
        label: "Списания % PM",
        value: COLUMN_KEY.WRITE_OFF_PERCENT_LM,
        tooltip:
          "Процент списаний за предыдущий месяц для анализа динамики потерь",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT,
        label: "Списания % MoM",
        value: COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT,
        tooltip:
          "Изменение процента списаний по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_PERCENT_LY,
        label: "Списания % PY",
        value: COLUMN_KEY.WRITE_OFF_PERCENT_LY,
        tooltip: "Процент списаний за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
        label: "Списания % YOY",
        value: COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
        tooltip:
          "Изменение процента списаний относительно аналогичного периода прошлого года",
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
        tooltip: "Количество единиц списанных товаров за выбранный период",
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_LM,
        label: "Списания, кол-во PM",
        value: COLUMN_KEY.WRITEOFF_COUNT_LM,
        tooltip: "Количество списанных товаров за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_MOM,
        label: "Списания, кол-во MOM",
        value: COLUMN_KEY.WRITEOFF_COUNT_MOM,
        tooltip:
          "Изменение количества списаний по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_MOM_PERCENT,
        label: "Списания, кол-во MOM%",
        value: COLUMN_KEY.WRITEOFF_COUNT_MOM_PERCENT,
        tooltip:
          "Процентное изменение количества списаний относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_LY,
        label: "Списания, кол-во PY",
        value: COLUMN_KEY.WRITEOFF_COUNT_LY,
        tooltip:
          "Количество списанных товаров за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_YOY,
        label: "Списания, кол-во YOY",
        value: COLUMN_KEY.WRITEOFF_COUNT_YOY,
        tooltip:
          "Изменение количества списаний по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.WRITEOFF_COUNT_YOY_PERCENT,
        label: "Списания, кол-во YOY%",
        value: COLUMN_KEY.WRITEOFF_COUNT_YOY_PERCENT,
        tooltip:
          "Процентное изменение количества списаний относительно аналогичного периода прошлого года",
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
        tooltip:
          "Разность между выручкой и себестоимостью проданных товаров. Основной показатель прибыльности",
      },
      {
        id: COLUMN_KEY.PROFIT_LM,
        label: "Валовая прибыль, руб. PM",
        value: COLUMN_KEY.PROFIT_LM,
        tooltip:
          "Валовая прибыль за предыдущий месяц для сравнения результатов",
      },
      {
        id: COLUMN_KEY.PROFIT_MOM,
        label: "Валовая прибыль, руб. MoM",
        value: COLUMN_KEY.PROFIT_MOM,
        tooltip:
          "Изменение валовой прибыли по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.PROFIT_MOM_PERCENT,
        label: "Валовая прибыль, руб. MoM %",
        value: COLUMN_KEY.PROFIT_MOM_PERCENT,
        tooltip:
          "Процентное изменение валовой прибыли относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.PROFIT_LY,
        label: "Валовая прибыль, руб. PY",
        value: COLUMN_KEY.PROFIT_LY,
        tooltip: "Валовая прибыль за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.PROFIT_YOY,
        label: "Валовая прибыль, руб. YoY",
        value: COLUMN_KEY.PROFIT_YOY,
        tooltip:
          "Изменение валовой прибыли по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.PROFIT_YOY_PERCENT,
        label: "Валовая прибыль, руб. YoY %",
        value: COLUMN_KEY.PROFIT_YOY_PERCENT,
        tooltip:
          "Процентное изменение валовой прибыли относительно аналогичного периода прошлого года",
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
        tooltip:
          "Процент наценки на товар. Показывает, на сколько процентов цена продажи превышает себестоимость",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_LM,
        label: "Наценка % PM",
        value: COLUMN_KEY.MARKUP_PERCENT_LM,
        tooltip:
          "Процент наценки за предыдущий месяц для анализа ценовой политики",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_MOM_PERCENT,
        label: "Наценка % MoM",
        value: COLUMN_KEY.MARKUP_PERCENT_MOM_PERCENT,
        tooltip: "Изменение процента наценки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_LY,
        label: "Наценка % PY",
        value: COLUMN_KEY.MARKUP_PERCENT_LY,
        tooltip: "Процент наценки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_YOY_PERCENT,
        label: "Наценка % YoY",
        value: COLUMN_KEY.MARKUP_PERCENT_YOY_PERCENT,
        tooltip:
          "Изменение процента наценки относительно аналогичного периода прошлого года",
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
        tooltip:
          "Процент наценки без учета предоставленных скидок. Показывает первоначальную наценку",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LM,
        label: "Наценка без скидки, % PM",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LM,
        tooltip: "Наценка без скидки за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_MOM_PERCENT,
        label: "Наценка без скидки, % MOM%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_MOM_PERCENT,
        tooltip:
          "Изменение наценки без скидки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LY,
        label: "Наценка без скидки, % PY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_LY,
        tooltip: "Наценка без скидки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_YOY,
        label: "Наценка без скидки, % YOY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_YOY,
        tooltip:
          "Изменение наценки без скидки относительно аналогичного периода прошлого года",
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
        tooltip:
          "Валовая прибыль без учета предоставленных скидок. Показывает потенциальную прибыль",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_LM,
        label: "Валовая прибыль без скидки, руб. PM",
        value: COLUMN_KEY.MARKUP_DISCOUNT_LM,
        tooltip: "Валовая прибыль без скидки за предыдущий месяц",
      },

      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_MOM_PERCENT,
        label: "Валовая прибыль без скидки, руб. MOM%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_MOM_PERCENT,
        tooltip:
          "Процентное изменение валовой прибыли без скидки относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_LY,
        label: "Валовая прибыль без скидки, руб. PY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_LY,
        tooltip:
          "Валовая прибыль без скидки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_YOY,
        label: "Валовая прибыль без скидки, руб. YOY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_YOY,
        tooltip:
          "Изменение валовой прибыли без скидки по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_YOY_PERCENT,
        label: "Валовая прибыль без скидки, руб. YOY%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_YOY_PERCENT,
        tooltip:
          "Процентное изменение валовой прибыли без скидки относительно аналогичного периода прошлого года",
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
        tooltip:
          "Общая стоимость приобретения или производства проданных товаров",
      },
      {
        id: COLUMN_KEY.COST_PRICE_LM,
        label: "Себестоимость, руб. PM",
        value: COLUMN_KEY.COST_PRICE_LM,
        tooltip:
          "Себестоимость за предыдущий месяц для анализа изменения затрат",
      },
      {
        id: COLUMN_KEY.COST_PRICE_MOM,
        label: "Себестоимость, руб. MOM",
        value: COLUMN_KEY.COST_PRICE_MOM,
        tooltip:
          "Изменение себестоимости по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
        label: "Себестоимость, руб. MOM%",
        value: COLUMN_KEY.COST_PRICE_MOM_PERCENT,
        tooltip:
          "Процентное изменение себестоимости относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.COST_PRICE_LY,
        label: "Себестоимость, руб. PY",
        value: COLUMN_KEY.COST_PRICE_LY,
        tooltip: "Себестоимость за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.COST_PRICE_YOY,
        label: "Себестоимость, руб. YOY",
        value: COLUMN_KEY.COST_PRICE_YOY,
        tooltip:
          "Изменение себестоимости по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
        label: "Себестоимость, руб. YoY %",
        value: COLUMN_KEY.COST_PRICE_YOY_PERCENT,
        tooltip:
          "Процентное изменение себестоимости относительно аналогичного периода прошлого года",
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
        tooltip:
          "Общая сумма предоставленных скидок в рублях за выбранный период",
      },
      {
        id: COLUMN_KEY.DISCOUNT_LM,
        label: "Скидки, руб. PM",
        value: COLUMN_KEY.DISCOUNT_LM,
        tooltip:
          "Сумма скидок за предыдущий месяц для анализа скидочной политики",
      },
      {
        id: COLUMN_KEY.DISCOUNT_MOM,
        label: "Скидки, руб. MoM",
        value: COLUMN_KEY.DISCOUNT_MOM,
        tooltip: "Изменение суммы скидок по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.DISCOUNT_MOM_PERCENT,
        label: "Скидки, руб. MoM %",
        value: COLUMN_KEY.DISCOUNT_MOM_PERCENT,
        tooltip:
          "Процентное изменение суммы скидок относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.DISCOUNT_LY,
        label: "Скидки, руб. PY",
        value: COLUMN_KEY.DISCOUNT_LY,
        tooltip: "Сумма скидок за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.DISCOUNT_YOY,
        label: "Скидки, руб. YoY",
        value: COLUMN_KEY.DISCOUNT_YOY,
        tooltip:
          "Изменение суммы скидок по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.DISCOUNT_YOY_PERCENT,
        label: "Скидки, руб. YoY%",
        value: COLUMN_KEY.DISCOUNT_YOY_PERCENT,
        tooltip:
          "Процентное изменение суммы скидок относительно аналогичного периода прошлого года",
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
        tooltip: "Средний процент скидки от общей стоимости покупок",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_LM,
        label: "Скидки % PM",
        value: COLUMN_KEY.DISCOUNT_PERCENT_LM,
        tooltip: "Средний процент скидки за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_MOM_PERCENT,
        label: "Скидки % MoM",
        value: COLUMN_KEY.DISCOUNT_PERCENT_MOM_PERCENT,
        tooltip: "Изменение процента скидки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_LY,
        label: "Скидки %  PY",
        value: COLUMN_KEY.DISCOUNT_PERCENT_LY,
        tooltip: "Средний процент скидки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT,
        label: "Скидки % YoY",
        value: COLUMN_KEY.DISCOUNT_PERCENT_YOY_PERCENT,
        tooltip:
          "Изменение процента скидки относительно аналогичного периода прошлого года",
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
        tooltip: "Общее количество проданных единиц товара за выбранный период",
      },
      {
        id: COLUMN_KEY.SALES_LM,
        label: "Кол. Продаж PM",
        value: COLUMN_KEY.SALES_LM,
        tooltip:
          "Количество продаж за предыдущий месяц для сравнения активности",
      },
      {
        id: COLUMN_KEY.SALES_MOM,
        label: "Кол. Продаж MoM",
        value: COLUMN_KEY.SALES_MOM,
        tooltip:
          "Изменение количества продаж по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.SALES_MOM_PERCENT,
        label: "Кол. Продаж MoM%",
        value: COLUMN_KEY.SALES_MOM_PERCENT,
        tooltip:
          "Процентное изменение количества продаж относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.SALES_LY,
        label: "Кол. Продаж PY",
        value: COLUMN_KEY.SALES_LY,
        tooltip: "Количество продаж за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.SALES_YOY,
        label: "Кол. Продаж YoY",
        value: COLUMN_KEY.SALES_YOY,
        tooltip:
          "Изменение количества продаж по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.SALES_YOY_PERCENT,
        label: "Кол. Продаж YoY%",
        value: COLUMN_KEY.SALES_YOY_PERCENT,
        tooltip:
          "Процентное изменение количества продаж относительно аналогичного периода прошлого года",
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

export const useIndicatorList = (type: "check" | "commerce" | "write-off") => {
  const CHECK = excludeIndicators(all_indicators, [
    COLUMN_KEY.GROUP_TURNOVER_GOODS,
    COLUMN_KEY.WEIGHT_GROUP,
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
