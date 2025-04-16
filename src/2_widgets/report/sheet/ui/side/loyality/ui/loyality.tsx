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
import { gender, type } from "../model/mock";
import { useFiltersStore } from "../../../commerce/model/store";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { Input } from "@shared/ui/input";
import useForm from "../model/hook";

import { DualRangeSlider } from "@shared/ui/dual-range-slider";
import { MultiSelect } from "@shared/ui/multiselect";

const Loyality: FC = () => {
  const form = useForm();
  const { updateLoyalFilter } = useFiltersStore();
  // const allData = getApiPayload();

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Лояльность</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Фильтруйте данные по программе лояльности
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="isLoyal"
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
                        updateLoyalFilter("isLoyal", value);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({}) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Номера карт</FormLabel>
                    <Input
                      type="text"
                      disabled
                      placeholder="Импортируйте номера карт из excel (скоро...)"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Пол</FormLabel>
                    <BooleanCheckboxCard
                      {...field}
                      options={gender}
                      className="grid-cols-3"
                      onChange={(values) => {
                        field.onChange(values);
                        updateLoyalFilter("sex", values);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Возраст</FormLabel>
                    <DualRangeSlider
                      className="pb-7 pt-1"
                      labelPosition="bottom"
                      label={(label) => label}
                      min={0}
                      max={100}
                      step={1}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateLoyalFilter("ageStart", value[0]);
                        updateLoyalFilter("ageEnd", value[1]);
                      }}
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="guidDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Акция</FormLabel>
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
                      placeholder="Выберите акцию"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guidBonus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Бонус</FormLabel>
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
                      placeholder="Выберите бонус"
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

export default Loyality;
