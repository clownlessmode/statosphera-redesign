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
      const response = await getNomenklatura(allData);
      const apiOptions = response.map(
        (Product: NomenklaturaFilterResponse) => ({
          label: Product.productName
            ? Product.productName
            : `Название не указано (ID: ${Product.idProduct})`,
          value: String(Product.idProduct?.[0] || ""),
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
