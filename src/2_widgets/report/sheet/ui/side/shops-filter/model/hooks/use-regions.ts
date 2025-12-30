import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/report/model/api/filters/shops/controller";
import { RegionsFilterResponse } from "@entities/report/model/api/filters/shops/service";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useState } from "react";
import { create } from "zustand";

interface RegionsStore {
  savedRegionLabels: MultiSelectOption[];
  setRegionLabels: (options: MultiSelectOption[]) => void;
}

export const useRegionsStore = create<RegionsStore>((set) => ({
  savedRegionLabels: [],
  setRegionLabels: (options) => set({ savedRegionLabels: options }),
}));

export const useRegions = (allData: any) => {
  const [regionsOptions, setRegionsOptions] = useState<MultiSelectOption[]>([]);
  const {
    getRegionsNightStores,
    isRegionsNightStoresLoading,
    getRegions,
    isRegionsLoading,
  } = useFilters();
  const { setRegionLabels, savedRegionLabels } = useRegionsStore();
  const { nightShops } = useFiltersStore();

  const handleOpenRegionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = nightShops
        ? await getRegionsNightStores(processFiltersDto(allData))
        : await getRegions(processFiltersDto(allData));
      const apiOptions = response.map((region: RegionsFilterResponse) => ({
        label: region.storeRegion,
        value: String(JSON.stringify(region.regionId || [])),
      }));

      setRegionsOptions(apiOptions);
      setRegionLabels(apiOptions);
    } catch (error) {
      setRegionsOptions([]);
      setRegionLabels([]);
      console.error("Ошибка при загрузке регионов:", error);
    }
  };

  return {
    regionsOptions,
    handleOpenRegionsSelect,
    isRegionsLoading: nightShops
      ? isRegionsNightStoresLoading
      : isRegionsLoading,
    savedRegionLabels, // ← доступен в компоненте
  };
};
