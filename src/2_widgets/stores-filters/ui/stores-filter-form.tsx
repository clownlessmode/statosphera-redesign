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
import { FC } from "react";
import ClearFilters from "./clear-filter";
import {
  STATUS,
  TIME,
  CHANNELS,
  BOOLEAN_OPTIONS,
  EQUIPMENT_FILTERS,
  CAPABILITIES_FILTERS,
} from "../config";
import { MultiSelect } from "@shared/ui/multiselect";
import {
  useForm,
  useCitiesForFilter,
  useRegionsForFilter,
  usePartnersForFilter,
  useStoresForFilter,
} from "../model/hooks";
import { useStoresFiltersStore } from "../model/stores-filters-store";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { Separator } from "@shared/ui/separator";

export const StoresFilterForm: FC = () => {
  const form = useForm();
  const { updateFilter, getApiPayload } = useStoresFiltersStore();
  const payload = getApiPayload();

  // Преобразуем payload в формат для API отчетов
  const apiPayload = {
    filters: {
      store: {
        idStore: payload.idStore.map(String),
        idCity: payload.idCity.map(String),
        idRegion: payload.idRegion.map(String),
        idManager: payload.idManager.map(String),
        storeCondition: payload.storeCondition,
        ageGroup: payload.ageGroup,
        channel: payload.channel,
      },
      product: {
        groupFranchise: [],
        ppProducts: null,
        subDivisionProducts: [],
        subGroups: [],
        subSubGroups: [],
        typeProducts: [],
        teamProducts: [],
        directionProducts: [],
        groupsEconomist: [],
        groupsMain: [],
        idGroupMain: [],
        idProduct: [],
        seasonalityProducts: [],
        managerAuto: [],
      },
      check: {
        tabNumber: [],
        containsBankQr: null,
        paymentClass: null,
        shift: [],
        cashBox: [],
        checkNumber: [],
        numberfield: [],
        type: [],
      },
      loyal: {
        isLoyal: null,
        cardNumber: [],
        sex: null,
        guidDiscount: [],
        guidBonus: [],
        ageStart: null,
        ageEnd: null,
        colorsDiscount: [],
        groupAge: [],
      },
      onlineStore: {
        isIm: null,
        imTypeOrder: [],
        imDeliveryMethod: [],
        imPaymentMethod: [],
        imStatusOrder: [],
        imReceiveInterval: [],
        imPromo: [],
      },
    },
  };

  const {
    savedPartnerLabels,
    partnerOptions,
    handleOpenPartnersSelect,
    isPartnersLoading,
  } = usePartnersForFilter(apiPayload);

  const {
    savedRegionLabels,
    regionsOptions,
    handleOpenRegionsSelect,
    isRegionsLoading,
  } = useRegionsForFilter(apiPayload);

  const {
    savedCityLabels,
    citiesOptions,
    handleOpenCitiesSelect,
    isCitiesLoading,
  } = useCitiesForFilter(apiPayload);

  const {
    savedShopLabels,
    storesOptions,
    handleOpenStoresSelect,
    isStoresLoading,
  } = useStoresForFilter(apiPayload);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Фильтры магазинов</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по магазинам</CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            {/* Основные фильтры */}
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
                        field.onChange(values as string[]);
                        updateFilter("channel", values as string[]);
                      }}
                      options={CHANNELS}
                      className="grid-cols-1 xs:grid-cols-2 md:grid-cols-3"
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
                        updateFilter("storeCondition", values as string[]);
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
                      disableCheck
                      onChange={(values) => {
                        field.onChange(values);
                        updateFilter("ageGroup", values as string[]);
                      }}
                      options={TIME}
                      className="grid-cols-2 md:grid-cols-4"
                    />
                  </FormItem>
                );
              }}
            />

            <Separator />

            {/* География */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">География</h3>

              <FormField
                control={form.control}
                name="idManager"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Партнеры</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value?.map(String) || []}
                        options={partnerOptions}
                        isLoading={isPartnersLoading}
                        onOpenChange={handleOpenPartnersSelect}
                        onValueChange={(value) => {
                          const numeric = value.map(String);
                          field.onChange(numeric);
                          updateFilter(
                            "idManager",
                            value.map((v) => {
                              try {
                                const parsed = JSON.parse(v);
                                return Array.isArray(parsed)
                                  ? parsed[0]
                                  : parsed;
                              } catch {
                                return parseInt(v);
                              }
                            }),
                          );
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
                        value={field.value?.map(String) || []}
                        options={regionsOptions}
                        isLoading={isRegionsLoading}
                        onOpenChange={handleOpenRegionsSelect}
                        onValueChange={(value) => {
                          const numeric = value.map(String);
                          field.onChange(numeric);
                          updateFilter(
                            "idRegion",
                            value.map((v) => {
                              try {
                                const parsed = JSON.parse(v);
                                return Array.isArray(parsed)
                                  ? parsed[0]
                                  : parsed;
                              } catch {
                                return parseInt(v);
                              }
                            }),
                          );
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
                          updateFilter(
                            "idCity",
                            value.map((v) => {
                              try {
                                const parsed = JSON.parse(v);
                                return Array.isArray(parsed)
                                  ? parsed[0]
                                  : parsed;
                              } catch {
                                return parseInt(v);
                              }
                            }),
                          );
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
                        value={field.value?.map(String) || []}
                        options={storesOptions}
                        isLoading={isStoresLoading}
                        onOpenChange={handleOpenStoresSelect}
                        onValueChange={(value) => {
                          field.onChange(
                            value.map((v) => {
                              try {
                                const parsed = JSON.parse(v);
                                return Array.isArray(parsed)
                                  ? parsed[0]
                                  : parsed;
                              } catch {
                                return parseInt(v);
                              }
                            }),
                          );
                          updateFilter(
                            "idStore",
                            value.map((v) => {
                              try {
                                const parsed = JSON.parse(v);
                                return Array.isArray(parsed)
                                  ? parsed[0]
                                  : parsed;
                              } catch {
                                return parseInt(v);
                              }
                            }),
                          );
                        }}
                        externalLabels={savedShopLabels}
                        defaultValue={field.value?.map(String)}
                        placeholder="Выберите магазины"
                        maxCount={3}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Возможности магазина */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Возможности магазина</h3>
              <div className="grid grid-cols-2 gap-2">
                {CAPABILITIES_FILTERS.map((filter) => (
                  <FormField
                    key={filter.key}
                    control={form.control}
                    name={filter.key as any}
                    render={({ field }) => (
                      <FormItem>
                        <BooleanCheckboxCard
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            updateFilter(filter.key as any, value);
                          }}
                          options={BOOLEAN_OPTIONS.map((opt) => ({
                            ...opt,
                            icon: opt.value ? filter.icon : undefined,
                          }))}
                          disableCheck
                        />
                        <FormLabel className="text-xs text-muted-foreground">
                          {filter.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Оборудование */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Оборудование</h3>
              <div className="grid grid-cols-2 gap-2">
                {EQUIPMENT_FILTERS.map((filter) => (
                  <FormField
                    key={filter.key}
                    control={form.control}
                    name={filter.key as any}
                    render={({ field }) => (
                      <FormItem>
                        <BooleanCheckboxCard
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            updateFilter(filter.key as any, value);
                          }}
                          options={BOOLEAN_OPTIONS.map((opt) => ({
                            ...opt,
                            icon: opt.value ? filter.icon : undefined,
                          }))}
                          disableCheck
                        />
                        <FormLabel className="text-xs text-muted-foreground">
                          {filter.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
