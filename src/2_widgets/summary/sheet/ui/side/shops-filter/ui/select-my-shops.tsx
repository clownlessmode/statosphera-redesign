import { useSession } from "@entities/session";
import { Button } from "@shared/ui/button";
import { Plus, X } from "lucide-react";
import { useMyShopsStore } from "../model/stores/use-my-shops";

export const SelectMyShops = () => {
  const { session } = useSession();
  const { isMyShopsMode, toggleMyShopsMode } = useMyShopsStore();

  if (!session?.idStore?.length) return null;

  return (
    <Button
      className="w-full mb-6 text-[12px]"
      variant={isMyShopsMode ? "default" : "outline"}
      onClick={() => toggleMyShopsMode(!isMyShopsMode)}
    >
      {isMyShopsMode ? "Снять выбор" : "Выбрать мои магазины"}
      {isMyShopsMode ? <X className="w-4 h-4" /> : <Plus className="w-2 h-2" />}
    </Button>
  );
};
