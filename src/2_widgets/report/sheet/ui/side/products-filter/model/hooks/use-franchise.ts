import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { FranchiseFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface FranchiseStore {
  savedFranchiseLabels: MultiSelectOption[];
  setFranchiseLabels: (opts: MultiSelectOption[]) => void;
}

const useFranchiseStore = create<FranchiseStore>((set) => ({
  savedFranchiseLabels: [],
  setFranchiseLabels: (opts) => set({ savedFranchiseLabels: opts }),
}));

export const useFranchise = (allData: any) => {
  const [franchiseOptions, setFranchiseOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { getFranchise, isFranchiseLoading } = useFilters();
  const { savedFranchiseLabels, setFranchiseLabels } = useFranchiseStore();

  const handleOpenFranchiseSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getFranchise(allData);
      const apiOptions = response.map((franchise: FranchiseFilterResponse) => ({
        label: franchise.groupsFranchise,
        value: String(franchise.idGroupsFranchise?.[0] || ""),
      }));
      setFranchiseOptions(apiOptions);
      setFranchiseLabels(apiOptions);
    } catch (error) {
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
