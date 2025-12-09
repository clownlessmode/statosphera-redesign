import { Card, CardHeader, CardTitle, CardContent } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
interface ValueCardProps {
  value: string | number | undefined;
  title: string | undefined;
  suffix?: "₽" | "%" | "M" | null;
  isLoading?: boolean;
}
const ValueCard: React.FC<ValueCardProps> & { Skeleton: React.FC } = ({
  value,
  suffix = "₽",
  title,
  isLoading = false,
}) => {
  if (isLoading || !title || value === undefined) {
    return <ValueCard.Skeleton />;
  }
  return (
    <Card className="col-span-1 h-full flex flex-col items-center justify-center gap-1">
      <CardHeader className="w-full text-center">
        <CardTitle className="font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold max-md:text-xl">
        {value?.toLocaleString()} {suffix}
      </CardContent>
    </Card>
  );
};

ValueCard.Skeleton = () => {
  return (
    <Card className="col-span-1 h-full flex flex-col items-center justify-center gap-1">
      <CardHeader className="w-full text-center">
        <CardTitle className="font-normal">
          <Skeleton className="w-[120px] h-[16px] bg-muted-foreground rounded-md mx-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">
        <Skeleton className="w-[80px] h-[32px] bg-muted-foreground rounded-md mx-auto" />
      </CardContent>
    </Card>
  );
};

export { ValueCard };
