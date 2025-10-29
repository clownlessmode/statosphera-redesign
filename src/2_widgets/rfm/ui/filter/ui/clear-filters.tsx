import { useFiltersStore } from "@widgets/rfm/model/filters-store";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FC } from "react";
import { FormValues } from "../config/types";

// Универсальный компонент с ограничением на FieldValues
interface Props {
  form: UseFormReturn<FormValues>;
}

const ClearFilters: FC<Props> = ({ form }) => {
  const isMobile = useIsMobile();
  const { resetAll } = useFiltersStore();

  const handleClearFilters = () => {
    form.reset({
      rfmList: [],
      agePeriods: [],
      sex: [],
      period: "M0",
      sankey: "M-3 -> M0",
      heatmap: "M-3 -> M0",
    });
    resetAll();
  };

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
