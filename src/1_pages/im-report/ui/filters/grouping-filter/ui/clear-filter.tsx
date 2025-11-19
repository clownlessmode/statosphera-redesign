import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC } from "react";
import { FormValues } from "../config";
import { UseFormReturn } from "react-hook-form";
import { useLoyaltyFiltersStore } from "../../filters-store";
import { useIsMobile } from "@shared/hooks/use-mobile";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ClearFilters: FC<Props> = ({ form }) => {
  const { updateGroups } = useLoyaltyFiltersStore();

  const handleClearFilters = () => {
    updateGroups([]);
    form.reset({
      days: [],
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
      {!isMobile && "Очистить фильтры"}
      <Eraser className="text-primary/80" />
    </Button>
  );
};

export default ClearFilters;
