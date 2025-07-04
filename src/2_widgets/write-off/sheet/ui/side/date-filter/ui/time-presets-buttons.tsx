import { Button } from "@shared/ui/button";
import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { TIME_RANGES } from "../config";
import { FC } from "react";

interface TimePresetButtonsProps {
  onPresetSelect: (key: keyof typeof TIME_RANGES) => void;
}

export const TimePresetButtons: FC<TimePresetButtonsProps> = ({
  onPresetSelect,
}) => {
  return (
    <div className="w-full grid grid-cols-4 gap-2 mt-2">
      <Button type="button" onClick={() => onPresetSelect("morning")}>
        <Sunrise className="h-4 w-4 mr-1" /> Утро
      </Button>
      <Button type="button" onClick={() => onPresetSelect("day")}>
        <Sun className="h-4 w-4 mr-1" /> День
      </Button>
      <Button type="button" onClick={() => onPresetSelect("evening")}>
        <Sunset className="h-4 w-4 mr-1" /> Вечер
      </Button>
      <Button type="button" onClick={() => onPresetSelect("night")}>
        <Moon className="h-4 w-4 mr-1" /> Ночь
      </Button>
    </div>
  );
};
