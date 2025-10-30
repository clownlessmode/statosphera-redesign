import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { Info } from "lucide-react";
import useForm, { useAgePeriods, useNameSegments } from "../model/hook";

import { MultiSelect } from "@shared/ui/multiselect";
//import { useIsMobile } from "@shared/hooks/use-mobile";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import {
  DYNAMICS_PERIOD_HEATTMAP,
  DYNAMICS_PERIOD_SANKEY,
  PERIOD,
  SEX,
} from "../config/constants";
import { useFiltersStore } from "@widgets/rfm/model/filters-store";
import ClearFilters from "./clear-filters";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { format, subMonths } from "date-fns";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { useEffect } from "react";

export default function RfmFilter() {
  const { updateFilters, getApiPayload } = useFiltersStore();
  const { nameSegmentOptions, handleOpenNameSegment, isNameSegmentLoading } =
    useNameSegments();
  const { agePeriodsOptions, handleOpenAgePeriods, isAgePeriodsLoading } =
    useAgePeriods();
  const form = useForm();

  const today = new Date();
  const m0 = `${format(subMonths(today, 3), "dd.MM.yyyy")} - ${format(today, "dd.MM.yyyy")}`;
  const m3 = `${format(subMonths(today, 6), "dd.MM.yyyy")} - ${format(subMonths(today, 3), "dd.MM.yyyy")}`;
  const m6 = `${format(subMonths(today, 9), "dd.MM.yyyy")} - ${format(subMonths(today, 6), "dd.MM.yyyy")}`;

  useEffect(() => {
    const filters = getApiPayload();
    form.setValue("sex", filters.sex);
  }, [form, updateFilters]);

  return (
    <Card className="w-full md:mr-4 max-md:overflow-y-auto scrollbar-hide">
      <CardHeader>
        <CardTitle>Фильтры</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Фильтруйте данные по сегментам и периоду
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="rfmList"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Сегменты</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value?.map(String) || []}
                        options={nameSegmentOptions}
                        isLoading={isNameSegmentLoading}
                        onOpenChange={(open) => handleOpenNameSegment(open)}
                        onValueChange={(value) => {
                          const numericValues = value.map(Number);
                          field.onChange(numericValues);
                          updateFilters("rfmList", numericValues);
                        }}
                        defaultValue={field.value?.map(String)}
                        placeholder="Выберите сегменты"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="agePeriods"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Возраст</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value?.map(String) || []}
                        options={agePeriodsOptions}
                        isLoading={isAgePeriodsLoading}
                        onOpenChange={(open) => handleOpenAgePeriods(open)}
                        onValueChange={(value) => {
                          field.onChange(value);
                          updateFilters("agePeriods", value);
                        }}
                        defaultValue={field.value?.map(String)}
                        placeholder="Выберите возраст"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пол</FormLabel>
                  <FormControl>
                    <CheckboxCards
                      {...field}
                      options={SEX}
                      disableCheck
                      onChange={(values) => {
                        field.onChange(values);
                        updateFilters("sex", values);
                      }}
                      className="grid-cols-3 max-md:grid-cols-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex flex-row">
                      Период
                      <Tooltip>
                        <TooltipTrigger className="ml-1" asChild>
                          <Info className="h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent
                          sideOffset={10}
                          className="w-max h-fit p-3 text-center flex flex-col"
                          side="right"
                        >
                          <span>M0: {m0}</span>
                          <span>M-3: {m3}</span>
                          <span>M-6: {m6}</span>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <BooleanCheckboxCard
                      {...field}
                      options={PERIOD}
                      onChange={(value) => {
                        field.onChange(value);
                        updateFilters("period", value);
                      }}
                      className="grid-cols-3"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sankey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Диаграмма потоков</FormLabel>
                  <FormControl>
                    <BooleanCheckboxCard
                      {...field}
                      options={DYNAMICS_PERIOD_SANKEY}
                      onChange={(value) => {
                        field.onChange(value);
                        updateFilters("sankey", value);
                      }}
                      className="grid-cols-2 max-xxs:grid-cols-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heatmap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тепловая карта</FormLabel>
                  <FormControl>
                    <BooleanCheckboxCard
                      {...field}
                      options={DYNAMICS_PERIOD_HEATTMAP}
                      onChange={(value) => {
                        field.onChange(value);
                        updateFilters("heatmap", value);
                      }}
                      className="grid-cols-3 max-xxs:grid-cols-1"
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
}
