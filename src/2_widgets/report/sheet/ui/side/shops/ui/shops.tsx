import ClearFilters from "@features/clear-filters/ui/clear-filters";
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
  FormMessage,
} from "@shared/ui/form";
import { MultiSelect } from "@shared/ui/multiselect";
import { FC, useEffect, useMemo } from "react";
import { channel, status, time } from "../model/mock";
import useForm, {
  useCities,
  usePartners,
  useRegions,
  useShops,
} from "../model/hook";
import {
  AGE_GROUP,
  FRS_CHANNEL,
  STORE_CONDITIONS,
  useFiltersStore,
} from "../../../../model/filters-store";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { create } from "zustand";
import { MultiSelectOption } from "@shared/ui/multiselect";

interface SelectedOptionsState {
  partners: MultiSelectOption[];
  regions: MultiSelectOption[];
  cities: MultiSelectOption[];
  shops: MultiSelectOption[];
  setPartners: (opts: MultiSelectOption[]) => void;
  setRegions: (opts: MultiSelectOption[]) => void;
  setCities: (opts: MultiSelectOption[]) => void;
  setShops: (opts: MultiSelectOption[]) => void;
}

// Global store for selected options labels
export const useSelectedOptionsStore = create<SelectedOptionsState>(
  (set: any) => ({
    partners: [],
    regions: [],
    cities: [],
    shops: [],
    setPartners: (opts: MultiSelectOption[]) => set({ partners: opts }),
    setRegions: (opts: MultiSelectOption[]) => set({ regions: opts }),
    setCities: (opts: MultiSelectOption[]) => set({ cities: opts }),
    setShops: (opts: MultiSelectOption[]) => set({ shops: opts }),
  })
);

const Shops: FC = () => {
  const {
    partners,
    regions,
    cities,
    shops,
    setPartners,
    setRegions,
    setCities,
    setShops,
  } = useSelectedOptionsStore();
  const form = useForm();
  const addReset = useFormResetStore((s) => s.addReset);
  const removeReset = useFormResetStore((s) => s.removeReset);

  useEffect(() => {
    addReset(form.reset);
    return () => {
      removeReset(form.reset);
    };
  }, [form.reset, addReset, removeReset]);
  const { updateStoreFilter, getApiPayload } = useFiltersStore();
  const allData = getApiPayload();

  const { handleOpenPartnersSelect, isPartnersLoading, partnerOptions } =
    usePartners(allData);
  const { handleOpenRegionsSelect, isRegionsLoading, regionsOptions } =
    useRegions(allData);
  const { citiesOptions, handleOpenCitiesSelect, isCitiesLoading } =
    useCities(allData);
  const { handleOpenShopsSelect, isShopsLoading, shopsOptions } =
    useShops(allData);
  const effectivePartnerOptions = useMemo<MultiSelectOption[]>(() => {
    const map = new Map<string, MultiSelectOption>();
    // сначала ставим свежие опции
    partnerOptions.forEach((o) => map.set(o.value, o));
    // потом «подмешиваем» те, что в сторе
    partners.forEach((o) => map.set(o.value, o));
    return Array.from(map.values());
  }, [partnerOptions, partners]);

  const effectiveRegionsOptions = useMemo<MultiSelectOption[]>(() => {
    const map = new Map<string, MultiSelectOption>();
    // сначала ставим свежие опции
    regionsOptions.forEach((o) => map.set(o.value, o));
    // потом «подмешиваем» те, что в сторе
    regions.forEach((o) => map.set(o.value, o));
    return Array.from(map.values());
  }, [regionsOptions, regions]);

  const effectiveCitiesOptions = useMemo<MultiSelectOption[]>(() => {
    const map = new Map<string, MultiSelectOption>();
    // сначала ставим свежие опции
    citiesOptions.forEach((o) => map.set(o.value, o));
    // потом «подмешиваем» те, что в сторе
    cities.forEach((o) => map.set(o.value, o));
    return Array.from(map.values());
  }, [citiesOptions, cities]);

  const effectiveShopsOptions = useMemo<MultiSelectOption[]>(() => {
    const map = new Map<string, MultiSelectOption>();
    // сначала ставим свежие опции
    shopsOptions.forEach((o) => map.set(o.value, o));
    // потом «подмешиваем» те, что в сторе
    shops.forEach((o) => map.set(o.value, o));
    return Array.from(map.values());
  }, [shopsOptions, shops]);

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
              name="channel"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="">Канал</FormLabel>
                    <CheckboxCards
                      {...field}
                      onChange={(values) => {
                        field.onChange(values);
                        updateStoreFilter("channel", values as FRS_CHANNEL[]);
                      }}
                      options={channel}
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
                      {...field}
                      onChange={(values) => {
                        field.onChange(values);
                        updateStoreFilter(
                          "storeCondition",
                          values as STORE_CONDITIONS[]
                        );
                      }}
                      options={status}
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
                      disableCheck
                      onChange={(values) => {
                        field.onChange(values);
                        updateStoreFilter("ageGroup", values as AGE_GROUP[]);
                      }}
                      options={time}
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
                      value={field.value?.map(String) || []}
                      options={effectivePartnerOptions}
                      isLoading={isPartnersLoading}
                      onOpenChange={handleOpenPartnersSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(Number);
                        field.onChange(numeric);
                        updateStoreFilter("idManager", numeric);
                        setPartners(
                          effectivePartnerOptions.filter((o) =>
                            value.includes(o.value)
                          )
                        );
                      }}
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
                      value={field.value?.map(String) || []}
                      options={effectiveRegionsOptions}
                      onOpenChange={(open) => handleOpenRegionsSelect(open)}
                      isLoading={isRegionsLoading}
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateStoreFilter("idRegion", numericValues);
                        setRegions(
                          effectiveRegionsOptions.filter((o) =>
                            value.includes(o.value)
                          )
                        );
                      }}
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
                      options={effectiveCitiesOptions}
                      onOpenChange={(open) => handleOpenCitiesSelect(open)}
                      isLoading={isCitiesLoading}
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateStoreFilter("idCity", numericValues);
                        setCities(
                          effectiveCitiesOptions.filter((o) =>
                            value.includes(o.value)
                          )
                        );
                      }}
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
                      value={field.value?.map(String)}
                      options={effectiveShopsOptions}
                      isLoading={isShopsLoading}
                      onOpenChange={(open) => handleOpenShopsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateStoreFilter(field.name, numericValues);
                        setShops(
                          effectiveShopsOptions.filter((o) =>
                            value.includes(o.value)
                          )
                        );
                      }}
                      placeholder="Выберите магазины"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Shops;
