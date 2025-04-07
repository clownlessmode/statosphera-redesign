import { Button } from "@shared/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";

import { Form } from "@shared/ui/form";
import { Label } from "@shared/ui/label";

import { Calendar, Eraser, MapPin, ShoppingBasket, Store } from "lucide-react";

import { FC } from "react";
import { useForm } from "react-hook-form";
const days = [
  {
    label: "Год",
    value: "year",
  },
  {
    label: "Квартал",
    value: "kvartal",
  },
  {
    label: "Месяц",
    value: "mouth",
  },
  {
    label: "Неделя",
    value: "nedelya",
  },
  {
    label: "День",
    value: "day",
  },
];

const geo = [
  {
    label: "Город",
    value: "city",
  },
  {
    label: "Регион",
    value: "region",
  },
];
const shop = [
  {
    label: "Cтруктура продаж",
    value: "prodajstrukt",
  },
  {
    label: "Стуктурное подразделение",
    value: "podrajstrukt",
  },
];
const product = [
  {
    label: "Cтруктура продаж",
    value: "prodajstrukt",
  },
  {
    label: "Стуктурное подразделение",
    value: "podrajstrukt",
  },
  {
    label: "Группа",
    value: "group",
  },
  {
    label: "Команда",
    value: "team",
  },
  {
    label: "Подгруппа",
    value: "subgroup",
  },
  {
    label: "Направление",
    value: "naprav",
  },
  {
    label: "Подподгруппа",
    value: "subsubgroup",
  },
  {
    label: "Поставщик",
    value: "sender",
  },
  {
    label: "Номенклатура",
    value: "nomen",
  },
  {
    label: "Сезон",
    value: "season",
  },
  {
    label: "Менеджер автозаказа",
    value: "avtomeneger",
  },
  {
    label: "Справочник экономиста",
    value: "spr",
  },
];
const Grouping: FC = () => {
  const form = useForm();
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Группировка</CardTitle>
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
        <Form {...form}>
          <form
            className="flex flex-col gap-4 w-full"
            // onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-col gap-3">
              <Label>
                <Calendar /> Дата
              </Label>
              <CheckboxCards options={days} />
            </div>
            <div className="flex flex-col gap-3">
              <Label>
                <MapPin /> Местоположение
              </Label>
              <CheckboxCards options={geo} />
            </div>
            <div className="flex flex-col gap-3">
              <Label>
                <Store /> Магазин
              </Label>
              <CheckboxCards options={shop} />
            </div>
            <div className="flex flex-col gap-3">
              <Label>
                <ShoppingBasket /> Продукт
              </Label>
              <CheckboxCards options={product} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Grouping;
