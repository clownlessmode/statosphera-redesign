"use client";

import * as React from "react";
import { Button } from "@shared/ui/button";
import { Calendar } from "@shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/popover";
import { cn } from "@shared/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(({ className, value, onChange, ...props }, ref) => {
  return (
    <div className={cn("grid gap-2", className)} ref={ref} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "dd.MM.yyyy")} –{" "}
                  {format(value.to, "dd.MM.yyyy")}
                </>
              ) : (
                format(value.from, "dd.MM.yyyy")
              )
            ) : (
              <span>Выберите дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";
