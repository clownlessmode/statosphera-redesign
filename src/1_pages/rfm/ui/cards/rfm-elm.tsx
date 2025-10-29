import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { FC } from "react";
import { ComparisonTwoRfmResponse } from "@pages/rfm/config";
import { RfmElmSkeleton } from "./rfm-elm-skeleton";

interface Props {
  segment: ComparisonTwoRfmResponse["firstSegment"];
  isLoading: boolean;
}

export const RfmElm: FC<Props> = ({ segment, isLoading }) => {
  if (isLoading) return <RfmElmSkeleton />;

  return (
    <Card className="max-md:gap-1">
      <CardHeader className="flex flex-col items-center">
        <div className="flex flex-row">
          <div className="flex flex-row gap-2 items-center">
            <Badge className="py-2 w-15 text-sm font-semibold max-md:text-xs max-md:w-10">
              {segment?.mainData.segmentCode}
            </Badge>
            <div className="flex flex-col w-full">
              <CardTitle className="text-md max-md:text-xs">
                {segment?.mainData.segment}
              </CardTitle>
              <span className="max-md:text-xs">
                Период: {segment?.mainData.period}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-8 pt-2 w-full max-md:gap-1 max-md:px-4 max-md:text-xs">
        <div className="grid grid-cols-2 max-md:grid-cols-2">
          <span className="text-lg text-primary/90 font-bold col-span-2 max-md:col-span-2 max-md:text-sm">
            Основная информация
          </span>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Клиенты
            </span>
            <span className="mt-1">
              {segment?.mainData.countClient
                ? segment?.mainData.countClient
                : 0}
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <span className="mt-1">
              {segment?.mainData.proceedAll
                ? Math.round(segment?.mainData.proceedAll)
                    .toLocaleString()
                    .replace(/,/g, " ")
                : 0}
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Средний чек
            </span>
            <span className="mt-1">
              {segment?.mainData.proceedAvgCheck
                ? segment?.mainData.proceedAvgCheck
                : 0}
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <div className="flex flex-row items-center">
              <span className="text-md text-muted-foreground font-semibold">
                В опасной зоне
              </span>
            </div>
            <span className="mt-1">
              {segment?.mainData.countClientInWarningZone
                ? segment?.mainData.countClientInWarningZone
                : 0}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 max-md:grid-cols-2">
          <span className="text-lg text-primary/90 font-bold col-span-1 max-md:col-span-2 max-md:text-sm">
            Клиентская база
          </span>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Чеки
            </span>
            <span className="mt-1">
              {segment.mainData?.countChecks
                ? segment?.mainData.countChecks
                : "Нет данных"}
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <div className="flex flex-row items-center">
              <span className="text-md text-muted-foreground font-semibold">
                Кол-во чеков у клиента
              </span>
            </div>
            <span className="mt-1">
              {segment?.mainData.mainCountCheckPerClient
                ? segment?.mainData.mainCountCheckPerClient
                : "Нет данных"}{" "}
              (
              {segment?.mainData.mainCountCheckPerClientPercent
                ? segment?.mainData.mainCountCheckPerClientPercent
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <div className="flex flex-row items-center">
              <span className="text-md text-muted-foreground font-semibold">
                Кол-во магазинов
              </span>
            </div>
            <span className="mt-1">
              {segment?.mainData.mainCountStorePerClient
                ? segment?.mainData.mainCountStorePerClient
                : "Нет данных"}{" "}
              (
              {segment?.mainData.mainCountStorePerClientPercent
                ? segment?.mainData.mainCountStorePerClientPercent
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Возраст клиента
            </span>
            <span className="mt-1">
              {segment?.mainData.mainLifeClientPeriod
                ? segment?.mainData.mainLifeClientPeriod
                : "Нет данных"}{" "}
              (
              {segment?.mainData.mainLifeClientPercent
                ? segment?.mainData.mainLifeClientPercent
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Время жизни аккаунта
            </span>
            <span className="mt-1">
              {segment?.mainData.mainLifeAccoutPeriod
                ? segment?.mainData.mainLifeAccoutPeriod
                : "Нет данных"}{" "}
              (
              {segment?.mainData.mainLifeAccoutPeriodPercent
                ? segment?.mainData.mainLifeAccoutPeriodPercent
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Период между покупками
            </span>
            <span className="mt-1">
              {segment?.mainData.avgPeriodPerSales} дней
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Пол
            </span>
            <span className="mt-1">
              {segment?.mainData.mainGender
                ? segment?.mainData.mainGender
                : "Нет данных"}{" "}
              (
              {segment?.mainData.mainGenderPercent
                ? segment?.mainData.mainGenderPercent
                : 0}
              %)
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-lg text-primary/90 font-bold col-span-2 max-md:text-sm">
            Интернет магазин
          </span>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Чеки
            </span>
            <span className="mt-1">
              {segment?.mainData.countIM
                ? segment?.mainData.countIM
                : "Нет данных"}
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <span className="mt-1">
              {segment &&
                Math.round(segment?.mainData.proceedIM)
                  .toLocaleString()
                  .replace(/,/g, " ")}{" "}
              ({segment?.mainData.proceedPersentIM}%)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Способ заказа
            </span>
            <span className="mt-1">
              {segment?.mainData.mainOrderMethod
                ? segment?.mainData.mainOrderMethod
                : "Нет данных"}{" "}
              (
              {segment?.mainData.proceedPersentIMMainOrderMethod
                ? segment?.mainData.proceedPersentIMMainOrderMethod
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Способ доставки
            </span>
            <span className="mt-1">
              {segment?.mainData.mainOrderDelivery
                ? segment?.mainData.mainOrderDelivery
                : "Нет данных"}{" "}
              (
              {segment?.mainData.proceedPersentIMMainOrderDelivery
                ? segment?.mainData.proceedPersentIMMainOrderDelivery
                : 0}
              %)
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 max-md:grid-cols-2">
          <span className="text-lg text-primary/90 font-bold col-span-1 max-md:col-span-2 max-md:text-sm">
            Продажи и акции
          </span>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Популярная группа
            </span>
            <span className="mt-1">
              {segment?.mainData.mainGroupProduct
                ? segment?.mainData.mainGroupProduct
                : "Нет данных"}{" "}
              (
              {segment?.mainData.proceedPercentMainGroupProduct
                ? segment?.mainData.proceedPercentMainGroupProduct
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Популярный бонус
            </span>
            <span className="mt-1">
              {segment?.mainData.mainBonus
                ? segment?.mainData.mainBonus.replace(/\[[^\]]*\]/g, "")
                : "Нет данных"}{" "}
              (
              {segment?.mainData.proceedPercentMainBonus
                ? segment?.mainData.proceedPercentMainBonus
                : 0}
              %)
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-4">
          <span className="text-lg text-primary/90 font-bold col-span-2 max-md:col-span-4 max-md:text-sm">
            Ночные магазины
          </span>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Чеки
            </span>
            <span className="mt-1">
              {segment?.mainData.countNightCheck
                ? segment?.mainData.countNightCheck
                : "Нет данных"}
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Клиенты
            </span>
            <span className="mt-1">
              {segment?.mainData.countNightClient
                ? segment?.mainData.countNightClient
                : "Нет данных"}{" "}
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <span className="mt-1">
              {segment?.mainData.proceedNightClient
                ? Math.round(segment?.mainData.proceedNightClient)
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
              {segment?.mainData.profitNightClient
                ? Math.round(segment?.mainData.profitNightClient)
                    .toLocaleString()
                    .replace(/,/g, " ")
                : "Нет данных"}{" "}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-4">
          <span className="text-lg text-primary/90 font-bold col-span-2 max-md:col-span-4 max-md:text-sm">
            Микромаркеты
          </span>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Чеки
            </span>
            <span className="mt-1">
              {segment?.mainData.countMMCheck
                ? segment?.mainData.countMMCheck
                : "Нет данных"}
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Клиенты
            </span>
            <span className="mt-1">
              {segment?.mainData.countMMClient
                ? segment?.mainData.countMMClient
                : "Нет данных"}{" "}
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <span className="mt-1">
              {segment?.mainData.proceedMMClient
                ? Math.round(segment?.mainData.proceedMMClient)
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
              {segment?.mainData.profitMMClient
                ? Math.round(segment?.mainData.profitMMClient)
                    .toLocaleString()
                    .replace(/,/g, " ")
                : "Нет данных"}{" "}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 max-md:grid-cols-2">
          <span className="text-lg text-primary/90 font-bold col-span-1 max-md:col-span-2 max-md:text-sm">
            География и время
          </span>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Популярный регион
            </span>
            <span className="mt-1">
              {segment?.mainData.mainRegion
                ? segment?.mainData.mainRegion
                : "Нет данных"}{" "}
              (
              {segment?.mainData.proseedPercentMainRegion
                ? segment?.mainData.proseedPercentMainRegion
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Популярный город
            </span>
            <span className="mt-1">
              {segment?.mainData.mainCity
                ? segment?.mainData.mainCity
                : "Нет данных"}{" "}
              (
              {segment?.mainData.proseedPercentMainCity
                ? segment?.mainData.proseedPercentMainCity
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Популярный магазин
            </span>
            <span className="mt-1">
              {segment?.mainData.mainStore
                ? segment?.mainData.mainStore
                : "Нет данных"}{" "}
              (
              {segment?.mainData.proseedPercentMainStore
                ? segment?.mainData.proseedPercentMainStore
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              Время покупок
            </span>
            <span className="mt-1">
              {segment?.mainData.mainTimeDay
                ? segment?.mainData.mainTimeDay
                : "Нет данных"}{" "}
              (
              {segment?.mainData.proseedPercentMainTimeDay
                ? segment?.mainData.proseedPercentMainTimeDay
                : 0}
              %)
            </span>
          </div>
          <div className="flex flex-col my-2 max-md:my-1.5">
            <span className="text-md text-muted-foreground font-semibold">
              День недели
            </span>
            <span className="mt-1">
              {segment?.mainData.mainWeekDay
                ? segment?.mainData.mainWeekDay
                : "Нет данных"}{" "}
              (
              {segment?.mainData.proseedPercentMainWeekDay
                ? segment?.mainData.proseedPercentMainWeekDay
                : 0}
              %)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
