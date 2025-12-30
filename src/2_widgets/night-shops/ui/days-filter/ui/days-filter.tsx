import { Button } from "@shared/ui/button";
import { CalendarDays } from "lucide-react";
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
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";

import { useState } from "react";
import { ClearFilters } from "@features/clear-filters";
import { DateRangePicker } from "@shared/ui/date-range-picker";
import { format, parseISO } from "date-fns";
import { dateRanges } from "@shared/lib/date-ranges";
import { DateRange } from "react-day-picker";
import useForm from "../model/use-form";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useNightStoresFiltersStore } from "@widgets/night-shops/model/filters-store";
import { MIN_DATE, MAX_DATE } from "../config/constant";

const DaysFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const form = useForm();
  const today = new Date();
  const { updateDateFilter } = useNightStoresFiltersStore();

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

  const handleApply = () => {
    const values = form.getValues();
    updateDateFilter(values.dateStart || "", values.dateEnd || "");
    setIsOpen(false);
  };

  const dateStart = form.watch("dateStart");
  const dateEnd = form.watch("dateEnd");

  const dateRangeValue = {
    from: dateStart ? parseISO(dateStart) : undefined,
    to: dateEnd ? parseISO(dateEnd) : undefined,
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={isMobile ? "default" : "sm"}>
          <CalendarDays />{" "}
          {isMobile ? (
            "Дата"
          ) : (
            <>
              {form.getValues("dateStart")
                ? format(parseISO(form.getValues("dateStart")), "dd.MM.yyyy")
                : ""}{" "}
              –{" "}
              {form.getValues("dateEnd")
                ? format(parseISO(form.getValues("dateEnd")), "dd.MM.yyyy")
                : "Даты"}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 rounded-xl border-none"
        aria-describedby={undefined}
      >
        <Card className="w-full mr-4">
          <CardHeader>
            <CardTitle>Дата</CardTitle>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <CardDescription>
                Фильтруйте данные по дате и времени
              </CardDescription>
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
                      <FormLabel htmlFor={field.name}>
                        Промежуток даты
                      </FormLabel>
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
                <div className="w-full grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
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
                <div className="flex flex-row gap-2 justify-end mt-4 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  >
                    Отмена
                  </Button>
                  <Button
                    type="button"
                    disabled={!dateStart || !dateEnd}
                    onClick={handleApply}
                    className="w-full"
                  >
                    Применить
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default DaysFilter;
