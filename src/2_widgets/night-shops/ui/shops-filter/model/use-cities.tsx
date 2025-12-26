import { useSalesDynamicsController } from "@pages/sales-dynamics/model/api/controller";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { CitiesFilterResponse } from "@pages/sales-dynamics/model/api/service";

export const useCities = (allData: any) => {
  const [citiesOptions, setCitiesOptions] = useState<MultiSelectOption[]>([]);
  const { getCities, isCitiesLoading } = useSalesDynamicsController();

  const handleOpenCitiesSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getCities(allData);
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
