import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { UseFormReturn, FieldValues } from "react-hook-form";

// Универсальный компонент с ограничением на FieldValues
interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
}

const ClearFilters = <T extends FieldValues>({ form }: Props<T>) => {
  const handleClearFilters = () => {
    form.reset();
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
