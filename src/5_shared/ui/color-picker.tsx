import { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const PRESET_COLORS = [
  "#e50046", // Default primary
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#f59e0b", // Orange
  "#10b981", // Green
  "#06b6d4", // Cyan
  "#6366f1", // Indigo
  "#f43f5e", // Rose
  "#84cc16", // Lime
  "#14b8a6", // Teal
  "#a855f7", // Violet
];

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [localColor, setLocalColor] = useState(color);

  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-start gap-2">
              <div
                className="h-6 w-6 rounded border-2 border-border"
                style={{ backgroundColor: localColor }}
              />
              <span className="font-mono text-sm">{localColor}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Выберите цвет</Label>
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_COLORS.map((presetColor) => (
                    <button
                      key={presetColor}
                      onClick={() => handleColorChange(presetColor)}
                      className="h-10 w-10 rounded border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: presetColor }}
                      title={presetColor}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Или введите HEX</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={localColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    placeholder="#e50046"
                    className="flex-1 font-mono"
                  />
                  <input
                    type="color"
                    value={localColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="h-10 w-10 rounded border-2 border-border cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
