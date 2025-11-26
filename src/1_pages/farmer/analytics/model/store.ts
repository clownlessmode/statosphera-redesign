import { create } from "zustand";

interface SheetState {
  targetTab: string | null;
  setTargetTab: (tab: string | null) => void;
}

export const useSheetStore = create<SheetState>((set) => ({
  targetTab: null,
  setTargetTab: (tab) => set({ targetTab: tab }),
}));
