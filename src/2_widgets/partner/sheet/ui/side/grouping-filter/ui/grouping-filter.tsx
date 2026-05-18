import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import { Calendar, ShoppingBasket, Store } from "lucide-react";
import { FC, useEffect, useMemo } from "react";

import { PARTNER_DAYS, PARTNER_PRODUCT, PARTNER_STORE } from "../config";
import { usePartnerFiltersStore } from "@pages/partner/model/filters-store";
import type { PartnerTableGroup } from "@pages/partner/api/types";
import { useForm } from "../model";
import ClearFilters from "./clear-filter";
import { Option } from "@shared/ui/multiple-selector";

const GroupingFilter: FC = () => {
  const form = useForm();
  const { setGroup } = usePartnerFiltersStore();

  useEffect(() => {
    const subscription = form.watch((values) => {
      const groups = [
        ...(values.days || []),
        ...(values.store || []),
        ...(values.product || []),
      ].filter((item): item is string => item !== undefined);

      const current = usePartnerFiltersStore.getState().group;
      const same =
        groups.length === current.length &&
        groups.every((v, i) => v === current[i]);

      if (!same) {
        setGroup(groups as PartnerTableGroup[]);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, setGroup]);

  const filterFields = useMemo(
    () =>
      [
        {
          name: "days" as const,
          label: "Дата",
          icon: <Calendar className="size-4" />,
          options: [...PARTNER_DAYS],
        },
        {
          name: "store" as const,
          label: "Магазин",
          icon: <Store className="size-4" />,
          options: [...PARTNER_STORE],
        },
        {
          name: "product" as const,
          label: "Продукт",
          icon: <ShoppingBasket className="size-4" />,
          options: [...PARTNER_PRODUCT],
        },
      ] as const,
    [],
  );

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Группировка</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Группируйте строки таблицы по нужным измерениям
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            {filterFields.map(({ name, label, icon, options }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      {icon}
                      {label}
                    </FormLabel>
                    <CheckboxCards
                      {...field}
                      disableCheck
                      onChange={field.onChange}
                      options={options as Option[]}
                      className="grid-cols-2"
                    />
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GroupingFilter;
