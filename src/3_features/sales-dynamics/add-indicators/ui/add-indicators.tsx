import { Button } from "@shared/ui/button";
import { CheckboxTree, CheckboxTreeItem } from "@shared/ui/checkbox-tree";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@shared/ui/form";

import { Eraser, Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { FC, useEffect, useState } from "react";
import { useIndicatorList } from "../model/list";
import { FormValues } from "../model/types";
import { ScrollArea } from "@shared/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../model/schema";
import { useForm } from "react-hook-form";
import { useSalesDynamicsIndicatorsController } from "../model/api/controller";
import { Group, UpdateIndicatorsRequest } from "../model/api/types";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";
interface Props {
  defaultValues: string[];
}
export function buildSalesDynamics(
  selected: string[],
  tree: CheckboxTreeItem[]
): Group[] {
  const groups: Group[] = tree.map((groupItem, groupIndex) => ({
    name: groupItem.value,
    order: groupIndex,
    columns: (groupItem.children ?? []).map((colItem) => ({
      name: colItem.value,
      active: selected.includes(colItem.value),
    })),
  }));

  return groups;
}
const AddIndicators: FC<Props> = ({ defaultValues }) => {
  const { updateValues } = useSalesDynamicsFiltersStore();
  useSalesDynamicsFiltersStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { indicators_and_groups: defaultValues },
    mode: "all",
  });
  const { reset } = form;

  useEffect(() => {
    reset({ indicators_and_groups: defaultValues });
  }, [defaultValues, reset]);

  const [isOpen, setIsOpen] = useState(false);
  const { updateIndicators, isUpdateIndicatorsLoading } =
    useSalesDynamicsIndicatorsController();
  const indicators = useIndicatorList();

  const onSubmit = async (data: FormValues) => {
    setIsOpen(false);

    console.table({
      groups: buildSalesDynamics(data.indicators_and_groups, indicators),
    });

    const payload: UpdateIndicatorsRequest = {
      groups: buildSalesDynamics(data.indicators_and_groups, indicators),
    };

    await updateIndicators(payload);
    updateValues(data.indicators_and_groups);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4" /> Добавить группы и показатели
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-xl border-none">
        <Card className="w-full mr-4">
          <CardHeader>
            <CardTitle>Группы и показатели</CardTitle>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <CardDescription>
                Выберите группы и показатели для добавления в фильтрацию
              </CardDescription>
              <Button
                size="sm"
                className="text-muted-foreground"
                variant="outline"
                onClick={() => {
                  reset({ indicators_and_groups: ["proceeds"] });
                }}
              >
                Очистить фильтры <Eraser className="text-primary/80" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="">
            <ScrollArea className="h-[50vh]">
              <Form {...form}>
                <form
                  className="flex flex-col gap-4 w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="indicators_and_groups"
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
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              onClick={() => onSubmit(form.getValues())}
              disabled={isUpdateIndicatorsLoading}
            >
              Добавить
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AddIndicators;
