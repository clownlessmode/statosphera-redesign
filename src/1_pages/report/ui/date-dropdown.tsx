import React from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import {
  CalendarDays,
  Calendar1,
  CalendarCheck,
  BarChart2,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@shared/ui/button";
import { create } from "zustand";

export type DateFilterValue = "day" | "week" | "month" | "quarter" | "year";

interface DateFilterState {
  value: DateFilterValue;
  setValue: (value: DateFilterValue) => void;
}

export const useDateFilterStore = create<DateFilterState>((set) => ({
  value: "day", // значение по умолчанию
  setValue: (value) => set({ value }),
}));

const DateDropdown = () => {
  const { value, setValue } = useDateFilterStore();

  const options = [
    {
      label: "По часам",
      icon: <Clock className="w-4 h-4" />,
      value: "hour",
      disabled: true,
    },
    {
      label: "По дням",
      icon: <CalendarDays className="w-4 h-4" />,
      value: "day",
    },
    {
      label: "По неделям",
      icon: <Calendar1 className="w-4 h-4" />,
      value: "week",
    },
    {
      label: "По месяцам",
      icon: <Calendar className="w-4 h-4" />,
      value: "month",
    },
    {
      label: "По кварталам",
      icon: <BarChart2 className="w-4 h-4" />,
      value: "quarter",
    },
    {
      label: "По годам",
      icon: <CalendarCheck className="w-4 h-4" />,
      value: "year",
    },
  ];

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Calendar className="text-primary/80 mr-2" />
          {selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Отображение</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setValue(option.value as any)}
            disabled={option.disabled}
          >
            <span className="mr-2 text-primary-foreground">{option.icon}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateDropdown;
