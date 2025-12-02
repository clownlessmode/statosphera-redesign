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
import { MultiSelect } from "@shared/ui/multiselect";
import { useTypePayment } from "../model/hooks/use-typePayment";
import { useDiscountType } from "../model/hooks/use-discountType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@shared/ui/select";

const RecieptsFilter: FC = () => {
  const form = useForm();
  const { updateCheckFilter, getApiPayload } = useFiltersStore();
  const payload = getApiPayload();

  const {
    typePaymentOptions,
    handleOpenTypePaymentSelect,
    isTypePaymentLoading,
    savedTypePaymentLabels,
  } = useTypePayment(payload);

  const {
    discountTypeOptions,
    handleOpenDiscountTypeSelect,
    isDiscountTypeLoading,
    savedDiscountTypeLabels,
  } = useDiscountType(payload);

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
                    <Select
                      value={field.value?.[0] || ""}
                      disabled={isTypePaymentLoading}
                      onOpenChange={handleOpenTypePaymentSelect}
                      onValueChange={(value) => {
                        field.onChange([value]);
                        updateCheckFilter("typePayment", [value]);
                      }}
                    >
                      <SelectTrigger className="w-full bg-background!">
                        <SelectValue placeholder="Выберите тип оплаты">
                          {savedTypePaymentLabels.find(
                            (label) => label.value === field.value?.[0],
                          )?.label || ""}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {typePaymentOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={discountTypeOptions}
                      isLoading={isDiscountTypeLoading}
                      onOpenChange={handleOpenDiscountTypeSelect}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateCheckFilter("discountType", value);
                      }}
                      externalLabels={savedDiscountTypeLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите скидки"
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
