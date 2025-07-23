import { Tooltip } from "@radix-ui/react-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
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
    content = "Данные отсутствуют";
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
    <Card className="p-2 w-full">
      <CardHeader className="pb-0">
        <CardTitle>
          <div className="flex flex-row gap-4 items-center">
            <Tooltip>
              <TooltipTrigger>{trigger}</TooltipTrigger>
              <TooltipContent>{text}</TooltipContent>
            </Tooltip>
            <p className="text-lg font-medium text-muted-foreground -ml-2">
              {title}
            </p>
            {icons}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-semibold">{content}</div>
      </CardContent>
    </Card>
  );
};
