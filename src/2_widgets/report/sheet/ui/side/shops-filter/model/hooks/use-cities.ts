import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/report/model/api/filters/shops/controller";
import { CitiesFilterResponse } from "@entities/report/model/api/filters/shops/service";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useState } from "react";
import { create } from "zustand";

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
  const {
    getCitiesNightStores,
    isCitiesNightStoresLoading,
    getCities,
    isCitiesLoading,
  } = useFilters();
  const { setCityLabels, savedCityLabels } = useCitiesStore();
  const { nightShops } = useFiltersStore();

  const handleOpenCitiesSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = nightShops
        ? await getCitiesNightStores(processFiltersDto(allData))
        : await getCities(processFiltersDto(allData));
      const apiOptions = response.map((city: CitiesFilterResponse) => ({
        label: city.storeCity,
        value: String(JSON.stringify(city.cityId || [])),
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
    isCitiesLoading: nightShops ? isCitiesNightStoresLoading : isCitiesLoading,
    savedCityLabels, // ← доступен в компоненте
  };
};
