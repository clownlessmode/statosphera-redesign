import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

interface SummaryCardProps {
  title: string;
  value: number;
  icons?: React.ReactNode;
}

export const SummaryCard = ({ title, value, icons }: SummaryCardProps) => {
  const isRuble = /выручка|proceeds/i.test(title);

  let content: React.ReactNode;
  if (value === 0 || value === null || value === undefined) {
    content = "Данные отсутствуют";
  } else {
    const formatted = new Intl.NumberFormat("ru-RU").format(value);
    content = (
      <>
        {formatted}
        {isRuble && " ₽"}
      </>
    );
  }
  return (
    <Card className="p-4 w-full">
      <CardHeader className="pb-2">
        <CardTitle>
          <div className="flex flex-row gap-4 items-center">
            <p className="text-lg font-medium text-muted-foreground">{title}</p>
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
