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
    <div className="w-full grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
      <Button
        className="text-[12px]"
        type="button"
        onClick={() => onPresetSelect("halfYear")}
      >
        <CalendarRange className="h-2 w-2 mr-1" /> Полгода
      </Button>
      <Button
        className="text-[12px]"
        type="button"
        onClick={() => onPresetSelect("startOfYear")}
      >
        <Flag className="h-2 w-2 mr-1" /> Начало года
      </Button>
      <Button
        className="text-[12px]"
        type="button"
        onClick={() => onPresetSelect("currentQuarter")}
      >
        <BarChart3 className="h-2 w-2 mr-1" /> Текущий квартал
      </Button>
      <Button
        className="text-[12px]"
        type="button"
        onClick={() => onPresetSelect("currentMonth")}
      >
        <CalendarIcon className="h-2 w-2 mr-1" /> Текущий месяц
      </Button>
      <Button
        className="text-[12px]"
        type="button"
        onClick={() => onPresetSelect("lastWeek")}
      >
        <Undo className="h-2 w-2 mr-1" /> Прошлая неделя
      </Button>
      <Button
        className="text-[12px]"
        type="button"
        onClick={() => onPresetSelect("lastMonth")}
      >
        <History className="h-2 w-2 mr-1" /> Прошлый месяц
      </Button>
    </div>
  );
};
