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
  Fingerprint,
  Globe,
  MapPin,
  ShoppingBasket,
  Store,
  User,
} from "lucide-react";

import { FC, useEffect, useMemo } from "react";

import { GROUPINGS, useFiltersStore } from "../../../../model/filters-store";
import useForm from "../model/hook";
import ClearFilters from "@features/clear-filters/ui/clear-filters";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import {
  days,
  geo,
  shop,
  product,
  loyal,
  personal,
  online,
  id,
} from "../model/mock";

const Grouping: FC = () => {
  const { tab } = useTabStore();

  const displayedDays = useMemo(() => {
    const baseDays = [...days];
    if (tab === "check") {
      if (!baseDays.some((day) => day.value === GROUPINGS.HOUR)) {
        baseDays.push({
          label: "Час",
          value: GROUPINGS.HOUR,
        });
      }
    }
    return baseDays;
  }, [tab]);

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
        ...(values.loyal || []),
        ...(values.personal || []),
        ...(values.online || []),
        ...(values.id || []),
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
                      options={displayedDays}
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
            {tab === "check" && (
              <>
                <FormField
                  control={form.control}
                  name="loyal"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="">
                          <BadgeCheck /> Лояльность
                        </FormLabel>
                        <CheckboxCards
                          {...field}
                          disableCheck
                          onChange={(values) => {
                            field.onChange(values);
                          }}
                          options={loyal}
                          className="grid-cols-2"
                        />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="personal"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="">
                          <User /> Персонал
                        </FormLabel>
                        <CheckboxCards
                          {...field}
                          disableCheck
                          onChange={(values) => {
                            field.onChange(values);
                          }}
                          options={personal}
                          className="grid-cols-2"
                        />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="online"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="">
                          <Globe /> Интернет магазин
                        </FormLabel>
                        <CheckboxCards
                          {...field}
                          disableCheck
                          onChange={(values) => {
                            field.onChange(values);
                          }}
                          options={online}
                          className="grid-cols-2"
                        />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="">
                          <Fingerprint /> ID
                        </FormLabel>
                        <CheckboxCards
                          {...field}
                          disableCheck
                          onChange={(values) => {
                            field.onChange(values);
                          }}
                          options={id}
                          className="grid-cols-2"
                        />
                      </FormItem>
                    );
                  }}
                />
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Grouping;
