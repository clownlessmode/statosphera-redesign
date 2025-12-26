import { useNightStores } from "@pages/night-stores/api/controller";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { CitiesFilterResponse, RequestDto } from "@pages/night-stores/config";

export const useCities = (dto: Pick<RequestDto, "filters">) => {
  const [citiesOptions, setCitiesOptions] = useState<MultiSelectOption[]>([]);
  const { getCities, isCitiesLoading } = useNightStores();

  const handleOpenCitiesSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getCities(dto);
      const apiOptions = response.map((city: CitiesFilterResponse) => ({
        label: city.storeCity,
        value: String(city.cityId || ""),
      }));
      setCitiesOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке городов:", error);
    }
  };

  return { citiesOptions, handleOpenCitiesSelect, isCitiesLoading };
};
