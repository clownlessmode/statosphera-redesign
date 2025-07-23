import { Card } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const SummaryTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0 animate-pulse">
      <div className="flex-1 min-h-0 overflow-hidden">
        <Card className="h-full p-4">
          {/* Заголовки таблицы */}
          <div className="flex gap-4 mb-4 pb-2 border-b border-muted/30">
            <Skeleton className="w-4 h-4 rounded-sm bg-muted/70" />
            <Skeleton className="w-20 h-4 bg-muted/70" />
            <Skeleton className="w-24 h-4 bg-muted/70" />
            <Skeleton className="w-32 h-4 bg-muted/70" />
            <Skeleton className="w-16 h-4 bg-muted/70" />
            <Skeleton className="w-28 h-4 bg-muted/70" />
            <Skeleton className="w-20 h-4 bg-muted/70" />
          </div>

          {/* Строки таблицы */}
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-4 items-center hover:bg-muted/20 p-2 rounded-md transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Чекбокс */}
                <Skeleton className="w-4 h-4 rounded-sm bg-muted/70" />
                {/* Данные строки */}
                <Skeleton
                  className={`h-4 bg-muted/70 ${index % 3 === 0 ? "w-20" : index % 3 === 1 ? "w-16" : "w-24"}`}
                />
                <Skeleton
                  className={`h-4 bg-muted/70 ${index % 2 === 0 ? "w-24" : "w-20"}`}
                />
                <Skeleton
                  className={`h-4 bg-muted/70 ${index % 4 === 0 ? "w-32" : index % 4 === 1 ? "w-28" : index % 4 === 2 ? "w-36" : "w-24"}`}
                />
                <Skeleton className="w-16 h-4 bg-muted/70" />
                <Skeleton
                  className={`h-4 bg-muted/70 ${index % 2 === 0 ? "w-28" : "w-24"}`}
                />
                <Skeleton className="w-20 h-4 bg-muted/70" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Кнопки */}
      <div className="grid grid-cols-2 gap-4 flex-shrink-0">
        <Skeleton className="w-full h-12 rounded-md bg-muted/70" />
        <Skeleton className="w-full h-12 rounded-md bg-muted/70" />
      </div>
    </div>
  );
};
