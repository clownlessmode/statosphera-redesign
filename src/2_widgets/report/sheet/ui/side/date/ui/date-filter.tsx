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
  Undo,
} from "lucide-react";
import { FC, useEffect } from "react";
import useForm from "../model/hook";
import { DateRangePicker } from "@shared/ui/date-range-picker";
import { format, parseISO } from "date-fns";
import ClearFilters from "@features/clear-filters/ui/clear-filters";
import { dateRanges } from "@shared/lib/date-ranges";
import { useFiltersStore } from "../../../../model/filters-store";
import { DateRange } from "react-day-picker";
// const MIN_DATE = new Date(2018, 4, 1);
// const MAX_DATE = subDays(new Date(), 1);
const DateFilter: FC = () => {
  const form = useForm();
  const today = new Date();
  const { updateDateFilter } = useFiltersStore();

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
    });
    return () => subscription.unsubscribe();
  }, [form, updateDateFilter]);

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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DateFilter;
