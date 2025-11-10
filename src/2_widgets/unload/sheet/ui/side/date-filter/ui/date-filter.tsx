import { FC, useEffect } from "react";
import { format, parse, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Form,
  //FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { DateRangePicker } from "@shared/ui/date-range-picker";
import { TimeRangePicker } from "@shared/ui/time-range-picker";

// Store imports
import { useFiltersStore } from "../../../../model/filters-store";

// Local imports
import { useForm } from "../model";
import { DATE_RANGES, MAX_DATE, MIN_DATE, TIME_RANGES } from "../config";
import ClearFilters from "./clear-filter";
import { DatePresetButtons } from "./date-presets-buttons";
import { TimePresetButtons } from "./time-presets-buttons";
//import { Input } from "@shared/ui/input";

const DateFilter: FC = () => {
  // Form and stores initialization
  const form = useForm();
  const today = new Date();
  const { updateDateFilter, updateTimeFilter } = useFiltersStore();

  // Form watch effect
  useEffect(() => {
    const subscription = form.watch((values) => {
      const dateStart = values.dateStart ? parseISO(values.dateStart) : null;
      const dateEnd = values.dateEnd ? parseISO(values.dateEnd) : null;

      // Validate date ranges
      if (dateStart && (dateStart < MIN_DATE || dateStart > MAX_DATE)) {
        form.setValue("dateStart", format(MAX_DATE, "yyyy-MM-dd"));
      }
      if (dateEnd && (dateEnd < MIN_DATE || dateEnd > MAX_DATE)) {
        form.setValue("dateEnd", format(MAX_DATE, "yyyy-MM-dd"));
      }

      updateDateFilter(values.dateStart || "", values.dateEnd || "");
      updateTimeFilter(values.timeStart || "", values.timeEnd || "");
    });
    return () => subscription.unsubscribe();
  }, [form, updateDateFilter, updateTimeFilter]);

  // Handler functions
  const handleTimeButtonClick = (key: keyof typeof TIME_RANGES) => {
    const [start, end] = TIME_RANGES[key];
    form.setValue("timeStart", start);
    form.setValue("timeEnd", end);
  };

  const setDateRange = (start: Date, end: Date) => {
    form.setValue("dateStart", format(start, "yyyy-MM-dd"));
    form.setValue("dateEnd", format(end, "yyyy-MM-dd"));
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range.to) {
      setDateRange(range.from, range.to);
    } else if (range?.from) {
      form.setValue("dateStart", format(range.from, "yyyy-MM-dd"));
      form.setValue("dateEnd", "");
    } else {
      form.setValue("dateStart", "");
      form.setValue("dateEnd", "");
    }
  };

  const handleButtonClick = (handlerKey: keyof typeof DATE_RANGES) => {
    const { start, end } = DATE_RANGES[handlerKey](today);
    setDateRange(start, end);
  };

  // Derived values
  const dateRangeValue = {
    from: form.getValues("dateStart")
      ? parseISO(form.getValues("dateStart"))
      : undefined,
    to: form.getValues("dateEnd")
      ? parseISO(form.getValues("dateEnd"))
      : undefined,
  };

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Покупки</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Фильтруйте данные по дате, времени и сумме
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            {/* Сумма покупки */}
            {/*<FormField
              control={form.control}
              name="totalPurchase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сумма</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 w-full **:[appearance:textfield] **:[&::-webkit-outer-spin-button]:appearance-none **:[&::-webkit-inner-spin-button]:appearance-none">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm text-muted-foreground">
                          от
                        </span>
                        <Input
                          type="number"
                          min={0}
                          step={1}
                          className="flex-1"
                          value={field.value?.[0] ?? ""}
                          onKeyDown={(e) => {
                            // Разрешаем: цифры, Backspace, Delete, Tab, Escape, Enter, стрелки
                            if (
                              !/[0-9]/.test(e.key) &&
                              !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) &&
                              !(e.ctrlKey || e.metaKey) && // Разрешаем Ctrl/Cmd + A, C, V, X
                              !(e.key === 'a' && (e.ctrlKey || e.metaKey)) &&
                              !(e.key === 'c' && (e.ctrlKey || e.metaKey)) &&
                              !(e.key === 'v' && (e.ctrlKey || e.metaKey)) &&
                              !(e.key === 'x' && (e.ctrlKey || e.metaKey))
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            const currentMax = field.value?.[1] ?? Infinity;
                            const inputValue = Number(e.target.value);
                            // Обрабатываем пустое значение
                            if (isNaN(inputValue) || e.target.value === "") {
                              const min = undefined;
                              const max =
                                currentMax === Infinity
                                  ? undefined
                                  : currentMax;
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", undefined);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity || max === undefined
                                  ? undefined
                                  : max
                              );
                              return;
                            }
                            // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                            const min = Math.max(
                              0,
                              Math.min(currentMax, inputValue)
                            );
                            const max =
                              currentMax === Infinity ? inputValue : currentMax;
                            const newValue = [min, max];
                            field.onChange(newValue);
                            updateLoyalFilter("ageStart", min);
                            updateLoyalFilter(
                              "ageEnd",
                              max === Infinity ? min : max
                            );
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm text-muted-foreground">
                          до
                        </span>
                        <Input
                          type="number"
                          min={0}
                          step={1}
                          className="flex-1"
                          value={field.value?.[1] ?? ""}
                          onChange={(e) => {
                            const currentMin = field.value?.[0] ?? 0;
                            const inputValue = Number(e.target.value);
                            // Ограничиваем максимальное значение: не меньше текущего минимума
                            const min = currentMin;
                            const max = isNaN(inputValue)
                              ? Infinity
                              : Math.max(currentMin, inputValue);
                            const newValue = [min, max];
                            field.onChange(newValue);
                            updateLoyalFilter("ageStart", min);
                            updateLoyalFilter(
                              "ageEnd",
                              max === Infinity ? min : max
                            );
                          }}
                        />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />*/}
            {/* Date Range Section */}
            <FormField
              control={form.control}
              name="dateStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Промежуток даты</FormLabel>
                  <DateRangePicker
                    min={MIN_DATE}
                    max={MAX_DATE}
                    onChange={handleDateRangeChange}
                    className="w-full"
                    value={dateRangeValue}
                  />
                </FormItem>
              )}
            />

            {/* Date Preset Buttons */}
            <DatePresetButtons onPresetSelect={handleButtonClick} />

            {/* Time Range Section (only for 'check' tab) */}
            <FormField
              control={form.control}
              name="timeStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Промежуток времени</FormLabel>
                  <TimeRangePicker
                    from={
                      field.value
                        ? parse(field.value, "HH:mm", new Date())
                        : undefined
                    }
                    to={
                      form.getValues("timeEnd")
                        ? parse(form.getValues("timeEnd"), "HH:mm", new Date())
                        : undefined
                    }
                    onFromChange={(date: Date) =>
                      field.onChange(format(date, "HH:mm"))
                    }
                    onToChange={(date: Date) =>
                      form.setValue("timeEnd", format(date, "HH:mm"))
                    }
                    className="w-full"
                  />
                </FormItem>
              )}
            />

            {/* Time Preset Buttons */}
            <TimePresetButtons onPresetSelect={handleTimeButtonClick} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DateFilter;
