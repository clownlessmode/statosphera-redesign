import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC, useEffect } from "react";
import { FormValues } from "../config";
import { UseFormReturn } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ClearFilters: FC<Props> = ({ form }) => {
  const { updateGroups } = useFiltersStore();
  const resetSignal = useFormResetStore((s) => s.resetSignal);

  useEffect(() => {
    handleClearFilters();
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

  return (
    <Button
      size="sm"
      className="text-muted-foreground"
      variant="outline"
      onClick={handleClearFilters}
    >
      Очистить фильтры <Eraser className="text-primary/80" />
    </Button>
  );
};

export default ClearFilters;
