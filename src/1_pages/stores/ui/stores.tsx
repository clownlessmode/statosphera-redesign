import { Header } from "@widgets/header";
import { DataTable } from "@shared/ui/table/data-table";
import StoreDetails from "./store-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import StoresMap from "./stores-map";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { useMemo, useState, useEffect } from "react";
import { columns } from "../model/columns";
import { useStoresController } from "../model/api/controller";
import Spinner from "@shared/ui/spinner";
import { Store } from "@entities/store/config";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { Funnel } from "lucide-react";
import {
  StoresFiltersSheet,
  FilterBadges,
  useStoresFiltersStore,
  useStoresSheetStore,
} from "@widgets/stores-filters";
import { Card } from "@shared/ui/card";

const Stores = () => {
  const [search, setSearch] = useState("");
  const { getApiPayload } = useStoresFiltersStore();
  const { setIsOpen } = useStoresSheetStore();

  // Используем состояние для примененных фильтров
  const [appliedFilters, setAppliedFilters] = useState(getApiPayload());

  const { stores: data, isStoresLoading } = useStoresController(
    undefined,
    appliedFilters,
  );

  // Подписываемся на изменения в apply store
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    import("@widgets/stores-filters").then(({ useStoresApplyStore }) => {
      unsubscribe = useStoresApplyStore.subscribe((state) => {
        if (state.shouldApply) {
          setAppliedFilters(getApiPayload());
          state.setShouldApply(false);
        }
      });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [getApiPayload]);

  const filters = appliedFilters;

  const filteredData = useMemo(() => {
    let result = data || [];
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((store) =>
        Object.values(store).some((value) =>
          String(value).toLowerCase().includes(lowerSearch),
        ),
      );
    }
    return result.sort((a, b) => {
      const aIsNight = a.nightStore || a.ipNightStore.length > 0;
      const bIsNight = b.nightStore || b.ipNightStore.length > 0;
      if (aIsNight && !bIsNight) return -1;
      if (!aIsNight && bIsNight) return 1;
      return a.idStore - b.idStore;
    });
  }, [search, data]);

  const isMobile = useIsMobile();

  const hasActiveFilters =
    filters.idStore.length > 0 ||
    filters.idCity.length > 0 ||
    filters.idRegion.length > 0 ||
    filters.idManager.length > 0 ||
    filters.ageGroup.length > 0 ||
    filters.channel.length > 0 ||
    filters.storeCondition.length > 0 ||
    filters.nightStore !== null ||
    filters.shopOnAuto !== null ||
    filters.deliveryIm !== null ||
    filters.walkingDelivery !== null ||
    filters.grill !== null ||
    filters.dopeki !== null ||
    filters.bakehouse !== null ||
    filters.brazier !== null ||
    filters.camera !== null ||
    filters.coffee !== null ||
    filters.milkRefrigerator !== null;

  return (
    <>
      <StoresFiltersSheet />
      <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
        <Header
          title="Справочник магазинов"
          actions={{
            left: !isMobile && (
              <div className="flex flex-row gap-1 w-full">
                <Input
                  placeholder="Поиск по магазинам"
                  className="w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={() => setSearch("")}>Сброс</Button>
              </div>
            ),
            center: (
              <>
                <Button
                  onClick={() => setIsOpen(true)}
                  variant={hasActiveFilters ? "default" : "outline"}
                >
                  <Funnel />
                  <p className="max-xs:hidden">Фильтры</p>
                </Button>
              </>
            ),
          }}
        />

        <div className="rounded-3xl px-4 pt-4 gap-4 h-fit flex flex-col min-h-[calc(100vh-4rem)] w-full bg-background">
          {isMobile && (
            <div className="flex flex-row w-full gap-1">
              <Input
                placeholder="Поиск по магазинам"
                className="w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={() => setSearch("")}>Сброс</Button>
            </div>
          )}

          {/* Блок с выбранными фильтрами */}
          {hasActiveFilters && (
            <Card
              onClick={() => setIsOpen(true)}
              className="items-center gap-1 p-2 flex flex-row flex-wrap md:grid md:grid-cols-[auto_1fr_auto]"
            >
              <div className="flex items-center gap-1">
                <Funnel className="size-4 flex-shrink-0" />
                <p className="text-sm flex-shrink-0">Фильтры:</p>
              </div>
              <div className="min-w-0 overflow-x-auto scrollbar-hide whitespace-nowrap">
                <div className="inline-flex gap-1">
                  <FilterBadges />
                </div>
              </div>
              <Button
                size="sm"
                className="w-full max-md:mt-2 md:w-[220px] md:flex-shrink-0 md:justify-between"
              >
                Изменить фильтры <Funnel className="size-4" />
              </Button>
            </Card>
          )}

          <Tabs defaultValue="stores">
            <TabsList className="w-full">
              <TabsTrigger value="stores">Магазины</TabsTrigger>
              <TabsTrigger value="map">Карта</TabsTrigger>
            </TabsList>

            <TabsContent value="stores">
              <div className="overflow-x-auto w-full max-w-full">
                {isStoresLoading ? (
                  <div className="flex justify-center items-center h-full min-h-[70vh] w-full">
                    <Spinner />
                  </div>
                ) : (
                  <DataTable
                    columns={columns}
                    data={filteredData || []}
                    onRowClick={(row: Store) => {
                      console.log("row clicked", row);
                    }}
                    renderRowDialog={({ row, isOpen, onClose }) => (
                      <StoreDetails
                        idStore={row.idStore as number}
                        open={isOpen}
                        onOpenChange={(open) => !open && onClose()}
                      />
                    )}
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="map">
              <StoresMap />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Stores;
