
import { SubdivisionFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api";
import { defaultValues } from "../../config";

interface SubdivisionStore {
  savedSubdivisionLabels: MultiSelectOption[];
  setSubdivisionLabels: (opts: MultiSelectOption[]) => void;
}

const useSubdivisionStore = create<SubdivisionStore>((set) => ({
  savedSubdivisionLabels: [],
  setSubdivisionLabels: (opts) => set({ savedSubdivisionLabels: opts }),
}));

export const useSubdivision = () => {
  const [subdivisionOptions, setSubdivisionOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getSubdivisions, isSubdivisionsLoading } = useFilters();
  const { savedSubdivisionLabels, setSubdivisionLabels } =
    useSubdivisionStore();

  const handleOpenSubdivisionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSubdivisions();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.subdivision_products ,
        value: String(franchise.id_subdivision_products || "")
      }));
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
