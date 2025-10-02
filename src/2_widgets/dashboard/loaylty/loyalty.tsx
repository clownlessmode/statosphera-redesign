import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import LoyaltySkeleton from "./loyalty-skeleton";
import { cn } from "@shared/lib/utils";

interface Props {
  appLoyalPercent: number | undefined;
  checkLoyal: number | undefined;
  isLoading: boolean;
  tv?: boolean;
}

const Loyalty = ({ appLoyalPercent, checkLoyal, isLoading, tv }: Props) => {
  return (
    <>
      {isLoading ? (
        <LoyaltySkeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between py-2">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Применение карт лояльности</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {checkLoyal ? `${checkLoyal} раз` : null}
              </p>
            </CardContent>
          </div>
          <CardFooter
            className={cn(
              "items-end flex flex-col text-left w-full",
              tv && "text-sm",
            )}
          >
            <p className="w-full">Доля в процентах</p>
            <p className="w-full text-muted-foreground font-bold">
              {appLoyalPercent ? `${appLoyalPercent.toLocaleString()}%` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Loyalty;
