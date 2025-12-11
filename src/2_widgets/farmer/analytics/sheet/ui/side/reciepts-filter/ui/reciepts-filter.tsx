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
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { TYPE_CHECK, TYPE_PAYMENTS } from "../config";
import { useFiltersStore } from "@widgets/farmer/analytics/sheet/model/filters-store";
import { FC } from "react";

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
              name="paymentClass"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Тип оплаты</FormLabel>
                    <BooleanCheckboxCard
                      {...field}
                      options={TYPE_PAYMENTS}
                      className="grid-cols-1 xs:grid-cols-3"
                      onChange={(value) => {
                        field.onChange(value);
                        updateCheckFilter("paymentClass", value);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Тип чека</FormLabel>
                    <BooleanCheckboxCard
                      {...field}
                      options={TYPE_CHECK}
                      className="grid-cols-1 xs:grid-cols-3"
                      onChange={(value) => {
                        field.onChange(value);
                        updateCheckFilter("type", [value]);
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
