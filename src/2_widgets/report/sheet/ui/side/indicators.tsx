import { COLUMN_KEYS } from "@shared/constants/column-keys";
import { Button } from "@shared/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { CheckboxTree } from "@shared/ui/checkbox-tree";
import {
  ArrowUpRight,
  DollarSign,
  Eraser,
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

import { FC } from "react";

export const useIndicatorList = () => {
  return [
    {
      id: COLUMN_KEYS.GROUP_PROCEEDS,
      name: "Выручка",
      icon: DollarSign,

      children: [
        { id: COLUMN_KEYS.PROCEEDS, name: "Выручка" },
        { id: COLUMN_KEYS.PROCEEDS_LM, name: "Выручка PM" },
        { id: COLUMN_KEYS.PROCEEDS_MOM, name: "Выручка MOM" },
        { id: COLUMN_KEYS.PROCEEDS_MOM_PERCENT, name: "Выручка MOM%" },
        { id: COLUMN_KEYS.PROCEEDS_LY, name: "Выручка PY" },
        { id: COLUMN_KEYS.PROCEEDS_YOY, name: "Выручка YOY" },
        { id: COLUMN_KEYS.PROCEEDS_YOY_PERCENT, name: "Выручка YOY%" },
      ],
    },
    {
      id: "writeOffGroup",
      name: "Списания, руб",
      icon: MinusCircle,
      children: [
        { id: COLUMN_KEYS.WRITE_OFF, name: "Списания, руб." },
        { id: COLUMN_KEYS.WRITE_OFF_LM, name: "Списания, руб. PM" },
        { id: COLUMN_KEYS.WRITE_OFF_MOM, name: "Списания, руб. MOM" },
        { id: COLUMN_KEYS.WRITE_OFF_MOM_PERCENT, name: "Списания, руб. MOM%" },
        { id: COLUMN_KEYS.WRITE_OFF_LY, name: "Списания, руб. PY" },
        { id: COLUMN_KEYS.WRITE_OFF_YOY, name: "Списания, руб. YOY" },
        { id: COLUMN_KEYS.WRITE_OFF_YOY_PERCENT, name: "Списания, руб. YOY%" },
      ],
    },
    {
      id: "writeOffPercentGroup",
      name: "Списания %",
      icon: Percent,
      children: [
        { id: COLUMN_KEYS.WRITE_OFF_PERCENT, name: "Списания %" },
        { id: COLUMN_KEYS.WRITE_OFF_PERCENT_LM, name: "Списания % PM" },
        {
          id: COLUMN_KEYS.WRITE_OFF_PERCENT_MOM_PERCENT,
          name: "Списания % MoM",
        },
        { id: COLUMN_KEYS.WRITE_OFF_PERCENT_LY, name: "Списания % PY" },
        {
          id: COLUMN_KEYS.CUMULATIVE_WRITE_OFF_PERCENT_YOY,
          name: "Списания % YoY",
        },
        {
          id: COLUMN_KEYS.WRITE_OFF_PERCENT_YOY_PERCENT,
          name: "Списания, руб. YOY%",
        },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_PROFIT,
      name: "Наценка, руб.",
      icon: ArrowUpRight,
      children: [
        { id: COLUMN_KEYS.PROFIT, name: "Наценка, руб." },
        { id: COLUMN_KEYS.PROFIT_LM, name: "Наценка, руб. PM" },
        { id: COLUMN_KEYS.PROFIT_MOM, name: "Наценка, руб. MoM" },
        { id: COLUMN_KEYS.PROFIT_MOM_PERCENT, name: "Наценка, руб. MoM %" },
        { id: COLUMN_KEYS.PROFIT_LY, name: "Наценка, руб. PY" },
        { id: COLUMN_KEYS.PROFIT_YOY, name: "Наценка, руб. YoY" },
        { id: COLUMN_KEYS.PROFIT_YOY_PERCENT, name: "Наценка, руб. YoY %" },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_PROFIT_PERCENT,
      name: "Наценка, %",
      icon: Tag,
      children: [
        { id: COLUMN_KEYS.MARKUP_PERCENT, name: "Наценка %" },
        { id: COLUMN_KEYS.MARKUP_PERCENT_LM, name: "Наценка % PM" },
        { id: COLUMN_KEYS.MARKUP_PERCENT_MOM_PERCENT, name: "Наценка % MoM" },
        { id: COLUMN_KEYS.MARKUP_PERCENT_LY, name: "Наценка % PY" },
        { id: COLUMN_KEYS.MARKUP_PERCENT_YOY_PERCENT, name: "Наценка % YoY" },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_COST_PRICE,
      name: "Себестоимость",
      icon: ShoppingBag,
      children: [
        { id: COLUMN_KEYS.COST_PRICE, name: "Себестоимость" },
        { id: COLUMN_KEYS.COST_PRICE_LM, name: "Себестоимость PM" },
        { id: COLUMN_KEYS.COST_PRICE_MOM, name: "Себестоимость MOM" },
        { id: COLUMN_KEYS.COST_PRICE_MOM_PERCENT, name: "Себестоимость MOM%" },
        { id: COLUMN_KEYS.COST_PRICE_LY, name: "Себестоимость PY" },
        { id: COLUMN_KEYS.COST_PRICE_YOY, name: "Себестоимость YOY" },
        { id: COLUMN_KEYS.COST_PRICE_YOY_PERCENT, name: "Себестоимость YoY %" },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_DISCOUNT,
      name: "Скидки, руб.",
      icon: Tags,
      children: [
        { id: COLUMN_KEYS.DISCOUNT, name: "Скидка, руб." },
        { id: COLUMN_KEYS.DISCOUNT_LM, name: "Скидки, руб. PM" },
        { id: COLUMN_KEYS.DISCOUNT_MOM, name: "Скидки, руб. MoM" },
        { id: COLUMN_KEYS.DISCOUNT_MOM_PERCENT, name: "Скидки, руб. MoM %" },
        { id: COLUMN_KEYS.DISCOUNT_LY, name: "Скидки, руб. PY" },
        { id: COLUMN_KEYS.DISCOUNT_YOY, name: "Скидки, руб. YoY" },
        { id: COLUMN_KEYS.DISCOUNT_YOY_PERCENT, name: "Скидки, руб. YoY%%" },
      ],
    },
    {
      id: COLUMN_KEYS.GROUP_DISCOUNT_PERCENT,
      name: "Скидка %",
      icon: TicketPercent,
      children: [
        { id: COLUMN_KEYS.DISCOUNT_PERCENT, name: "Скидка %" },
        { id: COLUMN_KEYS.DISCOUNT_PERCENT_LM, name: "Скидки % PM" },
        { id: COLUMN_KEYS.DISCOUNT_PERCENT_MOM_PERCENT, name: "Скидки % MoM" },
        { id: COLUMN_KEYS.DISCOUNT_PERCENT_LY, name: "Скидки %  PY" },
        { id: COLUMN_KEYS.DISCOUNT_PERCENT_YOY_PERCENT, name: "Скидки % YoY" },
      ],
    },
    {
      id: "marginGroup",
      name: "Маржа %",
      icon: TrendingUp,
      children: [
        { id: COLUMN_KEYS.MARGIN_PERCENT, name: "Маржа %" },
        { id: COLUMN_KEYS.MARGIN_PERCENT_LM, name: "Маржа % PM" },
        { id: COLUMN_KEYS.MARGIN_PERCENT_MOM_PERCENT, name: "Маржа % MoM" },
        { id: COLUMN_KEYS.MARGIN_PERCENT_LY, name: "Маржа % PY" },
        { id: COLUMN_KEYS.MARGIN_PERCENT_YOY_PERCENT, name: "Маржа % YoY" },
      ],
    },
    {
      id: "salesUniqueGroup",
      name: "Кол. Продаж",
      icon: ShoppingCart,
      children: [
        { id: COLUMN_KEYS.SALES, name: "Кол. Продаж" },
        { id: COLUMN_KEYS.SALES_LM, name: "Кол. Продаж PM" },
        { id: COLUMN_KEYS.SALES_MOM, name: "Кол. Продаж MoM" },
        { id: COLUMN_KEYS.SALES_MOM_PERCENT, name: "Кол. Продаж MoM%" },
        { id: COLUMN_KEYS.SALES_LY, name: "Кол. Продаж PY" },
        { id: COLUMN_KEYS.SALES_YOY, name: "Кол. Продаж YoY" },
        { id: COLUMN_KEYS.SALES_YOY_PERCENT, name: "Кол. Продаж YoY%" },
      ],
    },
    {
      id: "avgCheckGroup",
      name: "Средний чек",
      icon: Receipt,
      children: [
        { id: COLUMN_KEYS.AVG_CHECK, name: "Ср. чек" },
        { id: COLUMN_KEYS.AVG_CHECK_LM, name: "Ср. Чек PM" },
        { id: COLUMN_KEYS.AVG_CHECK_MOM, name: "Ср. Чек MoM" },
        { id: COLUMN_KEYS.AVG_CHECK_MOM_PERCENT, name: "Ср. Чек MoM %" },
        { id: COLUMN_KEYS.AVG_CHECK_LY, name: "Ср. Чек  PY" },
        { id: COLUMN_KEYS.AVG_CHECK_YOY, name: "Ср. Чек YoY" },
        { id: COLUMN_KEYS.AVG_CHECK_YOY_PERCENT, name: "Ср. Чек YoY %" },
      ],
    },
    {
      id: "bonusGroup",
      name: "Бонус",
      icon: Gift,

      children: [
        { id: COLUMN_KEYS.BONUS, name: "Бонус" },
        { id: COLUMN_KEYS.BONUS_LM, name: "Бонус PM" },
        { id: COLUMN_KEYS.BONUS_MOM, name: "Бонус MoM" },
        { id: COLUMN_KEYS.BONUS_MOM_PERCENT, name: "Бонус MoM %" },
        { id: COLUMN_KEYS.BONUS_LY, name: "Бонус  PY" },
        { id: COLUMN_KEYS.BONUS_YOY, name: "Бонус YoY" },
        { id: COLUMN_KEYS.BONUS_YOY_PERCENT, name: "Бонус YoY %" },
      ],
    },
    {
      id: "bonusPercentGroup",
      name: "Бонус %",
      icon: PercentCircle,

      children: [
        { id: COLUMN_KEYS.BONUS_PERCENT, name: "Бонус %" },
        { id: COLUMN_KEYS.BONUS_PERCENT_LM, name: "Бонус % PM" },
        { id: COLUMN_KEYS.BONUS_PERCENT_MOM_PERCENT, name: "Бонус % MoM" },
        { id: COLUMN_KEYS.BONUS_PERCENT_LY, name: "Бонус %  PY" },
        { id: COLUMN_KEYS.BONUS_PERCENT_YOY_PERCENT, name: "Бонус % YoY" },
      ],
    },
    {
      id: COLUMN_KEYS.WEIGHT_GROUP,
      name: "Вес",
      icon: Weight,
      children: [
        { id: COLUMN_KEYS.WEIGHT, name: "Вес" },
        { id: COLUMN_KEYS.WEIGHT_LM, name: "Вес PM" },
        { id: COLUMN_KEYS.WEIGHT_MOM, name: "Вес MOM" },
        { id: COLUMN_KEYS.WEIGHT_MOM_PERCENT, name: "Вес MOM%" },
        { id: COLUMN_KEYS.WEIGHT_LY, name: "Вес PY" },
        { id: COLUMN_KEYS.WEIGHT_YOY, name: "Вес YOY" },
        { id: COLUMN_KEYS.WEIGHT_YOY_PERCENT, name: "Вес YOY%" },
      ],
    },
  ];
};

const Indicators: FC = () => {
  const indicators = useIndicatorList();
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
      <CardContent>
        <CheckboxTree data={indicators} />
      </CardContent>
    </Card>
  );
};

export default Indicators;
