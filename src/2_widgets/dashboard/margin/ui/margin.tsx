import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
interface MarginProps {
  data: number | undefined;
  isLoading: boolean;
}
const Margin = ({ data, isLoading }: MarginProps) => {
  return (
    <>
      {isLoading && !data ? (
        <Margin.Skeleton />
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

Margin.Skeleton = () => {
  return (
    <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
      <div className="flex flex-col  gap-1">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>
            <Skeleton className="w-[56px] h-[16px] bg-muted-foreground rounded-md" />
          </CardTitle>
        </CardHeader>
        <CardContent className="leading-none text-sm">
          <Skeleton className="w-[150px] h-[14px] bg-muted-foreground rounded-md" />
        </CardContent>
      </div>
      <CardFooter className="text-3xl font-bold items-start flex flex-row text-left w-fit">
        <Skeleton className="w-[100px] h-[36px] bg-muted-foreground rounded-md" />
      </CardFooter>
    </Card>
  );
};
