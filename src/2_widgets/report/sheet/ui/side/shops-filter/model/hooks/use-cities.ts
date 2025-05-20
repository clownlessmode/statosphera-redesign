import { useFilters } from "@entities/report/model/api/filters/shops/controller";
import { CitiesFilterResponse } from "@entities/report/model/api/filters/shops/service";
import { MultiSelectOption } from "@shared/ui/multiselect";
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
  const { getCities, isCitiesLoading } = useFilters();
  const { setCityLabels, savedCityLabels } = useCitiesStore();

  const handleOpenCitiesSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getCities(allData);
      const apiOptions = response.map((city: CitiesFilterResponse) => ({
        label: city.storeCity,
        value: String(city.cityId || ""),
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
    isCitiesLoading,
    savedCityLabels, // ← доступен в компоненте
  };
};
