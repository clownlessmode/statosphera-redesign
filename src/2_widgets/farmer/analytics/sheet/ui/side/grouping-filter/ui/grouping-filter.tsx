import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import { Calendar, MapPin, ShoppingBasket } from "lucide-react";

import { FC, useEffect, useMemo } from "react";

import { useTabStore } from "@widgets/farmer/analytics/sheet/model/url-store";
import { DAYS, GEO, PRODUCT } from "../config";
import {
  GROUPINGS,
  useFiltersStore,
} from "@widgets/farmer/analytics/sheet/model/filters-store";
import { useForm } from "../model";
import ClearFilters from "./clear-filter";
import { useTypeCheckStore } from "../model/hooks/use-type-checked";

const GroupingFilter: FC = () => {
  const { tab } = useTabStore();
  const displayedDays = useMemo(() => {
    const baseDays = [...DAYS];
    if (tab === "check" && !baseDays.some((d) => d.value === GROUPINGS.HOUR)) {
      baseDays.push({ label: "Час", value: GROUPINGS.HOUR });
    }
    return baseDays;
  }, [tab]);

  const form = useForm({ tab, daysOptions: displayedDays });

  const { updateGroups } = useFiltersStore();
  const { setIsTypeCheckSelected } = useTypeCheckStore();

  useEffect(() => {
    const subscription = form.watch((values) => {
      const groups = [
        ...(values.days || []),
        ...(values.geo || []),
        ...(values.product || []),
      ].filter((item): item is string => item !== undefined);

      updateGroups(groups);

      // Проверка: выбрана ли группировка "тип скидки"
      setIsTypeCheckSelected(groups.includes(GROUPINGS.DISCOUNT_TYPE));
    });
    return () => subscription.unsubscribe();
  }, [form, updateGroups, setIsTypeCheckSelected]);

  const filterFields = useMemo(
    () =>
      [
        {
          name: "days",
          label: "Дата",
          icon: <Calendar />,
          options: displayedDays,
          visible: true,
        },
        {
          name: "geo",
          label: "Местоположение",
          icon: <MapPin />,
          options: GEO,
          visible: true,
        },
        {
          name: "product",
          label: "Продукт",
          icon: <ShoppingBasket />,
          options: PRODUCT,
          visible: true,
        },
      ] as const,
    [tab],
  );

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
            {filterFields.map(
              ({ name, label, icon, options, visible }) =>
                visible && (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {icon} {label}
                        </FormLabel>
                        <CheckboxCards
                          {...field}
                          disableCheck
                          onChange={field.onChange}
                          options={options}
                          className={"grid-cols-2"}
                        />
                      </FormItem>
                    )}
                  />
                ),
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GroupingFilter;
