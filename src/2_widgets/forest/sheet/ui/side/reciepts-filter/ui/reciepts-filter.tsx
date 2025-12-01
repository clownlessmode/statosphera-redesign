import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import ClearFilters from "./clear-filter";
import { useForm } from "../model";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { FC } from "react";
import { MultipleInput } from "@shared/ui/multiple-input";

const RecieptsFilter: FC = () => {
  const form = useForm();
  const { updateCheckFilter } = useFiltersStore();
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Чеки</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по чекам</CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="typePayment"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Тип оплаты</FormLabel>
                    <MultipleInput
                      placeholder="Введите тип оплаты"
                      value={field.value?.map(String) || []}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateCheckFilter("typePayment", value.map(String));
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            {/*<FormField
              control={form.control}
              name="checkNumber"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Номера чеков</FormLabel>
                    <MultipleInput
                      placeholder="Введите номера чеков"
                      value={field.value?.map(Number) || []}
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateCheckFilter("checkNumber", numericValues);
                      }}
                    />
                  </FormItem>
                );
              }}
            />*/}
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Скидки</FormLabel>
                    <MultipleInput
                      placeholder="Введите скидки"
                      value={field.value?.map(String) || []}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateCheckFilter("discountType", value.map(String));
                      }}
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
export default RecieptsFilter;
