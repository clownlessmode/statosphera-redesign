import { useEffect, useState } from "react";
import { Card, CardContent } from "@shared/ui/card";
import { cn } from "@shared/lib/utils";

export const Slider = ({
  components,
  className,
  indexClass,
}: {
  components: React.ReactNode[];
  className?: string;
  indexClass?: { class: string; index: number };
}) => {
  const [componentIndex, setComponentIndex] = useState(0);

  useEffect(() => {
    // Оптимизация: увеличиваем интервал до 8 секунд для TV режима
    // и добавляем проверку на видимость страницы
    const interval = setInterval(() => {
      // Не переключаем если страница не видна
      if (document.hidden) return;

      setComponentIndex((prev) => (prev + 1) % components.length);
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [components]); // Восстанавливаем правильные зависимости для переключения

  return (
    <Card
      className={cn(
        "w-full !h-full",
        className,
        indexClass?.index === componentIndex ? indexClass?.class : "",
      )}
    >
      <CardContent className="relative w-full h-full">
        {components.map((component, index) => (
          <div
            key={index}
            className={cn(
              index === componentIndex
                ? "opacity-100 shadow-none *:shadow-none"
                : "absolute opacity-0 inset-0 pointer-events-none",
              "w-full h-full duration-500 ease-out transition-all", // Увеличиваем длительность анимации
            )}
          >
            {component}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
