import { FC, useEffect } from "react";
import { format, parse, parseISO, subDays, subMonths } from "date-fns";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { DateRangePicker } from "@shared/ui/date-range-picker";
import { TimeRangePicker } from "@shared/ui/time-range-picker";

// Store imports
import { useUnloadFilterStore } from "@widgets/unload/sheet/model/filters-store";

// Local imports
import { useForm } from "../model";
import {
  DATE_RANGES,
  MAX_DATE,
  MIN_DATE,
  PERIOD,
  TIME_RANGES,
} from "../config";
import ClearFilters from "./clear-filter";
import { DatePresetButtons } from "./date-presets-buttons";
import { TimePresetButtons } from "./time-presets-buttons";
import { MultiSelect } from "@shared/ui/multiselect";
import { useNameSegments } from "@widgets/rfm/ui/filter/model/hook";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { Separator } from "@shared/ui/separator";

const DateFilter: FC = () => {
  const form = useForm();
  const today = new Date();
  const { nameSegmentOptions, handleOpenNameSegment, isNameSegmentLoading } =
    useNameSegments();
  const { updateMainDataFilter, getApiPayload } = useUnloadFilterStore();

  let minDate = new Date(2018, 4, 1);
  let maxDate = subDays(new Date(), 1);

  useEffect(() => {
    const periods = getApiPayload().mainData.period;

    if (periods === "m0") {
      minDate = subMonths(today, 3);
      maxDate = today;
    } else if (periods === "m3") {
      minDate = subMonths(today, 6);
      maxDate = subMonths(today, 3);
    } else if (periods === "m6") {
      minDate = subMonths(today, 9);
      maxDate = subMonths(today, 6);
    }

    const subscription = form.watch((values) => {
      const dateStart = values.dateStart ? parseISO(values.dateStart) : null;
      const dateEnd = values.dateEnd ? parseISO(values.dateEnd) : null;

      // Validate date ranges
      if (dateStart && (dateStart < minDate || dateStart > maxDate)) {
        form.setValue("dateStart", format(maxDate, "yyyy-MM-dd"));
      }
      if (dateEnd && (dateEnd < minDate || dateEnd > maxDate)) {
        form.setValue("dateEnd", format(maxDate, "yyyy-MM-dd"));
      }

      updateMainDataFilter("dateStart", values.dateStart || "");
      updateMainDataFilter("dateEnd", values.dateEnd || "");
      updateMainDataFilter("timeStart", values.timeStart || "");
      updateMainDataFilter("timeEnd", values.timeEnd || "");
    });
    return () => subscription.unsubscribe();
  }, [form, getApiPayload, updateMainDataFilter]);

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
        <CardTitle>Основная информация</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Фильтруйте данные по времени, сегментам, периоду или дате
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
                          updateMainDataFilter("rfmList", numericValues);
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
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Период</FormLabel>
                  <FormControl>
                    <BooleanCheckboxCard
                      {...field}
                      options={PERIOD}
                      onChange={(value) => {
                        field.onChange(value);
                        updateMainDataFilter("period", value);
                      }}
                      className="grid-cols-3"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

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

            <Separator />

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
