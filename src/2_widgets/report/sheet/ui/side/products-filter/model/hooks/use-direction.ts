import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { DirectionFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface DirectionStore {
  savedDirectionLabels: MultiSelectOption[];
  setDirectionLabels: (opts: MultiSelectOption[]) => void;
}

const useDirectionStore = create<DirectionStore>((set) => ({
  savedDirectionLabels: [],
  setDirectionLabels: (opts) => set({ savedDirectionLabels: opts }),
}));

export const useDirection = (allData: any) => {
  const [directionOptions, setDirectionOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { getDirection, isDirectionLoading } = useFilters();
  const { savedDirectionLabels, setDirectionLabels } = useDirectionStore();

  const handleOpenDirectionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getDirection(allData);
      const apiOptions = response.map((direction: DirectionFilterResponse) => ({
        label: direction.directionProducts,
        value: String(direction.idDirectionProducts?.[0] || ""),
      }));
      setDirectionOptions(apiOptions);
      setDirectionLabels(apiOptions);
    } catch (error) {
      setDirectionOptions([]);
      setDirectionLabels([]);
      console.error("Ошибка при загрузке направлений:", error);
    }
  };

  return {
    handleOpenDirectionsSelect,
    directionOptions,
    isDirectionLoading,
    savedDirectionLabels,
  };
};
