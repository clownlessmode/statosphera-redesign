import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import MarkupSkeleton from "./markup-skeleton";

interface MarkupProps {
  percent: number | undefined;
  proceeds: number | undefined;
  isLoading: boolean;
}

const Markup = ({ percent, proceeds, isLoading }: MarkupProps) => {
  return (
    <>
      {isLoading || !percent ? (
        <MarkupSkeleton />
      ) : (
        <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Наценка</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm">
              Текущий месяц
            </CardContent>
          </div>
          <CardFooter className="text-xl font-bold items-end flex flex-col text-left w-full">
            <p className="w-full">{percent}%</p>
            <p className="w-full text-xs text-muted-foreground">
              {proceeds?.toLocaleString()}₽
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Markup;
