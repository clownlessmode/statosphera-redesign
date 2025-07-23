// store.ts
import { create } from "zustand";

type TabState = {
  tab: "write-off" | "write-off-equip";
  setTab: (tab: "write-off" | "write-off-equip") => void;

  group: string;
  setGroup: (group: string) => void;

  // Add state for the target ViewTabs value to scroll to
  targetViewValue: string | null;
  setTargetViewValue: (value: string | null) => void;
};

export const useTabStore = create<TabState>((set) => ({
  tab: "write-off",
  setTab: (tab) => set({ tab }),

  group: "data",
  setGroup: (group) => set({ group }),

  // Initialize new state
  targetViewValue: null,
  setTargetViewValue: (value) => set({ targetViewValue: value }),
}));
