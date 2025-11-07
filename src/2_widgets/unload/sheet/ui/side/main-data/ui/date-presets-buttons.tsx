import { Button } from "@shared/ui/button";
import { DATE_RANGES } from "../config";
import { FC } from "react";

interface DatePresetButtonsProps {
  onPresetSelect: (key: keyof typeof DATE_RANGES) => void;
}

export const DatePresetButtons: FC<DatePresetButtonsProps> = ({
  onPresetSelect,
}) => {
  return (
    <div className="w-full grid gap-2 mt-2 grid-cols-1 md:grid-cols-3">
      <Button type="button" onClick={() => onPresetSelect("m0")}>
        M0
      </Button>
      <Button type="button" onClick={() => onPresetSelect("m3")}>
        M-3
      </Button>
      <Button type="button" onClick={() => onPresetSelect("m6")}>
        M-6
      </Button>
    </div>
  );
};
