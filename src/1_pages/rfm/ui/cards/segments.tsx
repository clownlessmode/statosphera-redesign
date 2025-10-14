import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
//import { useIsMobile } from "@shared/hooks/use-mobile";
import { SixteenCalculationResponse } from "@pages/rfm/config";
import { Badge } from "@shared/ui/badge";
import { Separator } from "@shared/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { Info } from "lucide-react";
import { Skeleton } from "@shared/ui/skeleton";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { ScrollArea } from "@shared/ui/scroll-area";

export const Segments = ({
  data,
  isLoading,
}: {
  data: SixteenCalculationResponse[];
  isLoading: boolean;
}) => {
  //const isMobile = useIsMobile();
  if (isLoading)
    return (
      <div className="flex flex-col gap-2">
        <span className="text-md font-semibold">Детали по сегментам</span>
        <Skeleton className="h-38" />
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-semibold">Детали по сегментам</span>
      {data
        .sort((a, b) => Number(a.segmentCode) - Number(b.segmentCode))
        .map((segment) => (
          <Card key={segment.segmentCode}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={segment.segmentCode}>
                <AccordionTrigger className="flex flex-row items-center py-2 px-8">
                  <CardHeader className="flex flex-col w-full p-0">
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex flex-row gap-2 items-center">
                        <Badge className="py-2 w-15 text-sm font-semibold">
                          {segment.segmentCode}
                        </Badge>
                        <div className="flex flex-col w-max">
                          <CardTitle className="text-md">
                            {segment.segment}
                          </CardTitle>
                          Период: {segment.period}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 pt-4 w-full gap-10">
                      <div className="flex flex-col">
                        <span className="text-md font-semibold">Клиенты</span>
                        <span>{segment.countClient}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-md font-semibold">Выручка</span>
                        <span>
                          {Math.round(segment.proceedAll)
                            .toLocaleString()
                            .replace(/,/g, " ")}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-md font-semibold">
                          Средний чек
                        </span>
                        <span>{segment.proceedAvgCheck}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <span className="text-md font-semibold">
                            В опасной зоне
                          </span>
                          <Tooltip>
                            <TooltipTrigger className="ml-1" asChild>
                              <Info className="h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent
                              sideOffset={10}
                              className="w-[300px] h-fit p-2 text-center"
                              side="right"
                            >
                              Кол-во клиентов, подверженных переходу в более
                              низкий сегмент. Эти клиенты требуют внимания.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span>{segment.countClientInWarningZone}</span>
                      </div>
                    </div>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <Separator />
                  <CardContent className="grid grid-cols-4 gap-4 px-8 pt-2 w-full">
                    <div className="flex flex-col">
                      <span className="text-lg text-primary/90 font-bold">
                        Клиентская база
                      </span>
                      <div className="flex flex-col my-2">
                        <div className="flex flex-row items-center">
                          <span className="text-md text-muted-foreground font-semibold">
                            Кол-во чеков клиента
                          </span>
                          <Tooltip>
                            <TooltipTrigger className="ml-1" asChild>
                              <Info className="h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent
                              sideOffset={10}
                              className="w-[300px] h-fit p-2 text-center"
                              side="right"
                            >
                              Преобладающее кол-во чеков у клиентов за выбранный
                              период.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span className="mt-1">
                          {segment.checkZones[0]
                            ? segment.checkZones[0].name
                            : "Нет данных"}{" "}
                          (
                          {segment.checkZones[0]
                            ? segment.checkZones[0].percent
                            : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.checkZones}
                          title="кол-ве чеков клиента"
                        />
                      </div>
                      <div className="flex flex-col my-2">
                        <div className="flex flex-row items-center">
                          <span className="text-md text-muted-foreground font-semibold">
                            Кол-во магазинов
                          </span>
                          <Tooltip>
                            <TooltipTrigger className="ml-1" asChild>
                              <Info className="h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent
                              sideOffset={10}
                              className="w-[300px] h-fit p-2 text-center"
                              side="right"
                            >
                              Кол-во магазинов, посещённых клиентами за
                              выбранный период.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span className="mt-1">
                          {segment.storeZones[0]
                            ? segment.storeZones[0].name
                            : "Нет данных"}{" "}
                          (
                          {segment.storeZones[0]
                            ? segment.storeZones[0].percent
                            : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.storeZones}
                          title="кол-ве магазинов клиента"
                        />
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Возраст клиентов
                        </span>
                        <span className="mt-1">
                          {segment.clientAges[0]
                            ? segment.clientAges[0].name
                            : "Нет данных"}{" "}
                          (
                          {segment.clientAges[0]
                            ? segment.clientAges[0].percent
                            : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.clientAges}
                          title="возрасте клиентов"
                        />
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Время жизни аккаунта
                        </span>
                        <span className="mt-1">
                          {segment.accountAges[0]
                            ? segment.accountAges[0].name
                            : "Нет данных"}{" "}
                          (
                          {segment.accountAges[0]
                            ? segment.accountAges[0].percent
                            : 0}
                          %)
                        </span>
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Период между покупками
                        </span>
                        <span className="mt-1">
                          {segment.avgPeriodPerSales} дней
                        </span>
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Пол
                        </span>
                        <span className="mt-1">
                          {segment.genders[0]
                            ? segment.genders[0].name
                            : "Нет данных"}{" "}
                          ({segment.genders[0] ? segment.genders[0].percent : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.genders}
                          title="поле клиентов"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg text-primary/90 font-bold">
                        Интернет магазин
                      </span>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Выручка
                        </span>
                        <span className="mt-1">
                          {Math.round(segment.proceedIM)
                            .toLocaleString()
                            .replace(/,/g, " ")}{" "}
                          ({segment.proceedPercentIM}%)
                        </span>
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Способ заказа
                        </span>
                        <span className="mt-1">
                          {segment.orderMethods[0]
                            ? segment.orderMethods[0].name
                            : "Нет данных"}{" "}
                          (
                          {segment.orderMethods[0]
                            ? segment.orderMethods[0].percent
                            : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.orderMethods}
                          title="способах заказа"
                        />
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Способ доставки
                        </span>
                        <span className="mt-1">
                          {segment.deliveryMethods[0]
                            ? segment.deliveryMethods[0].name
                            : "Нет данных"}{" "}
                          (
                          {segment.deliveryMethods[0]
                            ? segment.deliveryMethods[0].percent
                            : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.deliveryMethods}
                          title="способах доставки"
                        />
                      </div>
                      <span className="text-lg text-primary/90 font-bold">
                        Ночные магазины
                      </span>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Клиенты
                        </span>
                        <span className="mt-1">
                          {segment.countNightClient
                            ? segment.countNightClient
                            : "Нет данных"}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg text-primary/90 font-bold">
                        Продажи и акции
                      </span>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Популярная группа
                        </span>
                        <span className="mt-1">
                          {segment.productGroups[0]
                            ? segment.productGroups[0].name
                            : "Нет данных"}{" "}
                          (
                          {segment.productGroups[0]
                            ? segment.productGroups[0].percent
                            : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.productGroups}
                          title="популярных группах"
                        />
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Популярный бонус
                        </span>
                        <span className="mt-1">
                          {segment.bonuses[0]
                            ? segment.bonuses[0].name.replace(/\[[^\]]*\]/g, "")
                            : "Нет данных"}{" "}
                          ({segment.bonuses[0] ? segment.bonuses[0].percent : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.bonuses}
                          title="популярных бонусах"
                        />
                      </div>
                      <span className="text-lg text-primary/90 font-bold">
                        Микромаркеты
                      </span>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Клиенты
                        </span>
                        <span className="mt-1">
                          {segment.countMMClient
                            ? segment.countMMClient
                            : "Нет данных"}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg text-primary/90 font-bold">
                        География и время
                      </span>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Популярный регион
                        </span>
                        <span className="mt-1">
                          {segment.regions[0]
                            ? segment.regions[0].name
                            : "Нет данных"}{" "}
                          ({segment.regions[0] ? segment.regions[0].percent : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.regions}
                          title="популярных регионах"
                        />
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Популярный город
                        </span>
                        <span className="mt-1">
                          {segment.cities[0]
                            ? segment.cities[0].name
                            : "Нет данных"}{" "}
                          ({segment.cities[0] ? segment.cities[0].percent : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.cities}
                          title="популярных городах"
                        />
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Популярный магазин
                        </span>
                        <span className="mt-1">
                          {segment.stores[0]
                            ? segment.stores[0].name
                            : "Нет данных"}{" "}
                          ({segment.stores[0] ? segment.stores[0].percent : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.stores}
                          title="популярных магазинах"
                        />
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          Время покупок
                        </span>
                        <span className="mt-1">
                          {segment.timeDays[0]
                            ? segment.timeDays[0].name
                            : "Нет данных"}{" "}
                          (
                          {segment.timeDays[0]
                            ? segment.timeDays[0].percent
                            : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.timeDays}
                          title="времени покупок"
                        />
                      </div>
                      <div className="flex flex-col my-2">
                        <span className="text-md text-muted-foreground font-semibold">
                          День недели
                        </span>
                        <span className="mt-1">
                          {segment.weekDays[0]
                            ? segment.weekDays[0].name
                            : "Нет данных"}{" "}
                          (
                          {segment.weekDays[0]
                            ? segment.weekDays[0].percent
                            : 0}
                          %)
                        </span>
                        <ModalInfo
                          data={segment.weekDays}
                          title="днях недели"
                        />
                      </div>
                    </div>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
    </div>
  );
};

interface ModalProps {
  title: string;
  data:
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

const ModalInfo = ({ data, title }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-sm text-muted-foreground hover:text-primary/90 hover:font-semibold hover:cursor-pointer">
          Подробнее..
        </span>
      </DialogTrigger>
      <DialogContent className="w-full max-xs:text-xs md:max-w-[80vw]!">
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
                {data.map((item, idx) => (
                  <>
                    <div key={idx} className="grid grid-cols-3 py-4 border-t">
                      <span className="text-center">
                        {idx + 1}. {item.name}
                      </span>
                      <span className="text-center">
                        {item.count && Math.round(item.count)}
                        {item.proceed && Math.round(item.proceed)}
                      </span>
                      <span className="text-center">{item.percent}%</span>
                    </div>
                  </>
                ))}
              </CardContent>
            </Card>
          </ScrollArea>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
