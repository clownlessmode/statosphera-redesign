import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ClearFiltersProps {
  form: UseFormReturn<any>;
}

const ClearFilters: React.FC<ClearFiltersProps> = ({ form }) => {
  const handleClear = () => {
    form.reset();
  };

  return (
    <Button
      onClick={handleClear}
      size="sm"
      variant="outline"
      className="flex items-center gap-1"
    >
      <Eraser className="h-3 w-3" />
      Очистить
    </Button>
  );
};

export default ClearFilters;
