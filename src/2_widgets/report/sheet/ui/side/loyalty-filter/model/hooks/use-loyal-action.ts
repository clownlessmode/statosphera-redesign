import { LoyalActionFilterResponse } from "@entities/report/model/api/filters/loyality/types";
import { useFilters } from "@entities/report/model/api/filters/loyality/controller";

import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { processFiltersDto } from "@entities/report/model/api/filters/data/service";

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
      const response = await getLoyalAction(processFiltersDto(allData));
      const apiOptions = response.map(
        (loyalAction: LoyalActionFilterResponse) => ({
          label: loyalAction.nameDiscount
            ? `${loyalAction.nameDiscount} ${JSON.stringify(loyalAction.guid)}`
            : "Название не указано (ID: " + loyalAction.guid?.[0] + ")",
          value: String(JSON.stringify(loyalAction.guid || [])),
        }),
      );
      setLoyalActionOptions(apiOptions);
      setLoyalActionLabels(apiOptions);
    } catch (error) {
      setLoyalActionOptions([]);
      setLoyalActionLabels([]);
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
