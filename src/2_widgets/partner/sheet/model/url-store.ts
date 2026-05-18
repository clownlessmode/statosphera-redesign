import { create } from "zustand";

type PartnerUrlState = {
  targetViewValue: string | null;
  setTargetViewValue: (v: string | null) => void;
};

export const usePartnerUrlStore = create<PartnerUrlState>((set) => ({
  targetViewValue: null,
  setTargetViewValue: (targetViewValue) => set({ targetViewValue }),
}));
