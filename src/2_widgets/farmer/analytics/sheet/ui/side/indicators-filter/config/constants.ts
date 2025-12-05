import { COLUMN_KEY } from "@shared/constants/table-columns";

import { DollarSign, Percent, ShoppingCart, TicketPercent } from "lucide-react";

const all_indicators = [
  {
    id: COLUMN_KEY.GROUP_FARMER_PRICE,
    label: "Выручка, руб.",
    value: COLUMN_KEY.GROUP_FARMER_PRICE,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.FARMER_PRICE,
        label: "Выручка, руб.",
        value: COLUMN_KEY.FARMER_PRICE,
        tooltip:
          "Общая сумма денежных средств, полученная от продажи товаров за выбранный период",
      },
      {
        id: COLUMN_KEY.FARMER_PRICE_LM,
        label: "Выручка, руб. PM",
        value: COLUMN_KEY.FARMER_PRICE_LM,
        tooltip:
          "Выручка за предыдущий месяц. Позволяет сравнить текущие результаты с прошлым месяцем",
      },
      {
        id: COLUMN_KEY.FARMER_PRICE_MOM,
        label: "Выручка, руб. MOM",
        value: COLUMN_KEY.FARMER_PRICE_MOM,
        tooltip:
          "Разница в выручке между текущим и предыдущим месяцем в абсолютных значениях",
      },
      {
        id: COLUMN_KEY.FARMER_PRICE_MOM_PERCENT,
        label: "Выручка, руб. MOM%",
        value: COLUMN_KEY.FARMER_PRICE_MOM_PERCENT,
        tooltip:
          "Процентное изменение выручки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.FARMER_PRICE_LY,
        label: "Выручка, руб. PY",
        value: COLUMN_KEY.FARMER_PRICE_LY,
        tooltip:
          "Выручка за аналогичный период прошлого года для годового сравнения",
      },
      {
        id: COLUMN_KEY.FARMER_PRICE_YOY,
        label: "Выручка, руб. YOY",
        value: COLUMN_KEY.FARMER_PRICE_YOY,
        tooltip:
          "Разница в выручке между текущим периодом и аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.FARMER_PRICE_YOY_PERCENT,
        label: "Выручка, руб. YOY%",
        value: COLUMN_KEY.FARMER_PRICE_YOY_PERCENT,
        tooltip:
          "Процентное изменение выручки по сравнению с аналогичным периодом прошлого года",
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

export const useIndicatorList = (tab: "check" | "commerce") => {
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
  if (tab === "check") {
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
