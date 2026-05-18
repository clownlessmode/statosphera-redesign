import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { CheckboxTree } from "@shared/ui/checkbox-tree";
import { Badge } from "@shared/ui/badge";
import { Form, FormControl, FormField, FormItem } from "@shared/ui/form";
import { FC, useEffect } from "react";

import { PARTNER_INDICATORS_TREE } from "../config";
import type { PartnerMetric } from "@pages/partner/api/types";
import { usePartnerFiltersStore } from "@pages/partner/model/filters-store";
import { useForm } from "../model";
import ClearFilters from "./clear-filter";

const MetricsFilter: FC = () => {
  const form = useForm();
  const { setValues } = usePartnerFiltersStore();
  const selectedCount = form.watch("values")?.length ?? 0;

  useEffect(() => {
    const subscription = form.watch((values) => {
      const next = [...(values.values || [])].filter(
        (item): item is string => item !== undefined,
      );

      const current = usePartnerFiltersStore.getState().values;
      const same =
        next.length === current.length &&
        next.every((v, i) => v === current[i]);

      if (!same) {
        setValues(next as PartnerMetric[]);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, setValues]);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle className="flex flex-row items-center">
          Показатели
          {selectedCount > 0 && (
            <Badge className="ml-1 text-[10px]">Выбрано: {selectedCount}</Badge>
          )}
        </CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Получайте отчет по нужным показателям
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="values"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckboxTree {...field} data={PARTNER_INDICATORS_TREE} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MetricsFilter;
