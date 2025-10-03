import { ArrowBigUpDash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { FC } from "react";
import { Skeleton } from "./skeleton";
import { cn } from "@shared/lib/utils";

interface Props {
  title: string;
  isLoading?: boolean;
  arrows?: boolean;
  className?: string;
  tv?: boolean;
  options?: {
    name: string;
    count?: number | string;
    price?: number | string;
    index?: number; // Новый пропс для кастомного индекса
    isHighlighted?: boolean; // Новый пропс для выделения
  }[];
}
export const List: FC<Props> = ({
  options,
  title,
  isLoading,
  arrows,
  className,
  tv,
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          "overflow-y-auto flex flex-col max-xxs:text-xs max-xs:text-sm gap-1 md:gap-2",
          !tv ? "max-h-[250px]" : "px-0",
        )}
      >
        {isLoading ? (
          <>
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </>
        ) : (
          options?.map((option, arrayIndex) => (
            <div
              key={arrayIndex}
              className={cn(
                "px-5 flex flex-row justify-between p-2 rounded-2xl gap-4",
                option.isHighlighted
                  ? "bg-primary text-primary-foreground"
                  : "bg-background",
              )}
            >
              <div className="flex flex-row gap-3 items-center px-2">
                <p
                  className={cn(
                    "text-base font-bold",
                    option.isHighlighted
                      ? "text-primary-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {option.index !== undefined ? option.index : arrayIndex + 1}
                </p>
                {arrows && <ArrowBigUpDash className="size-4 text-positive" />}
                <p className={cn("line-clamp-1", tv && "text-sm")}>
                  {option.name}
                </p>
              </div>
              <div className="flex flex-row gap-1 items-center px-2">
                {option.count && <p>{option.count}М шт.</p>}
                <p
                  className={cn(
                    "text-base font-semibold text-nowrap",
                    tv && "text-sm",
                  )}
                >
                  {option.price}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
