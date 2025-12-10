import { processFiltersDto } from "@entities/forest/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/check/controller";
import { DiscountTypeFilterResponse } from "@entities/forest/model/api/filters/check/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface DiscountTypeStore {
  savedDiscountTypeLabels: MultiSelectOption[];
  setDiscountTypeLabels: (opts: MultiSelectOption[]) => void;
}

const useDiscountTypeStore = create<DiscountTypeStore>((set) => ({
  savedDiscountTypeLabels: [],
  setDiscountTypeLabels: (opts) => set({ savedDiscountTypeLabels: opts }),
}));

export const useDiscountType = (allData: any) => {
  const [discountTypeOptions, setDiscountTypeOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getDiscountType, isDiscountTypeLoading } = useFilters();
  const { savedDiscountTypeLabels, setDiscountTypeLabels } =
    useDiscountTypeStore();

  const handleOpenDiscountTypeSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getDiscountType(processFiltersDto(allData));
      const apiOptions = response.map(
        (discountType: DiscountTypeFilterResponse) => ({
          label: discountType.discountType || "Название не указано",
          value: String(discountType.discountType || ""),
        }),
      );
      setDiscountTypeOptions(apiOptions);
      setDiscountTypeLabels(apiOptions);
    } catch (error) {
      setDiscountTypeOptions([]);
      setDiscountTypeLabels([]);
      console.error("Ошибка при загрузке скидок:", error);
    }
  };

  return {
    handleOpenDiscountTypeSelect,
    discountTypeOptions,
    isDiscountTypeLoading,
    savedDiscountTypeLabels,
  };
};
