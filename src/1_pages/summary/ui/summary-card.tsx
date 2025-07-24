import { Tooltip } from "@radix-ui/react-tooltip";
import { Card, CardContent } from "@shared/ui/card";
import { TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";

interface SummaryCardProps {
  title: string;
  value: number | string;
  icons?: React.ReactNode;
  trigger?: React.ReactNode;
  text?: string;
}

export const SummaryCard = ({
  title,
  value,
  icons,
  trigger,
  text,
}: SummaryCardProps) => {
  const isRuble = /выручка|proceeds|avgCheck|средний чек/i.test(title);

  let content: React.ReactNode;
  if (value === null || value === undefined || value === "") {
    content = "Нет данных";
  } else if (typeof value === "number") {
    const formatted = new Intl.NumberFormat("ru-RU").format(value);
    content = (
      <>
        {formatted}
        {isRuble && " ₽"}
      </>
    );
  } else {
    // value — строка
    content = value;
  }
  return (
    <Card className="p-2! w-full gap-3! flex flex-col justify-between ">
      <CardContent className="pt-0 flex flex-col items-center justify-center gap-0">
        <div className="text-2xl font-semibold">{content}</div>
        <div className="flex flex-row gap-4 items-center">
          <Tooltip>
            <TooltipTrigger>{trigger}</TooltipTrigger>
            <TooltipContent>{text}</TooltipContent>
          </Tooltip>
          <p className="text-sm font-semibold text-muted-foreground -ml-2">
            {title}
          </p>
          {icons}
        </div>
      </CardContent>
    </Card>
  );
};
