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
        <span className="text-sm text-muted-foreground hover:text-primary/90 hover:font-semibold hover:cursor-pointer">
          Подробнее..
        </span>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-full max-xs:text-xs md:max-w-[80vw]!"
      >
        <DialogHeader>
          <DialogTitle className="max-md:grid max-md:grid-col-1">
            Детальная информация о {title}
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="gap-4 grid grid-col-1 mt-">
          <ScrollArea className="max-h-[50vh] md:max-h-[50vh]">
            <Card className="max-md:min-h-[50vh] gap-4">
              <CardHeader className="grid grid-cols-3">
                <CardTitle className="text-center text-lg">
                  Показатель
                </CardTitle>
                <CardTitle className="text-center text-lg">Значение</CardTitle>
                <CardTitle className="text-center text-lg">Доля</CardTitle>
              </CardHeader>
              <CardContent>
                {!isLoading && data ? (
                  data?.map((item, idx) => (
                    <Fragment key={idx}>
                      <div className="grid grid-cols-3 py-4 border-t">
                        <span className="text-center">
                          {idx + 1}. {item.name}
                        </span>
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
