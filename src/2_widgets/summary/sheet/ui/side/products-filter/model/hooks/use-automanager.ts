import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { AutoManagerFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface AutoManagerStore {
  savedAutoManagerLabels: MultiSelectOption[];
  setAutoManagerLabels: (opts: MultiSelectOption[]) => void;
}

const useAutoManagerStore = create<AutoManagerStore>((set) => ({
  savedAutoManagerLabels: [],
  setAutoManagerLabels: (opts) => set({ savedAutoManagerLabels: opts }),
}));

export const useAutoManager = (allData: any) => {
  const [autoManagerOptions, setAutoManagerOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getAutoManager, isAutoManagerLoading } = useFilters();
  const { savedAutoManagerLabels, setAutoManagerLabels } =
    useAutoManagerStore();

  const handleOpenAutoManagerSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getAutoManager(processFiltersDto(allData));
      const apiOptions = response.map(
        (autoManager: AutoManagerFilterResponse) => ({
          label: autoManager.managerAuto,
          value: String(JSON.stringify(autoManager.managerAuto || [])),
        }),
      );
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
