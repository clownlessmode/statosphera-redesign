import { NightSalesWeekdayNomenclatureResponse } from "@pages/night-stores/config/types";
import { List } from "@shared/ui/list";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@shared/ui/select";
import { FC, useState } from "react";

interface WeekdayNomenclatureCardProps {
  indicator: {
    name: string;
    value: string;
  };
  isLoading: boolean;
  optionsData: NightSalesWeekdayNomenclatureResponse | null;
}

const WeekdayNomenclatureCard: FC<WeekdayNomenclatureCardProps> = ({
  indicator,
  isLoading,
  optionsData,
}) => {
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const currentDay = optionsData?.data?.[dayOfWeek];
  const items =
    (currentDay as unknown as { [key: string]: { [key: string]: string }[] })?.[
      `top${indicator.name}`
    ] ?? [];

  return (
    <List
      title={`Топ номенклатур ${dayOfWeek === 1 ? "во" : "в"}`}
      suffix={indicator.value === "percentageProceedsNight" ? " %" : " ₽"}
      isLoading={isLoading}
      options={items.map((group) => ({
        name: group.product,
        count: `${group[indicator.value as keyof typeof group].toLocaleString()}`,
      }))}
      titleBtn={
        <Select
          defaultValue="0"
          onValueChange={(value) => {
            setDayOfWeek(Number(value));
          }}
        >
          <SelectTrigger className="h-5! p-0! bg-card! shadow-none border-0 text-base font-semibold text-accent hover:text-accent/70 gap-0.5">
            <SelectValue placeholder="День недели" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">понедельник</SelectItem>
            <SelectItem value="1">вторник</SelectItem>
            <SelectItem value="2">среду</SelectItem>
            <SelectItem value="3">четверг</SelectItem>
            <SelectItem value="4">пятницу</SelectItem>
            <SelectItem value="5">субботу</SelectItem>
            <SelectItem value="6">воскресенье</SelectItem>
          </SelectContent>
        </Select>
      }
    />
  );
};

export default WeekdayNomenclatureCard;
