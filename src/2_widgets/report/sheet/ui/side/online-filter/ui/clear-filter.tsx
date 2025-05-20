import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC, useEffect, useRef } from "react";

import { FormValues } from "../config";
import { UseFormReturn } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ClearFilters: FC<Props> = ({ form }) => {
  const { updateOnlineStoreFilter } = useFiltersStore();

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
      imTypeOrder: "all",
      imDeliveryMethod: "all",
      imPaymentMethod: "all",
      imStatusOrder: [],
      imReceiveInterval: [],
      imPromo: [],
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
