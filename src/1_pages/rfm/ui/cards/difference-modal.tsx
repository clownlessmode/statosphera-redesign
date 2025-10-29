import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { ScrollArea } from "@shared/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@shared/ui/button";
import { useIsMobile } from "@shared/hooks";

interface ModalProps {
  title: {
    header: string;
    btn: string;
  };
  firstTitle: number;
  secondTitle: number;
  firstData:
    | undefined
    | {
        name: string;
        proceed: number;
        count?: never;
        percent: number;
      }[]
    | {
        name: string;
        count: number;
        proceed?: never;
        percent: number;
      }[];
  secondData:
    | undefined
    | {
        name: string;
        proceed: number;
        count?: never;
        percent: number;
      }[]
    | {
        name: string;
        count: number;
        proceed?: never;
        percent: number;
      }[];
}

export const DifferenceModal = ({
  firstData,
  secondData,
  firstTitle,
  secondTitle,
  title,
}: ModalProps) => {
  const isMobile = useIsMobile();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={!isMobile ? "lg" : "default"}
          className="mt-3 max-md:mt-1 max-md:text-xs"
        >
          {title.btn}
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-full max-xs:text-xs md:max-w-[80vw]!"
      >
        <DialogHeader>
          <DialogTitle className="max-md:grid max-md:grid-col-1 max-md:text-base">
            Детальная информация о {title.header}
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="gap-4 grid grid-col-1 mt-">
          <ScrollArea className="max-h-[50vh] md:max-h-[50vh]">
            <Card className="max-md:min-h-[50vh] gap-4 max-md:gap-2">
              <CardHeader className="grid grid-cols-2 max-md:grid-cols-1 max-md:px-0">
                <CardTitle className="text-center text-lg max-md:text-base">
                  Сегмент {firstTitle}
                </CardTitle>
                <CardTitle className="text-center text-lg max-md:text-base max-md:text-muted-foreground">
                  Сегмент {secondTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="max-md:px-0">
                <div className="grid grid-cols-8 max-md:grid-cols-4 *:text-center border-t max-md:text-xs max-md:*:py-2">
                  <span className="py-4 max-md:hidden">№</span>
                  <span className="py-4 max-md:hidden">Показатель</span>
                  <span className="py-4 max-md:hidden">Значение</span>
                  <span className="py-4 md:border-r max-md:hidden">Доля</span>
                  <span className="py-4">№</span>
                  <span className="py-4">Показатель</span>
                  <span className="py-4">Значение</span>
                  <span className="py-4">Доля</span>
                  <div className="col-span-8 grid grid-cols-8 max-md:grid-cols-4 *:border-t *:py-4  max-md:*:py-2">
                    {firstData &&
                      secondData &&
                      Array.from({
                        length: Math.max(firstData.length, secondData.length),
                      }).map((_, idx) => (
                        <Fragment key={idx}>
                          <span className="text-center">
                            {firstData[idx]?.name && idx + 1}
                          </span>
                          <span className="text-center">
                            {firstData[idx]?.name && firstData[idx]?.name}
                          </span>
                          <span className="text-center">
                            {firstData[idx]?.count &&
                              Math.round(firstData[idx].count)
                                .toLocaleString()
                                .replace(/,/g, " ")}
                            {firstData[idx]?.proceed &&
                              Math.round(firstData[idx].proceed)
                                .toLocaleString()
                                .replace(/,/g, " ")}
                          </span>
                          <span className="text-center md:border-r">
                            {(firstData[idx]?.percent ||
                              firstData[idx]?.percent === 0) &&
                              `${firstData[idx]?.percent}%`}
                          </span>
                          <span className="text-center max-md:text-muted-foreground">
                            {secondData[idx]?.name && idx + 1}
                          </span>
                          <span className="text-center max-md:text-muted-foreground">
                            {secondData[idx]?.name && secondData[idx]?.name}
                          </span>
                          <span className="text-center max-md:text-muted-foreground">
                            {secondData[idx]?.count &&
                              Math.round(secondData[idx].count)
                                .toLocaleString()
                                .replace(/,/g, " ")}
                            {secondData[idx]?.proceed &&
                              Math.round(secondData[idx].proceed)
                                .toLocaleString()
                                .replace(/,/g, " ")}
                          </span>
                          <span className="text-center max-md:text-muted-foreground">
                            {(secondData[idx]?.percent ||
                              secondData[idx]?.percent === 0) &&
                              `${secondData[idx]?.percent}%`}
                          </span>
                        </Fragment>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
