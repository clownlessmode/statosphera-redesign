import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { Moon, Sun, Percent, DollarSign } from "lucide-react";
import { Button } from "@shared/ui/button";
import { create } from "zustand";
import { useIsMobile } from "@shared/hooks/use-mobile";

export type IndicatorFilterValue =
  | "proceedsNight"
  | "proceedsDay"
  | "percentageProceedsNight";

interface IndicatorFilterState {
  indicator: {
    name: string;
    value: string;
  };
  setIndicator: (indicator: { name: string; value: string }) => void;
}

export const useIndicatorFilterStore = create<IndicatorFilterState>((set) => ({
  indicator: {
    name: "ProceedsNight",
    value: "proceedsNight",
  },
  setIndicator: (indicator) => set({ indicator }),
}));

const IndicatorDropdown = () => {
  const { indicator, setIndicator } = useIndicatorFilterStore();

  const options = [
    {
      label: "По ночной выручке",
      icon: <Moon className="w-4 h-4" />,
      value: "proceedsNight",
    },
    {
      label: "По дневной выручке",
      icon: <Sun className="w-4 h-4" />,
      value: "proceedsDay",
    },
    {
      label: "По вхождениям",
      icon: <Percent className="w-4 h-4" />,
      value: "percentageProceedsNight",
    },
  ];

  const selectedLabel = options.find(
    (opt) => opt.value === indicator.value,
  )?.label;
  const isMobile = useIsMobile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={isMobile ? "default" : "sm"}>
          <DollarSign className="text-primary/80" />
          {!isMobile && selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Отображение</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() =>
              setIndicator({
                name:
                  option.value.charAt(0).toUpperCase() + option.value.slice(1),
                value: option.value,
              })
            }
          >
            <span className="mr-2 text-primary-foreground">{option.icon}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default IndicatorDropdown;
