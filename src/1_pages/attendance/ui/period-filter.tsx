"use client";

import * as React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { type DateRange } from "react-day-picker";
import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { DateRangePicker } from "@shared/ui/date-range-picker";
import { dateRanges } from "@shared/lib/date-ranges";
import {
  BarChart3,
  CalendarDays,
  CalendarIcon,
  CalendarRange,
  Flag,
  History,
  Undo,
} from "lucide-react";

const MIN_DATE = new Date(2020, 0, 1);
const MAX_DATE = new Date();

interface PeriodFilterProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
}

export const PeriodFilter: React.FC<PeriodFilterProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const today = new Date();

  const handleRangeChange = (range: DateRange | undefined) => {
    onChange(range);
  };

  const handlePresetClick = (key: keyof typeof dateRanges) => {
    const { start, end } = dateRanges[key](today);
    onChange({ from: start, to: end });
  };

  const label = value?.from
    ? value.to
      ? `${format(value.from, "dd.MM.yyyy", { locale: ru })} – ${format(value.to, "dd.MM.yyyy", { locale: ru })}`
      : format(value.from, "dd.MM.yyyy", { locale: ru })
    : "Период";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-w-[200px] justify-start"
        >
          <CalendarDays className="mr-2 size-4 shrink-0" />
          <span className="truncate">{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 rounded-xl border-none max-w-[90vw]"
        aria-describedby={undefined}
      >
        <Card className="w-full border-0 shadow-none">
          <CardHeader>
            <CardTitle>Период</CardTitle>
            <CardDescription>
              Выберите диапазон дат или быстрый пресет
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground mb-2 block">
                Промежуток даты
              </span>
              <DateRangePicker
                min={MIN_DATE}
                max={MAX_DATE}
                value={value}
                onChange={handleRangeChange}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick("halfYear")}
              >
                <CalendarRange className="size-4 mr-1 shrink-0" /> Полгода
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick("startOfYear")}
              >
                <Flag className="size-4 mr-1 shrink-0" /> Начало года
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick("currentQuarter")}
              >
                <BarChart3 className="size-4 mr-1 shrink-0" /> Текущий квартал
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick("currentMonth")}
              >
                <CalendarIcon className="size-4 mr-1 shrink-0" /> Текущий месяц
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick("lastWeek")}
              >
                <Undo className="size-4 mr-1 shrink-0" /> Прошлая неделя
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick("lastMonth")}
              >
                <History className="size-4 mr-1 shrink-0" /> Прошлый месяц
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
