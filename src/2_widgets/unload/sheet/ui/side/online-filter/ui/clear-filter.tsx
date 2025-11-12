import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC, useEffect, useRef } from "react";
import { FormValues } from "../config";
import { UseFormReturn } from "react-hook-form";
import { useFormResetStore } from "@widgets/unload/sheet/model/reset-store";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useUnloadFilterStore } from "@widgets/unload/sheet/model/filters-store";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ClearFilters: FC<Props> = ({ form }) => {
  const { updateOnlineStoreFilter } = useUnloadFilterStore();

  const resetSignal = useFormResetStore((s) => s.resetSignal);

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    handleClearFilters();
  }, [resetSignal]);
  const handleClearFilters = () => {
    updateOnlineStoreFilter("isIm", null);
    updateOnlineStoreFilter("imTypeOrder", [] as any);
    updateOnlineStoreFilter("imDeliveryMethod", [] as any);
    updateOnlineStoreFilter("imPaymentMethod", [] as any);
    updateOnlineStoreFilter("imStatusOrder", []);
    updateOnlineStoreFilter("imReceiveInterval", []);
    updateOnlineStoreFilter("imPromo", []);
    form.reset({
      isIm: null,
      imTypeOrder: [],
      imDeliveryMethod: [],
      imPaymentMethod: [],
      imStatusOrder: [],
      imReceiveInterval: [],
      imPromo: [],
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
      {!isMobile && "Очистить фильтры"} <Eraser className="text-primary/80" />
    </Button>
  );
};

export default ClearFilters;
