"use client";

import * as React from "react";
import MaskedInput from "react-text-mask";
import { Calendar } from "@shared/ui/calendar";
import { Input } from "@shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/popover";
import { cn } from "@shared/lib/utils";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  min?: Date;
  max?: Date;
}

export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(({ className, value, onChange, min, max, ...props }, ref) => {
  const formatRangeValue = (range: DateRange | undefined) => {
    if (!range) return "";
    const from = range.from ? format(range.from, "dd.MM.yyyy") : "";
    const to = range.to ? format(range.to, "dd.MM.yyyy") : "";
    return from || to ? `${from}${to ? ` – ${to}` : ""}` : "";
  };

  const [inputValue, setInputValue] = React.useState(formatRangeValue(value));

  React.useEffect(() => {
    setInputValue(formatRangeValue(value));
  }, [value]);

  const commitRange = () => {
    const parts = inputValue.split(" – ");
    const parsedFrom = parse(parts[0] || "", "dd.MM.yyyy", new Date());
    const parsedTo = parse(parts[1] || "", "dd.MM.yyyy", new Date());
    const newRange: DateRange = { from: undefined, to: undefined };
    if (!isNaN(parsedFrom.getTime())) newRange.from = parsedFrom;
    if (!isNaN(parsedTo.getTime())) newRange.to = parsedTo;
    if (newRange.from || newRange.to) onChange?.(newRange);
  };

  const mask = [
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    "–",
    " ",
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  // Регулярка полного ввода диапазона
  const fullPattern = /^\d{2}\.\d{2}\.\d{4} – \d{2}\.\d{2}\.\d{4}$/;

  return (
    <div className={cn("grid gap-2", className)} ref={ref} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative flex items-center w-full">
            <MaskedInput
              mask={mask}
              guide={false}
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value;
                setInputValue(val);
                if (fullPattern.test(val)) {
                  const parts = val.split(" – ");
                  const parsedFrom = parse(parts[0], "dd.MM.yyyy", new Date());
                  const parsedTo = parse(parts[1], "dd.MM.yyyy", new Date());
                  onChange?.({ from: parsedFrom, to: parsedTo });
                }
              }}
              onBlur={commitRange}
              render={(refInput: (el: any) => void, inputProps: any) => (
                <Input
                  {...inputProps}
                  placeholder="дд.MM.yyyy – дд.MM.yyyy"
                  className="pl-10 border border-input bg-background shadow-xs hover:border-muted-foreground rounded-md text-sm font-medium flex-1 cursor-text"
                  aria-label="Выбор диапазона дат"
                  ref={refInput as React.Ref<HTMLInputElement>}
                />
              )}
            />
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="center">
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            fromDate={min}
            toDate={max}
            onSelect={(range) => {
              onChange?.(range);
              setInputValue(formatRangeValue(range));
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";
