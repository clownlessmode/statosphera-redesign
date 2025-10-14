import { useRfmFiltersStore } from "@pages/rfm/ui/filters/filters-store";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { UseFormReturn, FieldValues } from "react-hook-form";

// Универсальный компонент с ограничением на FieldValues
interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
}

const ClearFilters = <T extends FieldValues>({ form }: Props<T>) => {
  const { resetAll } = useRfmFiltersStore();
  const handleClearFilters = () => {
    form.reset();
    resetAll();
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
