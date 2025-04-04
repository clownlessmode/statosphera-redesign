import {
  Clusterer,
  FullscreenControl,
  Map,
  Placemark,
  Polygon,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { FC, useState } from "react";
// import { terr } from "./terr-mock";
import { useTheme } from "@app/providers/theme-provider";
// import StoreDetails from "./store-details";

import { Card } from "@shared/ui/card";

import StoreDetails from "./store-details";
import { Store } from "../model/types";
import { TERRITORY_MOCK } from "@shared/constants/mock/territory-mock";

interface Props {
  stores: Store[];
}

const StoresMap: FC<Props> = ({ stores }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<Store>();
  const { theme } = useTheme();
  return (
    <>
      <Card className="w-full h-[calc(100vh-118px-24px)]">
        <Map
          defaultState={{
            center: [55.030199, 82.92043],
            zoom: 7,
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
          <ZoomControl />
          <FullscreenControl />
          <Clusterer
            options={{
              gridSize: 10,
              groupByCoordinates: false,
              zIndex: 0,
            }}
          >
            <Polygon
              geometry={[TERRITORY_MOCK]}
              options={{
                fillColor: "#ebe8fc",
                strokeColor: "#e50046",
                fillOpacity: 0.5,
                strokeOpacity: 0.5,
                strokeWidth: 5,
                strokeStyle: "shortdash",
              }}
            />
            {stores.map((store) => (
              <Placemark
                options={{
                  iconColor: theme === "dark" ? "#02fbc3" : undefined,
                  // preset: 'islands#redIcon',
                }}
                geometry={[store.latitude, store.longitude] as number[]}
                onClick={() => {
                  setSelectedStore(store);
                  setIsOpen(true);
                }}
              />
            ))}
          </Clusterer>
        </Map>
      </Card>
      {selectedStore && (
        <StoreDetails
          row={selectedStore}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
    </>
  );
};

export default StoresMap;
