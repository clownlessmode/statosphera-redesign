import { Button } from "@shared/ui/button";
import { Label } from "@shared/ui/label";
import { Switch } from "@shared/ui/switch";
import React from "react";

export const PackageFilters: React.FC = () => {
  // TODO: Temporary commented out until store is fixed
  // const packageFilter = useSummaryFiltersStore((state) => state.package);
  // const updatePackage = useSummaryFiltersStore((state) => state.updatePackage);

  return (
    <Button variant="outline">
      <Switch
        id="package"
        checked={false}
        onCheckedChange={() => console.log("TODO: implement package filter")}
      />
      <Label htmlFor="package">Скрыть пакеты</Label>
    </Button>
  );
};

export default PackageFilters;
