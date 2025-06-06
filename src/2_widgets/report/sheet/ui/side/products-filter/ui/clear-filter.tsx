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
  const { updateProductFilter } = useFiltersStore();
  const resetSignal = useFormResetStore((s) => s.resetSignal);

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return; // ⛔ пропускаем первое срабатывание
    }
    handleClearFilters(); // ✅ вызываем только после нажатия "Очистить все фильтры"
  }, [resetSignal]);
  const handleClearFilters = () => {
    updateProductFilter("groupFranchise", []);
    updateProductFilter("ppProducts", null);
    updateProductFilter("subDivisionProducts", []);
    updateProductFilter("subGroups", []);
    updateProductFilter("subSubGroups", []);
    updateProductFilter("typeProducts", []);
    updateProductFilter("teamProducts", []);
    updateProductFilter("directionProducts", []);
    updateProductFilter("groupsEconomist", []);
    updateProductFilter("idGroupMain", []);
    updateProductFilter("idProduct", []);
    updateProductFilter("seasonalityProducts", []);
    updateProductFilter("managerAuto", []);
    form.reset({
      groupFranchise: [],
      ppProducts: null,
      subDivisionProducts: [],
      subGroups: [],
      subSubGroups: [],
      typeProducts: [],
      teamProducts: [],
      directionProducts: [],
      groupsEconomist: [],
      idGroupMain: [],
      idProduct: [],
      seasonalityProducts: [],
      managerAuto: [],
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
