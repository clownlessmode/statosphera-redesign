import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";

import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";

import { Calendar, MapPin, ShoppingBasket, Store } from "lucide-react";

import { FC, useEffect } from "react";

import { GROUPINGS, useFiltersStore } from "../../../commerce/model/store";
import useForm from "../model/hook";
import ClearFilters from "@features/clear-filters/ui/clear-filters";
const days = [
  {
    label: "Год",
    value: GROUPINGS.YEAR,
  },
  {
    label: "Квартал",
    value: GROUPINGS.QUARTER,
  },
  {
    label: "Месяц",
    value: GROUPINGS.MONTH,
  },
  {
    label: "Неделя",
    value: GROUPINGS.WEEK,
  },
  {
    label: "День",
    value: GROUPINGS.DAY,
  },
];

const geo = [
  {
    label: "Город",
    value: GROUPINGS.CITY,
  },
  {
    label: "Регион",
    value: GROUPINGS.REGION,
  },
];
const shop = [
  {
    label: "Магазин",
    value: GROUPINGS.STORE,
  },
  {
    label: "Канал",
    value: GROUPINGS.CHANNEL,
  },
  {
    label: "Период деятельности магазина",
    value: GROUPINGS.AGE_GROUP,
  },
  {
    label: "Статус магазина",
    value: GROUPINGS.STORE_CONDITION,
  },
  {
    label: "Юр.лицо",
    value: "legalEntity",
  },
  {
    label: "Партнер",
    value: "nameManager",
  },
];
const product = [
  {
    label: "Cтруктура продаж",
    value: GROUPINGS.GROUP_FRANCHISE,
  },
  {
    label: "Стуктурное подразделение",
    value: GROUPINGS.SUBDIVISION_PRODUCT,
  },
  {
    label: "Группа",
    value: GROUPINGS.GROUP,
  },
  {
    label: "Команда",
    value: GROUPINGS.TEAM_PRODUCT,
  },
  {
    label: "Подгруппа",
    value: GROUPINGS.SUBGROUPS,
  },
  {
    label: "Направление",
    value: GROUPINGS.DIRECTION_PRODUCT,
  },
  {
    label: "Подподгруппа",
    value: GROUPINGS.SUBSUBGROUPS,
  },
  {
    label: "Поставщик",
    value: "typeProducts",
  },
  {
    label: "Номенклатура",
    value: GROUPINGS.PRODUCT,
  },
  {
    label: "Сезон",
    value: GROUPINGS.SEASONALITY_PRODUCT,
  },
  {
    label: "Менеджер автозаказа",
    value: GROUPINGS.MANAGER_AUTO,
  },
  {
    label: "Справочник экономиста",
    value: GROUPINGS.GROUP_ECONOMIST,
  },
];
const Grouping: FC = () => {
  const form = useForm();
  const { updateGroups } = useFiltersStore();
  useEffect(() => {
    const subscription = form.watch((values) => {
      const groups = [
        ...(values.channel || []),
        ...(values.days || []),
        ...(values.geo || []),
        ...(values.product || []),
        ...(values.store || []),
      ].filter((item): item is string => item !== undefined);
      updateGroups(groups);
    });

    return () => subscription.unsubscribe();
  }, [form, updateGroups]);
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Группировка</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Группируйте данные по нужным столбцам
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">
                      <Calendar /> Дата
                    </FormLabel>
                    <CheckboxCards
                      {...field}
                      disableCheck
                      onChange={(values) => {
                        field.onChange(values);
                      }}
                      options={days}
                      className="grid-cols-2"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="geo"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">
                      <MapPin /> Местоположение
                    </FormLabel>
                    <CheckboxCards
                      {...field}
                      disableCheck
                      onChange={(values) => {
                        field.onChange(values);
                      }}
                      options={geo}
                      className="grid-cols-2"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="store"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">
                      <Store /> Магазин
                    </FormLabel>
                    <CheckboxCards
                      {...field}
                      disableCheck
                      onChange={(values) => {
                        field.onChange(values);
                      }}
                      options={shop}
                      className="grid-cols-2"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">
                      <ShoppingBasket /> Продукт
                    </FormLabel>
                    <CheckboxCards
                      {...field}
                      disableCheck
                      onChange={(values) => {
                        field.onChange(values);
                      }}
                      options={product}
                      className="grid-cols-2"
                    />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Grouping;
