
import { TypeSenderFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api";
import { defaultValues } from "../../config";

interface TypeSenderStore {
  savedTypeSenderLabels: MultiSelectOption[];
  setTypeSenderLabels: (opts: MultiSelectOption[]) => void;
}

const useTypeSenderStore = create<TypeSenderStore>((set) => ({
  savedTypeSenderLabels: [],
  setTypeSenderLabels: (opts) => set({ savedTypeSenderLabels: opts }),
}));

export const useTypeSender = () => {
  const [typeSenderOptions, setTypeSenderOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getTypeSender, isTypeSenderLoading } = useFilters();
  const { savedTypeSenderLabels, setTypeSenderLabels } = useTypeSenderStore();

  const handleOpenTypeSenderSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getTypeSender();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.type_products,
        value: String(franchise.id_type_products || "")
      }));
      setTypeSenderOptions(apiOptions);
      setTypeSenderLabels(apiOptions);
    } catch (error) {
      setTypeSenderOptions([]);
      setTypeSenderLabels([]);
      console.error("Ошибка при загрузке типов отправителей:", error);
    }
  };

  return {
    handleOpenTypeSenderSelect,
    typeSenderOptions,
    isTypeSenderLoading,
    savedTypeSenderLabels,
  };
};
