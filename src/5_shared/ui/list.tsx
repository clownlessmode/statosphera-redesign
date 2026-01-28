import { ArrowBigUpDash, ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { FC, memo, useState } from "react";
import { Skeleton } from "./skeleton";
import { cn } from "@shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: string;
  titleBtn?: React.ReactNode;
  isLoading?: boolean;
  arrows?: boolean;
  className?: string;
  tv?: boolean;
  suffix?: string | ((count: number) => string); // Новый пропс для суффикса к count
  options?: {
    name: string;
    count?: number | string;
    price?: number | string;
    index?: number; // Новый пропс для кастомного индекса
    isHighlighted?: boolean; // Новый пропс для выделения
  }[];
}
export const List: FC<Props> = memo(
  ({ options, title, titleBtn, isLoading, arrows, className, tv, suffix }) => {
    // Оптимизация: ограничиваем количество отображаемых элементов для TV режима
    const displayOptions =
      tv && options && options.length > 10 ? options.slice(0, 10) : options;

    // Состояние для отслеживания активного поля для каждого элемента (только count или price)
    const [activeFields, setActiveFields] = useState<
      Record<number, "count" | "price">
    >({});

    // Функция для переключения между count и price при наведении
    const handleMouseEnter = (index: number) => {
      setActiveFields((prev) => {
        const current = prev[index] || "count";
        const next = current === "count" ? "price" : "count";
        return { ...prev, [index]: next };
      });
    };

    // Функция для возврата к count при уходе мыши
    const handleMouseLeave = (index: number) => {
      setActiveFields((prev) => {
        return { ...prev, [index]: "count" };
      });
    };

    // Проверяем, есть ли count и price для переключения
    const hasCountAndPrice = (option: any) => {
      return option.count && option.price;
    };

    return (
      <Card className={cn("w-full", className)}>
        <CardHeader className="text-center">
          <CardTitle className="max-md:text-sm">
            {titleBtn ? (
              <div className="flex flex-row justify-center items-center gap-1">
                {title} {titleBtn}
              </div>
            ) : (
              title
            )}
          </CardTitle>
        </CardHeader>
        <CardContent
          className={cn(
            "overflow-y-auto flex flex-col max-xxs:text-xs max-xs:text-sm gap-1 md:gap-2",
            !tv ? "max-h-[250px]" : "px-0",
          )}
        >
          {isLoading || !displayOptions || displayOptions.length === 0 ? (
            <>
              <Skeleton className="w-full h-10 bg-muted-foreground rounded-md flex" />
              <Skeleton className="w-full h-10 bg-muted-foreground rounded-md flex" />
              <Skeleton className="w-full h-10 bg-muted-foreground rounded-md flex" />
              <Skeleton className="w-full h-10 bg-muted-foreground rounded-md flex" />
              <Skeleton className="w-full h-10 bg-muted-foreground rounded-md flex" />
            </>
          ) : (
            displayOptions?.map((option, arrayIndex) => {
              const isInteractive = hasCountAndPrice(option);
              const activeField = activeFields[arrayIndex] || "count";

              return (
                <div
                  key={arrayIndex}
                  className={cn(
                    "px-5 flex flex-row justify-between p-2 rounded-2xl gap-2",
                    option.isHighlighted
                      ? "bg-primary text-primary-foreground"
                      : "bg-background",
                    isInteractive && "hover:bg-muted transition-colors",
                  )}
                  onMouseEnter={() =>
                    isInteractive && handleMouseEnter(arrayIndex)
                  }
                  onMouseLeave={() =>
                    isInteractive && handleMouseLeave(arrayIndex)
                  }
                >
                  <div className="flex flex-row gap-2 items-center px-2">
                    <p
                      className={cn(
                        "text-base font-bold max-2xl:text-sm",
                        option.isHighlighted
                          ? "text-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {option.index !== undefined
                        ? option.index
                        : arrayIndex + 1}
                    </p>
                    {arrows && (
                      <ArrowBigUpDash className="size-4 text-positive" />
                    )}
                    <p className={cn("line-clamp-1", tv && "text-sm")}>
                      {option.name}
                    </p>
                  </div>
                  <div className="flex flex-row gap-1 items-center px-2">
                    <div className="flex items-center gap-2">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeField}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="text-nowrap"
                        >
                          {activeField === "count" &&
                            (typeof suffix === "function"
                              ? suffix(Number(option.count))
                              : `${option.count}${suffix || "М"}`)}
                          {activeField === "price" && option.price}
                        </motion.div>
                      </AnimatePresence>
                      {isInteractive && (
                        <ArrowLeftRight className="size-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    );
  },
);

List.displayName = "List";
