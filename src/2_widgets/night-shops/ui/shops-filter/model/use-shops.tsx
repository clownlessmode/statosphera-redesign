import { RequestDto, ShopsFilterResponse } from "@pages/night-stores/config";
import { useState } from "react";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useNightStores } from "@pages/night-stores/api/controller";

export const useShops = (dto: Pick<RequestDto, "filters">) => {
  const [shopsOptions, setShopsOptions] = useState<MultiSelectOption[]>([]);
  const { getShops, isShopsLoading } = useNightStores();
  const handleOpenShopsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getShops(dto);
      const apiOptions = response.map((shop: ShopsFilterResponse) => ({
        label: shop.storeName,
        value: String(shop.idStore?.[0] || ""),
      }));
      setShopsOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке магазинов:", error);
      setShopsOptions([]);
    }
  };

  return { shopsOptions, handleOpenShopsSelect, isShopsLoading };
};
