import { Button } from "@shared/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { CheckboxTree } from "@shared/ui/checkbox-tree";

import { FC } from "react";
import { useIndicatorList } from "../model/list";
import ClearFilters from "@features/clear-filters/ui/clear-filters";
import useForm from "../model/hook";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@shared/ui/form";

const Indicators: FC = () => {
  const indicators = useIndicatorList();
  const form = useForm();

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
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="proceeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Показатели</FormLabel>
                  <FormControl>
                    <CheckboxTree
                      data={indicators}
                      initialCheckedItems={field.value || []}
                      onCheckedChange={field.onChange}
                    />
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
