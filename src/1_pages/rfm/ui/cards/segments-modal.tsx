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
import Spinner from "@shared/ui/spinner";

interface ModalProps {
  title: string;
  isLoading: boolean;
  data:
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

export const ModalInfo = ({ data, isLoading, title }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-sm text-muted-foreground hover:text-primary/90 hover:font-semibold hover:cursor-pointer max-md:text-xs">
          Подробнее..
        </span>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-full max-xs:text-xs md:max-w-[80vw]!"
      >
        <DialogHeader>
          <DialogTitle className="max-md:grid max-md:grid-col-1 max-md:text-base">
            Детальная информация о {title}
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="gap-4 grid grid-col-1">
          <ScrollArea className="max-h-[50vh] md:max-h-[50vh]">
            <Card className="max-md:min-h-[50vh] gap-4 max-md:gap-2">
              <CardHeader className="grid grid-cols-4 max-md:px-0">
                <CardTitle className="text-center text-lg max-md:text-xs">
                  №
                </CardTitle>
                <CardTitle className="text-center text-lg max-md:text-xs">
                  Показатель
                </CardTitle>
                <CardTitle className="text-center text-lg max-md:text-xs">
                  Значение
                </CardTitle>
                <CardTitle className="text-center text-lg max-md:text-xs">
                  Доля
                </CardTitle>
              </CardHeader>
              <CardContent className="max-md:px-0 max-md:text-xs">
                {!isLoading && data ? (
                  data?.map((item, idx) => (
                    <Fragment key={idx}>
                      <div className="grid grid-cols-4 py-4 border-t max-md:py-2">
                        <span className="text-center">{idx + 1}</span>
                        <span className="text-center">{item.name}</span>
                        <span className="text-center">
                          {item.count &&
                            Math.round(item.count)
                              .toLocaleString()
                              .replace(/,/g, " ")}
                          {item.proceed &&
                            Math.round(item.proceed)
                              .toLocaleString()
                              .replace(/,/g, " ")}
                        </span>
                        <span className="text-center">{item.percent}%</span>
                      </div>
                    </Fragment>
                  ))
                ) : (
                  <div className="my-[10%] flex flex-row gap-2 h-full w-full justify-center items-end">
                    <Spinner />
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollArea>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
