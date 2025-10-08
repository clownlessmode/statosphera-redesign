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
import { STATUS, TIME, CHANNELS } from "../../config";
import { MultiSelect } from "@shared/ui/multiselect";
import {
  useForm,
  useCitiesForFilter,
  useRegionsForFilter,
  usePartnersForFilter,
  useStoresForFilter,
} from "../../model/hooks";
import { useStoresFiltersStore } from "../../model/stores-filters-store";

export const GeographyFilter: FC = () => {
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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>География и основные фильтры</CardTitle>
          <CardDescription>
            Фильтруйте магазины по расположению и характеристикам
          </CardDescription>
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
                      <FormLabel>Канал</FormLabel>
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
                      <FormLabel>Статус магазина</FormLabel>
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
                      <FormLabel>Период деятельности магазина</FormLabel>
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
