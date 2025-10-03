import { create } from "zustand";

interface SelectedProductState {
  selectedProduct: number | null;
  selectedProducts: number[];
  setSelectedProduct: (productId: number | null) => void;
  setSelectedProducts: (productIds: number[]) => void;
  toggleProductSelection: (productId: number) => void;
  selectAllProducts: (productIds: number[]) => void;
  clearSelectedProduct: () => void;
  clearAllSelectedProducts: () => void;
}

export const useSelectedProductStore = create<SelectedProductState>(
  (set, get) => ({
    selectedProduct: null,
    selectedProducts: [],
    setSelectedProduct: (productId) => set({ selectedProduct: productId }),
    setSelectedProducts: (productIds) => set({ selectedProducts: productIds }),
    toggleProductSelection: (productId) => {
      const { selectedProducts } = get();
      const isSelected = selectedProducts.includes(productId);

      if (isSelected) {
        const newSelectedProducts = selectedProducts.filter(
          (id) => id !== productId,
        );
        set({
          selectedProducts: newSelectedProducts,
          selectedProduct:
            newSelectedProducts.length > 0 ? newSelectedProducts[0] : null,
        });
      } else {
        const newSelectedProducts = [...selectedProducts, productId];
        set({
          selectedProducts: newSelectedProducts,
          selectedProduct: productId,
        });
      }
    },
    selectAllProducts: (productIds) =>
      set({
        selectedProducts: productIds,
        selectedProduct: productIds.length > 0 ? productIds[0] : null,
      }),
    clearSelectedProduct: () => set({ selectedProduct: null }),
    clearAllSelectedProducts: () =>
      set({
        selectedProduct: null,
        selectedProducts: [],
      }),
  }),
);
