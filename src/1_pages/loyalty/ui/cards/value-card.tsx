import { Card, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
import { FC } from "react";

interface Props {
  title: string;
  value: number;
  unit?: string;
  isLoading?: boolean;
}
export const ValueCard: FC<Props> = ({ title, value, unit, isLoading }) => {
  if (isLoading) return <ValueCardSkeleton />;
  return (
    <Card className="items-center justify-center text-center gap-2 px-4 w-full">
      <CardTitle>{title}</CardTitle>
      <p className="text-4xl font-bold">
        {(value / 1000000).toLocaleString()} {unit}
      </p>
    </Card>
  );
};

const ValueCardSkeleton = () => {
  return (
    <Card className="items-center justify-center text-center gap-2 px-4 w-full">
      <Skeleton className="w-2/3 h-6 bg-muted-foreground/50" />
      <Skeleton className="w-full h-9 bg-muted-foreground/50" />
    </Card>
  );
};
