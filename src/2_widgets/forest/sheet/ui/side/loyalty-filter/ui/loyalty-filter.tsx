//import { FC } from "react";
//import {
//  Card,
//  CardContent,
//  CardDescription,
//  CardHeader,
//  CardTitle,
//} from "@shared/ui/card";
//import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
//import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
//import { DualRangeSlider } from "@shared/ui/dual-range-slider";
//import { useForm } from "../model";
//
//import { GENDER, TYPE } from "../config";
//import ClearFilters from "./clear-filter";
//import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
//import { MultipleInput } from "@shared/ui/multiple-input";
//const LoyaltyFilter: FC = () => {
//  const form = useForm();
//  const { updateLoyalFilter } = useFiltersStore();
//
//  return (
//    <Card className="w-full mr-4">
//      <CardHeader>
//        <CardTitle>Лояльность</CardTitle>
//        <div className="flex flex-row gap-2 justify-between items-center w-full">
//          <CardDescription>
//            Фильтруйте данные по программе лояльности
//          </CardDescription>
//          <ClearFilters form={form} />
//        </div>
//      </CardHeader>
//      <CardContent>
//        <Form {...form}>
//          <form className="flex flex-col gap-4 w-full">
//            <FormField
//              control={form.control}
//              name="isLoyal"
//              render={({ field }) => (
//                <FormItem>
//                  <FormLabel>Тип</FormLabel>
//                  <BooleanCheckboxCard
//                    {...field}
//                    options={TYPE}
//                    className="grid-cols-1 md:grid-cols-3"
//                    onChange={(vals) => {
//                      field.onChange(vals);
//                      updateLoyalFilter("isLoyal", vals);
//                    }}
//                  />
//                </FormItem>
//              )}
//            />
//
//            {/* Возраст */}
//            <FormField
//              control={form.control}
//              name="age"
//              render={({ field }) => (
//                <FormItem>
//                  <FormLabel>Возраст</FormLabel>
//                  <DualRangeSlider
//                    className="pb-7 pt-1"
//                    labelPosition="bottom"
//                    label={(l) => l}
//                    min={0}
//                    max={100}
//                    step={1}
//                    value={field.value}
//                    onValueChange={([min, max]) => {
//                      field.onChange([min, max]);
//                      updateLoyalFilter("ageStart", min);
//                      updateLoyalFilter("ageEnd", max);
//                    }}
//                  />
//                </FormItem>
//              )}
//            />
//
//            {/* Пол */}
//            <FormField
//              control={form.control}
//              name="sex"
//              render={({ field }) => (
//                <FormItem>
//                  <FormLabel>Пол</FormLabel>
//                  <BooleanCheckboxCard
//                    {...field}
//                    options={GENDER}
//                    className="grid-cols-1 md:grid-cols-3"
//                    onChange={(vals) => {
//                      field.onChange(vals);
//                      updateLoyalFilter("sex", vals);
//                    }}
//                  />
//                </FormItem>
//              )}
//            />
//
//            {/* Номера карт */}
//            <FormField
//              control={form.control}
//              name="cardNumber"
//              render={({ field }) => {
//                return (
//                  <FormItem>
//                    <FormLabel htmlFor="">Номера карт</FormLabel>
//                    <MultipleInput
//                      type="number"
//                      min={10}
//                      max={10}
//                      placeholder="Введите номера карт"
//                      value={field.value?.map(Number) || []}
//                      onValueChange={(value) => {
//                        const numericValues = value.map(Number);
//                        field.onChange(numericValues);
//                        updateLoyalFilter(
//                          "cardNumber",
//                          numericValues.map(String),
//                        );
//                      }}
//                    />
//                  </FormItem>
//                );
//              }}
//            />
//          </form>
//        </Form>
//      </CardContent>
//    </Card>
//  );
//};
//
//export default LoyaltyFilter;
