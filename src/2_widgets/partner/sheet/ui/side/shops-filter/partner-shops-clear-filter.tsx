import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import { FormValues } from "@widgets/write-off/sheet/ui/side/shops-filter/config";
import { useMyShopsStore } from "@widgets/write-off/sheet/ui/side/shops-filter/model/stores/use-my-shops";

type Props = {
  form: UseFormReturn<FormValues>;
};

export const PartnerShopsClearFilter: FC<Props> = ({ form }) => {
  const { updateStoreFilter } = useFiltersStore();
  const { toggleMyShopsMode } = useMyShopsStore();
  const resetSignal = useFormResetStore((s) => s.resetSignal);
  const isMobile = useIsMobile();
  const didMountRef = useRef(false);

  const handleClear = () => {
    toggleMyShopsMode(false);
    updateStoreFilter("idStore", []);
    form.reset({ ...form.getValues(), idStore: [] });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    handleClear();
  }, [resetSignal]);

  return (
    <Button
      type="button"
      size={isMobile ? "default" : "sm"}
      className="text-muted-foreground flex items-center justify-center"
      variant="outline"
      onClick={handleClear}
    >
      {!isMobile && "Очистить фильтры"}
      <Eraser className="text-primary/80" />
    </Button>
  );
};
