import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/shops/controller";
import { RegionsFilterResponse } from "@entities/forest/model/api/filters/shops/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import { useFiltersWriteOff } from "@entities/forest/model/api/filters/shops-write-off/controller";

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
  const tab = useTabStore((state) => state.tab);
  const { getRegions, isRegionsLoading } = useFilters();
  const {
    getRegions: getRegionsWriteOff,
    isRegionsLoading: isRegionsLoadingWriteOff,
  } = useFiltersWriteOff();
  const { setRegionLabels, savedRegionLabels } = useRegionsStore();

  const handleOpenRegionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response =
        tab === "write-off"
          ? await getRegionsWriteOff(processFiltersDto(allData))
          : await getRegions(processFiltersDto(allData));
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
    isRegionsLoading:
      tab === "write-off" ? isRegionsLoadingWriteOff : isRegionsLoading,
    savedRegionLabels, // ← доступен в компоненте
  };
};
