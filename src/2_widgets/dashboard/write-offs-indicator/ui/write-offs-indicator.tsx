import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

import WriteOffIndicatorSkeleton from "./write-offs-indicator-skeleton";
interface Props {
  writeOff: number | undefined;
  writeOffPercent: number | undefined;
  writeOffYoY: number | undefined;
  writeOffYoYPercent: number | undefined;
  isLoading: boolean;
}

const WriteOffIndicator = ({
  writeOff,
  writeOffPercent,
  writeOffYoY,
  writeOffYoYPercent,
  isLoading,
}: Props) => {
  return (
    <>
      {isLoading ||
      !writeOff ||
      !writeOffPercent ||
      !writeOffYoY ||
      !writeOffYoYPercent ? (
        <WriteOffIndicatorSkeleton />
      ) : (
        <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Списания (показатель)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {writeOff?.toLocaleString()}₽ ({writeOffPercent}%)
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
              {writeOffYoY?.toLocaleString()}₽ ({writeOffYoYPercent}%)
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default WriteOffIndicator;
