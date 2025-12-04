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
import { FC, useEffect, useCallback, useRef } from "react";
import ClearFilters from "./clear-filter";
import { useFiltersStore } from "@widgets/farmer/analytics/sheet/model/filters-store";
import { MultiSelect } from "@shared/ui/multiselect";
import { useProduct } from "../model/hooks/use-product";

export const ShopsProductFilter: FC = () => {
  const form = useForm();
  const { updateStoreFilter, updateProductFilter, getApiPayload } =
    useFiltersStore();
  const payload = getApiPayload();

  // Флаг для предотвращения повторных запросов
  const isShopsLoadedRef = useRef(false);

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
  const {
    handleOpenProductSelect,
    isProductLoading,
    productOptions,
    savedProductLabels,
  } = useProduct(payload);

  // Мемоизированная функция для загрузки магазинов
  const loadShops = useCallback(() => {
    if (!isShopsLoadedRef.current) {
      handleOpenShopsSelect(true);
      isShopsLoadedRef.current = true;
    }
  }, [handleOpenShopsSelect]);

  // Загрузка данных магазинов при необходимости
  useEffect(() => {
    if (!savedShopLabels.length && !isShopsLoading) {
      loadShops();
    }
  }, [savedShopLabels.length, isShopsLoading, loadShops]);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Магазины и продукты</CardTitle>
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
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateStoreFilter("idRegion", numeric);
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
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateStoreFilter("idCity", numeric);
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
            <FormField
              control={form.control}
              name="idProduct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номенклатура</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={productOptions}
                      isLoading={isProductLoading}
                      onOpenChange={handleOpenProductSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("idProduct", value);
                      }}
                      externalLabels={savedProductLabels}
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
