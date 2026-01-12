import { COLUMN_KEY } from "@shared/constants/table-columns";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

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
    id: COLUMN_KEY.WRITEOFF_WEIGHT_GROUP,
    label: "Списания, вес",
    value: COLUMN_KEY.WRITEOFF_WEIGHT_GROUP,
    icon: MinusCircle,
    children: [
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT,
        label: "Списания, вес",
        value: COLUMN_KEY.WRITEOFF_WEIGHT,
        tooltip:
          "Общий вес списанных товаров в килограммах за выбранный период",
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_LM,
        label: "Списания, вес PM",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_LM,
        tooltip: "Вес списанных товаров за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_MOM,
        label: "Списания, вес MOM",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_MOM,
        tooltip: "Изменение веса списаний по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_MOM,
        label: "Списания, вес MOM%",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_MOM,
        tooltip:
          "Процентное изменение веса списаний относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_LY,
        label: "Списания, вес PY",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_LY,
        tooltip: "Вес списанных товаров за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_YOY,
        label: "Списания, вес YOY",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_YOY,
        tooltip:
          "Изменение веса списаний по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_YOY,
        label: "Списания, вес YOY%",
        value: COLUMN_KEY.WRITEOFF_WEIGHT_PERCENT_YOY,
        tooltip:
          "Процентное изменение веса списаний относительно аналогичного периода прошлого года",
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
    id: "marginGroup",
    label: "Маржа %",
    value: "marginGroup",
    icon: TrendingUp,
    children: [
      {
        id: COLUMN_KEY.MARGIN_PERCENT,
        label: "Маржа %",
        value: COLUMN_KEY.MARGIN_PERCENT,
        tooltip:
          "Процент маржи от выручки. Показывает долю прибыли в общей сумме продаж",
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_LM,
        label: "Маржа % PM",
        value: COLUMN_KEY.MARGIN_PERCENT_LM,
        tooltip: "Процент маржи за предыдущий месяц для анализа рентабельности",
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_MOM_PERCENT,
        label: "Маржа % MoM",
        value: COLUMN_KEY.MARGIN_PERCENT_MOM_PERCENT,
        tooltip: "Изменение процента маржи по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_LY,
        label: "Маржа % PY",
        value: COLUMN_KEY.MARGIN_PERCENT_LY,
        tooltip: "Процент маржи за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_YOY_PERCENT,
        label: "Маржа % YoY",
        value: COLUMN_KEY.MARGIN_PERCENT_YOY_PERCENT,
        tooltip:
          "Изменение процента маржи относительно аналогичного периода прошлого года",
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
        tooltip:
          "Процент маржи без учета предоставленных скидок. Показывает первоначальную рентабельность",
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LM,
        label: "Маржа % без учета скидки PM",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LM,
        tooltip: "Маржа без скидки за предыдущий месяц",
      },
      // {
      //   id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_MOM_PERCENT,
      //   label: "Маржа % без учета скидки MOM%",
      //   value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_MOM_PERCENT,
      //   tooltip: "Изменение маржи без скидки по сравнению с предыдущим месяцем",
      // },

      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LY,
        label: "Маржа % без учета скидки PY",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_LY,
        tooltip: "Маржа без скидки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_YOY,
        label: "Маржа % без учета скидки YOY",
        value: COLUMN_KEY.MARGIN_PERCENT_DISCOUNT_YOY,
        tooltip:
          "Изменение маржи без скидки относительно аналогичного периода прошлого года",
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
        tooltip:
          "Средняя сумма одной покупки. Рассчитывается как выручка, деленная на количество чеков",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_LM,
        label: "Ср. Чек PM",
        value: COLUMN_KEY.AVG_CHECK_LM,
        tooltip:
          "Средний чек за предыдущий месяц для анализа покупательского поведения",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_MOM,
        label: "Ср. Чек MoM",
        value: COLUMN_KEY.AVG_CHECK_MOM,
        tooltip:
          "Изменение среднего чека по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_MOM_PERCENT,
        label: "Ср. Чек MoM %",
        value: COLUMN_KEY.AVG_CHECK_MOM_PERCENT,
        tooltip:
          "Процентное изменение среднего чека относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_LY,
        label: "Ср. Чек  PY",
        value: COLUMN_KEY.AVG_CHECK_LY,
        tooltip: "Средний чек за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_YOY,
        label: "Ср. Чек YoY",
        value: COLUMN_KEY.AVG_CHECK_YOY,
        tooltip:
          "Изменение среднего чека по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_YOY_PERCENT,
        label: "Ср. Чек YoY %",
        value: COLUMN_KEY.AVG_CHECK_YOY_PERCENT,
        tooltip:
          "Процентное изменение среднего чека относительно аналогичного периода прошлого года",
      },
    ],
  },

  {
    id: COLUMN_KEY.BONUS_ACCRUAL_GROUP,
    label: "Бонусы начисление, руб.",
    value: COLUMN_KEY.BONUS_ACCRUAL_GROUP,
    icon: Plus,
    children: [
      {
        id: COLUMN_KEY.BONUS_ACCRUAL,
        label: "Бонусы начисление, руб.",
        value: COLUMN_KEY.BONUS_ACCRUAL,
        tooltip:
          "Общая сумма начисленных бонусов клиентам за покупки в рублевом эквиваленте",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_LM,
        label: "Бонусы начисление, руб. PM",
        value: COLUMN_KEY.BONUS_ACCRUAL_LM,
        tooltip: "Сумма начисленных бонусов за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_MOM,
        label: "Бонусы начисление, руб. MOM",
        value: COLUMN_KEY.BONUS_ACCRUAL_MOM,
        tooltip:
          "Изменение суммы начисленных бонусов по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_MOM_PERCENT,
        label: "Бонусы начисление, руб. MOM%",
        value: COLUMN_KEY.BONUS_ACCRUAL_MOM_PERCENT,
        tooltip:
          "Процентное изменение начисленных бонусов относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_LY,
        label: "Бонусы начисление, руб. PY",
        value: COLUMN_KEY.BONUS_ACCRUAL_LY,
        tooltip:
          "Сумма начисленных бонусов за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_YOY,
        label: "Бонусы начисление, руб. YOY",
        value: COLUMN_KEY.BONUS_ACCRUAL_YOY,
        tooltip:
          "Изменение начисленных бонусов по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_YOY_PERCENT,
        label: "Бонусы начисление, руб. YOY%",
        value: COLUMN_KEY.BONUS_ACCRUAL_YOY_PERCENT,
        tooltip:
          "Процентное изменение начисленных бонусов относительно аналогичного периода прошлого года",
      },
    ],
  },

  {
    id: COLUMN_KEY.BONUS_WRITEOFF_GROUP,
    label: "Бонусы списание, руб.",
    value: COLUMN_KEY.BONUS_WRITEOFF_GROUP,
    icon: Minus,
    children: [
      {
        id: COLUMN_KEY.BONUS_WRITEOFF,
        label: "Бонусы списание, руб.",
        value: COLUMN_KEY.BONUS_WRITEOFF,
        tooltip:
          "Общая сумма списанных (потраченных) бонусов клиентами при оплате покупок",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_LM,
        label: "Бонусы списание, руб. PM",
        value: COLUMN_KEY.BONUS_WRITEOFF_LM,
        tooltip: "Сумма списанных бонусов за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_MOM,
        label: "Бонусы списание, руб. MOM",
        value: COLUMN_KEY.BONUS_WRITEOFF_MOM,
        tooltip:
          "Изменение суммы списанных бонусов по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_MOM_PERCENT,
        label: "Бонусы списание, руб. MOM%",
        value: COLUMN_KEY.BONUS_WRITEOFF_MOM_PERCENT,
        tooltip:
          "Процентное изменение списанных бонусов относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_LY,
        label: "Бонусы списание, руб. PY",
        value: COLUMN_KEY.BONUS_WRITEOFF_LY,
        tooltip: "Сумма списанных бонусов за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_YOY,
        label: "Бонусы списание, руб. YOY",
        value: COLUMN_KEY.BONUS_WRITEOFF_YOY,
        tooltip:
          "Изменение списанных бонусов по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_YOY_PERCENT,
        label: "Бонусы списание, руб. YOY%",
        value: COLUMN_KEY.BONUS_WRITEOFF_YOY_PERCENT,
        tooltip:
          "Процентное изменение списанных бонусов относительно аналогичного периода прошлого года",
      },
    ],
  },

  {
    id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_GROUP,
    label: "Бонусы начисление, %",
    value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_GROUP,
    icon: TrendingUp,
    children: [
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT,
        label: "Бонусы начисление, %",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT,
        tooltip: "Процент начисленных бонусов от общей суммы покупок",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LM,
        label: "Бонусы начисление, % PM",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LM,
        tooltip: "Процент начисления бонусов за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM,
        label: "Бонусы начисление, % MOM",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM,
        tooltip:
          "Изменение процента начисления бонусов по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM_PERCENT,
        label: "Бонусы начисление, % MOM%",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_MOM_PERCENT,
        tooltip:
          "Процентное изменение доли начисления бонусов относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LY,
        label: "Бонусы начисление, % PY",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_LY,
        tooltip:
          "Процент начисления бонусов за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY,
        label: "Бонусы начисление, % YOY",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY,
        tooltip:
          "Изменение процента начисления бонусов по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY_PERCENT,
        label: "Бонусы начисление, % YOY%",
        value: COLUMN_KEY.BONUS_ACCRUAL_PERCENT_YOY_PERCENT,
        tooltip:
          "Процентное изменение доли начисления бонусов относительно аналогичного периода прошлого года",
      },
    ],
  },

  {
    id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_GROUP,
    label: "Бонусы списание, %",
    value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_GROUP,
    icon: TrendingDown,
    children: [
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT,
        label: "Бонусы списание, %",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT,
        tooltip: "Процент списанных бонусов от общей суммы покупок",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LM,
        label: "Бонусы списание, % PM",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LM,
        tooltip: "Процент списания бонусов за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM,
        label: "Бонусы списание, % MOM",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM,
        tooltip:
          "Изменение процента списания бонусов по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM_PERCENT,
        label: "Бонусы списание, % MOM%",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_MOM_PERCENT,
        tooltip:
          "Процентное изменение доли списания бонусов относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LY,
        label: "Бонусы списание, % PY",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_LY,
        tooltip: "Процент списания бонусов за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY,
        label: "Бонусы списание, % YOY",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY,
        tooltip:
          "Изменение процента списания бонусов по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY_PERCENT,
        label: "Бонусы списание, % YOY%",
        value: COLUMN_KEY.BONUS_WRITEOFF_PERCENT_YOY_PERCENT,
        tooltip:
          "Процентное изменение доли списания бонусов относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.WEIGHT_GROUP,
    label: "Вес",
    value: COLUMN_KEY.WEIGHT_GROUP,
    icon: Weight,
    children: [
      {
        id: COLUMN_KEY.WEIGHT,
        label: "Вес",
        value: COLUMN_KEY.WEIGHT,
        tooltip:
          "Общий вес проданных товаров в килограммах за выбранный период",
      },
      {
        id: COLUMN_KEY.WEIGHT_LM,
        label: "Вес PM",
        value: COLUMN_KEY.WEIGHT_LM,
        tooltip: "Вес проданных товаров за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.WEIGHT_MOM,
        label: "Вес MOM",
        value: COLUMN_KEY.WEIGHT_MOM,
        tooltip: "Изменение веса продаж по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.WEIGHT_MOM_PERCENT,
        label: "Вес MOM%",
        value: COLUMN_KEY.WEIGHT_MOM_PERCENT,
        tooltip:
          "Процентное изменение веса продаж относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.WEIGHT_LY,
        label: "Вес PY",
        value: COLUMN_KEY.WEIGHT_LY,
        tooltip: "Вес проданных товаров за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.WEIGHT_YOY,
        label: "Вес YOY",
        value: COLUMN_KEY.WEIGHT_YOY,
        tooltip:
          "Изменение веса продаж по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.WEIGHT_YOY_PERCENT,
        label: "Вес YOY%",
        value: COLUMN_KEY.WEIGHT_YOY_PERCENT,
        tooltip:
          "Процентное изменение веса продаж относительно аналогичного периода прошлого года",
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
        tooltip:
          "Себестоимость товарных остатков на складе на начало торгового дня",
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_LM,
        label: "С/с остатков на начало дня, руб. PM",
        value: COLUMN_KEY.OPENING_BALANCE_LM,
        tooltip: "Себестоимость остатков на начало дня за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_MOM,
        label: "С/с остатков на начало дня, руб. MOM",
        value: COLUMN_KEY.OPENING_BALANCE_MOM,
        tooltip:
          "Изменение себестоимости остатков на начало дня по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_MOM_PERCENT,
        label: "С/с остатков на начало дня, руб. MOM%",
        value: COLUMN_KEY.OPENING_BALANCE_MOM_PERCENT,
        tooltip:
          "Процентное изменение остатков на начало дня относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_LY,
        label: "С/с остатков на начало дня, руб. PY",
        value: COLUMN_KEY.OPENING_BALANCE_LY,
        tooltip:
          "Себестоимость остатков на начало дня за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.OPENING_BALANCE_YOY,
        label: "С/с остатков на начало дня, руб. YOY",
        value: COLUMN_KEY.OPENING_BALANCE_YOY,
        tooltip:
          "Изменение остатков на начало дня по сравнению с аналогичным периодом прошлого года",
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
        tooltip:
          "Себестоимость товарных остатков на складе на конец торгового дня",
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_LM,
        label: "С/с остатков на конец дня, руб. PM",
        value: COLUMN_KEY.FINAL_BALANCE_LM,
        tooltip: "Себестоимость остатков на конец дня за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_MOM,
        label: "С/с остатков на конец дня, руб. MOM",
        value: COLUMN_KEY.FINAL_BALANCE_MOM,
        tooltip:
          "Изменение себестоимости остатков на конец дня по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_MOM_PERCENT,
        label: "С/с остатков на конец дня, руб. MOM%",
        value: COLUMN_KEY.FINAL_BALANCE_MOM_PERCENT,
        tooltip:
          "Процентное изменение остатков на конец дня относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_LY,
        label: "С/с остатков на конец дня, руб. PY",
        value: COLUMN_KEY.FINAL_BALANCE_LY,
        tooltip:
          "Себестоимость остатков на конец дня за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.FINAL_BALANCE_YOY,
        label: "С/с остатков на конец дня, руб. YOY",
        value: COLUMN_KEY.FINAL_BALANCE_YOY,
        tooltip:
          "Изменение остатков на конец дня по сравнению с аналогичным периодом прошлого года",
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
        tooltip:
          "Количество дней, за которое товарный запас полностью обновляется. Чем меньше значение, тем быстрее оборот",
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_LM,
        label: "Оборачиваемость, дней. PM",
        value: COLUMN_KEY.TURNOVER_GOODS_LM,
        tooltip: "Оборачиваемость товаров за предыдущий месяц в днях",
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_MOM,
        label: "Оборачиваемость, дней. MOM",
        value: COLUMN_KEY.TURNOVER_GOODS_MOM,
        tooltip:
          "Изменение оборачиваемости по сравнению с предыдущим месяцем в днях",
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_MOM_PERCENT,
        label: "Оборачиваемость, дней. MOM%",
        value: COLUMN_KEY.TURNOVER_GOODS_MOM_PERCENT,
        tooltip:
          "Процентное изменение оборачиваемости относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_LY,
        label: "Оборачиваемость, дней. PY",
        value: COLUMN_KEY.TURNOVER_GOODS_LY,
        tooltip: "Оборачиваемость товаров за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_YOY,
        label: "Оборачиваемость, дней. YOY",
        value: COLUMN_KEY.TURNOVER_GOODS_YOY,
        tooltip:
          "Изменение оборачиваемости по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.TURNOVER_GOODS_YOY_PERCENT,
        label: "Оборачиваемость, дней. YOY%",
        value: COLUMN_KEY.TURNOVER_GOODS_YOY_PERCENT,
        tooltip:
          "Процентное изменение оборачиваемости относительно аналогичного периода прошлого года",
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
        tooltip:
          "Показывает, сколько раз товарный запас полностью обновился за период. Чем выше значение, тем эффективнее управление запасами",
      },
      {
        id: COLUMN_KEY.ITR_LM,
        label: "Коэффициент оборачиваемости PM",
        value: COLUMN_KEY.ITR_LM,
        tooltip: "Коэффициент оборачиваемости за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.ITR_MOM,
        label: "Коэффициент оборачиваемости MOM",
        value: COLUMN_KEY.ITR_MOM,
        tooltip:
          "Изменение коэффициента оборачиваемости по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.ITR_MOM_PERCENT,
        label: "Коэффициент оборачиваемости MOM%",
        value: COLUMN_KEY.ITR_MOM_PERCENT,
        tooltip:
          "Процентное изменение коэффициента оборачиваемости относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.ITR_LY,
        label: "Коэффициент оборачиваемости PY",
        value: COLUMN_KEY.ITR_LY,
        tooltip:
          "Коэффициент оборачиваемости за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.ITR_YOY,
        label: "Коэффициент оборачиваемости YOY",
        value: COLUMN_KEY.ITR_YOY,
        tooltip:
          "Изменение коэффициента оборачиваемости по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.ITR_YOY_PERCENT,
        label: "Коэффициент оборачиваемости YOY%",
        value: COLUMN_KEY.ITR_YOY_PERCENT,
        tooltip:
          "Процентное изменение коэффициента оборачиваемости относительно аналогичного периода прошлого года",
      },
    ],
  },
];

const indicators_night_shops = [
  {
    id: COLUMN_KEY.GROUP_PROCEEDS_DAY,
    label: "Дневная выручка, руб.",
    value: COLUMN_KEY.GROUP_PROCEEDS_DAY,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.PROCEEDS_DAY,
        label: "Дневная выручка, руб.",
        value: COLUMN_KEY.PROCEEDS_DAY,
        tooltip:
          "Общая сумма денежных средств, полученная от продажи товаров за выбранный период",
      },
      {
        id: COLUMN_KEY.PROCEEDS_DAY_LM,
        label: "Дневная выручка, руб. PM",
        value: COLUMN_KEY.PROCEEDS_DAY_LM,
        tooltip:
          "Выручка за предыдущий месяц. Позволяет сравнить текущие результаты с прошлым месяцем",
      },
      {
        id: COLUMN_KEY.PROCEEDS_DAY_MOM,
        label: "Дневная выручка, руб. MOM",
        value: COLUMN_KEY.PROCEEDS_DAY_MOM,
        tooltip:
          "Разница в выручке между текущим и предыдущим месяцем в абсолютных значениях",
      },
      {
        id: COLUMN_KEY.PROCEEDS_DAY_MOM_PERCENT,
        label: "Дневная выручка, руб. MOM%",
        value: COLUMN_KEY.PROCEEDS_DAY_MOM_PERCENT,
        tooltip:
          "Процентное изменение выручки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.PROCEEDS_DAY_LY,
        label: "Дневная выручка, руб. PY",
        value: COLUMN_KEY.PROCEEDS_DAY_LY,
        tooltip:
          "Выручка за аналогичный период прошлого года для годового сравнения",
      },
      {
        id: COLUMN_KEY.PROCEEDS_DAY_YOY,
        label: "Дневная выручка, руб. YOY",
        value: COLUMN_KEY.PROCEEDS_DAY_YOY,
        tooltip:
          "Разница в выручке между текущим периодом и аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.PROCEEDS_DAY_YOY_PERCENT,
        label: "Дневная выручка, руб. YOY%",
        value: COLUMN_KEY.PROCEEDS_DAY_YOY_PERCENT,
        tooltip:
          "Процентное изменение выручки по сравнению с аналогичным периодом прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_PROCEEDS_NIGHT,
    label: "Ночная выручка, руб.",
    value: COLUMN_KEY.GROUP_PROCEEDS_NIGHT,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.PROCEEDS_NIGHT,
        label: "Ночная выручка, руб.",
        value: COLUMN_KEY.PROCEEDS_NIGHT,
        tooltip:
          "Общая сумма денежных средств, полученная от продажи товаров за выбранный период",
      },
      {
        id: COLUMN_KEY.PROCEEDS_NIGHT_LM,
        label: "Ночная выручка, руб. PM",
        value: COLUMN_KEY.PROCEEDS_NIGHT_LM,
        tooltip:
          "Выручка за предыдущий месяц. Позволяет сравнить текущие результаты с прошлым месяцем",
      },
      {
        id: COLUMN_KEY.PROCEEDS_NIGHT_MOM,
        label: "Ночная выручка, руб. MOM",
        value: COLUMN_KEY.PROCEEDS_NIGHT_MOM,
        tooltip:
          "Разница в выручке между текущим и предыдущим месяцем в абсолютных значениях",
      },
      {
        id: COLUMN_KEY.PROCEEDS_NIGHT_MOM_PERCENT,
        label: "Ночная выручка, руб. MOM%",
        value: COLUMN_KEY.PROCEEDS_NIGHT_MOM_PERCENT,
        tooltip:
          "Процентное изменение выручки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.PROCEEDS_NIGHT_LY,
        label: "Ночная выручка, руб. PY",
        value: COLUMN_KEY.PROCEEDS_NIGHT_LY,
        tooltip:
          "Выручка за аналогичный период прошлого года для годового сравнения",
      },
      {
        id: COLUMN_KEY.PROCEEDS_NIGHT_YOY,
        label: "Ночная выручка, руб. YOY",
        value: COLUMN_KEY.PROCEEDS_NIGHT_YOY,
        tooltip:
          "Разница в выручке между текущим периодом и аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.PROCEEDS_NIGHT_YOY_PERCENT,
        label: "Ночная выручка, руб. YOY%",
        value: COLUMN_KEY.PROCEEDS_NIGHT_YOY_PERCENT,
        tooltip:
          "Процентное изменение выручки по сравнению с аналогичным периодом прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_PERCENTAGE_PROCEEDS_NIGHT,
    label: "Ночная выручка, %",
    value: COLUMN_KEY.GROUP_PERCENTAGE_PROCEEDS_NIGHT,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT,
        label: "Ночная выручка, %",
        value: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT,
        tooltip:
          "Процент вхождения выручки ночных магазинов в общую выручку за выбранный период",
      },
      {
        id: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_LM,
        label: "Ночная выручка, % PM",
        value: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_LM,
        tooltip:
          "Процент вхождения выручки ночных магазинов в общую выручку за предыдущий месяц. Позволяет сравнить текущие результаты с прошлым месяцем",
      },
      {
        id: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_MOM,
        label: "Ночная выручка, % MOM",
        value: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_MOM,
        tooltip:
          "Процент вхождения выручки ночных магазинов в общую выручку между текущим и предыдущим месяцем в абсолютных значениях",
      },
      {
        id: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_MOM,
        label: "Ночная выручка, % MOM%",
        value: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_MOM,
        tooltip:
          "Процент вхождения выручки ночных магазинов в общую выручку процентное изменение выручки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_LY,
        label: "Ночная выручка, % PY",
        value: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_LY,
        tooltip:
          "Процент вхождения выручки ночных магазинов в общую выручку за аналогичный период прошлого года для годового сравнения",
      },
      {
        id: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_YOY,
        label: "Ночная выручка, % YOY",
        value: COLUMN_KEY.PERCENTAGE_PROCEEDS_NIGHT_YOY,
        tooltip:
          "Процент вхождения выручки ночных магазинов в общую выручку разница в выручке между текущим периодом и аналогичным периодом прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_PROFIT_DAY,
    label: "Дневная валовая прибыль, руб.",
    value: COLUMN_KEY.GROUP_PROFIT_DAY,
    icon: ArrowUpRight,
    children: [
      {
        id: COLUMN_KEY.PROFIT_DAY,
        label: "Дневная валовая прибыль, руб.",
        value: COLUMN_KEY.PROFIT_DAY,
        tooltip:
          "Разность между выручкой и себестоимостью проданных товаров. Основной показатель прибыльности",
      },
      {
        id: COLUMN_KEY.PROFIT_DAY_LM,
        label: "Дневная валовая прибыль, руб. PM",
        value: COLUMN_KEY.PROFIT_DAY_LM,
        tooltip:
          "Валовая прибыль за предыдущий месяц для сравнения результатов",
      },
      {
        id: COLUMN_KEY.PROFIT_DAY_MOM,
        label: "Дневная валовая прибыль, руб. MoM",
        value: COLUMN_KEY.PROFIT_DAY_MOM,
        tooltip:
          "Изменение валовой прибыли по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.PROFIT_DAY_MOM_PERCENT,
        label: "Дневная валовая прибыль, руб. MoM %",
        value: COLUMN_KEY.PROFIT_DAY_MOM_PERCENT,
        tooltip:
          "Процентное изменение валовой прибыли относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.PROFIT_DAY_LY,
        label: "Дневная валовая прибыль, руб. PY",
        value: COLUMN_KEY.PROFIT_DAY_LY,
        tooltip: "Валовая прибыль за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.PROFIT_DAY_YOY,
        label: "Дневная валовая прибыль, руб. YoY",
        value: COLUMN_KEY.PROFIT_DAY_YOY,
        tooltip:
          "Изменение валовой прибыли по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.PROFIT_DAY_YOY_PERCENT,
        label: "Дневная валовая прибыль, руб. YoY %",
        value: COLUMN_KEY.PROFIT_DAY_YOY_PERCENT,
        tooltip:
          "Процентное изменение валовой прибыли относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_PROFIT_NIGHT,
    label: "Ночная валовая прибыль, руб.",
    value: COLUMN_KEY.GROUP_PROFIT_NIGHT,
    icon: ArrowUpRight,
    children: [
      {
        id: COLUMN_KEY.PROFIT_NIGHT,
        label: "Ночная валовая прибыль, руб.",
        value: COLUMN_KEY.PROFIT_NIGHT,
        tooltip:
          "Разность между выручкой и себестоимостью проданных товаров. Основной показатель прибыльности",
      },
      {
        id: COLUMN_KEY.PROFIT_NIGHT_LM,
        label: "Ночная валовая прибыль, руб. PM",
        value: COLUMN_KEY.PROFIT_NIGHT_LM,
        tooltip:
          "Валовая прибыль за предыдущий месяц для сравнения результатов",
      },
      {
        id: COLUMN_KEY.PROFIT_NIGHT_MOM,
        label: "Ночная валовая прибыль, руб. MoM",
        value: COLUMN_KEY.PROFIT_NIGHT_MOM,
        tooltip:
          "Изменение валовой прибыли по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.PROFIT_NIGHT_MOM_PERCENT,
        label: "Ночная валовая прибыль, руб. MoM %",
        value: COLUMN_KEY.PROFIT_NIGHT_MOM_PERCENT,
        tooltip:
          "Процентное изменение валовой прибыли относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.PROFIT_NIGHT_LY,
        label: "Ночная валовая прибыль, руб. PY",
        value: COLUMN_KEY.PROFIT_NIGHT_LY,
        tooltip: "Валовая прибыль за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.PROFIT_NIGHT_YOY,
        label: "Ночная валовая прибыль, руб. YoY",
        value: COLUMN_KEY.PROFIT_NIGHT_YOY,
        tooltip:
          "Изменение валовой прибыли по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.PROFIT_DAY_YOY_PERCENT,
        label: "Ночная валовая прибыль, руб. YoY %",
        value: COLUMN_KEY.PROFIT_NIGHT_YOY_PERCENT,
        tooltip:
          "Процентное изменение валовой прибыли относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_PERCENTAGE_PROFIT_NIGHT,
    label: "Ночная прибыль, %",
    value: COLUMN_KEY.GROUP_PERCENTAGE_PROFIT_NIGHT,
    icon: ArrowUpRight,
    children: [
      {
        id: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT,
        label: "Ночная прибыль, %",
        value: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT,
        tooltip:
          "Процент вхождения прибыли ночных магазинов в общую прибыль за выбранный период",
      },
      {
        id: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_LM,
        label: "Ночная прибыль, % PM",
        value: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_LM,
        tooltip:
          "Процент вхождения прибыли ночных магазинов в общую прибыль за предыдущий месяц. Позволяет сравнить текущие результаты с прошлым месяцем",
      },
      {
        id: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_MOM,
        label: "Ночная прибыль, % MoM",
        value: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_MOM,
        tooltip:
          "Процент вхождения прибыли ночных магазинов в общую прибыль между текущим и предыдущим месяцем в абсолютных значениях",
      },
      {
        id: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_LY,
        label: "Ночная прибыль, % PY",
        value: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_LY,
        tooltip:
          "Процент вхождения прибыли ночных магазинов в общую прибыль за аналогичный период прошлого года для годового сравнения",
      },
      {
        id: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_YOY,
        label: "Ночная прибыль, % YoY",
        value: COLUMN_KEY.PERCENTAGE_PROFIT_NIGHT_YOY,
        tooltip:
          "Процент вхождения прибыли ночных магазинов в общую прибыль разница в прибыли между текущим периодом и аналогичным периодом прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_MARKUP_PERCENT_DAY,
    label: "Дневная наценка, %",
    value: COLUMN_KEY.GROUP_MARKUP_PERCENT_DAY,
    icon: Tag,
    children: [
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DAY,
        label: "Дневная наценка, %",
        value: COLUMN_KEY.MARKUP_PERCENT_DAY,
        tooltip:
          "Процент наценки на товар. Показывает, на сколько процентов цена продажи превышает себестоимость",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DAY_LM,
        label: "Дневная наценка, % PM",
        value: COLUMN_KEY.MARKUP_PERCENT_DAY_LM,
        tooltip:
          "Процент наценки за предыдущий месяц для анализа ценовой политики",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DAY_MOM,
        label: "Дневная наценка, % MoM",
        value: COLUMN_KEY.MARKUP_PERCENT_DAY_MOM,
        tooltip: "Изменение процента наценки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DAY_LY,
        label: "Дневная наценка, % PY",
        value: COLUMN_KEY.MARKUP_PERCENT_DAY_LY,
        tooltip: "Процент наценки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_DAY_YOY,
        label: "Дневная наценка, % YoY",
        value: COLUMN_KEY.MARKUP_PERCENT_DAY_YOY,
        tooltip:
          "Изменение процента наценки относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_MARKUP_PERCENT_NIGHT,
    label: "Ночная наценка, %",
    value: COLUMN_KEY.GROUP_MARKUP_PERCENT_NIGHT,
    icon: Tag,
    children: [
      {
        id: COLUMN_KEY.MARKUP_PERCENT_NIGHT,
        label: "Ночная наценка, %",
        value: COLUMN_KEY.MARKUP_PERCENT_NIGHT,
        tooltip:
          "Процент наценки на товар. Показывает, на сколько процентов цена продажи превышает себестоимость",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_NIGHT_LM,
        label: "Ночная наценка, % PM",
        value: COLUMN_KEY.MARKUP_PERCENT_NIGHT_LM,
        tooltip:
          "Процент наценки за предыдущий месяц для анализа ценовой политики",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_NIGHT_MOM,
        label: "Ночная наценка, % MoM",
        value: COLUMN_KEY.MARKUP_PERCENT_NIGHT_MOM,
        tooltip: "Изменение процента наценки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_NIGHT_LY,
        label: "Ночная наценка, % PY",
        value: COLUMN_KEY.MARKUP_PERCENT_NIGHT_LY,
        tooltip: "Процент наценки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.MARKUP_PERCENT_NIGHT_YOY,
        label: "Ночная наценка, % YoY",
        value: COLUMN_KEY.MARKUP_PERCENT_NIGHT_YOY,
        tooltip:
          "Изменение процента наценки относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_MARKUP_DISCOUNT_PERCENT_DAY,
    label: "Дневная наценка без скидки, %",
    value: COLUMN_KEY.GROUP_MARKUP_DISCOUNT_PERCENT_DAY,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY,
        label: "Дневная наценка без скидки, %",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY,
        tooltip:
          "Процент наценки без учета предоставленных скидок. Показывает первоначальную наценку",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_LM,
        label: "Дневная наценка без скидки, % PM",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_LM,
        tooltip: "Наценка без скидки за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_MOM,
        label: "Дневная наценка без скидки, % MOM%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_MOM,
        tooltip:
          "Изменение наценки без скидки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_LY,
        label: "Дневная наценка без скидки, % PY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_LY,
        tooltip: "Наценка без скидки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_YOY,
        label: "Дневная наценка без скидки, % YOY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_DAY_YOY,
        tooltip:
          "Изменение наценки без скидки относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_MARKUP_DISCOUNT_PERCENT_NIGHT,
    label: "Ночная наценка без скидки, %",
    value: COLUMN_KEY.GROUP_MARKUP_DISCOUNT_PERCENT_NIGHT,
    icon: DollarSign,
    children: [
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT,
        label: "Ночная наценка без скидки, %",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT,
        tooltip:
          "Процент наценки без учета предоставленных скидок. Показывает первоначальную наценку",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_LM,
        label: "Ночная наценка без скидки, % PM",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_LM,
        tooltip: "Наценка без скидки за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_MOM,
        label: "Ночная наценка без скидки, % MOM%",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_MOM,
        tooltip:
          "Изменение наценки без скидки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_LY,
        label: "Ночная наценка без скидки, % PY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_LY,
        tooltip: "Наценка без скидки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_YOY,
        label: "Ночная наценка без скидки, % YOY",
        value: COLUMN_KEY.MARKUP_DISCOUNT_PERCENT_NIGHT_YOY,
        tooltip:
          "Изменение наценки без скидки относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_COST_PRICE_DAY,
    label: "Дневная себестоимость, руб.",
    value: COLUMN_KEY.GROUP_COST_PRICE_DAY,
    icon: ShoppingBag,
    children: [
      {
        id: COLUMN_KEY.COST_PRICE_DAY,
        label: "Дневная себестоимость, руб.",
        value: COLUMN_KEY.COST_PRICE_DAY,
        tooltip:
          "Общая стоимость приобретения или производства проданных товаров",
      },
      {
        id: COLUMN_KEY.COST_PRICE_DAY_LM,
        label: "Дневная себестоимость, руб. PM",
        value: COLUMN_KEY.COST_PRICE_DAY_LM,
        tooltip:
          "Себестоимость за предыдущий месяц для анализа изменения затрат",
      },
      {
        id: COLUMN_KEY.COST_PRICE_DAY_MOM,
        label: "Дневная себестоимость, руб. MOM",
        value: COLUMN_KEY.COST_PRICE_DAY_MOM,
        tooltip:
          "Изменение себестоимости по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.COST_PRICE_DAY_MOM_PERCENT,
        label: "Дневная себестоимость, руб. MOM%",
        value: COLUMN_KEY.COST_PRICE_DAY_MOM_PERCENT,
        tooltip:
          "Процентное изменение себестоимости относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.COST_PRICE_DAY_LY,
        label: "Дневная себестоимость, руб. PY",
        value: COLUMN_KEY.COST_PRICE_DAY_LY,
        tooltip: "Себестоимость за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.COST_PRICE_DAY_YOY,
        label: "Дневная себестоимость, руб. YOY",
        value: COLUMN_KEY.COST_PRICE_DAY_YOY,
        tooltip:
          "Изменение себестоимости по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.COST_PRICE_DAY_YOY_PERCENT,
        label: "Дневная себестоимость, руб. YoY %",
        value: COLUMN_KEY.COST_PRICE_DAY_YOY_PERCENT,
        tooltip:
          "Процентное изменение себестоимости относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_COST_PRICE_NIGHT,
    label: "Ночная себестоимость, руб.",
    value: COLUMN_KEY.GROUP_COST_PRICE_NIGHT,
    icon: ShoppingBag,
    children: [
      {
        id: COLUMN_KEY.COST_PRICE_NIGHT,
        label: "Ночная себестоимость, руб.",
        value: COLUMN_KEY.COST_PRICE_NIGHT,
        tooltip:
          "Общая стоимость приобретения или производства проданных товаров",
      },
      {
        id: COLUMN_KEY.COST_PRICE_NIGHT_LM,
        label: "Ночная себестоимость, руб. PM",
        value: COLUMN_KEY.COST_PRICE_NIGHT_LM,
        tooltip:
          "Себестоимость за предыдущий месяц для анализа изменения затрат",
      },
      {
        id: COLUMN_KEY.COST_PRICE_NIGHT_MOM,
        label: "Ночная себестоимость, руб. MOM",
        value: COLUMN_KEY.COST_PRICE_NIGHT_MOM,
        tooltip:
          "Изменение себестоимости по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.COST_PRICE_NIGHT_MOM_PERCENT,
        label: "Ночная себестоимость, руб. MOM%",
        value: COLUMN_KEY.COST_PRICE_NIGHT_MOM_PERCENT,
        tooltip:
          "Процентное изменение себестоимости относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.COST_PRICE_NIGHT_LY,
        label: "Ночная себестоимость, руб. PY",
        value: COLUMN_KEY.COST_PRICE_NIGHT_LY,
        tooltip: "Себестоимость за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.COST_PRICE_NIGHT_YOY,
        label: "Ночная себестоимость, руб. YOY",
        value: COLUMN_KEY.COST_PRICE_NIGHT_YOY,
        tooltip:
          "Изменение себестоимости по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.COST_PRICE_NIGHT_YOY_PERCENT,
        label: "Ночная себестоимость, руб. YoY %",
        value: COLUMN_KEY.COST_PRICE_NIGHT_YOY_PERCENT,
        tooltip:
          "Процентное изменение себестоимости относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_DISCOUNT_DAY,
    label: "Дневная скидка, руб.",
    value: COLUMN_KEY.GROUP_DISCOUNT_DAY,
    icon: Tags,
    children: [
      {
        id: COLUMN_KEY.DISCOUNT_DAY,
        label: "Дневная скидка, руб.",
        value: COLUMN_KEY.DISCOUNT_DAY,
        tooltip:
          "Общая сумма предоставленных скидок в рублях за выбранный период",
      },
      {
        id: COLUMN_KEY.DISCOUNT_DAY_LM,
        label: "Дневная скидка, руб. PM",
        value: COLUMN_KEY.DISCOUNT_DAY_LM,
        tooltip:
          "Сумма скидок за предыдущий месяц для анализа скидочной политики",
      },
      {
        id: COLUMN_KEY.DISCOUNT_DAY_MOM,
        label: "Дневная скидка, руб. MoM",
        value: COLUMN_KEY.DISCOUNT_DAY_MOM,
        tooltip: "Изменение суммы скидок по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.DISCOUNT_DAY_MOM_PERCENT,
        label: "Дневная скидка, руб. MoM %",
        value: COLUMN_KEY.DISCOUNT_DAY_MOM_PERCENT,
        tooltip:
          "Процентное изменение суммы скидок относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.DISCOUNT_DAY_LY,
        label: "Дневная скидка, руб. PY",
        value: COLUMN_KEY.DISCOUNT_DAY_LY,
        tooltip: "Сумма скидок за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.DISCOUNT_DAY_YOY,
        label: "Дневная скидка, руб. YoY",
        value: COLUMN_KEY.DISCOUNT_DAY_YOY,
        tooltip:
          "Изменение суммы скидок по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.DISCOUNT_DAY_YOY_PERCENT,
        label: "Дневная скидка, руб. YoY%",
        value: COLUMN_KEY.DISCOUNT_DAY_YOY_PERCENT,
        tooltip:
          "Процентное изменение суммы скидок относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_DISCOUNT_NIGHT,
    label: "Ночная скидка, руб.",
    value: COLUMN_KEY.GROUP_DISCOUNT_NIGHT,
    icon: Tags,
    children: [
      {
        id: COLUMN_KEY.DISCOUNT_NIGHT,
        label: "Ночная скидка, руб.",
        value: COLUMN_KEY.DISCOUNT_NIGHT,
        tooltip:
          "Общая сумма предоставленных скидок в рублях за выбранный период",
      },
      {
        id: COLUMN_KEY.DISCOUNT_NIGHT_LM,
        label: "Ночная скидка, руб. PM",
        value: COLUMN_KEY.DISCOUNT_NIGHT_LM,
        tooltip:
          "Сумма скидок за предыдущий месяц для анализа скидочной политики",
      },
      {
        id: COLUMN_KEY.DISCOUNT_NIGHT_MOM,
        label: "Ночная скидка, руб. MoM",
        value: COLUMN_KEY.DISCOUNT_NIGHT_MOM,
        tooltip: "Изменение суммы скидок по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.DISCOUNT_NIGHT_MOM_PERCENT,
        label: "Ночная скидка, руб. MoM %",
        value: COLUMN_KEY.DISCOUNT_NIGHT_MOM_PERCENT,
        tooltip:
          "Процентное изменение суммы скидок относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.DISCOUNT_NIGHT_LY,
        label: "Ночная скидка, руб. PY",
        value: COLUMN_KEY.DISCOUNT_NIGHT_LY,
        tooltip: "Сумма скидок за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.DISCOUNT_NIGHT_YOY,
        label: "Ночная скидка, руб. YoY",
        value: COLUMN_KEY.DISCOUNT_NIGHT_YOY,
        tooltip:
          "Изменение суммы скидок по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.DISCOUNT_NIGHT_YOY_PERCENT,
        label: "Ночная скидка, руб. YoY%",
        value: COLUMN_KEY.DISCOUNT_NIGHT_YOY_PERCENT,
        tooltip:
          "Процентное изменение суммы скидок относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_DISCOUNT_PERCENT_DAY,
    label: "Дневная скидка %",
    value: COLUMN_KEY.GROUP_DISCOUNT_PERCENT_DAY,
    icon: TicketPercent,
    children: [
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_DAY,
        label: "Дневная скидка %",
        value: COLUMN_KEY.DISCOUNT_PERCENT_DAY,
        tooltip: "Средний процент скидки от общей стоимости покупок",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_DAY_LM,
        label: "Дневная скидка % PM",
        value: COLUMN_KEY.DISCOUNT_PERCENT_DAY_LM,
        tooltip: "Средний процент скидки за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_DAY_MOM_PERCENT,
        label: "Дневная скидка % MoM",
        value: COLUMN_KEY.DISCOUNT_PERCENT_DAY_MOM_PERCENT,
        tooltip: "Изменение процента скидки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_DAY_LY,
        label: "Дневная скидка %  PY",
        value: COLUMN_KEY.DISCOUNT_PERCENT_DAY_LY,
        tooltip: "Средний процент скидки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_DAY_YOY_PERCENT,
        label: "Дневная скидка % YoY",
        value: COLUMN_KEY.DISCOUNT_PERCENT_DAY_YOY_PERCENT,
        tooltip:
          "Изменение процента скидки относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_DISCOUNT_PERCENT_NIGHT,
    label: "Ночная скидка %",
    value: COLUMN_KEY.GROUP_DISCOUNT_PERCENT_NIGHT,
    icon: TicketPercent,
    children: [
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT,
        label: "Ночная скидка %",
        value: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT,
        tooltip: "Средний процент скидки от общей стоимости покупок",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_LM,
        label: "Ночная скидка % PM",
        value: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_LM,
        tooltip: "Средний процент скидки за предыдущий месяц",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_MOM_PERCENT,
        label: "Ночная скидка % MoM",
        value: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_MOM_PERCENT,
        tooltip: "Изменение процента скидки по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_LY,
        label: "Ночная скидка %  PY",
        value: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_LY,
        tooltip: "Средний процент скидки за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_YOY_PERCENT,
        label: "Ночная скидка % YoY",
        value: COLUMN_KEY.DISCOUNT_PERCENT_NIGHT_YOY_PERCENT,
        tooltip:
          "Изменение процента скидки относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_COUNT_SALES_DAY,
    label: "Дневное кол. продаж",
    value: COLUMN_KEY.GROUP_COUNT_SALES_DAY,
    icon: ShoppingCart,
    children: [
      {
        id: COLUMN_KEY.COUNT_SALES_DAY,
        label: "Дневное кол. продаж",
        value: COLUMN_KEY.COUNT_SALES_DAY,
        tooltip: "Общее количество проданных единиц товара за выбранный период",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_DAY_LM,
        label: "Дневное кол. продаж PM",
        value: COLUMN_KEY.COUNT_SALES_DAY_LM,
        tooltip:
          "Количество продаж за предыдущий месяц для сравнения активности",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_DAY_MOM,
        label: "Кол. Продаж MoM",
        value: COLUMN_KEY.COUNT_SALES_DAY_MOM,
        tooltip:
          "Изменение количества продаж по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_DAY_MOM_PERCENT,
        label: "Дневное кол. продаж MoM%",
        value: COLUMN_KEY.COUNT_SALES_DAY_MOM_PERCENT,
        tooltip:
          "Процентное изменение количества продаж относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_DAY_LY,
        label: "Дневное кол. продаж PY",
        value: COLUMN_KEY.COUNT_SALES_DAY_LY,
        tooltip: "Количество продаж за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_DAY_YOY,
        label: "Дневное кол. продаж YoY",
        value: COLUMN_KEY.COUNT_SALES_DAY_YOY,
        tooltip:
          "Изменение количества продаж по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_DAY_YOY_PERCENT,
        label: "Дневное кол. продаж YoY%",
        value: COLUMN_KEY.COUNT_SALES_DAY_YOY_PERCENT,
        tooltip:
          "Процентное изменение количества продаж относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_COUNT_SALES_NIGHT,
    label: "Ночное кол. продаж",
    value: COLUMN_KEY.GROUP_COUNT_SALES_NIGHT,
    icon: ShoppingCart,
    children: [
      {
        id: COLUMN_KEY.COUNT_SALES_NIGHT,
        label: "Ночное кол. продаж",
        value: COLUMN_KEY.COUNT_SALES_NIGHT,
        tooltip: "Общее количество проданных единиц товара за выбранный период",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_NIGHT_LM,
        label: "Ночное кол. продаж PM",
        value: COLUMN_KEY.COUNT_SALES_NIGHT_LM,
        tooltip:
          "Количество продаж за предыдущий месяц для сравнения активности",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_NIGHT_MOM,
        label: "Кол. Продаж MoM",
        value: COLUMN_KEY.COUNT_SALES_NIGHT_MOM,
        tooltip:
          "Изменение количества продаж по сравнению с предыдущим месяцем",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_NIGHT_MOM_PERCENT,
        label: "Ночное кол. продаж MoM%",
        value: COLUMN_KEY.COUNT_SALES_NIGHT_MOM_PERCENT,
        tooltip:
          "Процентное изменение количества продаж относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_NIGHT_LY,
        label: "Ночное кол. продаж PY",
        value: COLUMN_KEY.COUNT_SALES_NIGHT_LY,
        tooltip: "Количество продаж за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_NIGHT_YOY,
        label: "Ночное кол. продаж YoY",
        value: COLUMN_KEY.COUNT_SALES_NIGHT_YOY,
        tooltip:
          "Изменение количества продаж по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.COUNT_SALES_NIGHT_YOY_PERCENT,
        label: "Ночное кол. продаж YoY%",
        value: COLUMN_KEY.COUNT_SALES_NIGHT_YOY_PERCENT,
        tooltip:
          "Процентное изменение количества продаж относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_AVG_CHECK_DAY,
    label: "Дневной средний чек",
    value: COLUMN_KEY.GROUP_AVG_CHECK_DAY,
    icon: Receipt,
    children: [
      {
        id: COLUMN_KEY.AVG_CHECK_DAY,
        label: "Дневной ср. чек",
        value: COLUMN_KEY.AVG_CHECK_DAY,
        tooltip:
          "Средняя сумма одной покупки. Рассчитывается как выручка, деленная на количество чеков",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_DAY_LM,
        label: "Дневной ср. Чек PM",
        value: COLUMN_KEY.AVG_CHECK_DAY_LM,
        tooltip:
          "Средний чек за предыдущий месяц для анализа покупательского поведения",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_DAY_MOM,
        label: "Дневной ср. Чек MoM",
        value: COLUMN_KEY.AVG_CHECK_DAY_MOM,
        tooltip:
          "Изменение среднего чека по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_DAY_MOM_PERCENT,
        label: "Дневной ср. Чек MoM %",
        value: COLUMN_KEY.AVG_CHECK_DAY_MOM_PERCENT,
        tooltip:
          "Процентное изменение среднего чека относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_DAY_LY,
        label: "Дневной ср. Чек  PY",
        value: COLUMN_KEY.AVG_CHECK_DAY_LY,
        tooltip: "Средний чек за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_DAY_YOY,
        label: "Дневной ср. Чек YoY",
        value: COLUMN_KEY.AVG_CHECK_DAY_YOY,
        tooltip:
          "Изменение среднего чека по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_DAY_YOY_PERCENT,
        label: "Дневной ср. Чек YoY %",
        value: COLUMN_KEY.AVG_CHECK_DAY_YOY_PERCENT,
        tooltip:
          "Процентное изменение среднего чека относительно аналогичного периода прошлого года",
      },
    ],
  },
  {
    id: COLUMN_KEY.GROUP_AVG_CHECK_NIGHT,
    label: "Ночной средний чек",
    value: COLUMN_KEY.GROUP_AVG_CHECK_NIGHT,
    icon: Receipt,
    children: [
      {
        id: COLUMN_KEY.AVG_CHECK_NIGHT,
        label: "Ночной ср. чек",
        value: COLUMN_KEY.AVG_CHECK_NIGHT,
        tooltip:
          "Средняя сумма одной покупки. Рассчитывается как выручка, деленная на количество чеков",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_NIGHT_LM,
        label: "Ночной ср. Чек PM",
        value: COLUMN_KEY.AVG_CHECK_NIGHT_LM,
        tooltip:
          "Средний чек за предыдущий месяц для анализа покупательского поведения",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_NIGHT_MOM,
        label: "Ночной ср. Чек MoM",
        value: COLUMN_KEY.AVG_CHECK_NIGHT_MOM,
        tooltip:
          "Изменение среднего чека по сравнению с предыдущим месяцем в рублях",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_NIGHT_MOM_PERCENT,
        label: "Ночной ср. Чек MoM %",
        value: COLUMN_KEY.AVG_CHECK_NIGHT_MOM_PERCENT,
        tooltip:
          "Процентное изменение среднего чека относительно предыдущего месяца",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_NIGHT_LY,
        label: "Ночной ср. Чек  PY",
        value: COLUMN_KEY.AVG_CHECK_NIGHT_LY,
        tooltip: "Средний чек за аналогичный период прошлого года",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_NIGHT_YOY,
        label: "Ночной ср. Чек YoY",
        value: COLUMN_KEY.AVG_CHECK_NIGHT_YOY,
        tooltip:
          "Изменение среднего чека по сравнению с аналогичным периодом прошлого года",
      },
      {
        id: COLUMN_KEY.AVG_CHECK_NIGHT_YOY_PERCENT,
        label: "Ночной ср. Чек YoY %",
        value: COLUMN_KEY.AVG_CHECK_NIGHT_YOY_PERCENT,
        tooltip:
          "Процентное изменение среднего чека относительно аналогичного периода прошлого года",
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
  const { nightShops } = useFiltersStore();
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
  if (type === "check" && nightShops) {
    return indicators_night_shops;
  }
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
