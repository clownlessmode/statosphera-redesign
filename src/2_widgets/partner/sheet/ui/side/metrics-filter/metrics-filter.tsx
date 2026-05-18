import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { CheckboxTree } from "@shared/ui/checkbox-tree";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import {
  DEFAULT_PARTNER_VALUES,
  usePartnerFiltersStore,
} from "@pages/partner/model/filters-store";
import type { PartnerMetric } from "@pages/partner/api/types";
import { PARTNER_INDICATORS_TREE } from "./config";

export const PartnerMetricsFilter = () => {
  const { values, setValues } = usePartnerFiltersStore();

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle className="flex flex-row items-center">
          Показатели
          {values.length > 0 && (
            <Badge className="ml-1 text-[10px]">Выбрано: {values.length}</Badge>
          )}
        </CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Метрики колонок таблицы (отдельно от графика)
          </CardDescription>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => setValues([...DEFAULT_PARTNER_VALUES])}
          >
            <Eraser className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CheckboxTree
          data={PARTNER_INDICATORS_TREE}
          value={values as string[]}
          onChange={(v) => setValues(v as PartnerMetric[])}
        />
        <p className="mt-4 text-xs text-muted-foreground">
          На графике доступны другие метрики — выбираются над графиком после
          построения отчёта.
        </p>
      </CardContent>
    </Card>
  );
};
