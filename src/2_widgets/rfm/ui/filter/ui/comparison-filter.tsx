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
import {
  useAgePeriods,
  useComparasionForm,
  useNameSegments,
} from "../model/hook";

import { MultiSelect } from "@shared/ui/multiselect";
//import { useIsMobile } from "@shared/hooks/use-mobile";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { PERIOD, SEX } from "../config/constants";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { format, subMonths } from "date-fns";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { useEffect } from "react";
import { useComparisonFiltersStore } from "@widgets/rfm/model/comparision-filters-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import ClearComparisonFilters from "./clear-comparison-filters";
import { Separator } from "@shared/ui/separator";

export default function ComparisonFilter() {
  const { updateFilters, getApiPayload } = useComparisonFiltersStore();
  const { nameSegmentOptions, handleOpenNameSegment, isNameSegmentLoading } =
    useNameSegments();
  const { agePeriodsOptions, handleOpenAgePeriods, isAgePeriodsLoading } =
    useAgePeriods();
  const form = useComparasionForm();

  const today = new Date();
  const m0 = `${format(subMonths(today, 3), "dd.MM.yyyy")} - ${format(today, "dd.MM.yyyy")}`;
  const m3 = `${format(subMonths(today, 6), "dd.MM.yyyy")} - ${format(subMonths(today, 3), "dd.MM.yyyy")}`;
  const m6 = `${format(subMonths(today, 9), "dd.MM.yyyy")} - ${format(subMonths(today, 6), "dd.MM.yyyy")}`;

  useEffect(() => {
    const filters = getApiPayload();
    form.setValue("firstSegment.rfmCode", filters.firstSegment.rfmCode);
    form.setValue("secondSegment.rfmCode", filters.secondSegment.rfmCode);
    form.setValue("firstSegment.sex", filters.firstSegment.sex);
    form.setValue("secondSegment.sex", filters.secondSegment.sex);
  }, [form, updateFilters]);

  return (
    <Card className="w-full max-md:overflow-y-auto scrollbar-hide">
      <CardHeader>
        <CardTitle>Фильтры</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Выбирайте параметры для сравнения сегментов
          </CardDescription>
          <ClearComparisonFilters form={form} />
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="firstSegment.rfmCode"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Первый сегмент</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value ?? "")}
                        disabled={isNameSegmentLoading}
                        onOpenChange={(open) => handleOpenNameSegment(open)}
                        defaultValue={String(field.value)}
                        onValueChange={(value) => {
                          field.onChange(Number(value));
                          updateFilters("firstSegment", {
                            ...form.getValues("firstSegment"),
                            rfmCode: Number(value),
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сегменты">
                            {field.value}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {nameSegmentOptions.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={String(opt.value)}
                            >
                              {opt.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="firstSegment.age"
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
                          updateFilters("firstSegment", {
                            ...form.getValues("firstSegment"),
                            age: value,
                          });
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
              name="firstSegment.sex"
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
                        updateFilters("firstSegment", {
                          ...form.getValues("firstSegment"),
                          sex: values,
                        });
                      }}
                      className="grid-cols-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstSegment.period"
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
                      disableCheck
                      onChange={(value) => {
                        field.onChange(value);
                        updateFilters("firstSegment", {
                          ...form.getValues("firstSegment"),
                          sex: value,
                        });
                      }}
                      className="grid-cols-3"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Separator className="hidden max-md:flex my-2" />
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="secondSegment.rfmCode"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Второй сегмент</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value ?? "")}
                        disabled={isNameSegmentLoading}
                        onOpenChange={(open) => handleOpenNameSegment(open)}
                        defaultValue={String(field.value)}
                        onValueChange={(value) => {
                          field.onChange(Number(value));
                          updateFilters("secondSegment", {
                            ...form.getValues("secondSegment"),
                            rfmCode: Number(value),
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сегменты">
                            {field.value}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {nameSegmentOptions.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={String(opt.value)}
                            >
                              {opt.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="secondSegment.age"
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
                          updateFilters("secondSegment", {
                            ...form.getValues("secondSegment"),
                            age: value,
                          });
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
              name="secondSegment.sex"
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
                        updateFilters("secondSegment", {
                          ...form.getValues("secondSegment"),
                          sex: values,
                        });
                      }}
                      className="grid-cols-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondSegment.period"
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
                      disableCheck
                      onChange={(value) => {
                        field.onChange(value);
                        updateFilters("secondSegment", {
                          ...form.getValues("secondSegment"),
                          period: value,
                        });
                      }}
                      className="grid-cols-3"
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
