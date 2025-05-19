import { useFilters } from "@entities/report/model/api/filters/shops/controller";
import { RegionsFilterResponse } from "@entities/report/model/api/filters/shops/service";
import { MultiSelectOption } from "@shared/ui/multiselect";
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
  const { getRegions, isRegionsLoading } = useFilters();
  const { setRegionLabels, savedRegionLabels } = useRegionsStore();

  const handleOpenRegionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getRegions(allData);
      const apiOptions = response.map((region: RegionsFilterResponse) => ({
        label: region.storeRegion,
        value: String(region.regionId || ""),
      }));

      setRegionsOptions(apiOptions);
      setRegionLabels(apiOptions); // сохраняем в zustand
    } catch (error) {
      console.error("Ошибка при загрузке регионов:", error);
    }
  };

  return {
    regionsOptions,
    handleOpenRegionsSelect,
    isRegionsLoading,
    savedRegionLabels, // ← доступен в компоненте
  };
};
