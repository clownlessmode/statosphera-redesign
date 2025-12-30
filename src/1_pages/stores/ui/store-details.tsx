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
import { Separator } from "@shared/ui/separator";
import { NotFoundRow } from "../../../5_shared/ui/table/not-found-row";
import { ScrollArea } from "@shared/ui/scroll-area";
import { Map, Placemark, Polygon } from "@pbe/react-yandex-maps";

import { useTheme } from "@app/providers/theme-provider";
import { Store } from "@entities/store/config";

import { useStoresController } from "../model/api/controller";
import Spinner from "@shared/ui/spinner";
import { storeSections } from "./store-sections";
import { KeyValue } from "./key-value";
interface Props extends ComponentProps<FC<DialogProps>> {
  idStore: number;
}

const StoreDetails: FC<Props> = ({ open, onOpenChange, idStore }) => {
  const { theme } = useTheme();
  const { store, isStoreLoading } = useStoresController(idStore as number);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-xs:text-xs md:max-w-[80vw]!"
        aria-describedby={undefined}
      >
        {isStoreLoading ? (
          <div className="flex justify-center items-center h-full md:min-h-[70vh] w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="max-md:grid max-md:grid-col-1">
                Детали магазина{" "}
                <NotFoundRow
                  value={store?.storeName}
                  className="inline font-medium"
                />
              </DialogTitle>
              <DialogDescription>
                Информация о магазине и его местоположение
              </DialogDescription>
            </DialogHeader>

            <DialogBody className="gap-4 grid grid-col-1 mt-2 md:grid-cols-2 ">
              <ScrollArea className="max-h-[30vh] md:max-h-[50vh]">
                {storeSections.map((section, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <CardHeader className="flex flex-row gap-1 font-medium pl-0">
                      {section.icon}
                      {section.title}
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      {section.keys.map(({ key, label, render }) => (
                        <KeyValue
                          key={key}
                          label={label}
                          value={store?.[key as keyof Store]}
                          renderValue={render}
                        />
                      ))}
                    </CardContent>
                    <Separator className="my-4!" />
                  </div>
                ))}
              </ScrollArea>
              <Card className="max-md:min-h-[30vh]">
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
                    geometry={[store?.polygonExtended]}
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
