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
    const interval = setInterval(() => {
      setComponentIndex((prev) => (prev + 1) % components.length);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [components]);

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
                ? "opacity-100"
                : "absolute opacity-0 inset-0 pointer-events-none",
              "w-full h-full duration-300 ease-out transition-all",
            )}
          >
            {component}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
