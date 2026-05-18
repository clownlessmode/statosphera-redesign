import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { usePartnerFiltersStore } from "@pages/partner/model/filters-store";
import { FormValues } from "../config";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ClearFilters: FC<Props> = ({ form }) => {
  const { setGroup } = usePartnerFiltersStore();
  const resetSignal = useFormResetStore((s) => s.resetSignal);
  const isMobile = useIsMobile();
  const didMountRef = useRef(false);

  const handleClearFilters = () => {
    setGroup([]);
    form.reset({
      days: [],
      store: [],
      product: [],
    });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    handleClearFilters();
  }, [resetSignal]);

  return (
    <Button
      type="button"
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
