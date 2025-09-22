import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { FC } from "react";
import { useForm, useInterval, usePromo, useStatusOrder } from "../model";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import ClearFilters from "./clear-filter";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { TYPE, TYPE_DELIVERY, TYPE_ORDER, TYPE_PAYMENT } from "../config";
import { MultiSelect } from "@shared/ui/multiselect";
import CheckboxCards from "@shared/ui/checkbox-cards";

const OnlineFilter: FC = () => {
  const form = useForm();

  const { updateOnlineStoreFilter, getApiPayload } = useFiltersStore();
  const allData = getApiPayload();
  const {
    savedStatusOrderLabels,
    statusOrderOptions,
    isStatusOrderLoading,
    handleOpenStatusOrderSelect,
  } = useStatusOrder(allData);
  const {
    intervalOptions,
    savedIntervalLabels,
    isIntervalLoading,
    handleOpenIntervalSelect,
  } = useInterval(allData);
  const {
    savedPromoLabels,
    promoOptions,
    isPromoLoading,
    handleOpenPromoSelect,
  } = usePromo(allData);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Интернет магазин</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Фильтруйте данные по данным интернет магазина
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="isIm"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Тип</FormLabel>
                    <BooleanCheckboxCard
                      {...field}
                      options={TYPE}
                      className="grid-cols-1 md:grid-cols-3"
                      onChange={(value) => {
                        field.onChange(value);
                        updateOnlineStoreFilter("isIm", value);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="imTypeOrder"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Источник заказа</FormLabel>
                    <CheckboxCards
                      {...field}
                      selectAll
                      options={TYPE_ORDER}
                      className="grid-cols-1 md:grid-cols-3"
                      onChange={(value) => {
                        field.onChange(value);
                        updateOnlineStoreFilter("imTypeOrder", value);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="imDeliveryMethod"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Способ доставки</FormLabel>
                    <CheckboxCards
                      {...field}
                      selectAll
                      options={TYPE_DELIVERY}
                      className="grid-cols-2 md:grid-cols-4"
                      onChange={(value) => {
                        field.onChange(value);
                        updateOnlineStoreFilter("imDeliveryMethod", value);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="imPaymentMethod"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Способ оплаты</FormLabel>
                    <CheckboxCards
                      {...field}
                      options={TYPE_PAYMENT}
                      className="grid-cols-2 md:grid-cols-4"
                      onChange={(value) => {
                        field.onChange(value);
                        updateOnlineStoreFilter("imPaymentMethod", value);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="imStatusOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cтатус заказа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={statusOrderOptions}
                      isLoading={isStatusOrderLoading}
                      onOpenChange={handleOpenStatusOrderSelect}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateOnlineStoreFilter(
                          "imStatusOrder",
                          value as unknown as (
                            | "Завершен"
                            | "Отменен_клиентом"
                            | "Отменен"
                            | "Сборка"
                            | "Собран"
                            | "Принят"
                            | "Создан"
                          )[],
                        );
                      }}
                      externalLabels={savedStatusOrderLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите статус заказа"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imReceiveInterval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Интервал</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={intervalOptions}
                      isLoading={isIntervalLoading}
                      onOpenChange={handleOpenIntervalSelect}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateOnlineStoreFilter(
                          "imReceiveInterval",
                          numericValues,
                        );
                      }}
                      externalLabels={savedIntervalLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите интервал заказа"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imPromo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Промо</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={promoOptions}
                      isLoading={isPromoLoading}
                      onOpenChange={handleOpenPromoSelect}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateOnlineStoreFilter("imPromo", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите промо заказа"
                      externalLabels={savedPromoLabels}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnlineFilter;
