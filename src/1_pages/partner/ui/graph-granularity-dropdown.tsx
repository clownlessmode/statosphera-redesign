import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import {
  BarChart2,
  Calendar,
  Calendar1,
  CalendarCheck,
  CalendarDays,
  Layers3,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@shared/ui/button";
import { useIsMobile } from "@shared/hooks/use-mobile";
import type { PartnerGraphGranularity } from "../api/types";

const GRANULARITY_OPTIONS: {
  label: string;
  icon: ReactNode;
  value: PartnerGraphGranularity;
}[] = [
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

type PartnerGraphGranularityDropdownProps = {
  value: PartnerGraphGranularity;
  onChange: (value: PartnerGraphGranularity) => void;
  disabled?: boolean;
};

export const PartnerGraphGranularityDropdown = ({
  value,
  onChange,
  disabled,
}: PartnerGraphGranularityDropdownProps) => {
  const isMobile = useIsMobile();
  const selectedLabel =
    GRANULARITY_OPTIONS.find((opt) => opt.value === value)?.label ??
    "Группировка";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant="outline" size={isMobile ? "default" : "sm"}>
          <Layers3 className="text-primary/80" />
          {!isMobile && selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Отображение</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {GRANULARITY_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            <span className="mr-2 text-primary-foreground">{option.icon}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
