import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC, useEffect, useRef } from "react";

import { FormValues } from "../config";
import { UseFormReturn } from "react-hook-form";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useUnloadFilterStore } from "@widgets/unload/sheet/model/filters-store";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ClearFilters: FC<Props> = ({ form }) => {
  const { updateClientsFilter } = useUnloadFilterStore();

  const resetSignal = useFormResetStore((s) => s.resetSignal);

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return; // ⛔ пропускаем первое срабатывание
    }
    handleClearFilters(); // ✅ вызываем только после нажатия "Очистить все фильтры"
  }, [resetSignal]);
  const handleClearFilters = () => {
    updateClientsFilter("ageEnd", 100);
    updateClientsFilter("ageStart", 0);
    updateClientsFilter("sex", []);
    updateClientsFilter("guidDiscount", []);
    updateClientsFilter("guidBonus", []);
    updateClientsFilter("frequency", { from: null, to: null });
    updateClientsFilter("totalPurchase", { from: null, to: null });
    updateClientsFilter("proceedPerCheck", { from: null, to: null });
    updateClientsFilter("avgCheckLen", { from: null, to: null });
    updateClientsFilter("avg", { from: null, to: null });
    updateClientsFilter("countBonus", { from: null, to: null });
    updateClientsFilter("ageAccount", {
      from: { years: null, months: null, days: null },
      to: { years: null, months: null, days: null },
    });
    form.reset({
      age: [0, 100],
    });
  };
  const isMobile = useIsMobile();
  return (
    <Button
      size={isMobile ? "default" : "sm"}
      className="text-muted-foreground flex items-center justify-center"
      variant="outline"
      onClick={handleClearFilters}
    >
      {!isMobile && "Очистить фильтры"} <Eraser className="text-primary/80" />
    </Button>
  );
};

export default ClearFilters;
