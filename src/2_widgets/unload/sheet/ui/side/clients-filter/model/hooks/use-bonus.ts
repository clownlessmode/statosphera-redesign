import { LoyalBonusFilterResponse } from "@entities/report/model/api/filters/loyality/types";
import { useFilters } from "@entities/report/model/api/filters/loyality/controller";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { processFiltersDto } from "@entities/report/model/api/filters/data/service";

interface LoyalBonusStore {
  savedLoyalBonusLabels: MultiSelectOption[];
  setLoyalBonusLabels: (opts: MultiSelectOption[]) => void;
}

const useLoyalBonusStore = create<LoyalBonusStore>((set) => ({
  savedLoyalBonusLabels: [],
  setLoyalBonusLabels: (opts) => set({ savedLoyalBonusLabels: opts }),
}));

export const useLoyalBonus = (allData: any) => {
  const [loyalBonusOptions, setLoyalBonusOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getLoyalBonus, isLoyalBonusLoading } = useFilters();
  const { savedLoyalBonusLabels, setLoyalBonusLabels } = useLoyalBonusStore();

  const handleOpenLoyalBonusSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getLoyalBonus(processFiltersDto(allData));
      const apiOptions = response.map(
        (loyalBonus: LoyalBonusFilterResponse) => ({
          label:
            loyalBonus.nameBonus ||
            "Название не указано (ID: " + loyalBonus.guid?.[0] + ")",
          value: String(JSON.stringify(loyalBonus.guid || [])),
        }),
      );
      setLoyalBonusOptions(apiOptions);
      setLoyalBonusLabels(apiOptions);
    } catch (error) {
      setLoyalBonusOptions([]);
      setLoyalBonusLabels([]);
      console.error("Ошибка при загрузке лояльных бонусов:", error);
    }
  };

  return {
    handleOpenLoyalBonusSelect,
    loyalBonusOptions,
    isLoyalBonusLoading,
    savedLoyalBonusLabels,
  };
};
