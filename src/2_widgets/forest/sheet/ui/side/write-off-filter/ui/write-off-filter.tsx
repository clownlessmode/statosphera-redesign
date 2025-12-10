import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import { Receipt } from "lucide-react";
import { FC } from "react";
import { useForm } from "../model";
import { WRITE_OFF_ACCOUNTS } from "../config/constants";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { ClearFilters } from "@features/clear-filters";

export const WriteOffFilter: FC = () => {
  const form = useForm();
  const { updateWriteoffFilter } = useFiltersStore();

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Типы списаний</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Выберите типы списаний для анализа</CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="idAccount"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <Receipt className="inline mr-2" />
                      Причины списания
                    </FormLabel>
                    <CheckboxCards
                      {...field}
                      value={field.value?.map(String) || []}
                      options={WRITE_OFF_ACCOUNTS.map((item) => ({
                        ...item,
                        value: String(item.value),
                      }))}
                      onChange={(values) => {
                        const numeric = values.map(Number);
                        field.onChange(numeric);
                        updateWriteoffFilter("idAccount", numeric);
                      }}
                      className="grid-cols-1"
                    />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
