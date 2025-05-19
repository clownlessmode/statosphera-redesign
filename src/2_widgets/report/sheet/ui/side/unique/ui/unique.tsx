import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { CheckboxTree } from "@shared/ui/checkbox-tree";

import { FC, useEffect } from "react";
import { useUniqueValues } from "../model/list";
import ClearFilters from "@features/clear-filters/ui/clear-filters";
import useForm from "../model/hook";
import { Form, FormControl, FormField, FormItem } from "@shared/ui/form";
import { useFiltersStore } from "../../../../model/filters-store";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { Badge } from "@shared/ui/badge";
const Unique: FC = () => {
  const { tab } = useTabStore();
  const uniques = useUniqueValues(tab);
  const { updateUniques } = useFiltersStore();
  const form = useForm();

  useEffect(() => {
    const subscription = form.watch((values) => {
      const unique = [...(values.proceeds || [])].filter(
        (item): item is string => item !== undefined
      );
      updateUniques(unique);
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
            Получайте нужные данные по уникальным значениям
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

export default Unique;
