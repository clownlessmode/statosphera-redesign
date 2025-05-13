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

import { useStoresController } from "../model/api/controller";
import Spinner from "@shared/ui/spinner";
interface Props extends ComponentProps<FC<DialogProps>> {
  row: Store;
}

const StoreDetails: FC<Props> = ({ open, onOpenChange, row }) => {
  const { theme } = useTheme();
  const { store, isStoreLoading } = useStoresController(row.idStore);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw]!">
        {isStoreLoading ? (
          <div className="flex justify-center items-center h-full min-h-[70vh] w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                Детали магазина{" "}
                <NotFoundRow
                  value={store?.storeAddress}
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
                    <NotFoundRow
                      value={store?.storeRegion}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">Город:</p>
                    <NotFoundRow
                      value={store?.storeCity}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">Адрес:</p>
                    <NotFoundRow
                      value={store?.storeAddress}
                      className="font-medium"
                    />
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
                    <NotFoundRow
                      value={store?.storePhone}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">Почта:</p>
                    <NotFoundRow
                      value={store?.storeEmail}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">Менеджер:</p>
                    <NotFoundRow
                      value={store?.nameManager}
                      className="font-medium"
                    />
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
                      status={store?.storeCondition}
                      positiveValues={["действующие", "открытые"]}
                      negativeValues={["закрытые", "неактивные"]}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">Возраст:</p>
                    <NotFoundRow
                      value={store?.ageGroup}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">Дата открытия:</p>
                    <NotFoundRow
                      value={formatDate(store?.startDate)}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">
                      Дата последней продажи:
                    </p>
                    <NotFoundRow
                      value={formatDate(store?.endDate)}
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
                    <p className="text-muted-foreground pl-3">
                      Количество касс:
                    </p>
                    <NotFoundRow
                      value={store?.countCachBox}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">
                      Количество касс КСО:
                    </p>
                    <NotFoundRow
                      value={store?.countCachBoxKso}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">
                      Количество касс гибрид:
                    </p>
                    <NotFoundRow
                      value={store?.countCachBoxGibrid}
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
                    <p className="text-muted-foreground pl-3">
                      Ночной магазин:
                    </p>
                    <NotFoundRow
                      value={store?.nightStore}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">Кофе:</p>
                    <NotFoundRow
                      value={store?.coffee}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">Доставка:</p>
                    <NotFoundRow
                      value={store?.deliveryIm}
                      className="font-medium"
                    />
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
                    <NotFoundRow
                      value={store?.legalEntity}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-muted-foreground pl-3">Субаренда:</p>
                    <NotFoundRow
                      value={store?.sublease}
                      className="font-medium"
                    />
                  </div>
                </CardContent>
              </ScrollArea>
              <Card>
                <Map
                  defaultState={{
                    center: [store?.latitude, store?.longitude] as number[],
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
                    geometry={[store?.polygon]}
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
                    defaultGeometry={
                      [store?.latitude, store?.longitude] as number[]
                    }
                  />
                </Map>
              </Card>
            </DialogBody>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StoreDetails;
