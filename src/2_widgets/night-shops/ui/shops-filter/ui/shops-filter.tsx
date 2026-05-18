import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { Store } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AGE_GROUP,
  FRS_CHANNEL,
  STORE_CONDITIONS,
} from "@pages/sales-dynamics/model/filters-store";
import { MultiSelect } from "@shared/ui/multiselect";
import { useSession } from "@entities/session";
import { Badge } from "@shared/ui/badge";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useNightStoresFiltersStore } from "@widgets/night-shops/model/filters-store";
import { SelectMyShops, useMyShopsStore } from "./select-my-shops";
import {
  usePartners,
  useRegions,
  useCities,
  useShops,
  useForm,
} from "../model";
import { CHANNEL_SHOP, CONDITIONS_SHOP, AGE_GROUP_SHOP } from "../config";
import ClearFilters from "./clear-filters";

const ShopsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isMyShopsMode } = useMyShopsStore();
  const { session } = useSession();
  const form = useForm();
  const { updateStoreFilters } = useNightStoresFiltersStore();
  const { handleOpenPartnersSelect, isPartnersLoading, partnerOptions } =
    usePartners({ filters: { store: form.watch() } });
  const { handleOpenRegionsSelect, isRegionsLoading, regionsOptions } =
    useRegions({ filters: { store: form.watch() } });
  const { citiesOptions, handleOpenCitiesSelect, isCitiesLoading } = useCities({
    filters: { store: form.watch() },
  });
  const { handleOpenShopsSelect, isShopsLoading, shopsOptions } = useShops({
    filters: { store: form.watch() },
  });

  useEffect(() => {
    form.reset();
    if (isMyShopsMode) {
      handleOpenShopsSelect(true);
      queueMicrotask(() => {
        form.setValue("idStore", session?.idStore as number[]);
      });
    }
  }, [isMyShopsMode]);

  const handleApply = () => {
    const values = form.getValues();
    if (values.channel)
      updateStoreFilters("channel", values.channel as FRS_CHANNEL[]);
    if (values.storeCondition)
      updateStoreFilters(
        "storeCondition",
        values.storeCondition as STORE_CONDITIONS[],
      );
    if (values.ageGroup)
      updateStoreFilters("ageGroup", values.ageGroup as AGE_GROUP[]);
    if (values.idManager) updateStoreFilters("idManager", values.idManager);
    if (values.idRegion) updateStoreFilters("idRegion", values.idRegion);
    if (values.idCity) updateStoreFilters("idCity", values.idCity);
    if (values.idStore) updateStoreFilters("idStore", values.idStore);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={isMobile ? "default" : "sm"}>
          <Store /> {isMobile ? "Магазины" : "Найти магазины"}
          {form.watch("idStore").length > 0 && (
            <Badge>{form.watch("idStore").length}</Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 max-xxs:h-[calc(100vh-128px)] max-md:h-max rounded-xl border-none"
        aria-describedby={undefined}
      >
        <Card className="w-full mr-4 max-md:h-max max-h-[90dvh] overflow-y-auto scrollbar-hide">
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
                          disabled={isMyShopsMode}
                          {...field}
                          onChange={(values) => {
                            field.onChange(values as FRS_CHANNEL[]);
                          }}
                          options={CHANNEL_SHOP}
                          className="grid-cols-1 xxs:grid-cols-2 md:grid-cols-3"
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
                          disabled={isMyShopsMode}
                          onChange={(values) => {
                            field.onChange(values);
                          }}
                          options={CONDITIONS_SHOP}
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
                          }}
                          options={AGE_GROUP_SHOP}
                          className="grid-cols-2 md:grid-cols-4"
                        />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="idManager"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Партнеры</FormLabel>
                        <FormControl>
                          <MultiSelect
                            disabled={isMyShopsMode}
                            value={field.value?.map(String) || []}
                            options={partnerOptions}
                            isLoading={isPartnersLoading}
                            onOpenChange={(open) =>
                              handleOpenPartnersSelect(open)
                            }
                            onValueChange={(value) => {
                              const numericValues = value.map(Number);
                              field.onChange(numericValues);
                            }}
                            defaultValue={field.value?.map(String)}
                            placeholder="Выберите партнеров"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
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
                          onOpenChange={(open) => handleOpenRegionsSelect(open)}
                          isLoading={isRegionsLoading}
                          onValueChange={(value) => {
                            const numericValues = value.map(Number);
                            field.onChange(numericValues);
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
                          disabled={isMyShopsMode}
                          value={field.value?.map(String) || []}
                          options={citiesOptions}
                          onOpenChange={(open) => handleOpenCitiesSelect(open)}
                          isLoading={isCitiesLoading}
                          onValueChange={(value) => {
                            const numericValues = value.map(Number);
                            field.onChange(numericValues);
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
                          disabled={isMyShopsMode}
                          side="top"
                          maxCount={1}
                          value={field.value?.map(String)}
                          options={shopsOptions}
                          isLoading={isShopsLoading}
                          onOpenChange={(open) => handleOpenShopsSelect(open)}
                          onValueChange={(value) => {
                            const numericValues = value.map(Number);
                            field.onChange(numericValues);
                          }}
                          placeholder="Выберите магазины"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-2 justify-end mt-4 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  >
                    Отмена
                  </Button>
                  <Button
                    type="button"
                    onClick={handleApply}
                    className="w-full"
                  >
                    Применить
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ShopsFilter;
