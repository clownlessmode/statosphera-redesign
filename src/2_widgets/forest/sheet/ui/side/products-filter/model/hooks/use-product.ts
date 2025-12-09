import { processFiltersDto } from "@entities/forest/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/products/controller";
import { NomenklaturaFilterResponse } from "@entities/forest/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import { useFiltersWriteOff } from "@entities/forest/model/api/filters/products-write-off/controller";

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
  const tab = useTabStore((state) => state.tab);
  const { getNomenklatura, isNomenklaturaLoading } = useFilters();
  const {
    getNomenklatura: getNomenklaturaWriteOff,
    isNomenklaturaLoading: isNomenklaturaLoadingWriteOff,
  } = useFiltersWriteOff();
  const { savedProductLabels, setProductLabels } = useProductStore();

  const handleOpenProductSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response =
        tab === "write-off"
          ? await getNomenklaturaWriteOff(processFiltersDto(allData))
          : await getNomenklatura(processFiltersDto(allData));
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
    isProductLoading:
      tab === "write-off"
        ? isNomenklaturaLoadingWriteOff
        : isNomenklaturaLoading,
    savedProductLabels,
  };
};
