import { Button } from "@shared/ui/button";
import { useStoresApplyStore } from "../model/stores-apply-store";
import { useStoresSheetStore } from "../model/stores-sheet-store";
import { cn } from "@shared/lib/utils";

interface SubmitButtonProps {
  className?: string;
}

export const SubmitButton = ({ className }: SubmitButtonProps) => {
  const { triggerApply } = useStoresApplyStore();
  const { setIsOpen } = useStoresSheetStore();

  const handleSubmit = () => {
    triggerApply();
    setIsOpen(false);
  };

  return (
    <Button
      onClick={handleSubmit}
      className={cn("w-full", className)}
      size="default"
    >
      Получить магазины
    </Button>
  );
};
