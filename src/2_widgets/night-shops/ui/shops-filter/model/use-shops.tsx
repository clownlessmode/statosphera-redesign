import { ShopsFilterResponse } from "@pages/sales-dynamics/model/api/service";
import { useState } from "react";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useSalesDynamicsController } from "@pages/sales-dynamics/model/api/controller";

export const useShops = (allData: any) => {
  const [shopsOptions, setShopsOptions] = useState<MultiSelectOption[]>([]);
  const { getShops, isShopsLoading } = useSalesDynamicsController();
  const handleOpenShopsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getShops(allData);
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
