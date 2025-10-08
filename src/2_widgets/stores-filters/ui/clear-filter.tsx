import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { StoresFilterFormValues, defaultValues } from "../config";
import { useStoresFiltersStore } from "../model/stores-filters-store";

interface ClearFiltersProps {
  form: UseFormReturn<StoresFilterFormValues>;
}

const ClearFilters = ({ form }: ClearFiltersProps) => {
  const { resetAllFilters } = useStoresFiltersStore();

  const handleClear = () => {
    form.reset(defaultValues);
    resetAllFilters();
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClear}
      className="flex items-center gap-1"
    >
      <Eraser className="size-4" />
      Очистить
    </Button>
  );
};

export default ClearFilters;
