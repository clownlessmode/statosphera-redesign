import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/shops/controller";
import { CitiesFilterResponse } from "@entities/forest/model/api/filters/shops/types";
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
      const response = await getCities(processFiltersDto(allData));
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
    isCitiesLoading,
    savedCityLabels, // ← доступен в компоненте
  };
};
