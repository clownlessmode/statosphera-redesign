import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { TypeSenderFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface TypeSenderStore {
  savedTypeSenderLabels: MultiSelectOption[];
  setTypeSenderLabels: (opts: MultiSelectOption[]) => void;
}

const useTypeSenderStore = create<TypeSenderStore>((set) => ({
  savedTypeSenderLabels: [],
  setTypeSenderLabels: (opts) => set({ savedTypeSenderLabels: opts }),
}));

export const useTypeSender = (allData: any) => {
  const [typeSenderOptions, setTypeSenderOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getTypeSender, isTypeSenderLoading } = useFilters();
  const { savedTypeSenderLabels, setTypeSenderLabels } = useTypeSenderStore();

  const handleOpenTypeSenderSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getTypeSender(processFiltersDto(allData));
      const apiOptions = response.map(
        (typeSender: TypeSenderFilterResponse) => ({
          label: typeSender.typeProducts,
          value: String(JSON.stringify(typeSender.idTypeProducts || [])),
        })
      );
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
