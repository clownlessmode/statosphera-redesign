import { useSession } from "@entities/session";
import { Button } from "@shared/ui/button";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { Plus, X } from "lucide-react";
import { create } from "zustand";

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

export const SelectMyShops = () => {
  const { session } = useSession();
  const { isMyShopsMode, toggleMyShopsMode } = useMyShopsStore();

  if (!session?.idStore?.length) return null;

  return (
    <Button
      className="w-full mb-6"
      variant={isMyShopsMode ? "default" : "outline"}
      onClick={() => toggleMyShopsMode(!isMyShopsMode)}
    >
      {isMyShopsMode ? "Снять выбор" : "Выбрать мои магазины"}
      {isMyShopsMode ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
    </Button>
  );
};
