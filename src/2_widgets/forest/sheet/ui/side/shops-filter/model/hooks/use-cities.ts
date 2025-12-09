import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/shops/controller";
import { useFiltersWriteOff } from "@entities/forest/model/api/filters/shops-write-off/controller";
import { CitiesFilterResponse } from "@entities/forest/model/api/filters/shops/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";

interface CitiesStore {
  savedCityLabels: MultiSelectOption[];
  setCityLabels: (options: MultiSelectOption[]) => void;
}

export const useCitiesStore = create<CitiesStore>((set) => ({
  savedCityLabels: [],
  setCityLabels: (options) => set({ savedCityLabels: options }),
}));

export const useCities = (allData: any) => {
  const [citiesOptions, setCitiesOptions] = useState<MultiSelectOption[]>([]);
  const tab = useTabStore((state) => state.tab);
  const { getCities, isCitiesLoading } = useFilters();
  const {
    getCities: getCitiesWriteOff,
    isCitiesLoading: isCitiesLoadingWriteOff,
  } = useFiltersWriteOff();
  const { setCityLabels, savedCityLabels } = useCitiesStore();

  const handleOpenCitiesSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response =
        tab === "write-off"
          ? await getCitiesWriteOff(processFiltersDto(allData))
          : await getCities(processFiltersDto(allData));
      const apiOptions = response.map((city: CitiesFilterResponse) => ({
        label: city.nameCity,
        value: String(JSON.stringify(city.idCity || [])),
      }));

      setCitiesOptions(apiOptions);
      setCityLabels(apiOptions);
    } catch (error) {
      setCitiesOptions([]);
      setCityLabels([]);
      console.error("Ошибка при загрузке городов:", error);
    }
  };

  return {
    citiesOptions,
    handleOpenCitiesSelect,
    isCitiesLoading:
      tab === "write-off" ? isCitiesLoadingWriteOff : isCitiesLoading,
    savedCityLabels, // ← доступен в компоненте
  };
};
