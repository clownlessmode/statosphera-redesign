import {
  Clusterer,
  FullscreenControl,
  Map,
  Placemark,
  Polygon,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { FC, Fragment, useState } from "react";
import { useTheme } from "@app/providers/theme-provider";
import { Card, CardContent } from "@shared/ui/card";
import StoreDetails from "./store-details";
import { Coordinates } from "@entities/store/config";
import { useStoresController } from "../model/api/controller";
import { Checkbox } from "@shared/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Separator } from "@shared/ui/separator";
import { MapPin } from "lucide-react";

const StoresMap: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Coordinates>();
  const { theme } = useTheme();
  const { map, isMapLoading } = useStoresController();

  const [showExtended, setShowExtended] = useState<CheckedState>(true);
  const [showFast, setShowFast] = useState<CheckedState>(true);
  const [showOther, setShowOther] = useState<CheckedState>(true);
  const [showPins, setShowPins] = useState<CheckedState>(true);

  const COLORS = {
    extended: {
      fill: "#D6E4FF",
      stroke: "#1D4ED8",
      dot: "#1D4ED8",
    },
    fast: {
      fill: "#DCFCE7",
      stroke: "#15803D",
      dot: "#15803D",
    },
    other: {
      fill: "#FFE4E6",
      stroke: "#BE123C",
      dot: "#BE123C",
    },
  };

  if (isMapLoading)
    return <Card className="w-full h-[calc(100vh-118px-24px)] animate-pulse" />;

  return (
    <>
      <Card className="w-full h-[calc(100vh-118px-24px)] relative">
        <Map
          defaultState={{
            center: [55.030199, 82.92043],
            zoom: 7,
          }}
          width="100%"
          height="100%"
          modules={["control.ZoomControl", "control.FullscreenControl"]}
          style={{
            width: "100%",
            height: "100%",
            filter: theme === "dark" ? "invert(88%)" : undefined,
          }}
        >
          <ZoomControl />
          <FullscreenControl />

          {/* Полигоны */}
          {map?.map((store) => (
            <Fragment key={`polygons-${store.idStore}`}>
              {showExtended && store.polygonExtended.length > 0 && (
                <Polygon
                  geometry={[store.polygonExtended]}
                  options={{
                    fillColor: COLORS.extended.fill,
                    strokeColor: COLORS.extended.stroke,
                    fillOpacity: 0.5,
                    strokeOpacity: 1,
                    strokeWidth: 4,
                    zIndex: 1001,
                  }}
                />
              )}
              {showFast && store.polygonFast.length > 0 && (
                <Polygon
                  geometry={[store.polygonFast]}
                  options={{
                    fillColor: COLORS.fast.fill,
                    strokeColor: COLORS.fast.stroke,
                    fillOpacity: 0.5,
                    strokeOpacity: 1,
                    strokeWidth: 4,
                    zIndex: 1002,
                  }}
                />
              )}
              {showOther && store.polygonOther.length > 0 && (
                <Polygon
                  geometry={[store.polygonOther]}
                  options={{
                    fillColor: COLORS.other.fill,
                    strokeColor: COLORS.other.stroke,
                    fillOpacity: 0.5,
                    strokeOpacity: 1,
                    strokeWidth: 4,
                    zIndex: 1003,
                  }}
                />
              )}
            </Fragment>
          ))}

          {/* Метки */}
          {showPins && (
            <Clusterer
              options={{
                gridSize: 10,
                groupByCoordinates: false,
                zIndex: 2000,
              }}
            >
              {map?.map((store) => (
                <Placemark
                  key={`placemark-${store.idStore}`}
                  geometry={[store.latitude, store.longitude]}
                  options={{
                    iconColor: theme === "dark" ? "#02fbc3" : undefined,
                  }}
                  onClick={() => {
                    setSelectedStore(store);
                    setIsOpen(true);
                  }}
                />
              ))}
            </Clusterer>
          )}
        </Map>

        {/* Легенда */}
        <Card className="absolute bottom-4 right-4 w-[240px] p-4">
          <CardContent className="space-y-3 text-sm pt-0 pb-0">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS.extended.dot,
                  filter: theme === "dark" ? "invert(1)" : undefined,
                }}
              />
              <Checkbox
                checked={showExtended}
                onCheckedChange={setShowExtended}
              />
              <span>Расширенная зона</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS.fast.dot,
                  filter: theme === "dark" ? "invert(1)" : undefined,
                }}
              />
              <Checkbox checked={showFast} onCheckedChange={setShowFast} />
              <span>Быстрая зона</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS.other.dot,
                  filter: theme === "dark" ? "invert(1)" : undefined,
                }}
              />
              <Checkbox checked={showOther} onCheckedChange={setShowOther} />
              <span>Другая зона</span>
            </div>

            <Separator className="my-2" />

            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-primary -ml-2" />
              <Checkbox checked={showPins} onCheckedChange={setShowPins} />
              <span>Показать пины</span>
            </div>
          </CardContent>
        </Card>
      </Card>

      {selectedStore && (
        <StoreDetails
          idStore={selectedStore.idStore}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
    </>
  );
};

export default StoresMap;
