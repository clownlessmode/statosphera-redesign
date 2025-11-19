import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import { Calendar, Layers3 } from "lucide-react";

import { FC, useEffect, useMemo, useState } from "react";

import { DAYS } from "../config";
import { useLoyaltyFiltersStore } from "../../filters-store";
import { useForm } from "../model";
import ClearFilters from "./clear-filter";
import { Button } from "@shared/ui/button";
import { Badge } from "@shared/ui/badge";
import { useIsMobile } from "@shared/hooks/use-mobile";

const GroupingFilter: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm();

  const { updateGroups } = useLoyaltyFiltersStore();

  useEffect(() => {
    const subscription = form.watch((values) => {
      const groups = [...(values.days || [])].filter(
        (item): item is string => item !== undefined,
      );

      updateGroups(groups);
    });
    return () => subscription.unsubscribe();
  }, [form, updateGroups]);

  const filterFields = useMemo(
    () =>
      [
        {
          name: "days",
          label: "Дата",
          icon: <Calendar />,
          options: DAYS,
          visible: true,
        },
      ] as const,
    [],
  );

  const selectedGroups = useLoyaltyFiltersStore((state) => state.groups);
  const isMobile = useIsMobile();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={isMobile ? "default" : "sm"}>
          <Layers3 />{" "}
          {isMobile ? (
            <span className="max-xs:hidden">Группировки</span>
          ) : (
            "Группировки"
          )}
          {selectedGroups.length > 0 && <Badge>{selectedGroups.length}</Badge>}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 max-xxs:h-[calc(100vh-128px)] max-md:h-max rounded-xl border-none">
        <Card className="w-full mr-4 max-md:overflow-y-auto scrollbar-hide">
          <CardHeader>
            <CardTitle>Группировка</CardTitle>
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
                {filterFields.map(
                  ({ name, label, icon, options, visible }) =>
                    visible && (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {icon} {label}
                            </FormLabel>
                            <CheckboxCards
                              {...field}
                              disableCheck
                              onChange={(values) => {
                                // Ограничиваем выбор только одной группировкой
                                const currentValue = field.value || [];

                                if (values.length === 0) {
                                  // Если массив пустой - очищаем выбор
                                  field.onChange([]);
                                } else if (values.length === 1) {
                                  // Если выбрана одна опция - проверяем, была ли она уже выбрана
                                  if (currentValue.includes(values[0])) {
                                    // Если кликнули на уже выбранную - снимаем выбор
                                    field.onChange([]);
                                  } else {
                                    // Если выбрали новую - используем её
                                    field.onChange(values);
                                  }
                                } else {
                                  // Если выбрано несколько опций - определяем, какая была добавлена
                                  const addedValue = values.find(
                                    (v) => !currentValue.includes(v),
                                  );

                                  if (addedValue) {
                                    // Если нашли новую опцию - оставляем только её
                                    field.onChange([addedValue]);
                                  } else {
                                    // Если новой опции нет, значит удалили одну из выбранных
                                    // Оставляем первую из оставшихся или очищаем
                                    field.onChange(
                                      values.length > 0 ? [values[0]] : [],
                                    );
                                  }
                                }
                              }}
                              options={options}
                              className={"grid-cols-2"}
                            />
                          </FormItem>
                        )}
                      />
                    ),
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default GroupingFilter;
