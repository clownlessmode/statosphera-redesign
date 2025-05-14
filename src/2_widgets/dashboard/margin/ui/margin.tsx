import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import MarginSkeleton from "./margin-skeleton";

interface MarginProps {
  data: number | undefined;
  isLoading: boolean;
}
const Margin = ({ data, isLoading }: MarginProps) => {
  return (
    <>
      {isLoading && !data ? (
        <MarginSkeleton />
      ) : (
        <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Маржа</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm">
              Текущий месяц
            </CardContent>
          </div>
          <CardFooter className="text-3xl font-bold items-start flex flex-row text-left w-fit">
            <span>{data}%</span>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Margin;
