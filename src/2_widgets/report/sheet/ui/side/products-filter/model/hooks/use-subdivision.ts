import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { SubdivisionFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface SubdivisionStore {
  savedSubdivisionLabels: MultiSelectOption[];
  setSubdivisionLabels: (opts: MultiSelectOption[]) => void;
}

const useSubdivisionStore = create<SubdivisionStore>((set) => ({
  savedSubdivisionLabels: [],
  setSubdivisionLabels: (opts) => set({ savedSubdivisionLabels: opts }),
}));

export const useSubdivision = (allData: any) => {
  const [subdivisionOptions, setSubdivisionOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getSubdivisions, isSubdivisionsLoading } = useFilters();
  const { savedSubdivisionLabels, setSubdivisionLabels } =
    useSubdivisionStore();

  const handleOpenSubdivisionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSubdivisions(allData);
      const apiOptions = response.map(
        (subdivision: SubdivisionFilterResponse) => ({
          label: subdivision.subdivisionProducts,
          value: String(subdivision.idSubdivisionProducts?.[0] || ""),
        })
      );
      setSubdivisionOptions(apiOptions);
      setSubdivisionLabels(apiOptions);
    } catch (error) {
      setSubdivisionOptions([]);
      setSubdivisionLabels([]);
      console.error("Ошибка при загрузке подразделений:", error);
    }
  };

  return {
    handleOpenSubdivisionsSelect,
    subdivisionOptions,
    isSubdivisionsLoading,
    savedSubdivisionLabels,
  };
};
