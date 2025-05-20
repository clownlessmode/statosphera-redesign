import { useState } from "react";
import { create } from "zustand";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFilters } from "@entities/report/model/api/filters/online-store/controller";
import { PromoFilterResponse } from "@entities/report/model/api/filters/online-store/types";

// Zustand store
interface PromoStore {
  savedPromoLabels: MultiSelectOption[];
  setPromoLabels: (labels: MultiSelectOption[]) => void;
}

const usePromoStore = create<PromoStore>((set) => ({
  savedPromoLabels: [],
  setPromoLabels: (labels) => set({ savedPromoLabels: labels }),
}));

// Hook
export const usePromo = (allData: any) => {
  const [promoOptions, setPromoOptions] = useState<MultiSelectOption[]>([]);

  const { getPromo, isPromoLoading } = useFilters();
  const { savedPromoLabels, setPromoLabels } = usePromoStore();

  const handleOpenPromoSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getPromo(allData);
      const apiOptions = response.map((promo: PromoFilterResponse) => ({
        label: promo.im_promo,
        value: String(promo.im_promo || ""),
      }));
      setPromoOptions(apiOptions);
      setPromoLabels(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке промо:", error);
    }
  };

  return {
    handleOpenPromoSelect,
    promoOptions,
    isPromoLoading,
    savedPromoLabels,
  };
};
