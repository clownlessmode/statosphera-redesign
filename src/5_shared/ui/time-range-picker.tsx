"use client";

import * as React from "react";
import { cn } from "@shared/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@shared/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

import { Button } from "@shared/ui/button";
import { ClockArrowDown, ClockArrowUp } from "lucide-react";

/**
 * TimeRangePicker
 * Props:
 *  - from?: Date
 *  - to?: Date
 *  - onFromChange?: (date: Date) => void
 *  - onToChange?: (date: Date) => void
 */
export interface TimeRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  from?: Date;
  to?: Date;
  onFromChange?: (from: Date) => void;
  onToChange?: (to: Date) => void;
}

export const TimeRangePicker = React.forwardRef<
  HTMLDivElement,
  TimeRangePickerProps
>(({ className, from, to, onFromChange, onToChange, ...props }, ref) => {
  // Generate times every 5 minutes
  const times = React.useMemo(
    () =>
      Array.from({ length: 24 * 12 }).map((_, idx) => {
        const hh = String(Math.floor(idx / 12)).padStart(2, "0");
        const mm = String((idx % 12) * 5).padStart(2, "0");
        return `${hh}:${mm}`;
      }),
    []
  );

  // Format Date to "HH:MM"
  const formatDateToTimeString = (date?: Date) => {
    if (date && !isNaN(date.getTime())) {
      const hh = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    }
    return "";
  };

  // Local state for select values
  const [selectedFrom, setSelectedFrom] = React.useState<string>(
    formatDateToTimeString(from)
  );
  const [selectedTo, setSelectedTo] = React.useState<string>(
    formatDateToTimeString(to)
  );

  // Sync when props change
  React.useEffect(() => {
    setSelectedFrom(formatDateToTimeString(from));
    setSelectedTo(formatDateToTimeString(to));
  }, [from, to]);

  // Parse "HH:MM" to Date (today)
  const parseTimeToDate = (time: string) => {
    const [hh, mm] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hh, mm, 0, 0);
    return date;
  };

  const handleFromSelect = (time: string) => {
    setSelectedFrom(time);
    onFromChange?.(parseTimeToDate(time));
  };
  const handleToSelect = (time: string) => {
    setSelectedTo(time);
    onToChange?.(parseTimeToDate(time));
  };

  return (
    <div
      ref={ref}
      className={cn("flex gap-2 items-center", className)}
      {...props}
    >
      {/* From selector */}
      <Select value={selectedFrom} onValueChange={handleFromSelect}>
        <SelectTrigger asChild>
          <Button variant="outline" className="w-full">
            <ClockArrowUp className="mr-1" />
            {selectedFrom || "––:––"}
          </Button>
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-auto">
          <SelectGroup>
            {times.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="h-[2px] bg-muted-foreground rounded-md w-1/4" />

      {/* To selector */}
      <Select value={selectedTo} onValueChange={handleToSelect}>
        <SelectTrigger asChild>
          <Button variant="outline" className="w-full">
            <ClockArrowDown className="mr-1" />
            {selectedTo || "––:––"}
          </Button>
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-auto">
          <SelectGroup>
            {times.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});

TimeRangePicker.displayName = "TimeRangePicker";
