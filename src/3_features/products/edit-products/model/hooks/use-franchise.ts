import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api";

interface FranchiseStore {
  savedFranchiseLabels: MultiSelectOption[];
  setFranchiseLabels: (opts: MultiSelectOption[]) => void;
}

const useFranchiseStore = create<FranchiseStore>((set) => ({
  savedFranchiseLabels: [],
  setFranchiseLabels: (opts) => set({ savedFranchiseLabels: opts }),
}));

export const useFranchise = () => {
  const [franchiseOptions, setFranchiseOptions] = useState<MultiSelectOption[]>(
    [],
  );
  const { getFranchise, isFranchiseLoading } = useFilters();
  const { savedFranchiseLabels, setFranchiseLabels } = useFranchiseStore();

  const handleOpenFranchiseSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getFranchise();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.groups_franchise,
        value: String(franchise.id_groups_franchise || ""),
      }));
      setFranchiseOptions(apiOptions);
      setFranchiseLabels(apiOptions);
    } catch (error) {
      setFranchiseOptions([]);
      setFranchiseLabels([]);
      console.error("Ошибка при загрузке франшиз:", error);
    }
  };

  return {
    handleOpenFranchiseSelect,
    franchiseOptions,
    isFranchiseLoading,
    savedFranchiseLabels,
  };
};
