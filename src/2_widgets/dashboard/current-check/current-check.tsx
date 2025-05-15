import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CurrentCheckSkeleton from "./current-check-skeleton";

interface Props {
  check: number | undefined;
  checkYoY: number | undefined;
  checkYoYPercent: number | undefined;
  isLoading: boolean;
}

const CurrentCheck = ({
  check,
  checkYoY,
  checkYoYPercent,
  isLoading,
}: Props) => {
  return (
    <>
      {isLoading || !check || !checkYoY || !checkYoYPercent ? (
        <CurrentCheckSkeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Чеки (за текущий месяц)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {check?.toLocaleString()}₽ ({checkYoYPercent}%)
              </p>
              {/* <ArrowBigDownDash
                className="w-4 h-4 text-destructive"
                fill="currentColor"
              /> */}
            </CardContent>
          </div>
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Изменения к прошлому году</p>
            <p className="w-full text-muted-foreground font-bold">
              {checkYoY?.toLocaleString()}₽ ({checkYoYPercent}%)
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default CurrentCheck;
