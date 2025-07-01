import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { NomenklaturaFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface ProductStore {
  savedProductLabels: MultiSelectOption[];
  setProductLabels: (opts: MultiSelectOption[]) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  savedProductLabels: [],
  setProductLabels: (opts) => set({ savedProductLabels: opts }),
}));

export const useProduct = (allData: any) => {
  const [productOptions, setProductOptions] = useState<MultiSelectOption[]>([]);
  const { getNomenklatura, isNomenklaturaLoading } = useFilters();
  const { savedProductLabels, setProductLabels } = useProductStore();

  const handleOpenProductSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getNomenklatura(processFiltersDto(allData));
      const apiOptions = response.map(
        (product: NomenklaturaFilterResponse) => ({
          label: product.productName
            ? product.productName
            : `Название не указано (ID: ${product.idProduct})`,
          value: String(JSON.stringify(product.idProduct || [])),
        }),
      );
      setProductOptions(apiOptions);
      setProductLabels(apiOptions);
    } catch (error) {
      setProductOptions([]);
      setProductLabels([]);
      console.error("Ошибка при загрузке номенклатуры:", error);
    }
  };

  return {
    handleOpenProductSelect,
    productOptions,
    isProductLoading: isNomenklaturaLoading,
    savedProductLabels,
  };
};
