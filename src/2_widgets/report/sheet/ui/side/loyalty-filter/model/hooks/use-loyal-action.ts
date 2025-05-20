import { LoyalActionFilterResponse } from "@entities/report/model/api/filters/loyality/types";
import { useFilters } from "@entities/report/model/api/filters/loyality/controller";

import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface LoyalActionStore {
  savedLoyalActionLabels: MultiSelectOption[];
  setLoyalActionLabels: (opts: MultiSelectOption[]) => void;
}

const useLoyalActionStore = create<LoyalActionStore>((set) => ({
  savedLoyalActionLabels: [],
  setLoyalActionLabels: (opts) => set({ savedLoyalActionLabels: opts }),
}));

export const useLoyalAction = (allData: any) => {
  const [loyalActionOptions, setLoyalActionOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getLoyalAction, isLoyalActionLoading } = useFilters();
  const { savedLoyalActionLabels, setLoyalActionLabels } =
    useLoyalActionStore();

  const handleOpenLoyalActionSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getLoyalAction(allData);
      const apiOptions = response.map(
        (loyalAction: LoyalActionFilterResponse) => ({
          label:
            loyalAction.nameDiscount ||
            "Название не указано (ID: " + loyalAction.guid?.[0] + ")",
          value: String(loyalAction.guid?.[0] || ""),
        })
      );
      setLoyalActionOptions(apiOptions);
      setLoyalActionLabels(apiOptions); // ✅ сохраняем в store
    } catch (error) {
      console.error("Ошибка при загрузке лояльных действий:", error);
    }
  };

  return {
    handleOpenLoyalActionSelect,
    loyalActionOptions,
    isLoyalActionLoading,
    savedLoyalActionLabels,
  };
};
