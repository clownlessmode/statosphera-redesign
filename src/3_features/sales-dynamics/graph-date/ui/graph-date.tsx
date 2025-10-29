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
} from "lucide-react";
import { Button } from "@shared/ui/button";
import { create } from "zustand";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { cn } from "@shared/lib/utils";
import { useDropdownTourStore } from "@pages/sales-dynamics/ui/dropdown-tour-store";

export type DateFilterValue = "day" | "week" | "month" | "quarter" | "year";

interface DateFilterState {
  value: DateFilterValue;
  setValue: (value: DateFilterValue) => void;
}

export const useDateFilterStore = create<DateFilterState>((set) => ({
  value: "day", // значение по умолчанию
  setValue: (value) => set({ value }),
}));

// Глобальный стор для отслеживания состояния дропдауна
interface DropdownState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => {
    console.log("🔄 [DROPDOWN STORE] State changed:", { isOpen });
    set({ isOpen });
  },
}));

const GraphDate = () => {
  const isMobile = useIsMobile();
  const { value, setValue } = useDateFilterStore();
  const { isOpen, setIsOpen } = useDropdownStore();

  const handleSubmit = async (value: DateFilterValue) => {
    try {
      setValue(value);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const options = [
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
  const { setIsWaitingForDropdown } = useDropdownTourStore();

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setIsWaitingForDropdown(open);
        console.log("🔄 [DROPDOWN] State changed to:", open);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" data-testid="graph-date-filter">
          <Calendar className={cn(!isMobile && "mr-2")} />
          {!isMobile && selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Отображение</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSubmit(option.value as DateFilterValue)}
          >
            <span className="mr-2 text-primary-foreground">{option.icon}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GraphDate;
