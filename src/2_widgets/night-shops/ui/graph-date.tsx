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
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useNightStoresFiltersStore } from "../model/filters-store";

export const GraphDate = () => {
  const { updateGroup } = useNightStoresFiltersStore();
  const group = useNightStoresFiltersStore((state) => state.group);

  const options = [
    {
      label: "по дням",
      icon: <CalendarDays className="w-4 h-4" />,
      value: "day" as const,
    },
    {
      label: "по неделям",
      icon: <Calendar1 className="w-4 h-4" />,
      value: "week" as const,
    },
    {
      label: "по месяцам",
      icon: <Calendar className="w-4 h-4" />,
      value: "month" as const,
    },
    {
      label: "по кварталам",
      icon: <BarChart2 className="w-4 h-4" />,
      value: "quarter" as const,
    },
    {
      label: "по годам",
      icon: <CalendarCheck className="w-4 h-4" />,
      value: "year" as const,
    },
  ];

  const selectedLabel = options.find((opt) => opt.value === group)?.label;
  const isMobile = useIsMobile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={isMobile ? "default" : "sm"}>
          <Calendar className="text-primary/80 md:mr-2" />
          {!isMobile && `Отображение графиков ${selectedLabel}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Отображение</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              updateGroup(option.value);
            }}
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
