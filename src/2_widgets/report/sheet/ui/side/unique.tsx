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
  ShoppingBag,
  Share2,
  Map,
  Landmark,
  CreditCard,
  Receipt,
} from "lucide-react";
import { Eraser } from "lucide-react";

import { FC } from "react";
export const useUniqueValues = () => {
  // const mode = useMode((s) => s.mode);

  return [
    {
      id: "storeUniqueGroup",
      name: "Магазины",
      icon: ShoppingBag, // lucide-react иконка для магазинов
      children: [
        { id: COLUMN_KEYS.UNIQUE_STORE, name: "Магазины" },
        { id: COLUMN_KEYS.UNIQUE_STORE_LM, name: "Магазины PM" },
        { id: COLUMN_KEYS.UNIQUE_STORE_LY, name: "Магазины PY" },
      ],
    },
    {
      id: "channelUniqueGroup",
      name: "Каналы",
      icon: Share2, // lucide-react иконка для каналов
      children: [
        { id: COLUMN_KEYS.UNIQUE_CHANNEL, name: "Каналы" },
        { id: COLUMN_KEYS.UNIQUE_CHANNEL_LM, name: "Каналы PM" },
        { id: COLUMN_KEYS.UNIQUE_CHANNEL_LY, name: "Каналы PY" },
      ],
    },
    {
      id: "regionUniqueGroup",
      name: "Регионы",
      icon: Map, // lucide-react иконка для регионов
      children: [
        { id: COLUMN_KEYS.UNIQUE_REGION, name: "Регионы" },
        { id: COLUMN_KEYS.UNIQUE_REGION_LM, name: "Регионы PM" },
        { id: COLUMN_KEYS.UNIQUE_REGION_LY, name: "Регионы PY" },
      ],
    },
    {
      id: "cityUniqueGroup",
      name: "Города",
      icon: Landmark, // lucide-react иконка для городов
      children: [
        { id: COLUMN_KEYS.UNIQUE_CITY, name: "Города" },
        { id: COLUMN_KEYS.UNIQUE_CITY_LM, name: "Города PM" },
        { id: COLUMN_KEYS.UNIQUE_CITY_LY, name: "Города PY" },
      ],
    },
    {
      id: "cardNumberUniqueGroup",
      name: "Номера карт",
      icon: CreditCard, // lucide-react иконка для карт
      children: [
        { id: COLUMN_KEYS.UNIQUE_CARD_NUMBER, name: "Номера карт" },
        { id: COLUMN_KEYS.UNIQUE_CARD_NUMBER_LM, name: "Номера карт PM" },
        { id: COLUMN_KEYS.UNIQUE_CARD_NUMBER_LY, name: "Номера карт PY" },
      ],
    },
    {
      id: "checkUniqueGroup",
      name: "Чек",
      icon: Receipt, // lucide-react иконка для чеков
      children: [
        { id: COLUMN_KEYS.UNIQUE_CHECK, name: "Чек" },
        { id: COLUMN_KEYS.UNIQUE_CHECK_LM, name: "Чек PM" },
        { id: COLUMN_KEYS.UNIQUE_CHECK_LY, name: "Чек PY" },
      ],
    },
  ];
};
const Unique: FC = () => {
  const uniques = useUniqueValues();
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Уникальные значения</CardTitle>
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
        <CheckboxTree data={uniques} />
      </CardContent>
    </Card>
  );
};

export default Unique;
