"use client";

import * as React from "react";
import MaskedInput from "react-text-mask";
import { CalendarWithYearSelect } from "@shared/ui/calendar-with-year-select";
import { Input } from "@shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/popover";
import { cn } from "@shared/lib/utils";
import { format, parse, isValid, isBefore, isAfter } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { useIsMobile } from "@shared/hooks/use-mobile";

interface DateRangePickerWithYearProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  min?: Date;
  max?: Date;
}

export const DateRangePickerWithYear = React.forwardRef<
  HTMLDivElement,
  DateRangePickerWithYearProps
>(({ className, value, onChange, min, max, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

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

  const validateDate = (date: Date): Date | null => {
    if (!isValid(date)) return null;

    if (min && isBefore(date, min)) {
      return min;
    }

    if (max && isAfter(date, max)) {
      return max;
    }

    return date;
  };

  const commitRange = () => {
    const parts = inputValue.split(" – ");
    if (parts.length !== 2) {
      setInputValue(formatRangeValue(value));
      return;
    }

    const parsedFrom = parse(parts[0], "dd.MM.yyyy", new Date());
    const parsedTo = parse(parts[1], "dd.MM.yyyy", new Date());

    const validatedFrom = validateDate(parsedFrom);
    const validatedTo = validateDate(parsedTo);

    if (validatedFrom && validatedTo) {
      let from = validatedFrom;
      let to = validatedTo;

      if (isAfter(from, to)) {
        [from, to] = [to, from];
      }

      onChange?.({ from, to });
      setInputValue(formatRangeValue({ from, to }));
    } else {
      setInputValue(formatRangeValue(value));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitRange();
      setIsOpen(false);
    }
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

  const fullPattern = /^\d{2}\.\d{2}\.\d{4} – \d{2}\.\d{2}\.\d{4}$/;
  const isMobile = useIsMobile();

  return (
    <div className={cn("grid gap-2", className)} ref={ref} {...props}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
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

                  const validatedFrom = validateDate(parsedFrom);
                  const validatedTo = validateDate(parsedTo);

                  if (validatedFrom && validatedTo) {
                    let from = validatedFrom;
                    let to = validatedTo;

                    if (isAfter(from, to)) {
                      [from, to] = [to, from];
                    }

                    onChange?.({ from, to });
                  }
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
                  onKeyDown={handleKeyDown}
                />
              )}
            />
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="center">
          <CalendarWithYearSelect
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            minDate={min}
            maxDate={max}
            onSelect={(range: DateRange | undefined) => {
              onChange?.(range);
              setInputValue(formatRangeValue(range));
            }}
            numberOfMonths={isMobile ? 1 : 2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateRangePickerWithYear.displayName = "DateRangePickerWithYear";
