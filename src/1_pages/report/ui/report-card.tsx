import { cn } from "@shared/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Circle } from "lucide-react";

type ReportCardProps = {
  title: string;
  value: string;
  subtitle: string;
  subvalue: string;
  isNegative?: boolean;
};

export const ReportCard = ({
  title,
  value,
  subtitle,
  subvalue,
  isNegative = false,
}: ReportCardProps) => {
  return (
    <Card
      className={cn(
        // Основной стиль карточки
        "w-full  min-w-[250px] px-4 py-2 flex flex-col justify-between gap-1 h-full",
        // Минимальная высота
        "min-h-[100px]"
      )}
    >
      <div className="flex flex-col gap-0.5">
        <CardHeader className="flex justify-between items-center p-0 pb-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex items-center gap-1 text-xs leading-tight">
          <p className="text-base font-semibold">{value}</p>
          <Circle
            className={cn(
              "size-3",
              isNegative ? "text-destructive" : "text-positive"
            )}
            fill="currentColor"
          />
        </CardContent>
      </div>
      <CardFooter className="p-0 flex flex-col items-start text-left mt-1">
        <p className="text-xs leading-snug">{subtitle}</p>
        <p className="text-xs text-muted-foreground font-medium">{subvalue}</p>
      </CardFooter>
    </Card>
  );
};
