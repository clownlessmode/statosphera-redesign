import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { CheckboxTree } from "@shared/ui/checkbox-tree";
import { FC, useEffect } from "react";
import { Form, FormField, FormControl, FormItem } from "@shared/ui/form";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { Badge } from "@shared/ui/badge";
import { useIndicatorList } from "../config";
import { useForm } from "../model";
import ClearFilters from "./clear-filter";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

const IndicatorsFilter: FC = () => {
  const { tab } = useTabStore();
  const indicators = useIndicatorList(tab);
  const { updateIndicators } = useFiltersStore();
  const form = useForm();

  useEffect(() => {
    const subscription = form.watch((values) => {
      const indicators = [...(values.proceeds || [])].filter(
        (item): item is string => item !== undefined
      );
      updateIndicators(indicators);
    });
    return () => subscription.unsubscribe();
  }, [form, updateIndicators]);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle className="flex flex-row items-center">
          Показатели
          {form.watch("proceeds")?.length > 0 && (
            <Badge className="ml-1 text-[10px]">
              Выбрано: {form.watch("proceeds")?.length}
            </Badge>
          )}
        </CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Получайте отчет по нужным показателям
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="proceeds"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckboxTree {...field} data={indicators} />
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

export default IndicatorsFilter;
