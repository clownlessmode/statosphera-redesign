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
  Eraser,
  Flag,
  History,
  Undo,
} from "lucide-react";

import { FC } from "react";

import DateRangePicker from "@shared/ui/date-range-picker";
import useForm from "../model/hook";
import {
  endOfMonth,
  endOfQuarter,
  format,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";

const DateFilter: FC = () => {
  const form = useForm();

  const setDateRange = (start: Date, end: Date) => {
    form.setValue("dateStart", format(start, "yyyy-MM-dd"));
    form.setValue("dateEnd", format(end, "yyyy-MM-dd"));
  };

  const today = new Date();

  const handleHalfYear = () => {
    const start = subMonths(today, 6);
    setDateRange(start, today);
  };

  const handleStartOfYear = () => {
    const start = startOfYear(today);
    setDateRange(start, today);
  };

  const handleCurrentQuarter = () => {
    const start = startOfQuarter(today);
    const end = endOfQuarter(today);
    setDateRange(start, end);
  };

  const handleCurrentMonth = () => {
    const start = startOfMonth(today);
    const end = subDays(today, 1); // до вчерашнего дня
    setDateRange(start, end);
  };

  const handleLastWeek = () => {
    const end = subDays(today, 1);
    const start = subWeeks(end, 1);
    setDateRange(start, end);
  };

  const handleLastMonth = () => {
    const start = startOfMonth(subMonths(today, 1));
    const end = endOfMonth(subMonths(today, 1));
    setDateRange(start, end);
  };
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Дата</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по дате и времени</CardDescription>
          <Button
            size={"sm"}
            className="text-muted-foreground"
            variant={"outline"}
          >
            Очистить фильтры <Eraser className="text-primary/80" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 w-full"
            // onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="dateStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Промежуток даты</FormLabel>
                  <DateRangePicker {...field} className="w-full" />
                </FormItem>
              )}
            />
            <div className="w-full grid grid-cols-3 gap-2 mt-2">
              <Button type="button" onClick={handleHalfYear}>
                <CalendarRange className="h-4 w-4 mr-1" /> Полгода
              </Button>
              <Button type="button" onClick={handleStartOfYear}>
                <Flag className="h-4 w-4 mr-1" /> Начало года
              </Button>
              <Button type="button" onClick={handleCurrentQuarter}>
                <BarChart3 className="h-4 w-4 mr-1" /> Текущий квартал
              </Button>
              <Button type="button" onClick={handleCurrentMonth}>
                <CalendarIcon className="h-4 w-4 mr-1" /> Текущий месяц
              </Button>
              <Button type="button" onClick={handleLastWeek}>
                <Undo className="h-4 w-4 mr-1" /> Прошлая неделя
              </Button>
              <Button type="button" onClick={handleLastMonth}>
                <History className="h-4 w-4 mr-1" /> Прошлый месяц
              </Button>
            </div>
            {/* <div className="flex flex-row gap-1 items-end w-full">
              <FormField
                control={form.control}
                name="timeStart"
                render={({ field }) => (
                  <FormItem className="mt-4 w-full">
                    <FormLabel htmlFor={field.name}>
                      Промежуток времени
                    </FormLabel>
                    <TimePicker {...field} className="w-full" />
                  </FormItem>
                )}
              />
              <p className="pb-2 font-light text-muted-foreground">––––</p>
              <FormField
                control={form.control}
                name="timeEnd"
                render={({ field }) => (
                  <FormItem className="mt-4 w-full">
                    <FormLabel htmlFor={field.name} className="opacity-0">
                      Промежуток времени
                    </FormLabel>
                    <TimePicker
                      disabled
                      value={null}
                      {...field}
                      className="w-full"
                    />
                  </FormItem>
                )}
              />
            </div> */}
            {/* <div className="w-full grid grid-cols-3 gap-2">
              <Button>
                Утро <Sunrise />
              </Button>
              <Button>
                День <Sun />
              </Button>
              <Button>
                Вечер <Sunset />
              </Button>
            </div> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DateFilter;
