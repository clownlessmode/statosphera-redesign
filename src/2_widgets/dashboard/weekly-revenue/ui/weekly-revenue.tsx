import { Card, CardHeader, CardTitle, CardContent } from "@shared/ui/card";
import { BarChart } from "@shared/ui/graphs/bar-chart/bar-chart";
import { SalesSevenDays } from "@pages/dashboard/api/types";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Skeleton } from "@shared/ui/skeleton";

interface WeeklyRevenueProps {
  data: SalesSevenDays | undefined;
  isLoading: boolean;
}

export default function WeeklyRevenue({ data, isLoading }: WeeklyRevenueProps) {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        {isLoading && !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle>Выручка за последние 7 дней</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading || !data ? (
          <WeeklyRevenue.Skeleton />
        ) : (
          <BarChart
            xAxisData={data.data.map((item) => item.day_of_week)}
            yAxisData={data.data.map((item) => item.proceeds)}
            tooltipData={data.data.map((item) => item.day.toString())}
          />
        )}
      </CardContent>
    </Card>
  );
}

WeeklyRevenue.Skeleton = () => {
  const controlsArray = Array.from({ length: 7 }, () => useAnimation());

  useEffect(() => {
    controlsArray.forEach((controls) => {
      const loop = async () => {
        while (true) {
          const newHeight = Math.floor(Math.random() * 90) + 10; // 10–100%
          await controls.start({
            height: `${newHeight}%`,
            transition: { duration: 1.2, ease: "easeInOut" },
          });
        }
      };
      loop();
    });
  }, []);

  return (
    <div className="flex h-full min-h-[300px] items-end justify-between gap-[2%] w-full">
      {controlsArray.map((controls, i) => (
        <motion.div
          key={i}
          className="w-full rounded-[10px] bg-muted-foreground animate-pulse"
          initial={{ height: "50%" }}
          animate={controls}
        />
      ))}
    </div>
  );
};
