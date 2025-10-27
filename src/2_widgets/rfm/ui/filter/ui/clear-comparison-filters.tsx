import { useIsMobile } from "@shared/hooks/use-mobile";
import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FC } from "react";
import { FormComparisionValues } from "../config/types";
import { useComparisonFiltersStore } from "@widgets/rfm/model/comparision-filters-store";

// Универсальный компонент с ограничением на FieldValues
interface Props {
  form: UseFormReturn<FormComparisionValues>;
}

const ClearComparisonFilters: FC<Props> = ({ form }) => {
  const isMobile = useIsMobile();
  const { resetAll } = useComparisonFiltersStore();

  const handleClearFilters = () => {
    form.reset({
      firstSegment: {
        rfmCode: 111,
        age: [
          "<18",
          "18-25",
          "25-35",
          "35-45",
          "45-60",
          ">60",
          "Не указан возраст",
        ],
        sex: ["Мужской", "Женский", "Не определено"],
        period: "M0",
      },
      secondSegment: {
        rfmCode: 111,
        age: [
          "<18",
          "18-25",
          "25-35",
          "35-45",
          "45-60",
          ">60",
          "Не указан возраст",
        ],
        sex: ["Мужской", "Женский", "Не определено"],
        period: "M0",
      },
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

export default ClearComparisonFilters;
