import { create } from "zustand";

interface SelectedProductState {
  selectedProduct: number | null;
  setSelectedProduct: (productId: number | null) => void;
  clearSelectedProduct: () => void;
}

export const useSelectedProductStore = create<SelectedProductState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (productId) => set({ selectedProduct: productId }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));
