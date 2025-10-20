import { Button } from "@shared/ui/button";
import { Label } from "@shared/ui/label";
import { Switch } from "@shared/ui/switch";
import React from "react";
import { useSummaryFiltersStore } from "@widgets/summary/sheet/model/filters-store";

export const PackageFilters: React.FC = () => {
  const packageFilter = useSummaryFiltersStore((state) => state.package);
  const updatePackage = useSummaryFiltersStore((state) => state.updatePackage);
  // const fastSearch = useSummaryFiltersStore((state) => state.fastSearch);
  // const updateFastSearch = useSummaryFiltersStore(
  //   (state) => state.updateFastSearch,
  // );

  return (
    <Button size={"default"} variant="outline">
      <Switch
        id="package"
        checked={!packageFilter}
        onCheckedChange={(checked) => updatePackage(!checked)}
      />
      <Label htmlFor="package">Скрыть пакеты</Label>
      {/* <Switch
        id="fastSearch"
        checked={fastSearch}
        onCheckedChange={(checked) => updateFastSearch(checked)}
      />
      <Label htmlFor="fastSearch">Быстрый поиск</Label> */}
    </Button>
  );
};

export default PackageFilters;
