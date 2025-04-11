import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { MultiSelect } from "@shared/ui/multiselect";

import { Pizza, Salad } from "lucide-react";

import { FC } from "react";

import { filteredRegions } from "../../shops/ui/shops";
import { useFiltersStore } from "../../../commerce/model/store";
import useForm from "../model/hook";

import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import ClearFilters from "@features/clear-filters/ui/clear-filters";

export const healthy = [
  {
    label: "ПП",
    value: true,
    icon: Salad,
  },
  {
    label: "Не ПП",
    value: false,
    icon: Pizza,
  },
];
const Products: FC = () => {
  const form = useForm();
  const { updateProductFilter } = useFiltersStore();
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Продукты</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по продуктам</CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="groupFranchise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Структура продаж</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("groupFranchise", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите структуру продаж"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subDivisionProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Структурное подразделение</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter(
                          "subDivisionProducts",
                          numericValues
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите структурное подразделение"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teamProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Команда</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("teamProducts", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите команду"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="directionProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Направление</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("directionProducts", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите направление"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupsEconomist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Справочник экономиста</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("groupsEconomist", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите справочник экономиста"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="managerAuto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Менеджер автозаказа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("managerAuto", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите менеджера автозаказа"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="typeProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип поставщика</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("typeProducts", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите тип поставщика"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ppProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип продукта</FormLabel>
                  <FormControl>
                    <BooleanCheckboxCard
                      {...field}
                      options={healthy}
                      className="grid-cols-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seasonalityProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сезонность</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter(
                          "seasonalityProducts",
                          numericValues
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите сезонность"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idGroupMain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Группа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("idGroupMain", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите группу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subGroups"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подгруппа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("subGroups", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите подгруппу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subSubGroups"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подподгруппа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("subSubGroups", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите подподгруппу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idProduct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номенклатура</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("idProduct", numericValues);
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите номенклатуру"
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

export default Products;
