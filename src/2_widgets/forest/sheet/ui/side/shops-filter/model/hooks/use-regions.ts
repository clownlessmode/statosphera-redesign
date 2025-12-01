import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/shops/controller";
import { RegionsFilterResponse } from "@entities/forest/model/api/filters/shops/types";
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
      const response = await getRegions(processFiltersDto(allData));
      const apiOptions = response.map((region: RegionsFilterResponse) => ({
        label: region.nameRegion,
        value: String(JSON.stringify(region.idRegion || [])),
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
    isRegionsLoading,
    savedRegionLabels, // ← доступен в компоненте
  };
};
