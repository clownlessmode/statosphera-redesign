import { useFilters } from "@entities/report/model/api/filters/check/controller";
import { EmployeeNameFilterResponse } from "@entities/report/model/api/filters/check/types";
import { SeasonFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { Slash, Badge, Banknote, CreditCard, QrCode } from "lucide-react";
import { useState } from "react";

export const typePayment = [
  {
    label: "Все",
    value: null,
    icon: Badge,
  },
  {
    label: "Безналичный",
    value: "Безналичный",
    icon: CreditCard,
  },
  {
    label: "Наличный",
    value: "Наличный",
    icon: Banknote,
  },
];

export const typeQR = [
  {
    label: "Все",
    value: null,
    icon: Badge, // Общая иконка
  },
  {
    label: "C QR",
    value: true,
    icon: QrCode, // Иконка QR-кода
  },
  {
    label: "Без QR",
    value: false,
    icon: Slash,
  },
];

export const useEmployeeName = (allData: any) => {
  const [employeeNameOptions, setEmployeeNameOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getEmployeeName, isEmployeeNameLoading } = useFilters();

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
    } catch (error) {
      console.error("Ошибка при загрузке сотрудников:", error);
    }
  };

  return {
    handleOpenEmployeeNameSelect,
    employeeNameOptions,
    isEmployeeNameLoading,
  };
};
