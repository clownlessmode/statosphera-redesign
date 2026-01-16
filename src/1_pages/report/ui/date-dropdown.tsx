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
  Clock,
} from "lucide-react";
import { Button } from "@shared/ui/button";
import { create } from "zustand";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useSearchParams } from "react-router";
import { useReportStore } from "@widgets/report/sheet/model/report-store";
import { useReport } from "@entities/report/model/api/filters/data/controller";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useGraphVersionStore } from "./report";

export type DateFilterValue = "day" | "week" | "month" | "quarter" | "year";

interface DateFilterState {
  value: DateFilterValue;
  setValue: (value: DateFilterValue) => void;
}

export const useDateFilterStore = create<DateFilterState>((set) => ({
  value: "day", // значение по умолчанию
  setValue: (value) => set({ value }),
}));

const DateDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bumpGraphVersion } = useGraphVersionStore();
  const { getApiPayload } = useFiltersStore();
  const { setGraph } = useReportStore();

  const allData = getApiPayload();
  // const disabled = allData.groups.length === 0 || allData.values.length === 0;
  const { getGraph } = useReport();
  const { value, setValue } = useDateFilterStore();
  const handleSubmit = async (value: DateFilterValue) => {
    try {
      setValue(value);
      const [graph] = await Promise.all([
        getGraph({
          ...allData,
          values: [allData.values[0]],
          groups: [value],
          sorts: { colId: [allData.values[0]], sort: "desc" },
        }),
      ]);

      setGraph(graph);
      bumpGraphVersion();
      const newParams = new URLSearchParams(searchParams);
      newParams.set("open", "false");
      setSearchParams(newParams);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };
  const { tab } = useTabStore();
  const options = [
    {
      label: "По часам",
      icon: <Clock className="w-4 h-4" />,
      value: "hour",
      disabled: tab === "check" ? false : true,
    },
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
  const isMobile = useIsMobile();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={isMobile ? "default" : "sm"}>
          <Calendar className="text-primary/80" />
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
            disabled={option.disabled}
          >
            <span className="mr-2 text-primary-foreground">{option.icon}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateDropdown;
