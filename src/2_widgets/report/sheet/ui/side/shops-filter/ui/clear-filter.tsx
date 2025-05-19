import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { FC, useEffect } from "react";

import { FormValues } from "../config";
import { UseFormReturn } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useMyShopsStore } from "../model/stores/use-my-shops";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ClearFilters: FC<Props> = ({ form }) => {
  const { updateStoreFilter } = useFiltersStore();
  const { toggleMyShopsMode } = useMyShopsStore();
  const resetSignal = useFormResetStore((s) => s.resetSignal);

  useEffect(() => {
    handleClearFilters();
  }, [resetSignal]);
  const handleClearFilters = () => {
    toggleMyShopsMode(false);
    updateStoreFilter("idStore", []);
    updateStoreFilter("idCity", []);
    updateStoreFilter("idRegion", []);
    updateStoreFilter("idManager", []);
    updateStoreFilter("storeCondition", []);
    updateStoreFilter("ageGroup", []);
    updateStoreFilter("idLegalEntity", []);
    updateStoreFilter("channel", []);
    updateStoreFilter("district", []);
    form.reset({
      idStore: [],
      idCity: [],
      idRegion: [],
      idManager: [],
      storeCondition: [],
      ageGroup: [],
      idLegalEntity: [],
      channel: [],
      district: [],
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
