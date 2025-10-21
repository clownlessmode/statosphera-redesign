import { create } from "zustand";

interface DropdownTourStore {
  isWaitingForDropdown: boolean;
  setIsWaitingForDropdown: (waiting: boolean) => void;
  reset: () => void;
}

export const useDropdownTourStore = create<DropdownTourStore>((set) => ({
  isWaitingForDropdown: false,
  setIsWaitingForDropdown: (waiting: boolean) => {
    console.log(
      "🔄 [DROPDOWN TOUR STORE] Setting isWaitingForDropdown:",
      waiting,
    );
    set({ isWaitingForDropdown: waiting });
  },
  reset: () => {
    console.log("🔄 [DROPDOWN TOUR STORE] Resetting");
    set({ isWaitingForDropdown: false });
  },
}));
