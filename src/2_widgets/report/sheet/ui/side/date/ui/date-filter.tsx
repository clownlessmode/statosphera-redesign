import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import {
  BarChart3,
  CalendarIcon,
  CalendarRange,
  Flag,
  History,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  Undo,
} from "lucide-react";
import { FC, useEffect } from "react";
import useForm from "../model/hook";
import { DateRangePicker } from "@shared/ui/date-range-picker";
import { format, parse, parseISO, subDays } from "date-fns";
import ClearFilters from "@features/clear-filters/ui/clear-filters";
import { dateRanges } from "@shared/lib/date-ranges";
import { useFiltersStore } from "../../../../model/filters-store";
import { DateRange } from "react-day-picker";
import { TimeRangePicker } from "@shared/ui/time-range-picker";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";

const MIN_DATE = new Date(2018, 4, 1);
const MAX_DATE = subDays(new Date(), 1);
const timeRanges: Record<string, [string, string]> = {
  morning: ["06:00", "12:00"],
  day: ["12:00", "18:00"],
  evening: ["18:00", "00:00"],
  night: ["00:00", "06:00"],
};
const DateFilter: FC = () => {
  const form = useForm();
  const addReset = useFormResetStore((s) => s.addReset);
  const removeReset = useFormResetStore((s) => s.removeReset);

  useEffect(() => {
    addReset(form.reset);
    return () => {
      removeReset(form.reset);
    };
  }, [form.reset, addReset, removeReset]);
  const { tab } = useTabStore();
  const today = new Date();
  const { updateDateFilter, updateTimeFilter } = useFiltersStore();
  const handleTimeButtonClick = (key: keyof typeof timeRanges) => {
    const [start, end] = timeRanges[key];
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

  const handleButtonClick = (handlerKey: keyof typeof dateRanges) => {
    const { start, end } = dateRanges[handlerKey](today);
    setDateRange(start, end);
  };

  useEffect(() => {
    const subscription = form.watch((values) => {
      updateDateFilter(values.dateStart || "", values.dateEnd || "");
      updateTimeFilter(values.timeStart || "", values.timeEnd || "");
    });
    return () => subscription.unsubscribe();
  }, [form, updateDateFilter, updateTimeFilter]);

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

            <div className="w-full grid grid-cols-3 gap-2 mt-2">
              <Button
                type="button"
                onClick={() => handleButtonClick("halfYear")}
              >
                <CalendarRange className="h-4 w-4 mr-1" /> Полгода
              </Button>
              <Button
                type="button"
                onClick={() => handleButtonClick("startOfYear")}
              >
                <Flag className="h-4 w-4 mr-1" /> Начало года
              </Button>
              <Button
                type="button"
                onClick={() => handleButtonClick("currentQuarter")}
              >
                <BarChart3 className="h-4 w-4 mr-1" /> Текущий квартал
              </Button>
              <Button
                type="button"
                onClick={() => handleButtonClick("currentMonth")}
              >
                <CalendarIcon className="h-4 w-4 mr-1" /> Текущий месяц
              </Button>
              <Button
                type="button"
                onClick={() => handleButtonClick("lastWeek")}
              >
                <Undo className="h-4 w-4 mr-1" /> Прошлая неделя
              </Button>
              <Button
                type="button"
                onClick={() => handleButtonClick("lastMonth")}
              >
                <History className="h-4 w-4 mr-1" /> Прошлый месяц
              </Button>
            </div>
            {tab === "check" && (
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
                              new Date()
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
            )}
            {tab === "check" && (
              <div className="w-full grid grid-cols-4 gap-2 mt-2">
                <Button
                  type="button"
                  onClick={() => handleTimeButtonClick("morning")}
                >
                  <Sunrise className="h-4 w-4 mr-1" /> Утро
                </Button>
                <Button
                  type="button"
                  onClick={() => handleTimeButtonClick("day")}
                >
                  <Sun className="h-4 w-4 mr-1" /> День
                </Button>
                <Button
                  type="button"
                  onClick={() => handleTimeButtonClick("evening")}
                >
                  <Sunset className="h-4 w-4 mr-1" /> Вечер
                </Button>
                <Button
                  type="button"
                  onClick={() => handleTimeButtonClick("night")}
                >
                  <Moon className="h-4 w-4 mr-1" /> Ночь
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DateFilter;
