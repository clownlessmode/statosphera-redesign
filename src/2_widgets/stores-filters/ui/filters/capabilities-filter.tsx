import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@shared/ui/form";
import { FC } from "react";
import { BOOLEAN_OPTIONS, CAPABILITIES_FILTERS } from "../../config";
import { useForm } from "../../model/hooks";
import { useStoresFiltersStore } from "../../model/stores-filters-store";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";

export const CapabilitiesFilter: FC = () => {
  const form = useForm();
  const { updateFilter } = useStoresFiltersStore();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Возможности магазина</CardTitle>
          <CardDescription>
            Фильтруйте по функциональным возможностям магазинов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-4 w-full">
              {CAPABILITIES_FILTERS.map((filter) => (
                <FormField
                  key={filter.key}
                  control={form.control}
                  name={filter.key as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{filter.label}</FormLabel>
                      <FormControl>
                        <BooleanCheckboxCard
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            updateFilter(filter.key as any, value);
                          }}
                          options={BOOLEAN_OPTIONS.map((opt) => ({
                            ...opt,
                            icon: opt.value ? filter.icon : undefined,
                          }))}
                          disableCheck
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
