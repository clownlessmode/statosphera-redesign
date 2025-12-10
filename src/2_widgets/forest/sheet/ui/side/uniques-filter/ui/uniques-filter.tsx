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
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import { Badge } from "@shared/ui/badge";
import { useUniqueValues } from "../config";
import { useForm } from "../model";
import ClearFilters from "./clear-filter";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { cn } from "@shared/lib/utils";

export const UniqueFilters: FC = () => {
  const { tab } = useTabStore();
  const uniques = useUniqueValues(tab);
  const { updateUniques } = useFiltersStore();
  const form = useForm();

  useEffect(() => {
    const subscription = form.watch((values) => {
      const uniques = [...(values.proceeds || [])].filter(
        (item): item is string => item !== undefined,
      );
      updateUniques(uniques);
    });
    return () => subscription.unsubscribe();
  }, [form, updateUniques]);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle className="flex flex-row items-center">
          Уникальные значения
          {form.watch("proceeds")?.length > 0 && (
            <Badge className="ml-1 text-[10px]">
              Выбрано: {form.watch("proceeds")?.length}
            </Badge>
          )}
        </CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Получайте отчет по нужным уникальным значениям
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>

      <CardContent className="">
        <Form {...form}>
          <form className={cn("flex flex-col gap-4 w-full")}>
            <FormField
              control={form.control}
              name="proceeds"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckboxTree {...field} data={uniques} />
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
