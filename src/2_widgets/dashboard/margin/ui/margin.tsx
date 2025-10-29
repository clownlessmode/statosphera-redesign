import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import MarginSkeleton from "./margin-skeleton";
import { cn } from "@shared/lib/utils";

interface MarginProps {
  data: number | undefined;
  isLoading: boolean;
  tv?: boolean;
}
const Margin = ({ data, isLoading, tv }: MarginProps) => {
  return (
    <>
      {isLoading ? (
        <MarginSkeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-[128px] gap-1 flex flex-col justify-between",
            tv && "h-full py-3",
          )}
          data-testid="margin-widget"
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Маржа</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm">
              Текущий месяц
            </CardContent>
          </div>
          <CardFooter className="text-3xl font-bold items-start flex flex-row text-left w-full">
            {!data ? <span>Нет данных</span> : <span>{data}%</span>}
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Margin;
