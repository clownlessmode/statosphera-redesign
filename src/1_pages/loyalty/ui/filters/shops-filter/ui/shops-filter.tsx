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
import { Plus, Store, X } from "lucide-react";
import { useEffect, useState } from "react";
import useForm, {
  useShops,
  useCities,
  usePartners,
  useRegions,
  useSectors,
} from "../model/hook";
import {
  AGE_GROUP,
  FRS_CHANNEL,
  STORE_CONDITIONS,
  useSalesDynamicsFiltersStore,
} from "@pages/sales-dynamics/model/filters-store";
import { status, time } from "../model/mock";
import { MultiSelect } from "@shared/ui/multiselect";
import { useSession } from "@entities/session";
import { useSalesDynamicsController } from "@pages/sales-dynamics/model/api/controller";
import { ShopsFilterResponse } from "@pages/sales-dynamics/model/api/service";
import { Badge } from "@shared/ui/badge";
import { useChannel } from "@widgets/report/sheet/ui/side/shops-filter/model/hooks/use-channel";
import { useIsMobile } from "@shared/hooks/use-mobile";

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
  const { sectorsOptions, handleOpenSectorsSelect, isSectorsLoading } =
    useSectors();
  const { handleOpenShopsSelect, isShopsLoading, shopsOptions } =
    useShops(allData);
  const [selectedMyShops, setSelectedMyShops] = useState<boolean>(false);
  const { session } = useSession();
  const { getShops } = useSalesDynamicsController();

  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const response = await getShops(allData);
      const apiOptions = response.map((shop: ShopsFilterResponse) => ({
        label: shop.storeName,
        value: String(shop.idStore?.[0] || ""),
      }));
      setShops(apiOptions);
    };
    fetchShops();
  }, []);

  useEffect(() => {
    if (selectedMyShops) {
      form.setValue("idStore", session?.idStore as number[]);
      updateFilters("idStore", session?.idStore as number[]);
    }
    if (!selectedMyShops) {
      form.setValue("idStore", []);
      updateFilters("idStore", []);
    }
  }, [selectedMyShops]);
  const { CHANNEL_SHOP } = useChannel();
  const isMobile = useIsMobile();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={isMobile ? "default" : "sm"}>
          <Store />{" "}
          {isMobile ? (
            <span className="max-xs:hidden">Магазины</span>
          ) : (
            "Найти магазины"
          )}
          {allData.filters.idStore.length > 0 && (
            <Badge>{allData.filters.idStore.length}</Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 max-xxs:h-[calc(100vh-128px)] max-md:h-max rounded-xl border-none"
        aria-describedby={undefined}
      >
        <Card className="w-full mr-4 max-md:overflow-y-auto scrollbar-hide">
          <CardHeader>
            <CardTitle>Магазины</CardTitle>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <CardDescription>Фильтруйте данные по магазинам</CardDescription>
              <ClearFilters form={form} />
            </div>
          </CardHeader>
          <CardContent>
            {session && session.idStore.length > 0 && (
              <Button
                className="w-full mb-6"
                variant={selectedMyShops ? "default" : "outline"}
                onClick={() => setSelectedMyShops(!selectedMyShops)}
              >
                {selectedMyShops ? "Снять выбор" : "Выбрать мои магазины"}
                {selectedMyShops ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </Button>
            )}
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
                          disabled={selectedMyShops}
                          {...field}
                          onChange={(values) => {
                            field.onChange(values as FRS_CHANNEL[]);
                            updateFilters("channel", values as FRS_CHANNEL[]);
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
                          disabled={selectedMyShops}
                          onChange={(values) => {
                            field.onChange(values);
                            updateFilters(
                              "storeCondition",
                              values as STORE_CONDITIONS[],
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
                          disabled={selectedMyShops}
                          disableCheck
                          onChange={(values) => {
                            field.onChange(values);
                            updateFilters("ageGroup", values as AGE_GROUP[]);
                          }}
                          options={time}
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
                            disabled={selectedMyShops}
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
                          disabled={selectedMyShops}
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
                          disabled={selectedMyShops}
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
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Сектора</FormLabel>
                      <FormControl>
                        <MultiSelect
                          disabled={selectedMyShops}
                          value={field.value || []}
                          options={sectorsOptions}
                          isLoading={isSectorsLoading}
                          onOpenChange={handleOpenSectorsSelect}
                          onValueChange={(value) => {
                            field.onChange(value);
                            updateFilters("sector", value);
                          }}
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
                          side="top"
                          maxCount={1}
                          value={field.value?.map(String)}
                          options={selectedMyShops ? shops : shopsOptions}
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
