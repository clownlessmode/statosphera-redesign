// stores-sheet-store.ts - Store для управления состоянием Sheet магазинов

import { create } from "zustand";

type StoresSheetState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSheet: () => void;
};

export const useStoresSheetStore = create<StoresSheetState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleSheet: () => set((state) => ({ isOpen: !state.isOpen })),
}));
