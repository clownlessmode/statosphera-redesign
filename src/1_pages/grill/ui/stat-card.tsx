import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import type { FC } from "react";
interface Props {
  title: string;
  description?: string;
  number: number | string | null;
}

const StatCard: FC<Props> = ({ description, number, title }) => {
  // Функция для определения, нужно ли показывать "Данные отсутствуют"
  const isDataMissing = (value: number | string | null): boolean => {
    if (value === null || value === undefined) return true;
    if (value === 0) return true;
    if (value === "0") return true;
    if (value === "NaN") return true;
    if (typeof value === "string" && value.toLowerCase() === "nan") return true;
    return false;
  };

  const displayValue = isDataMissing(number) ? "Данные отсутствуют" : number;

  return (
    <Card className="w-full flex flex-col h-full max-h-[120px]">
      <div className="flex flex-col justify-between h-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="leading-none text-sm">
          {description}
        </CardContent>
        <span
          className={
            isDataMissing(number)
              ? "text-muted-foreground text-xl px-4"
              : "px-4 text-3xl font-semibold"
          }
        >
          {displayValue}
        </span>
      </div>
    </Card>
  );
};

export default StatCard;
