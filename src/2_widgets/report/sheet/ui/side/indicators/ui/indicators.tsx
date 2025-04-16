import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { CheckboxTree } from "@shared/ui/checkbox-tree";

import { FC, useEffect } from "react";
import { useIndicatorList } from "../model/list";
import ClearFilters from "@features/clear-filters/ui/clear-filters";
import useForm from "../model/hook";
import { Form, FormField, FormControl, FormItem } from "@shared/ui/form";
import { useFiltersStore } from "../../../commerce/model/store";

const Indicators: FC = () => {
  const indicators = useIndicatorList();
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
        <CardTitle>Показатели</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Группируйте данные по нужным столбцам
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

export default Indicators;
