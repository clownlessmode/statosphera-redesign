import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import {
  BadgeCheck,
  Calendar,
  Globe,
  MapPin,
  Receipt,
  ShoppingBasket,
  Store,
  User,
} from "lucide-react";

import { FC, useEffect, useMemo } from "react";

import { useTabStore } from "@widgets/report/sheet/model/url-store";
import {
  DAYS,
  GEO,
  ID,
  LOYAL,
  ONLINE,
  PERSONAL,
  PRODUCT,
  SHOP,
} from "../config";
import {
  GROUPINGS,
  useFiltersStore,
} from "@widgets/report/sheet/model/filters-store";
import { useForm } from "../model";
import ClearFilters from "./clear-filter";

const GroupingFilter: FC = () => {
  const { tab } = useTabStore();
  const form = useForm();
  const { updateGroups } = useFiltersStore();
  const groups = useFiltersStore((s) => s.groups);
  const displayedDays = useMemo(() => {
    const baseDays = [...DAYS];
    if (tab === "check" && !baseDays.some((d) => d.value === GROUPINGS.HOUR)) {
      baseDays.push({ label: "Час", value: GROUPINGS.HOUR });
    }
    return baseDays;
  }, [tab]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const groups = [
        ...(values.channel || []),
        ...(values.days || []),
        ...(values.geo || []),
        ...(values.product || []),
        ...(values.store || []),
        ...(values.loyal || []),
        ...(values.personal || []),
        ...(values.online || []),
        ...(values.id || []),
      ].filter((item): item is string => item !== undefined);
      updateGroups(groups);
    });
    return () => subscription.unsubscribe();
  }, [form, updateGroups]);
  console.log(groups);
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
          name: "store",
          label: "Магазин",
          icon: <Store />,
          options: SHOP,
          visible: true,
        },
        {
          name: "product",
          label: "Продукт",
          icon: <ShoppingBasket />,
          options: PRODUCT,
          visible: true,
        },
        {
          name: "loyal",
          label: "Лояльность",
          icon: <BadgeCheck />,
          options: LOYAL,
          visible: tab === "check",
        },
        {
          name: "personal",
          label: "Персонал",
          icon: <User />,
          options: PERSONAL,
          visible: tab === "check",
        },
        {
          name: "online",
          label: "Интернет магазин",
          icon: <Globe />,
          options: ONLINE,
          visible: tab === "check",
        },
        {
          name: "id",
          label: "Чек",
          icon: <Receipt />,
          options: ID,
          className: "grid-cols-3",
          visible: tab === "check",
        },
      ] as const,
    [tab, displayedDays]
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
                )
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GroupingFilter;
