import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFilters } from "@entities/report/model/api/filters/shops/controller";
import { useState } from "react";
import { ShopsFilterResponse } from "@entities/report/model/api/filters/shops/service";
import { create } from "zustand";
import { processFiltersDto } from "@entities/report/model/api/filters/data/service";

interface ShopsStore {
  savedShopLabels: MultiSelectOption[];
  setShopLabels: (options: MultiSelectOption[]) => void;
}

export const useShopsStore = create<ShopsStore>((set) => ({
  savedShopLabels: [],
  setShopLabels: (options) => set({ savedShopLabels: options }),
}));

export const useShops = (allData: any) => {
  const [shopsOptions, setShopsOptions] = useState<MultiSelectOption[]>([]);
  const { getShops, isShopsLoading } = useFilters();
  const { setShopLabels, savedShopLabels } = useShopsStore();

  const handleOpenShopsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getShops(processFiltersDto(allData));
      const apiOptions = response.map((shop: ShopsFilterResponse) => ({
        label: shop.storeName,
        value: String(JSON.stringify(shop.idStore || [])),
      }));

      setShopsOptions(apiOptions);
      setShopLabels(apiOptions);
    } catch (error) {
      setShopsOptions([]);
      setShopLabels([]);
      console.error("Ошибка при загрузке магазинов:", error);
    }
  };

  return {
    shopsOptions,
    handleOpenShopsSelect,
    isShopsLoading,
    savedShopLabels, // ← доступен в компоненте
  };
};
