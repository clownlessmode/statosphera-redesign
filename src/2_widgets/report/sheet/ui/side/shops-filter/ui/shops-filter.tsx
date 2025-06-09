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
} from "../model";
import { FC, useEffect, useCallback, useRef } from "react";
import ClearFilters from "./clear-filter";
import { SelectMyShops } from "./select-my-shops";
import {
  AGE_GROUP,
  FRS_CHANNEL,
  STORE_CONDITIONS,
  useFiltersStore,
} from "@widgets/report/sheet/model/filters-store";
import { CHANNEL_SHOP, STATUS, TIME } from "../config";
import { useMyShopsStore } from "../model/stores/use-my-shops";
import { MultiSelect } from "@shared/ui/multiselect";
import { useSession } from "@entities/session";

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

  // Мемоизированная функция для загрузки магазинов
  const loadShops = useCallback(() => {
    console.log("🏪 Загружаем магазины...", {
      isMyShopsMode,
      savedShopLabelsLength: savedShopLabels.length,
      isShopsLoadedRef: isShopsLoadedRef.current,
    });

    if (!isShopsLoadedRef.current) {
      handleOpenShopsSelect(true);
      isShopsLoadedRef.current = true;
    }
  }, [handleOpenShopsSelect, savedShopLabels.length, isMyShopsMode]);

  // Загрузка данных магазинов при необходимости
  useEffect(() => {
    console.log("🔄 Effect для загрузки магазинов:", {
      isMyShopsMode,
      savedShopLabelsLength: savedShopLabels.length,
      shouldLoad: isMyShopsMode && !savedShopLabels.length,
    });

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
    console.log("🔧 Effect для обновления формы:", {
      isMyShopsMode,
      sessionIdStore: session?.idStore,
      sessionIdStoreLength: session?.idStore?.length,
    });

    if (isMyShopsMode && session?.idStore?.length) {
      const storeIds = session.idStore.map(String);
      console.log(storeIds, shopsOptions);

      console.log("✅ Устанавливаем магазины из сессии:", storeIds);
      form.setValue(
        "idStore",
        storeIds.map((id) => `[${id}]`),
      );
      updateStoreFilter(
        "idStore",
        storeIds.map((id) => `[${id}]`),
      );
      console.log(savedShopLabels);
    } else if (!isMyShopsMode) {
      console.log("🗑️ Очищаем магазины");
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
                      className="grid-cols-3"
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
                      className="grid-cols-2"
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
                      className="grid-cols-4"
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
              name="idStore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Магазины</FormLabel>
                  <FormControl>
                    <MultiSelect
                      maxCount={1}
                      disabled={isMyShopsMode}
                      value={field.value?.map(String) || []}
                      options={shopsOptions}
                      isLoading={isShopsLoading}
                      onOpenChange={(isOpen) => {
                        console.log("🏪 MultiSelect onOpenChange:", {
                          isOpen,
                          isMyShopsMode,
                        });
                        if (!isMyShopsMode) {
                          handleOpenShopsSelect(isOpen);
                        }
                      }}
                      onValueChange={(value) => {
                        console.log("🏪 MultiSelect onValueChange:", {
                          value,
                          isMyShopsMode,
                        });
                        if (!isMyShopsMode) {
                          const numeric = value.map(String);
                          field.onChange(numeric);
                          updateStoreFilter("idStore", numeric);
                        }
                      }}
                      externalLabels={savedShopLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите магазины"
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
