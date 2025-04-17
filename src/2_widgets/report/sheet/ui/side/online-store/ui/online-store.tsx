import ClearFilters from "@features/clear-filters/ui/clear-filters";
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
import { useFiltersStore } from "../../../../model/filters-store";
import useForm from "../model/hook";

import { MultiSelect } from "@shared/ui/multiselect";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { type, typeDelivery, typeOrder, typePayment } from "../model/mock";

const Receipts: FC = () => {
  const form = useForm();
  const { updateOnlineStoreFilter } = useFiltersStore();
  // const allData = getApiPayload();
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
                      options={type}
                      className="grid-cols-3"
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
                    <BooleanCheckboxCard
                      {...field}
                      options={typeOrder}
                      className="grid-cols-3"
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
                    <BooleanCheckboxCard
                      {...field}
                      options={typeDelivery}
                      className="grid-cols-3"
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
                    <BooleanCheckboxCard
                      {...field}
                      options={typePayment}
                      className="grid-cols-4"
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
                      options={[]}
                      isLoading={false}
                      onOpenChange={(open) => console.log(open)} //handleOpenSeasonsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        // updateProductFilter(
                        //   "seasonalityProducts",
                        //   numericValues
                        // );
                      }}
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
                      options={[]}
                      isLoading={false}
                      onOpenChange={(open) => console.log(open)} //handleOpenSeasonsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        // updateProductFilter(
                        //   "seasonalityProducts",
                        //   numericValues
                        // );
                      }}
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
                      options={[]}
                      isLoading={false}
                      onOpenChange={(open) => console.log(open)} //handleOpenSeasonsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        // updateProductFilter(
                        //   "seasonalityProducts",
                        //   numericValues
                        // );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите промо заказа"
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

export default Receipts;
