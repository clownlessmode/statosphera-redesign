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
import { FC } from "react";

import {
  channel,
  cities,
  regions,
  shops,
  status,
  time,
  usersList,
} from "../model/mock";
import useForm from "../model/hook";
import {
  AGE_GROUP,
  FRS_CHANNEL,
  STORE_CONDITIONS,
  useFiltersStore,
} from "../../../commerce/model/store";
const filteredCities = cities
  .filter(
    (city): city is { idCity: number; storeCity: string } =>
      city.idCity !== null && city.storeCity !== null
  )
  .map((city) => ({
    label: city.storeCity,
    value: String(city.idCity),
  }));

export const filteredRegions = regions
  .filter(
    (
      region
    ): region is {
      idRegion: number;
      storeRegion: string;
    } => region.idRegion !== null && region.storeRegion !== null
  )
  .map((region) => ({
    label: region.storeRegion,
    value: String(region.idRegion),
  }));
const Shops: FC = () => {
  const form = useForm();
  const { updateStoreFilter } = useFiltersStore();

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
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Партнеры</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value?.map(String) || []}
                        options={usersList}
                        onValueChange={(value) => {
                          const numericValues = value.map(Number);
                          field.onChange(numericValues);
                          updateStoreFilter("idManager", numericValues);
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
                      options={filteredRegions}
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateStoreFilter("idRegion", numericValues);
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
              name="idCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Города</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={filteredCities}
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateStoreFilter("idCity", numericValues);
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
                      options={shops
                        .filter(
                          (
                            shop
                          ): shop is { idStore: number; storeName: string } =>
                            shop.idStore !== null && shop.storeName !== null
                        )
                        .map((shop) => ({
                          label: shop.storeName,
                          value: String(shop.idStore),
                        }))}
                      onValueChange={(value) => {
                        const numericValues = value.map(Number);
                        field.onChange(numericValues);
                        updateStoreFilter(field.name, numericValues);
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
