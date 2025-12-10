import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { CheckboxTree } from "@shared/ui/checkbox-tree";
import { FC, useEffect, useMemo } from "react";
import { Form, FormField, FormControl, FormItem } from "@shared/ui/form";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { Badge } from "@shared/ui/badge";
import { useIndicatorList } from "../config";
import { useForm } from "../model";
import ClearFilters from "./clear-filter";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useTypeCheckStore } from "../../grouping-filter/model/hooks/use-type-checked";
import { cn } from "@shared/lib/utils";
import { Sparkles } from "lucide-react";
import { COLUMN_KEY } from "@shared/constants/table-columns";

const IndicatorsFilter: FC = () => {
  const { tab } = useTabStore();
  const indicators = useIndicatorList(tab);
  const { updateIndicators } = useFiltersStore();
  const form = useForm();

  useEffect(() => {
    const subscription = form.watch((values) => {
      const indicators = [...(values.proceeds || [])].filter(
        (item): item is string => item !== undefined,
      );
      updateIndicators(indicators);
    });
    return () => subscription.unsubscribe();
  }, [form, updateIndicators]);

  const { isTypeCheckSelected } = useTypeCheckStore();

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
      {isTypeCheckSelected && (
        <CardContent className="bg-background mx-4 p-4 rounded-md border">
          <CardTitle className="mb-1 flex flex-row items-center gap-1">
            Показатели будут выбраны автоматически{" "}
            <Sparkles className="size-4 text-primary" />
          </CardTitle>
          <CardDescription>
            Выбрана группировка "Тип скидки". Показатели будут выбраны
            автоматически, но при необходимости вы всё ещё можете указать
            уникальные значения вручную.
          </CardDescription>
        </CardContent>
      )}
      <CardContent className="">
        <Form {...form}>
          <form
            className={cn(
              "flex flex-col gap-4 w-full",
              isTypeCheckSelected &&
                "cursor-not-allowed! opacity-50 hover:none! pointer-events-none",
            )}
          >
            <FormField
              control={form.control}
              name="proceeds"
              render={({ field }) => {
                // Определяем список групп бонусов
                const bonusGroupKeys = [
                  COLUMN_KEY.BONUS_ACCRUAL_GROUP,
                  COLUMN_KEY.BONUS_WRITEOFF_GROUP,
                  COLUMN_KEY.BONUS_ACCRUAL_PERCENT_GROUP,
                  COLUMN_KEY.BONUS_WRITEOFF_PERCENT_GROUP,
                ];

                const bonusChildrenKeys = indicators
                  .filter((group) =>
                    bonusGroupKeys.includes(
                      group.value as string as COLUMN_KEY,
                    ),
                  )
                  .flatMap((group) =>
                    group.children.map((child) => child.value),
                  );

                const currentValues = field.value || [];

                const hasBonusSelected = currentValues.some((val) =>
                  bonusChildrenKeys.includes(val),
                );

                const hasOtherSelected = currentValues.some(
                  (val) => !bonusChildrenKeys.includes(val),
                );

                const preparedData = useMemo(() => {
                  if (hasBonusSelected) {
                    return indicators.map((item) => ({
                      ...item,
                      disabled: !bonusGroupKeys.includes(
                        item.value as string as COLUMN_KEY,
                      ),
                    }));
                  } else if (hasOtherSelected) {
                    return indicators.map((item) => ({
                      ...item,
                      disabled: bonusGroupKeys.includes(
                        item.value as string as COLUMN_KEY,
                      ),
                    }));
                  } else {
                    return indicators;
                  }
                }, [indicators, hasBonusSelected, hasOtherSelected]);

                return (
                  <FormItem>
                    <FormControl>
                      <CheckboxTree
                        {...field}
                        data={preparedData}
                        disabled={isTypeCheckSelected}
                      />
                    </FormControl>
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

export default IndicatorsFilter;
