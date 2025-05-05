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

import { FC, useEffect, useMemo } from "react";
import { typeQR, typePayment, useEmployeeName, typeCheck } from "../model/mock";
import { useFiltersStore } from "../../../../model/filters-store";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { Input } from "@shared/ui/input";
import useForm from "../model/hook";

import { MultiSelect, MultiSelectOption } from "@shared/ui/multiselect";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { create } from "zustand";
export interface SelectedOptionsState {
  employeeName: MultiSelectOption[];
  setEmployeeName: (opts: MultiSelectOption[]) => void;
}
export const useSelectedOptionsStore = create<SelectedOptionsState>((set) => ({
  employeeName: [],
  setEmployeeName: (opts) => set({ employeeName: opts }),
}));

const Receipts: FC = () => {
  const form = useForm();
  const addReset = useFormResetStore((s) => s.addReset);
  const removeReset = useFormResetStore((s) => s.removeReset);

  useEffect(() => {
    addReset(form.reset);
    return () => {
      removeReset(form.reset);
    };
  }, [form.reset, addReset, removeReset]);
  const { updateCheckFilter, getApiPayload } = useFiltersStore();
  const allData = getApiPayload();
  const {
    employeeNameOptions,
    handleOpenEmployeeNameSelect,
    isEmployeeNameLoading,
  } = useEmployeeName(allData);
  const { employeeName, setEmployeeName } = useSelectedOptionsStore();

  const effective = (
    apiOpts: MultiSelectOption[],
    stored: MultiSelectOption[]
  ) => {
    const map = new Map<string, MultiSelectOption>();
    apiOpts.forEach((o) => map.set(o.value, o));
    stored.forEach((o) => map.set(o.value, o));
    return Array.from(map.values());
  };

  const effEmployeeName = useMemo(
    () => effective(employeeNameOptions, employeeName),
    [employeeNameOptions, employeeName]
  );
  console.log(effEmployeeName, "effEmployeeName");
  console.log(employeeName, "employeeName");
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
                    <FormLabel htmlFor="">Тип оплаты</FormLabel>
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
              name="type"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Тип чека</FormLabel>
                    <BooleanCheckboxCard
                      {...field}
                      options={typeCheck}
                      className="grid-cols-3"
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
                      options={effEmployeeName}
                      isLoading={isEmployeeNameLoading}
                      onOpenChange={(open) =>
                        handleOpenEmployeeNameSelect(open)
                      }
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateCheckFilter("cashBox", numericValues);
                        setEmployeeName(
                          effEmployeeName.filter((o) => value.includes(o.value))
                        );
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
