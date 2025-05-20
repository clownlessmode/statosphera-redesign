import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { GroupEconomistFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface EconomistStore {
  savedEconomistLabels: MultiSelectOption[];
  setEconomistLabels: (opts: MultiSelectOption[]) => void;
}

const useEconomistStore = create<EconomistStore>((set) => ({
  savedEconomistLabels: [],
  setEconomistLabels: (opts) => set({ savedEconomistLabels: opts }),
}));

export const useEconomist = (allData: any) => {
  const [economistOptions, setEconomistOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { getEconomist, isEconomistLoading } = useFilters();
  const { savedEconomistLabels, setEconomistLabels } = useEconomistStore();

  const handleOpenEconomistsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getEconomist(allData);
      const apiOptions = response.map(
        (economist: GroupEconomistFilterResponse) => ({
          label: economist.groupsEconomist,
          value: String(economist.idGroupsEconomist?.[0] || ""),
        })
      );
      setEconomistOptions(apiOptions);
      setEconomistLabels(apiOptions);
    } catch (error) {
      setEconomistOptions([]);
      setEconomistLabels([]);
      console.error("Ошибка при загрузке экономистов:", error);
    }
  };

  return {
    handleOpenEconomistsSelect,
    economistOptions,
    isEconomistLoading,
    savedEconomistLabels,
  };
};
