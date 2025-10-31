import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import MarkupSkeleton from "./markup-skeleton";
import { cn } from "@shared/lib/utils";

interface MarkupProps {
  percent: number | undefined;
  proceeds: number | undefined;
  isLoading: boolean;
  tv?: boolean;
}

const Markup = ({ percent, proceeds, isLoading, tv }: MarkupProps) => {
  return (
    <>
      {isLoading ? (
        <MarkupSkeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-[128px] gap-1 flex flex-col justify-between",
            tv && "h-full py-3",
          )}
          data-testid="markup-widget"
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="max-md:text-sm">Наценка</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm">
              Текущий месяц
            </CardContent>
          </div>
          <CardFooter
            className={cn(
              "text-xl font-bold items-end flex flex-col text-left w-full",
              tv && "text-md",
            )}
          >
            <p className="w-full">{percent ? `${percent}%` : null}</p>
            <p className="w-full text-xs text-muted-foreground">
              {proceeds
                ? `${proceeds.toLocaleString().replace(/,/g, " ")}₽`
                : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Markup;
