import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import {
  MainAllDataSegmentResponse,
  MainDataSegmentResponse,
} from "@pages/rfm/config";
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
import { FC, useState } from "react";
import { Button } from "@shared/ui/button";
import SegmentsSkeleton from "./segments-skeleton";
import { useFiltersStore } from "@widgets/rfm/model/filters-store";
import { ModalInfo } from "./segments-modal";
import { useRfm } from "@pages/rfm/api";
import { DownloadSegment } from "@features/rfm/download";

interface Props {
  data: MainDataSegmentResponse[];
  isLoading: boolean;
}

export const SegmentsCard: FC<Props> = ({ data, isLoading }) => {
  const [show, setShow] = useState(true);
  const [dataSegment, setDataSegment] = useState<MainAllDataSegmentResponse>();
  const { getApiPayload } = useFiltersStore();
  const filters = getApiPayload();
  const { getMainAllDataSegment, isMainAllDataSegmentLoading } = useRfm();

  const selectSegment = (segment: number) => {
    if (!dataSegment || segment !== dataSegment.segmentCode) {
      const filter = {
        period: filters.period,
        rfmList: [segment],
        sex: filters.sex,
        age: filters.agePeriods,
      };
      getMainAllDataSegment(filter).then((data) => {
        setDataSegment(data[0]);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <span className="text-md font-semibold max-md:text-sm">
          Детали по сегментам
        </span>
        <Button
          size="sm"
          className="ml-2 max-md:p-1.5 max-md:h-max max-md:text-xs"
          onClick={() => setShow(!show)}
        >
          {show ? "Скрыть" : "Показать"}
        </Button>
      </div>
      {isLoading || data?.length === 0 //Проверяем на загрузку и наличие данных
        ? show && <SegmentsSkeleton count={filters.rfmList.length} />
        : show &&
          data
            .sort((a, b) => Number(a.segmentCode) - Number(b.segmentCode))
            .map((segment) => (
              <Card key={segment.segmentCode} className="max-md:py-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={String(segment.segmentCode)}>
                    <AccordionTrigger
                      onClick={() => selectSegment(segment.segmentCode)}
                      className="flex flex-row items-center py-2 px-8 max-md:px-2 max-md:py-0"
                    >
                      <CardHeader className="flex flex-col w-full p-0">
                        <div className="flex flex-row justify-between w-full">
                          <div className="flex flex-row gap-2 items-center max-md:gap-1">
                            <Badge className="py-2 w-15 text-sm font-semibold max-md:text-xs max-md:w-10">
                              {segment.segmentCode}
                            </Badge>
                            <div className="flex flex-col w-max">
                              <CardTitle className="text-md max-md:text-xs flex flex-row items-center max-xxs:*:hidden">
                                {segment.segment}
                                <DownloadSegment
                                  rfmCode={segment.segmentCode}
                                />
                              </CardTitle>
                              <span className="xxs:*:hidden max-md:text-xs flex flex-row items-center">
                                Период: {segment.period}
                                <DownloadSegment
                                  rfmCode={segment.segmentCode}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 pt-4 w-full gap-10 max-md:hidden">
                          <div className="flex flex-col">
                            <span className="text-md font-semibold">
                              Клиенты
                            </span>
                            <span>
                              {segment.countClient ? segment.countClient : 0}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-md font-semibold">
                              Выручка
                            </span>
                            <span>
                              {segment.proceedAll
                                ? Math.round(segment.proceedAll)
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : 0}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-md font-semibold">
                              Средний чек
                            </span>
                            <span>
                              {segment.proceedAvgCheck
                                ? segment.proceedAvgCheck
                                : 0}
                            </span>
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
                            <span>
                              {segment.countClientInWarningZone
                                ? segment.countClientInWarningZone
                                : 0}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Separator className="max-md:mt-2" />
                      <CardContent className="grid grid-cols-4 gap-4 px-8 pt-2 w-full max-md:grid-cols-2 max-md:gap-2 max-md:px-2 max-md:text-xs">
                        <div className="grid-cols-2 pt-4 w-full gap-2 col-span-2 hidden max-md:grid max-md:pt-0">
                          <span className="text-lg text-primary/90 font-bold col-span-2 max-md:col-span-2 max-md:text-sm">
                            Основная информация
                          </span>
                          <div className="flex flex-col">
                            <span className="text-md font-semibold max-md:text-muted-foreground">
                              Клиенты
                            </span>
                            <span>
                              {segment.countClient ? segment.countClient : 0}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-md font-semibold max-md:text-muted-foreground">
                              Выручка
                            </span>
                            <span>
                              {segment.proceedAll
                                ? Math.round(segment.proceedAll)
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : 0}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-md font-semibold max-md:text-muted-foreground">
                              Средний чек
                            </span>
                            <span>
                              {segment.proceedAvgCheck
                                ? segment.proceedAvgCheck
                                : 0}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex flex-row items-center">
                              <span className="text-md font-semibold max-md:text-muted-foreground">
                                В опасной зоне
                              </span>
                            </div>
                            <span>
                              {segment.countClientInWarningZone
                                ? segment.countClientInWarningZone
                                : 0}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg text-primary/90 font-bold max-md:text-sm">
                            Клиентская база
                          </span>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Чеки
                            </span>
                            <span className="mt-1">
                              {segment.countChecks
                                ? segment.countChecks
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <div className="flex flex-row items-center">
                              <span className="text-md text-muted-foreground font-semibold">
                                Кол-во чеков у клиента
                              </span>
                              <Tooltip>
                                <TooltipTrigger
                                  className="ml-1 max-md:hidden"
                                  asChild
                                >
                                  <Info className="h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
                                </TooltipTrigger>
                                <TooltipContent
                                  sideOffset={10}
                                  className="w-[300px] h-fit p-2 text-center"
                                  side="right"
                                >
                                  Преобладающее кол-во чеков у клиентов за
                                  выбранный период.
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <span className="mt-1">
                              {segment.mainCountCheckPerClient
                                ? segment.mainCountCheckPerClient
                                : "Нет данных"}{" "}
                              (
                              {segment.mainCountCheckPerClientPercent
                                ? segment.mainCountCheckPerClientPercent
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.checkZones}
                              isLoading={isMainAllDataSegmentLoading}
                              title="количестве чеков клиентов"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <div className="flex flex-row items-center">
                              <span className="text-md text-muted-foreground font-semibold">
                                Кол-во магазинов
                              </span>
                              <Tooltip>
                                <TooltipTrigger
                                  className="ml-1 max-md:hidden"
                                  asChild
                                >
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
                              {segment.mainCountStorePerClient
                                ? segment.mainCountStorePerClient
                                : "Нет данных"}{" "}
                              (
                              {segment.mainCountStorePerClientPercent
                                ? segment.mainCountStorePerClientPercent
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.storeZones}
                              isLoading={isMainAllDataSegmentLoading}
                              title="количестве магазинов клиентов"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Возраст клиента
                            </span>
                            <span className="mt-1">
                              {segment.mainLifeClientPeriod
                                ? segment.mainLifeClientPeriod
                                : "Нет данных"}{" "}
                              (
                              {segment.mainLifeClientPercent
                                ? segment.mainLifeClientPercent
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.clientAges}
                              isLoading={isMainAllDataSegmentLoading}
                              title="возрасте клиента"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Время жизни аккаунта
                            </span>
                            <span className="mt-1">
                              {segment.mainLifeAccoutPeriod
                                ? segment.mainLifeAccoutPeriod
                                : "Нет данных"}{" "}
                              (
                              {segment.mainLifeAccoutPeriodPercent
                                ? segment.mainLifeAccoutPeriodPercent
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.accountAges}
                              isLoading={isMainAllDataSegmentLoading}
                              title="времени жизни аккаунта"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Период между покупками
                            </span>
                            <span className="mt-1">
                              {segment.avgPeriodPerSales} дней
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Пол
                            </span>
                            <span className="mt-1">
                              {segment.mainGender
                                ? segment.mainGender
                                : "Нет данных"}{" "}
                              (
                              {segment.mainGenderPercent
                                ? segment.mainGenderPercent
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.genders}
                              isLoading={isMainAllDataSegmentLoading}
                              title="поле клиентов"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg text-primary/90 font-bold max-md:text-sm">
                            Интернет магазин
                          </span>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Чеки
                            </span>
                            <span className="mt-1">
                              {segment.countIM
                                ? segment.countIM
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Выручка
                            </span>
                            <span className="mt-1">
                              {Math.round(segment.proceedIM)
                                .toLocaleString()
                                .replace(/,/g, " ")}{" "}
                              ({segment.proceedPersentIM}%)
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Способ заказа
                            </span>
                            <span className="mt-1">
                              {segment.mainOrderMethod
                                ? segment.mainOrderMethod
                                : "Нет данных"}{" "}
                              (
                              {segment.proceedPersentIMMainOrderMethod
                                ? segment.proceedPersentIMMainOrderMethod
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.orderMethods}
                              isLoading={isMainAllDataSegmentLoading}
                              title="способах заказа"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Способ доставки
                            </span>
                            <span className="mt-1">
                              {segment.mainOrderDelivery
                                ? segment.mainOrderDelivery
                                : "Нет данных"}{" "}
                              (
                              {segment.proceedPersentIMMainOrderDelivery
                                ? segment.proceedPersentIMMainOrderDelivery
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.deliveryMethods}
                              isLoading={isMainAllDataSegmentLoading}
                              title="способах доставки"
                            />
                          </div>
                          <span className="text-lg text-primary/90 font-bold max-md:text-sm">
                            Продажи и акции
                          </span>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Популярная группа
                            </span>
                            <span className="mt-1">
                              {segment.mainGroupProduct
                                ? segment.mainGroupProduct
                                : "Нет данных"}{" "}
                              (
                              {segment.proceedPercentMainGroupProduct
                                ? segment.proceedPercentMainGroupProduct
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.productGroups}
                              isLoading={isMainAllDataSegmentLoading}
                              title="популярных группах"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Популярный бонус
                            </span>
                            <span className="mt-1">
                              {segment.mainBonus
                                ? segment.mainBonus.replace(/\[[^\]]*\]/g, "")
                                : "Нет данных"}{" "}
                              (
                              {segment.proceedPercentMainBonus
                                ? segment.proceedPercentMainBonus
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.bonuses}
                              isLoading={isMainAllDataSegmentLoading}
                              title="популярных бонусах"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg text-primary/90 font-bold max-md:text-sm">
                            Ночные магазины
                          </span>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Чеки
                            </span>
                            <span className="mt-1">
                              {segment.countNightCheck
                                ? segment.countNightCheck
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Клиенты
                            </span>
                            <span className="mt-1">
                              {segment.countNightClient
                                ? segment.countNightClient
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Выручка
                            </span>
                            <span className="mt-1">
                              {segment.proceedNightClient
                                ? Math.round(segment.proceedNightClient)
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Прибыль
                            </span>
                            <span className="mt-1">
                              {segment.profitNightClient
                                ? Math.round(segment.profitNightClient)
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                          <span className="text-lg text-primary/90 font-bold max-md:text-sm">
                            Микромаркеты
                          </span>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Чеки
                            </span>
                            <span className="mt-1">
                              {segment.countMMCheck
                                ? segment.countMMCheck
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Клиенты
                            </span>
                            <span className="mt-1">
                              {segment.countMMClient
                                ? segment.countMMClient
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Выручка
                            </span>
                            <span className="mt-1">
                              {segment.proceedMMClient
                                ? Math.round(segment.proceedMMClient)
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Прибыль
                            </span>
                            <span className="mt-1">
                              {segment.profitMMClient
                                ? Math.round(segment.profitMMClient)
                                    .toLocaleString()
                                    .replace(/,/g, " ")
                                : "Нет данных"}{" "}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg text-primary/90 font-bold max-md:text-sm">
                            География и время
                          </span>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Популярный регион
                            </span>
                            <span className="mt-1">
                              {segment.mainRegion
                                ? segment.mainRegion
                                : "Нет данных"}{" "}
                              (
                              {segment.proseedPercentMainRegion
                                ? segment.proseedPercentMainRegion
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.regions}
                              isLoading={isMainAllDataSegmentLoading}
                              title="популярных регионах"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Популярный город
                            </span>
                            <span className="mt-1">
                              {segment.mainCity
                                ? segment.mainCity
                                : "Нет данных"}{" "}
                              (
                              {segment.proseedPercentMainCity
                                ? segment.proseedPercentMainCity
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.cities}
                              isLoading={isMainAllDataSegmentLoading}
                              title="популярных городах"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Популярный магазин
                            </span>
                            <span className="mt-1">
                              {segment.mainStore
                                ? segment.mainStore
                                : "Нет данных"}{" "}
                              (
                              {segment.proseedPercentMainStore
                                ? segment.proseedPercentMainStore
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.stores}
                              isLoading={isMainAllDataSegmentLoading}
                              title="популярных магазинах"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              Время покупок
                            </span>
                            <span className="mt-1">
                              {segment.mainTimeDay
                                ? segment.mainTimeDay
                                : "Нет данных"}{" "}
                              (
                              {segment.proseedPercentMainTimeDay
                                ? segment.proseedPercentMainTimeDay
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.timeDays}
                              isLoading={isMainAllDataSegmentLoading}
                              title="времени покупок"
                            />
                          </div>
                          <div className="flex flex-col my-2 max-md:my-1.5">
                            <span className="text-md text-muted-foreground font-semibold">
                              День недели
                            </span>
                            <span className="mt-1">
                              {segment.mainWeekDay
                                ? segment.mainWeekDay
                                : "Нет данных"}{" "}
                              (
                              {segment.proseedPercentMainWeekDay
                                ? segment.proseedPercentMainWeekDay
                                : 0}
                              %)
                            </span>
                            <ModalInfo
                              data={dataSegment?.weekDays}
                              isLoading={isMainAllDataSegmentLoading}
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
