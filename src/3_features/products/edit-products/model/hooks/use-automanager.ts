
import { AutoManagerFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api/controller";
import { defaultValues } from "../../config/default";

interface AutoManagerStore {
  savedAutoManagerLabels: MultiSelectOption[];
  setAutoManagerLabels: (opts: MultiSelectOption[]) => void;
}

const useAutoManagerStore = create<AutoManagerStore>((set) => ({
  savedAutoManagerLabels: [],
  setAutoManagerLabels: (opts) => set({ savedAutoManagerLabels: opts }),
}));

export const useAutoManager = () => {
  const [autoManagerOptions, setAutoManagerOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getAutoManager, isAutoManagerLoading } = useFilters();
  const { savedAutoManagerLabels, setAutoManagerLabels } =
    useAutoManagerStore();

  const handleOpenAutoManagerSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getAutoManager();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.manager_auto,
        value: String(franchise.id_manager_auto || "")
      }));
      setAutoManagerOptions(apiOptions);
      setAutoManagerLabels(apiOptions);
    } catch (error) {
      setAutoManagerOptions([]);
      setAutoManagerLabels([]);
      console.error("Ошибка при загрузке автоменеджеров:", error);
    }
  };

  return {
    handleOpenAutoManagerSelect,
    autoManagerOptions,
    isAutoManagerLoading,
    savedAutoManagerLabels,
  };
};
