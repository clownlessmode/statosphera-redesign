import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import { FormValues } from "@widgets/write-off/sheet/ui/side/products-filter/config";

const PARTNER_PRODUCT_FIELDS = [
  "idProduct",
  "subSubGroups",
  "subGroups",
  "idGroupMain",
  "directionProducts",
  "groupFranchise",
  "typeProducts",
] as const;

type Props = {
  form: UseFormReturn<FormValues>;
};

export const PartnerProductsClearFilter: FC<Props> = ({ form }) => {
  const { updateProductFilter } = useFiltersStore();
  const resetSignal = useFormResetStore((s) => s.resetSignal);
  const isMobile = useIsMobile();
  const didMountRef = useRef(false);

  const handleClear = () => {
    for (const field of PARTNER_PRODUCT_FIELDS) {
      updateProductFilter(field, []);
    }
    form.reset({
      ...form.getValues(),
      idProduct: [],
      subSubGroups: [],
      subGroups: [],
      idGroupMain: [],
      directionProducts: [],
      groupFranchise: [],
      typeProducts: [],
    });
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
