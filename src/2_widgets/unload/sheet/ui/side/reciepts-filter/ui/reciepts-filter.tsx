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
import ClearFilters from "./clear-filter";
import { useForm } from "../model";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { TYPE_CHECK, TYPE_PAYMENTS, TYPE_QR } from "../config";
import { MultiSelect } from "@shared/ui/multiselect";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useEmployeeName } from "../model/hooks/use-employee";
import { FC } from "react";
import { MultipleInput } from "@shared/ui/multiple-input";

const RecieptsFilter: FC = () => {
  const form = useForm();
  const { updateCheckFilter, getApiPayload } = useFiltersStore();
  const payload = getApiPayload();
  const {
    employeeNameOptions,
    handleOpenEmployeeNameSelect,
    isEmployeeNameLoading,
    savedEmployeeNameLabels,
  } = useEmployeeName(payload);
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
                      // DISABLEDDDDDDD
                      options={TYPE_QR}
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
            <FormField
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
            />
            <FormField
              control={form.control}
              name="numberfield"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Номера касс</FormLabel>
                    <MultipleInput
                      placeholder="Введите номера касс"
                      value={field.value?.map(Number) || []}
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateCheckFilter("numberfield", numericValues);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="tabNumber"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Номера смен</FormLabel>
                    <MultipleInput
                      placeholder="Введите номера смен"
                      value={field.value?.map(Number) || []}
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateCheckFilter("tabNumber", numericValues);
                      }}
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
                      options={employeeNameOptions}
                      isLoading={isEmployeeNameLoading}
                      onOpenChange={handleOpenEmployeeNameSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(Number);
                        field.onChange(numeric);
                        updateCheckFilter("cashBox", numeric);
                      }}
                      externalLabels={savedEmployeeNameLabels}
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
export default RecieptsFilter;
