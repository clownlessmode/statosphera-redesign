import { Card } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const SummaryChartSkeleton = () => {
  return (
    <Card className="flex-1 px-10 py-6 animate-pulse">
      <div className="h-full flex flex-col">
        {/* Заголовок графика */}
        <div className="mb-6">
          <Skeleton className="w-48 h-6 mb-2 bg-muted/70" />
          <Skeleton className="w-32 h-4 bg-muted/70" />
        </div>

        {/* Горизонтальные бары */}
        <div className="flex-1 space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Название продукта */}
              <div className="w-32 flex-shrink-0">
                <Skeleton
                  className={`h-4 bg-muted/70 ${index % 2 === 0 ? "w-28" : "w-24"}`}
                />
              </div>

              {/* Бар */}
              <div className="flex-1 relative">
                <Skeleton
                  className={`h-8 rounded-md bg-gradient-to-r from-muted/70 to-muted/50 ${
                    index === 0
                      ? "w-full"
                      : index === 1
                        ? "w-4/5"
                        : index === 2
                          ? "w-3/5"
                          : index === 3
                            ? "w-2/5"
                            : index === 4
                              ? "w-1/4"
                              : "w-1/5"
                  }`}
                />
              </div>

              {/* Значение */}
              <div className="w-16 flex-shrink-0">
                <Skeleton className="w-12 h-4 ml-auto bg-muted/70" />
              </div>
            </div>
          ))}
        </div>

        {/* Легенда/подпись */}
        <div className="mt-6 flex justify-center">
          <Skeleton className="w-24 h-4 bg-muted/70" />
        </div>
      </div>
    </Card>
  );
};
