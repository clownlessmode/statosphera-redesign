import { useState } from "react";
import { create } from "zustand";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFilters } from "@entities/report/model/api/filters/online-store/controller";
import { IntervalFilterResponse } from "@entities/report/model/api/filters/online-store/types";

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
    []
  );

  const { getInterval, isIntervalLoading } = useFilters();
  const { savedIntervalLabels, setIntervalLabels } = useIntervalStore();

  const handleOpenIntervalSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getInterval(allData);
      const apiOptions = response.map((interval: IntervalFilterResponse) => ({
        label:
          interval.im_receive_interval ||
          "Интервал не указан (ID: " + interval.im_receive_interval?.[0] + ")",
        value: String(interval.im_receive_interval?.[0] || ""),
      }));
      setIntervalOptions(apiOptions);
      setIntervalLabels(apiOptions);
    } catch (error) {
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
