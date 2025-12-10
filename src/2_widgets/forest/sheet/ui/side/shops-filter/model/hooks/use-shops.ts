import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFilters } from "@entities/forest/model/api/filters/shops/controller";
import { useState } from "react";
import { ShopsFilterResponse } from "@entities/forest/model/api/filters/shops/types";
import { create } from "zustand";
import { processFiltersDto } from "@entities/forest/model/api/filters/data/service";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import { useFiltersWriteOff } from "@entities/forest/model/api/filters/shops-write-off/controller";

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
  const tab = useTabStore((state) => state.tab);
  const { getShops, isShopsLoading } = useFilters();
  const { getShops: getShopsWriteOff, isShopsLoading: isShopsLoadingWriteOff } =
    useFiltersWriteOff();
  const { setShopLabels, savedShopLabels } = useShopsStore();

  const handleOpenShopsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response =
        tab === "write-off"
          ? await getShopsWriteOff(processFiltersDto(allData))
          : await getShops(processFiltersDto(allData));
      const apiOptions = response.map((shop: ShopsFilterResponse) => ({
        label: shop.nameStore,
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
    isShopsLoading:
      tab === "write-off" ? isShopsLoadingWriteOff : isShopsLoading,
    savedShopLabels,
  };
};
