import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC, useEffect, useRef } from "react";
import { FormValues } from "../config";
import { UseFormReturn } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { useIsMobile } from "@shared/hooks/use-mobile";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ClearFilters: FC<Props> = ({ form }) => {
  const { updateGroups } = useFiltersStore();
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
    updateGroups([]);
    form.reset({
      days: [],
      channel: [],
      geo: [],
      store: [],
      product: [],
      loyal: [],
      personal: [],
      online: [],
      id: [],
    });
  };
  const isMobile = useIsMobile();
  return (
    <Button
      size="sm"
      className="text-muted-foreground"
      variant="outline"
      onClick={handleClearFilters}
    >
      {isMobile ? "" : "Очистить фильтры"}{" "}
      <Eraser className="text-primary/80" />
    </Button>
  );
};

export default ClearFilters;
