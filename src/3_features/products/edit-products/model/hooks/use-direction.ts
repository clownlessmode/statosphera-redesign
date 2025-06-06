import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api";

interface DirectionStore {
  savedDirectionLabels: MultiSelectOption[];
  setDirectionLabels: (opts: MultiSelectOption[]) => void;
}

const useDirectionStore = create<DirectionStore>((set) => ({
  savedDirectionLabels: [],
  setDirectionLabels: (opts) => set({ savedDirectionLabels: opts }),
}));

export const useDirection = () => {
  const [directionOptions, setDirectionOptions] = useState<MultiSelectOption[]>(
    [],
  );
  const { getDirection, isDirectionLoading } = useFilters();
  const { savedDirectionLabels, setDirectionLabels } = useDirectionStore();

  const handleOpenDirectionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getDirection();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.direction_products,
        value: String(franchise.id_direction_products || ""),
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
