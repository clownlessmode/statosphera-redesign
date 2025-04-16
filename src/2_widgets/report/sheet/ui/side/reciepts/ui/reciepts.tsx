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
import { typeQR, typePayment } from "../model/mock";
import { useFiltersStore } from "../../../commerce/model/store";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { Input } from "@shared/ui/input";
import useForm from "../model/hook";

import { MultiSelect } from "@shared/ui/multiselect";

const Receipts: FC = () => {
  const form = useForm();
  const { updateCheckFilter } = useFiltersStore();
  // const allData = getApiPayload();
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
              name="containsBankQr"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Вид оплаты</FormLabel>
                    <BooleanCheckboxCard
                      {...field}
                      options={typeQR}
                      className="grid-cols-3"
                      onChange={(value) => {
                        field.onChange(value);
                        updateCheckFilter("containsBankQr", value);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="paymentClass"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Вид оплаты</FormLabel>
                    <BooleanCheckboxCard
                      {...field}
                      options={typePayment}
                      className="grid-cols-3"
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
              name="checkNumber"
              render={({}) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Номера чеков</FormLabel>
                    <Input
                      type="number"
                      disabled
                      placeholder="Импортируйте номера чеков из excel (скоро...)"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="numberfield"
              render={({}) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Номера касс</FormLabel>
                    <Input
                      type="number"
                      disabled
                      placeholder="Импортируйте номера касс из excel (скоро...)"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="tabNumber"
              render={({}) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Номера смен</FormLabel>
                    <Input
                      type="number"
                      disabled
                      placeholder="Импортируйте номера смен из excel (скоро...)"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="cashBox"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Кассиры</FormLabel>
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
                      placeholder="Выберите кассира"
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
