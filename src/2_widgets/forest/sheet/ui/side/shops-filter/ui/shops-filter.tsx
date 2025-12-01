// ShopsFilter.tsx
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
  FormItem,
  FormLabel,
  FormControl,
} from "@shared/ui/form";
import { useCities, useForm, useRegions, useShops } from "../model";
import { FC } from "react";
import ClearFilters from "./clear-filter";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { MultiSelect } from "@shared/ui/multiselect";

export const ShopsFilter: FC = () => {
  const form = useForm();
  const { updateStoreFilter, getApiPayload } = useFiltersStore();
  const payload = getApiPayload();

  const {
    savedRegionLabels,
    regionsOptions,
    handleOpenRegionsSelect,
    isRegionsLoading,
  } = useRegions(payload);
  const {
    savedCityLabels,
    citiesOptions,
    handleOpenCitiesSelect,
    isCitiesLoading,
  } = useCities(payload);
  const {
    savedShopLabels,
    shopsOptions,
    handleOpenShopsSelect,
    isShopsLoading,
  } = useShops(payload);

  console.log(savedShopLabels);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Магазины</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по магазинам</CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="idRegion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регионы</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={regionsOptions}
                      isLoading={isRegionsLoading}
                      onOpenChange={handleOpenRegionsSelect}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateStoreFilter("idRegion", value);
                      }}
                      externalLabels={savedRegionLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите регионы"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Города</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={citiesOptions}
                      isLoading={isCitiesLoading}
                      onOpenChange={handleOpenCitiesSelect}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateStoreFilter("idCity", value);
                      }}
                      externalLabels={savedCityLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите города"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idStore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Магазины</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value || []}
                      options={shopsOptions}
                      isLoading={isShopsLoading}
                      onOpenChange={(isOpen) => {
                        handleOpenShopsSelect(isOpen);
                      }}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateStoreFilter("idStore", value);
                      }}
                      externalLabels={savedShopLabels}
                      defaultValue={field.value}
                      placeholder="Выберите магазины"
                      maxCount={1}
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
