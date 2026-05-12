// ShopsFilter.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@shared/ui/form";
import {
  useCities,
  useForm,
  usePartners,
  useRegions,
  useShops,
  useSectors,
} from "../model";
import { FC, useEffect, useCallback, useRef } from "react";
import ClearFilters from "./clear-filter";
import { SelectMyShops } from "./select-my-shops";
import {
  AGE_GROUP,
  FRS_CHANNEL,
  STORE_CONDITIONS,
} from "@widgets/summary/sheet/model/filters-store";
import { CHANNEL_SHOP, STATUS, TIME } from "../config";
import { useMyShopsStore } from "../model/stores/use-my-shops";
import { MultiSelect } from "@shared/ui/multiselect";
import { useSession } from "@entities/session";
import { useFiltersStore } from "@widgets/summary/sheet/model/filters-store";

export const ShopsFilter: FC = () => {
  const form = useForm();
  const { updateStoreFilter, getApiPayload } = useFiltersStore();
  const { isMyShopsMode } = useMyShopsStore();
  const { session } = useSession();
  const payload = getApiPayload();

  // Флаг для предотвращения повторных запросов
  const isShopsLoadedRef = useRef(false);

  const {
    savedPartnerLabels,
    partnerOptions,
    handleOpenPartnersSelect,
    isPartnersLoading,
  } = usePartners(payload);
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
    savedSectorLabels,
    sectorsOptions,
    handleOpenSectorsSelect,
    isSectorsLoading,
  } = useSectors();

  // Мемоизированная функция для загрузки магазинов
  const loadShops = useCallback(() => {
    if (!isShopsLoadedRef.current) {
      handleOpenShopsSelect(true);
      isShopsLoadedRef.current = true;
    }
  }, [handleOpenShopsSelect]);

  // Загрузка данных магазинов при необходимости
  useEffect(() => {
    if (isMyShopsMode && !savedShopLabels.length && !isShopsLoading) {
      loadShops();
    }

    // Сброс флага при выходе из режима "мои магазины"
    if (!isMyShopsMode) {
      isShopsLoadedRef.current = false;
    }
  }, [isMyShopsMode, savedShopLabels.length, isShopsLoading, loadShops]);

  // Обновление формы при изменении режима "мои магазины"
  useEffect(() => {
    if (isMyShopsMode && session?.idStore?.length) {
      // Преобразуем idStore в формат JSON строки, как в API
      const storeValues = session.idStore.map((id) => JSON.stringify([id]));

      form.setValue("idStore", storeValues);
      updateStoreFilter("idStore", storeValues);
    } else if (!isMyShopsMode) {
      // Очищаем только если выходим из режима "мои магазины"
      const currentValues = form.getValues("idStore");
      if (currentValues?.length > 0) {
        // Сохраняем текущие значения если они есть
        return;
      }
      form.setValue("idStore", []);
      updateStoreFilter("idStore", []);
    }
  }, [isMyShopsMode, session?.idStore, form, updateStoreFilter]);

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
        <SelectMyShops />
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="channel"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Канал</FormLabel>
                    <CheckboxCards
                      {...field}
                      disabled={isMyShopsMode}
                      onChange={(values) => {
                        field.onChange(values);
                        updateStoreFilter("channel", values as FRS_CHANNEL[]);
                      }}
                      options={CHANNEL_SHOP}
                      className="grid-cols-1 md:grid-cols-3 [&_*]:text-[12px]"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="storeCondition"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Статус</FormLabel>
                    <CheckboxCards
                      disabled={isMyShopsMode}
                      {...field}
                      onChange={(values) => {
                        field.onChange(values);
                        updateStoreFilter(
                          "storeCondition",
                          values as STORE_CONDITIONS[],
                        );
                      }}
                      options={STATUS}
                      className="grid-cols-2  [&_*]:text-[12px]"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="ageGroup"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">
                      Период деятельности магазина
                    </FormLabel>
                    <CheckboxCards
                      {...field}
                      disabled={isMyShopsMode}
                      disableCheck
                      onChange={(values) => {
                        field.onChange(values);
                        updateStoreFilter("ageGroup", values as AGE_GROUP[]);
                      }}
                      options={TIME}
                      className="grid-cols-2 md:grid-cols-4 [&_*]:text-[12px]"
                    />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="idManager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Партнеры</FormLabel>
                  <FormControl>
                    <MultiSelect
                      disabled={isMyShopsMode}
                      value={field.value?.map(String) || []}
                      options={partnerOptions}
                      isLoading={isPartnersLoading}
                      onOpenChange={handleOpenPartnersSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateStoreFilter("idManager", numeric);
                      }}
                      externalLabels={savedPartnerLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите партнеров"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idRegion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регионы</FormLabel>
                  <FormControl>
                    <MultiSelect
                      disabled={isMyShopsMode}
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
                      disabled={isMyShopsMode}
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
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сектора</FormLabel>
                  <FormControl>
                    <MultiSelect
                      disabled={isMyShopsMode}
                      value={field.value || []}
                      options={sectorsOptions}
                      isLoading={isSectorsLoading}
                      onOpenChange={handleOpenSectorsSelect}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateStoreFilter("sector", value);
                      }}
                      externalLabels={savedSectorLabels}
                      defaultValue={field.value}
                      placeholder="Выберите сектора"
                      maxCount={1}
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
                      disabled={isMyShopsMode}
                      value={field.value || []}
                      options={shopsOptions}
                      isLoading={isShopsLoading}
                      onOpenChange={(isOpen) => {
                        if (!isMyShopsMode) {
                          handleOpenShopsSelect(isOpen);
                        }
                      }}
                      onValueChange={(value) => {
                        if (!isMyShopsMode) {
                          field.onChange(value);

                          updateStoreFilter("idStore", value);
                        }
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
