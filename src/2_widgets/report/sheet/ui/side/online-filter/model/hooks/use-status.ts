import { useState } from "react";
import { create } from "zustand";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFilters } from "@entities/report/model/api/filters/online-store/controller";
import { StatusOrderFilterResponse } from "@entities/report/model/api/filters/online-store/types";
import { processFiltersDto } from "@entities/report/model/api/filters/data/service";

// Zustand store
interface StatusOrderStore {
  savedStatusOrderLabels: MultiSelectOption[];
  setStatusOrderLabels: (labels: MultiSelectOption[]) => void;
}

const useStatusOrderStore = create<StatusOrderStore>((set) => ({
  savedStatusOrderLabels: [],
  setStatusOrderLabels: (labels) => set({ savedStatusOrderLabels: labels }),
}));

// Hook
export const useStatusOrder = (allData: any) => {
  const [statusOrderOptions, setStatusOrderOptions] = useState<
    MultiSelectOption[]
  >([]);

  const { getStatusOrder, isStatusOrderLoading } = useFilters();
  const { savedStatusOrderLabels, setStatusOrderLabels } =
    useStatusOrderStore();

  const handleOpenStatusOrderSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getStatusOrder(processFiltersDto(allData));
      const apiOptions = response.map(
        (statusOrder: StatusOrderFilterResponse) => ({
          label:
            statusOrder.im_status_order ||
            "Статус заказа не указан (ID: " +
              statusOrder.im_status_order?.[0] +
              ")",
          value: String(JSON.stringify(statusOrder.im_status_order || [])),
        }),
      );
      setStatusOrderOptions(apiOptions);
      setStatusOrderLabels(apiOptions);
    } catch (error) {
      setStatusOrderOptions([]);
      setStatusOrderLabels([]);
      console.error("Ошибка при загрузке статуса заказа:", error);
    }
  };

  return {
    handleOpenStatusOrderSelect,
    statusOrderOptions,
    isStatusOrderLoading,
    savedStatusOrderLabels,
  };
};
