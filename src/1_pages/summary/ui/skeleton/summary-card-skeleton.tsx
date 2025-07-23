import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const SummaryCardSkeleton = () => {
  return (
    <Card className="p-2 w-full animate-pulse">
      <CardHeader className="pb-0">
        <CardTitle>
          <div className="flex flex-row gap-4 items-center">
            {/* Иконка тултипа */}
            <Skeleton className="w-4 h-4 rounded-full bg-muted/70" />
            {/* Заголовок */}
            <Skeleton className="w-32 h-5 -ml-2 bg-muted/70" />
            {/* Иконка справа */}
            <Skeleton className="w-6 h-6 rounded-md ml-auto bg-muted/70" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Значение карточки */}
        <Skeleton className="w-28 h-9 rounded-md bg-muted/70" />
      </CardContent>
    </Card>
  );
};
