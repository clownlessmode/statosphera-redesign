"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@shared/lib/utils";
import { buttonVariants } from "@shared/ui/button";
import { ru } from "date-fns/locale";

type CalendarWithYearSelectProps = React.ComponentProps<typeof DayPicker> & {
  minDate?: Date;
  maxDate?: Date;
};

function CalendarWithYearSelect({
  className,
  classNames,
  showOutsideDays = true,
  minDate,
  maxDate,
  ...props
}: CalendarWithYearSelectProps) {
  const selected = props.selected;
  const defaultMonth = props.defaultMonth;

  const [month, setMonth] = React.useState<Date>(
    defaultMonth ||
      (selected && typeof selected === "object" && "from" in selected
        ? selected.from
        : undefined) ||
      (selected instanceof Date ? selected : undefined) ||
      new Date(),
  );

  const goToPreviousYear = () => {
    const newDate = new Date(month);
    newDate.setFullYear(month.getFullYear() - 1);
    setMonth(newDate);
  };

  const goToNextYear = () => {
    const newDate = new Date(month);
    newDate.setFullYear(month.getFullYear() + 1);
    setMonth(newDate);
  };

  // Синхронизируем month с изменениями selected
  React.useEffect(() => {
    if (
      selected &&
      typeof selected === "object" &&
      "from" in selected &&
      selected.from
    ) {
      setMonth(selected.from);
    } else if (selected instanceof Date) {
      setMonth(selected);
    }
  }, [selected]);

  return (
    <DayPicker
      locale={ru}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      month={month}
      onMonthChange={setMonth}
      fromDate={minDate}
      toDate={maxDate}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex max-md:justify-center",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex max-md:justify-center w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:hover:bg-primary aria-selected:hover:text-primary-foreground aria-selected:focus:bg-primary aria-selected:focus:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:hover:bg-primary aria-selected:hover:text-primary-foreground aria-selected:focus:bg-primary aria-selected:focus:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="size-4" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="size-4" {...props} />
        ),
        Caption: ({ displayMonth }) => {
          // Показываем кнопки года только на краях
          const isFirstMonth =
            displayMonth.getMonth() === month.getMonth() &&
            displayMonth.getFullYear() === month.getFullYear();

          return (
            <div className="relative flex justify-center pt-1 items-center">
              {/* Кнопка предыдущего года - только на первом календаре */}
              {isFirstMonth && (
                <button
                  type="button"
                  onClick={goToPreviousYear}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-10",
                  )}
                  title="Предыдущий год"
                >
                  <ChevronsLeft className="size-4" />
                </button>
              )}

              {/* Кнопка следующего года - только на втором календаре */}
              {!isFirstMonth && (
                <button
                  type="button"
                  onClick={goToNextYear}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-10",
                  )}
                  title="Следующий год"
                >
                  <ChevronsRight className="size-4" />
                </button>
              )}
            </div>
          );
        },
      }}
      {...props}
    />
  );
}

export { CalendarWithYearSelect };
