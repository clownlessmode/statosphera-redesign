import { Card, CardTitle } from "@shared/ui/card";
import { FC } from "react";
import { Skeleton } from "@shared/ui/skeleton";

interface Props {
  title: string;
  value: number;
  unit?: string;
  isLoading?: boolean;
  formatter?: (value: number) => string;
}
export const ValueCard: FC<Props> = ({
  title,
  value,
  unit,
  isLoading,
  formatter,
}) => {
  return (
    <>
      {isLoading || !value ? (
        <Card className="items-center justify-center text-center gap-2 px-4 w-full">
          <Skeleton className="w-2/3 h-6 bg-muted-foreground/50" />
          <Skeleton className="w-full h-9 bg-muted-foreground/50" />
        </Card>
      ) : (
        <Card className="items-center justify-center text-center gap-2 px-4 w-full">
          <CardTitle>{title}</CardTitle>
          <p className="text-xl md:text-4xl font-bold">
            {formatter ? formatter(value) : (value / 1000000).toLocaleString()}{" "}
            {unit}
          </p>
        </Card>
      )}
    </>
  );
};
