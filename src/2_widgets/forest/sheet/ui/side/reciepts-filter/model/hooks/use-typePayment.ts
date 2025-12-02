import { processFiltersDto } from "@entities/forest/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/check/controller";
import { TypePaymentFilterResponse } from "@entities/forest/model/api/filters/check/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface TypePaymentStore {
  savedTypePaymentLabels: MultiSelectOption[];
  setTypePaymentLabels: (opts: MultiSelectOption[]) => void;
}

const useTypePaymentStore = create<TypePaymentStore>((set) => ({
  savedTypePaymentLabels: [],
  setTypePaymentLabels: (opts) => set({ savedTypePaymentLabels: opts }),
}));

export const useTypePayment = (allData: any) => {
  const [typePaymentOptions, setTypePaymentOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getTypePayment, isTypePaymentLoading } = useFilters();
  const { savedTypePaymentLabels, setTypePaymentLabels } =
    useTypePaymentStore();

  const handleOpenTypePaymentSelect = async (isOpen: boolean) => {
    if (!isOpen) return;
    allData.filters.check.typePayment = [];
    try {
      const response = await getTypePayment(processFiltersDto(allData));
      const apiOptions = response.map(
        (typePayment: TypePaymentFilterResponse) => ({
          label: typePayment.typePayment || "Название не указано",
          value: String(typePayment.typePayment || ""),
        }),
      );
      setTypePaymentOptions(apiOptions);
      setTypePaymentLabels(apiOptions);
    } catch (error) {
      setTypePaymentOptions([]);
      setTypePaymentLabels([]);
      console.error("Ошибка при загрузке типов оплаты:", error);
    }
  };

  return {
    handleOpenTypePaymentSelect,
    typePaymentOptions,
    isTypePaymentLoading,
    savedTypePaymentLabels,
  };
};
