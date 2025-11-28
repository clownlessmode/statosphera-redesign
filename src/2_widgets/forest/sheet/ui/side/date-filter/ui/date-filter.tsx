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
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import { DateRangePicker } from "@shared/ui/date-range-picker";
import { TimeRangePicker } from "@shared/ui/time-range-picker";

// Store imports
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";

// Local imports
import { useForm } from "../model";
import { DATE_RANGES, MAX_DATE, MIN_DATE, TIME_RANGES } from "../config";
import ClearFilters from "./clear-filter";
import { DatePresetButtons } from "./date-presets-buttons";
import { TimePresetButtons } from "./time-presets-buttons";

const DateFilter: FC = () => {
  // Form and stores initialization
  const form = useForm();
  const { tab } = useTabStore();
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
        <CardTitle>Дата</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по дате и времени</CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
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
            {tab === "check" && (
              <>
                <FormField
                  control={form.control}
                  name="timeStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>
                        Промежуток времени
                      </FormLabel>
                      <TimeRangePicker
                        from={
                          field.value
                            ? parse(field.value, "HH:mm", new Date())
                            : undefined
                        }
                        to={
                          form.getValues("timeEnd")
                            ? parse(
                                form.getValues("timeEnd"),
                                "HH:mm",
                                new Date(),
                              )
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
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DateFilter;
