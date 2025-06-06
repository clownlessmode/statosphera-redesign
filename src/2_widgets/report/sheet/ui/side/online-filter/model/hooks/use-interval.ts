import { useState } from "react";
import { create } from "zustand";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFilters } from "@entities/report/model/api/filters/online-store/controller";
import { IntervalFilterResponse } from "@entities/report/model/api/filters/online-store/types";
import { processFiltersDto } from "@entities/report/model/api/filters/data/service";

// Zustand store
interface IntervalStore {
  savedIntervalLabels: MultiSelectOption[];
  setIntervalLabels: (labels: MultiSelectOption[]) => void;
}

const useIntervalStore = create<IntervalStore>((set) => ({
  savedIntervalLabels: [],
  setIntervalLabels: (labels) => set({ savedIntervalLabels: labels }),
}));

// Hook
export const useInterval = (allData: any) => {
  const [intervalOptions, setIntervalOptions] = useState<MultiSelectOption[]>(
    [],
  );

  const { getInterval, isIntervalLoading } = useFilters();
  const { savedIntervalLabels, setIntervalLabels } = useIntervalStore();

  const handleOpenIntervalSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getInterval(processFiltersDto(allData));
      const apiOptions = response.map((interval: IntervalFilterResponse) => ({
        label:
          interval.im_receive_interval ||
          "Интервал не указан (ID: " + interval.im_receive_interval?.[0] + ")",
        value: String(JSON.stringify(interval.im_receive_interval || [])),
      }));
      setIntervalOptions(apiOptions);
      setIntervalLabels(apiOptions);
    } catch (error) {
      setIntervalOptions([]);
      setIntervalLabels([]);
      console.error("Ошибка при загрузке интервала:", error);
    }
  };

  return {
    handleOpenIntervalSelect,
    intervalOptions,
    isIntervalLoading,
    savedIntervalLabels,
  };
};
