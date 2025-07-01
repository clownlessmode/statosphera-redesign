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
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import { useSearchParams } from "react-router";
import { useWriteOffStore } from "../model/write-off-store";
import { useWriteOffController } from "../api/controller";
import { useTabStore } from "@widgets/write-off/sheet/model/url-store";

export type DateFilterValue = "day" | "week" | "month" | "quarter" | "year";

interface DateFilterState {
  value: DateFilterValue;
  setValue: (value: DateFilterValue) => void;
}

export const useWriteOffDateFilterStore = create<DateFilterState>((set) => ({
  value: "day", // значение по умолчанию
  setValue: (value) => set({ value }),
}));

const DateDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { getApiPayload } = useFiltersStore();
  const { setGraph } = useWriteOffStore();
  const { getGraph } = useWriteOffController();
  const { tab } = useTabStore();

  const { value, setValue } = useWriteOffDateFilterStore();

  const handleSubmit = async (newValue: DateFilterValue) => {
    try {
      setValue(newValue);

      // Получаем текущие данные БЕЗ изменения групп
      const currentData = getApiPayload();

      // Определяем тип на основе выбранного таба
      const type = tab === "write-off-equip" ? "equipment" : "write_off";

      // Формируем payload для графика с новой группировкой
      const graphPayload = {
        ...currentData,
        groups: [newValue], // Используем новую группировку ТОЛЬКО для графика
        type: type, // Добавляем правильный тип
      };

      const graph = await getGraph(graphPayload);
      setGraph(graph);

      const newParams = new URLSearchParams(searchParams);
      newParams.set("open", "false");
      setSearchParams(newParams);
    } catch (error) {
      console.error("Error fetching write-off graph:", error);
    }
  };

  const options = [
    {
      label: "По часам",
      icon: <Clock className="w-4 h-4" />,
      value: "hour",
      disabled: tab === "write-off-equip" ? false : true, // Только для оборудования
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Calendar className="text-primary/80 mr-2" />
          {selectedLabel}
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
