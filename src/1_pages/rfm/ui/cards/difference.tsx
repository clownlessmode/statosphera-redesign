import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { FC } from "react";
import {
  ComparisonTwoRfmResponse,
  MainAllDataSegmentResponse,
} from "@pages/rfm/config";
import { RfmElmSkeleton } from "./rfm-elm-skeleton";
import { DifferenceModal } from "./difference-modal";

interface Props {
  mainData: ComparisonTwoRfmResponse["diff"];
  allData: {
    first: MainAllDataSegmentResponse;
    second: MainAllDataSegmentResponse;
  };
  firstCode: number;
  secondCode: number;
  isLoading: boolean;
}

export const Difference: FC<Props> = ({
  mainData,
  allData,
  firstCode,
  secondCode,
  isLoading,
}) => {
  if (isLoading) return <RfmElmSkeleton />;

  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <div className="flex flex-row">
          <div className="flex flex-row gap-2 items-center mt-1">
            <Badge className="py-2 w-15 text-sm font-semibold">
              {firstCode}
            </Badge>
            <CardTitle className="text-md">VS</CardTitle>
            <Badge className="py-2 w-15 text-sm font-semibold">
              {secondCode}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-8 pt-3.5 w-full">
        <div className="grid grid-cols-1">
          <span className="text-lg text-primary/90 font-bold col-span-2">
            Основная информация
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Клиенты
            </span>
            <span className="mt-1">
              {mainData?.countClient ? mainData?.countClient : 0}
            </span>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <span className="mt-1">
              {mainData?.proceedAll
                ? Math.round(mainData?.proceedAll)
                    .toLocaleString()
                    .replace(/,/g, " ")
                : 0}
            </span>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Средний чек
            </span>
            <span className="mt-1">
              {mainData?.proceedAvgCheck ? mainData?.proceedAvgCheck : 0}
            </span>
          </div>
          <div className="flex flex-col my-2">
            <div className="flex flex-row items-center">
              <span className="text-md text-muted-foreground font-semibold">
                В опасной зоне
              </span>
            </div>
            <span className="mt-1">
              {mainData?.countClientInWarningZone
                ? mainData?.countClientInWarningZone
                : 0}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <span className="text-lg text-primary/90 font-bold col-span-1">
            Клиентская база
          </span>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.checkZones}
              secondData={allData.second.checkZones}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в чеках",
                btn: "Кол-во чеков клиента",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.storeZones}
              secondData={allData.second.storeZones}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в магазинах",
                btn: "Кол-во магазинов",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.clientAges}
              secondData={allData.second.clientAges}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в возрасте",
                btn: "Возраст клиентов",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.accountAges}
              secondData={allData.second.accountAges}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях во времени жизни аккаунта",
                btn: "Время жизни аккаунта",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Период между покупками
            </span>
            <span className="mt-1">{mainData?.avgPeriodPerSales} дней</span>
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.genders}
              secondData={allData.second.genders}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях клиентов по полу",
                btn: "Пол",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <span className="text-lg text-primary/90 font-bold col-span-1">
            Интернет магазин
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <span className="mt-1">
              {mainData &&
                Math.round(mainData?.proceedIM)
                  .toLocaleString()
                  .replace(/,/g, " ")}{" "}
              ({mainData?.proceedPersentIM}%)
            </span>
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.orderMethods}
              secondData={allData.second.orderMethods}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в способах доставки",
                btn: "Способ заказа",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.deliveryMethods}
              secondData={allData.second.deliveryMethods}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в способах доставки",
                btn: "Способ доставки",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <span className="text-lg text-primary/90 font-bold col-span-3">
            Ночные магазины
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Клиенты
            </span>
            <span className="mt-1">
              {mainData?.countNightClient
                ? mainData?.countNightClient
                : "Нет данных"}{" "}
            </span>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <span className="mt-1">
              {mainData?.proceedNightClient
                ? Math.round(mainData?.proceedNightClient)
                    .toLocaleString()
                    .replace(/,/g, " ")
                : "Нет данных"}{" "}
            </span>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Прибыль
            </span>
            <span className="mt-1">
              {mainData?.profitNightClient
                ? Math.round(mainData?.profitNightClient)
                    .toLocaleString()
                    .replace(/,/g, " ")
                : "Нет данных"}{" "}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <span className="text-lg text-primary/90 font-bold col-span-3">
            Микромаркеты
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Клиенты
            </span>
            <span className="mt-1">
              {mainData?.countMMClient
                ? mainData?.countMMClient
                : "Нет данных"}{" "}
            </span>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <span className="mt-1">
              {mainData?.proceedMMClient
                ? Math.round(mainData?.proceedMMClient)
                    .toLocaleString()
                    .replace(/,/g, " ")
                : "Нет данных"}{" "}
            </span>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Прибыль
            </span>
            <span className="mt-1">
              {mainData?.profitMMClient
                ? Math.round(mainData?.profitMMClient)
                    .toLocaleString()
                    .replace(/,/g, " ")
                : "Нет данных"}{" "}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <span className="text-lg text-primary/90 font-bold col-span-1">
            Продажи и акции
          </span>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.productGroups}
              secondData={allData.second.productGroups}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в группах",
                btn: "Популярная группа",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.bonuses}
              secondData={allData.second.bonuses}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в бонусах",
                btn: "Популярный бонус",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <span className="text-lg text-primary/90 font-bold col-span-1">
            География и время
          </span>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.regions}
              secondData={allData.second.regions}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в регионах",
                btn: "Популярный регион",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.cities}
              secondData={allData.second.cities}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в городах",
                btn: "Популярный город",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.stores}
              secondData={allData.second.stores}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в магазинах",
                btn: "Популярный магазин",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.timeDays}
              secondData={allData.second.timeDays}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях во времени покупок",
                btn: "Время покупок",
              }}
            />
          </div>
          <div className="flex flex-col my-2">
            <DifferenceModal
              firstData={allData.first.weekDays}
              secondData={allData.second.weekDays}
              firstTitle={firstCode}
              secondTitle={secondCode}
              title={{
                header: "различиях в днях недели",
                btn: "День недели",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
