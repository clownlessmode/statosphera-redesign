import { Button } from "@shared/ui/button";
import { Label } from "@shared/ui/label";
import { Switch } from "@shared/ui/switch";
import React from "react";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";

export const Lfl: React.FC = () => {
  // separate selectors for flag and updater to avoid unnecessary renders
  const lfl = useSalesDynamicsFiltersStore((state) => state.lfl);
  const updateLfl = useSalesDynamicsFiltersStore((state) => state.updateLfl);

  return (
    <Button variant="outline" asChild data-testid="lfl-filter">
      <div>
        <Switch id="lfl" checked={lfl} onCheckedChange={updateLfl} />
        <Label htmlFor="lfl">LFL</Label>
      </div>
    </Button>
  );
};

export default Lfl;
