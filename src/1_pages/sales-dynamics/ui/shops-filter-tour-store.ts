import { create } from "zustand";

interface ShopsFilterTourStore {
  isWaitingForShopsFilter: boolean;
  setIsWaitingForShopsFilter: (waiting: boolean) => void;
  reset: () => void;
}

export const useShopsFilterTourStore = create<ShopsFilterTourStore>((set) => ({
  isWaitingForShopsFilter: false,
  setIsWaitingForShopsFilter: (waiting: boolean) => {
    console.log(
      "🔄 [SHOPS FILTER TOUR STORE] Setting isWaitingForShopsFilter:",
      waiting,
    );
    set({ isWaitingForShopsFilter: waiting });
  },
  reset: () => {
    console.log("🔄 [SHOPS FILTER TOUR STORE] Resetting");
    set({ isWaitingForShopsFilter: false });
  },
}));
