import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { RegionsFilterResponse } from "@pages/sales-dynamics/model/api/service";
import { useSalesDynamicsController } from "@pages/sales-dynamics/model/api/controller";

export const useRegions = (allData: any) => {
  const [regionsOptions, setRegionsOptions] = useState<MultiSelectOption[]>([]);
  const { getRegions, isRegionsLoading } = useSalesDynamicsController();

  const handleOpenRegionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getRegions(allData);
      const apiOptions = response.map((region: RegionsFilterResponse) => ({
        label: region.storeRegion,
        value: String(region.regionId || ""),
      }));
      setRegionsOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке регионов:", error);
    }
  };

  return { regionsOptions, handleOpenRegionsSelect, isRegionsLoading };
};
