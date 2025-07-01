import React from "react";
import { Card, CardContent } from "@shared/ui/card";
import { WriteOffTotalResponse } from "../api/types";

interface WriteOffStatsCardsProps {
  data: WriteOffTotalResponse | null;
}

const WriteOffStatsCards: React.FC<WriteOffStatsCardsProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="grid grid-cols-2 gap-2 h-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="flex flex-col">
            <CardContent className="p-3 flex-1 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Нет данных</span>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatValue = (value: number | null | undefined) => {
    if (value == null) return "—";
    return value.toLocaleString("ru-RU");
  };

  const formatPercent = (value: number | null | undefined) => {
    if (value == null) return "—";
    return `${value} %`;
  };

  const getChangeColor = (value: number | null | undefined) => {
    if (value == null) return "text-muted-foreground";
    if (value > 0) return "text-red-500";
    if (value < 0) return "text-green-500";
    return "text-muted-foreground";
  };

  const cards = [
    {
      title: "Списания PM",
      value: `${formatValue(data.writeOffLM)} ₽`,
      subtitle: "Прошлый месяц",
    },
    {
      title: "Списания PY",
      value: `${formatValue(data.writeOffLY)} ₽`,
      subtitle: "Прошлый год",
    },
    {
      title: "Списания MoM",
      value: formatPercent(data.writeOffMoMPercent),
      subtitle: "Месяц к месяцу",
      valueColor: getChangeColor(data.writeOffMoMPercent),
    },
    {
      title: "Списания YoY",
      value: formatPercent(data.writeOffYoYPercent),
      subtitle: "Год к году",
      valueColor: getChangeColor(data.writeOffYoYPercent),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {cards.map((card, index) => (
        <Card key={index} className="flex flex-col">
          <CardContent className="p-3 flex-1 flex flex-col justify-center">
            <div className="flex flex-col justify-between items-center h-full text-center">
              <div className="text-lg text-muted-foreground">{card.title}</div>
              <div
                className={`text-xl font-bold leading-none ${card.valueColor || "text-foreground"}`}
              >
                {card.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {card.subtitle}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WriteOffStatsCards;
