import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { RegionsFilterResponse, RequestDto } from "@pages/night-stores/config";
import { useNightStores } from "@pages/night-stores/api/controller";

export const useRegions = (dto: Pick<RequestDto, "filters">) => {
  const [regionsOptions, setRegionsOptions] = useState<MultiSelectOption[]>([]);
  const { getRegions, isRegionsLoading } = useNightStores();

  const handleOpenRegionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getRegions(dto);
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
