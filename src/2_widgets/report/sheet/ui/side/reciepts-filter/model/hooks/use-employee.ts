import { useState } from "react";
import { create } from "zustand";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { EmployeeNameFilterResponse } from "@entities/report/model/api/filters/check/types";
import { useFilters } from "@entities/report/model/api/filters/check/controller";

// Zustand store
interface EmployeeNameStore {
  savedEmployeeNameLabels: MultiSelectOption[];
  setEmployeeNameLabels: (labels: MultiSelectOption[]) => void;
}

const useEmployeeNameStore = create<EmployeeNameStore>((set) => ({
  savedEmployeeNameLabels: [],
  setEmployeeNameLabels: (labels) => set({ savedEmployeeNameLabels: labels }),
}));

// Hook
export const useEmployeeName = (allData: any) => {
  const [employeeNameOptions, setEmployeeNameOptions] = useState<
    MultiSelectOption[]
  >([]);

  const { getEmployeeName, isEmployeeNameLoading } = useFilters();
  const { savedEmployeeNameLabels, setEmployeeNameLabels } =
    useEmployeeNameStore();

  const handleOpenEmployeeNameSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getEmployeeName(allData);
      const apiOptions = response.map(
        (employeeName: EmployeeNameFilterResponse) => ({
          label:
            employeeName.employeeName ||
            "Сотрудник не указан (ID: " + employeeName.tabNum?.[0] + ")",
          value: String(employeeName.tabNum?.[0] || ""),
        })
      );
      setEmployeeNameOptions(apiOptions);
      setEmployeeNameLabels(apiOptions);
    } catch (error) {
      setEmployeeNameOptions([]);
      setEmployeeNameLabels([]);
      console.error("Ошибка при загрузке сотрудников:", error);
    }
  };

  return {
    handleOpenEmployeeNameSelect,
    employeeNameOptions,
    isEmployeeNameLoading,
    savedEmployeeNameLabels,
  };
};
