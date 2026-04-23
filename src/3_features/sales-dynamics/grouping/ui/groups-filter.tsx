import { Button } from "@shared/ui/button";
import { CircleDotDashed } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { FC, useEffect, useMemo, useState } from "react";
import { ClearFilters } from "@features/clear-filters";
import { useForm } from "../model/hook";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";
import { GEO, SHOP } from "../config";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { MapPin, Store } from "lucide-react";
import { useIsMobile } from "@shared/hooks/use-mobile";

const GroupingFilter: FC = () => {
  const form = useForm();
  const { updateGroups } = useSalesDynamicsFiltersStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    const subscription = form.watch((values) => {
      const groups = [...(values.geo || []), ...(values.store || [])].filter(
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
          name: "geo",
          label: "Местоположение",
          icon: <MapPin />,
          options: GEO,
          visible: true,
        },
        {
          name: "store",
          label: "Магазин",
          icon: <Store />,
          options: SHOP,
          visible: true,
        },
      ] as const,
    [],
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" data-testid="days-filter">
          <CircleDotDashed /> {!isMobile && "Группировка"}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 rounded-xl border-none"
        data-testid="days-filter-modal"
        aria-describedby={undefined}
      >
        <Card className="w-full mr-4">
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
                              onChange={(newValues) => {
                                if (newValues.length === 0) return;

                                const addedValue = newValues.find(
                                  (v) => !(field.value || []).includes(v),
                                );
                                if (addedValue) {
                                  field.onChange([addedValue]);
                                  filterFields.forEach((f) => {
                                    if (f.name !== name) {
                                      form.setValue(
                                        f.name as "geo" | "store",
                                        [],
                                      );
                                    }
                                  });
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
