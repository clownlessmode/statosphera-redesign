import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api";

interface EconomistStore {
  savedEconomistLabels: MultiSelectOption[];
  setEconomistLabels: (opts: MultiSelectOption[]) => void;
}

const useEconomistStore = create<EconomistStore>((set) => ({
  savedEconomistLabels: [],
  setEconomistLabels: (opts) => set({ savedEconomistLabels: opts }),
}));

export const useEconomist = () => {
  const [economistOptions, setEconomistOptions] = useState<MultiSelectOption[]>(
    [],
  );
  const { getEconomist, isEconomistLoading } = useFilters();
  const { savedEconomistLabels, setEconomistLabels } = useEconomistStore();

  const handleOpenEconomistsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getEconomist();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.groups_economist,
        value: String(franchise.id_groups_economist || ""),
      }));
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
