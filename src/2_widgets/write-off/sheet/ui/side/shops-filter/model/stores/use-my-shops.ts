import { create } from "zustand";
import { MultiSelectOption } from "@shared/ui/multiselect";

interface MyShopsStore {
  selectedShops: MultiSelectOption[];
  isMyShopsMode: boolean;
  updateSelectedShops: (shops: MultiSelectOption[]) => void;
  toggleMyShopsMode: (enabled: boolean) => void;
}

export const useMyShopsStore = create<MyShopsStore>((set) => ({
  selectedShops: [],
  isMyShopsMode: false,
  updateSelectedShops: (shops) => set({ selectedShops: shops }),
  toggleMyShopsMode: (enabled) => set({ isMyShopsMode: enabled }),
}));
