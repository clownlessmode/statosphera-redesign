import { Button } from "@shared/ui/button";
import {
  BarChart3,
  CalendarIcon,
  CalendarRange,
  Flag,
  History,
  Undo,
} from "lucide-react";
import { DATE_RANGES } from "../config";
import { FC } from "react";

interface DatePresetButtonsProps {
  onPresetSelect: (key: keyof typeof DATE_RANGES) => void;
}

export const DatePresetButtons: FC<DatePresetButtonsProps> = ({
  onPresetSelect,
}) => {
  return (
    <div className="w-full grid gap-2 mt-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
      <Button type="button" onClick={() => onPresetSelect("halfYear")}>
        <CalendarRange className="h-4 w-4 mr-1" /> Полгода
      </Button>
      <Button type="button" onClick={() => onPresetSelect("startOfYear")}>
        <Flag className="h-4 w-4 mr-1" /> Начало года
      </Button>
      <Button type="button" onClick={() => onPresetSelect("currentQuarter")}>
        <BarChart3 className="h-4 w-4 mr-1" /> Текущий квартал
      </Button>
      <Button type="button" onClick={() => onPresetSelect("currentMonth")}>
        <CalendarIcon className="h-4 w-4 mr-1" /> Текущий месяц
      </Button>
      <Button type="button" onClick={() => onPresetSelect("lastWeek")}>
        <Undo className="h-4 w-4 mr-1" /> Прошлая неделя
      </Button>
      <Button type="button" onClick={() => onPresetSelect("lastMonth")}>
        <History className="h-4 w-4 mr-1" /> Прошлый месяц
      </Button>
    </div>
  );
};
