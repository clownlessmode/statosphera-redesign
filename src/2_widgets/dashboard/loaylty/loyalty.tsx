import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import LoyaltySkeleton from "./loyalty-skeleton";

interface Props {
  appLoyalPercent: number | undefined;
  checkLoyal: number | undefined;
  isLoading: boolean;
}

const Loyalty = ({ appLoyalPercent, checkLoyal, isLoading }: Props) => {
  return (
    <>
      {isLoading || !appLoyalPercent || !checkLoyal ? (
        <LoyaltySkeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between bg-muted py-2">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Применение карт лояльности</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">{checkLoyal} раз</p>
            </CardContent>
          </div>
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Доля в процентах</p>
            <p className="w-full text-muted-foreground font-bold">
              {appLoyalPercent?.toLocaleString()}%
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Loyalty;
