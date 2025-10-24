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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="mt-3">
          {title.btn}
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-full max-xs:text-xs md:max-w-[80vw]!"
      >
        <DialogHeader>
          <DialogTitle className="max-md:grid max-md:grid-col-1">
            Детальная информация о {title.header}
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="gap-4 grid grid-col-1 mt-">
          <ScrollArea className="max-h-[50vh] md:max-h-[50vh]">
            <Card className="max-md:min-h-[50vh] gap-4">
              <CardHeader className="grid grid-cols-2">
                <CardTitle className="text-center text-lg ">
                  Сегмент {firstTitle}
                </CardTitle>
                <CardTitle className="text-center text-lg">
                  Сегмент {secondTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-8">
                  <span className="text-center py-4 border-t">№</span>
                  <span className="text-center py-4 border-t">Показатель</span>
                  <span className="text-center py-4 border-t">Количество</span>
                  <span className="text-center py-4 border-t border-r">
                    Доля
                  </span>
                  <span className="text-center py-4 border-t">№</span>
                  <span className="text-center py-4 border-t">Показатель</span>
                  <span className="text-center py-4 border-t">Количество</span>
                  <span className="text-center py-4 border-t">Доля</span>
                  <div className="col-span-8 grid grid-cols-8 *:border-t *:py-4">
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
                          <span className="text-center border-r">
                            {(firstData[idx]?.percent ||
                              firstData[idx]?.percent === 0) &&
                              `${firstData[idx]?.percent}%`}
                          </span>
                          <span className="text-center">
                            {secondData[idx]?.name && idx + 1}
                          </span>
                          <span className="text-center">
                            {secondData[idx]?.name && secondData[idx]?.name}
                          </span>
                          <span className="text-center">
                            {secondData[idx]?.count &&
                              Math.round(secondData[idx].count)
                                .toLocaleString()
                                .replace(/,/g, " ")}
                            {secondData[idx]?.proceed &&
                              Math.round(secondData[idx].proceed)
                                .toLocaleString()
                                .replace(/,/g, " ")}
                          </span>
                          <span className="text-center">
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
