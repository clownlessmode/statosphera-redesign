import { ClearFilters } from "@features/clear-filters";
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
import { useState } from "react";
import useForm, {
  useShops,
  useCities,
  usePartners,
  useRegions,
} from "../model/hook";
import {
  AGE_GROUP,
  FRS_CHANNEL,
  STORE_CONDITIONS,
  useSalesDynamicsFiltersStore,
} from "@pages/sales-dynamics/model/filters-store";
import { channel, status, time } from "../model/mock";
import { MultiSelect } from "@shared/ui/multiselect";

const ShopsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm();
  const { updateFilters, getApiPayload } = useSalesDynamicsFiltersStore();

  const allData = getApiPayload();
  const { handleOpenPartnersSelect, isPartnersLoading, partnerOptions } =
    usePartners(allData);
  const { handleOpenRegionsSelect, isRegionsLoading, regionsOptions } =
    useRegions(allData);
  const { citiesOptions, handleOpenCitiesSelect, isCitiesLoading } =
    useCities(allData);
  const { handleOpenShopsSelect, isShopsLoading, shopsOptions } =
    useShops(allData);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Store /> Магазины
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-xl border-none">
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
                            updateFilters("channel", values as FRS_CHANNEL[]);
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
                            updateFilters(
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
                            updateFilters("ageGroup", values as AGE_GROUP[]);
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
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Партнеры</FormLabel>
                        <FormControl>
                          <MultiSelect
                            value={field.value?.map(String) || []}
                            options={partnerOptions}
                            isLoading={isPartnersLoading}
                            onOpenChange={(open) =>
                              handleOpenPartnersSelect(open)
                            }
                            onValueChange={(value) => {
                              const numericValues = value.map(Number);
                              field.onChange(numericValues);
                              updateFilters("idManager", numericValues);
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
                          value={field.value?.map(String) || []}
                          options={regionsOptions}
                          onOpenChange={(open) => handleOpenRegionsSelect(open)}
                          isLoading={isRegionsLoading}
                          onValueChange={(value) => {
                            const numericValues = value.map(Number);
                            field.onChange(numericValues);
                            updateFilters("idRegion", numericValues);
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
                          options={citiesOptions}
                          onOpenChange={(open) => handleOpenCitiesSelect(open)}
                          isLoading={isCitiesLoading}
                          onValueChange={(value) => {
                            const numericValues = value.map(Number);
                            field.onChange(numericValues);
                            updateFilters("idCity", numericValues);
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
                          options={shopsOptions}
                          isLoading={isShopsLoading}
                          onOpenChange={(open) => handleOpenShopsSelect(open)}
                          onValueChange={(value) => {
                            const numericValues = value.map(Number);
                            field.onChange(numericValues);
                            updateFilters(field.name, numericValues);
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
      </DialogContent>
    </Dialog>
  );
};

export default ShopsFilter;
