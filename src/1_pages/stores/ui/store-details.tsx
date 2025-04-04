import { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { ComponentProps, FC } from "react";

import { Card, CardContent, CardHeader } from "@shared/ui/card";
import {
  Building,
  Calendar,
  Coffee,
  MapPin,
  Phone,
  ShoppingCart,
} from "lucide-react";
import { Separator } from "@shared/ui/separator";
import { NotFoundRow } from "../../../5_shared/ui/table/not-found-row";
import StatusBadge from "@shared/ui/status-badge";
import formatDate from "@shared/lib/format-date";
import { ScrollArea } from "@shared/ui/scroll-area";
import { Map, Placemark, Polygon } from "@pbe/react-yandex-maps";

import { useTheme } from "@app/providers/theme-provider";
import { Store } from "../model/types";
import { TERRITORY_MOCK } from "@shared/constants/mock/territory-mock";
interface Props extends ComponentProps<FC<DialogProps>> {
  row: Store;
}

const StoreDetails: FC<Props> = ({ open, onOpenChange, row }) => {
  const { theme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw]!">
        <DialogHeader>
          <DialogTitle>
            Детали магазина{" "}
            <NotFoundRow
              value={row.storeAddress}
              className="inline font-medium"
            />
          </DialogTitle>
          <DialogDescription>
            Информация о магазине и его местоположение
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="gap-4 grid grid-cols-2 ">
          <ScrollArea className="max-h-[50vh]">
            <CardHeader className="flex flex-row gap-1 font-medium pl-0">
              <MapPin />
              Адрес и расположение
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Регион:</p>
                <NotFoundRow value={row.storeRegion} className="font-medium" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Город:</p>
                <NotFoundRow value={row.storeCity} className="font-medium" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Адрес:</p>
                <NotFoundRow value={row.storeAddress} className="font-medium" />
              </div>
            </CardContent>

            <Separator className={"my-4!"} />

            <CardHeader className="flex flex-row gap-1 font-medium pl-0">
              <Phone />
              Контактная информация
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Телефон:</p>
                <NotFoundRow value={row.storePhone} className="font-medium" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Почта:</p>
                <NotFoundRow value={row.storeEmail} className="font-medium" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Менеджер:</p>
                <NotFoundRow value={row.nameManager} className="font-medium" />
              </div>
            </CardContent>

            <Separator className={"my-4!"} />

            <CardHeader className="flex flex-row gap-1 font-medium pl-0">
              <Calendar />
              Даты и статус
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Статус:</p>
                <StatusBadge
                  status={row.storeCondition}
                  positiveValues={["действующие", "открытые"]}
                  negativeValues={["закрытые", "неактивные"]}
                />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Возраст:</p>
                <NotFoundRow value={row.ageGroup} className="font-medium" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Дата открытия:</p>
                <NotFoundRow
                  value={formatDate(row.startDate)}
                  className="font-medium"
                />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">
                  Дата последней продажи:
                </p>
                <NotFoundRow
                  value={formatDate(row.endDate)}
                  className="font-medium"
                />
              </div>
            </CardContent>

            <Separator className={"my-4!"} />

            <CardHeader className="flex flex-row gap-1 font-medium pl-0">
              <ShoppingCart />
              Информация о кассах
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Количество касс:</p>
                <NotFoundRow value={row.countCachBox} className="font-medium" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">
                  Количество касс КСО:
                </p>
                <NotFoundRow
                  value={row.countCachBoxKso}
                  className="font-medium"
                />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">
                  Количество касс гибрид:
                </p>
                <NotFoundRow
                  value={row.countCachBoxGibrid}
                  className="font-medium"
                />
              </div>
            </CardContent>

            <Separator className={"my-4!"} />

            <CardHeader className="flex flex-row gap-1 font-medium pl-0">
              <Coffee />
              Дополнительные услуги
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Ночной магазин:</p>
                <NotFoundRow value={row.nightStore} className="font-medium" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Кофе:</p>
                <NotFoundRow value={row.coffee} className="font-medium" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Доставка:</p>
                <NotFoundRow value={row.deliveryIm} className="font-medium" />
              </div>
            </CardContent>

            <Separator className={"my-4!"} />

            <CardHeader className="flex flex-row gap-1 font-medium pl-0">
              <Building />
              Юридическая информация
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Юр. лицо:</p>
                <NotFoundRow value={row.legalEntity} className="font-medium" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-muted-foreground pl-3">Субаренда:</p>
                <NotFoundRow value={row.sublease} className="font-medium" />
              </div>
            </CardContent>
          </ScrollArea>
          <Card>
            <Map
              defaultState={{
                center: [row.latitude, row.longitude] as number[],
                zoom: 12,
              }}
              width={"100%"}
              height={"100%"}
              modules={["control.ZoomControl", "control.FullscreenControl"]}
              style={{
                width: "100%",
                height: "100%",
                filter: theme === "dark" ? "invert(88%)" : undefined,
              }}
            >
              <Polygon
                geometry={[TERRITORY_MOCK]} // Обратите внимание на дополнительные квадратные скобки
                options={{
                  fillColor: "#ebe8fc",
                  strokeColor: "#e50046",
                  fillOpacity: 0.5,
                  strokeOpacity: 0.5,
                  strokeWidth: 5,
                  strokeStyle: "shortdash",
                }}
              />
              <Placemark
                defaultGeometry={[row.latitude, row.longitude] as number[]}
              />
            </Map>
          </Card>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default StoreDetails;
