import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import { AppStoreTab } from "./app-store-tab";
import { GooglePlayTab } from "./google-play-tab";
import { YandexTab } from "./yandex-tab";
import { TwoGISTab } from "./2gis-tab";

export function TabsReviews() {
  return (
    <Tabs defaultValue="AppStore" className="">
      <TabsList className="flex items-right w-full mb-4">
        <TabsTrigger value="AppStore">App Store</TabsTrigger>
        <TabsTrigger value="GooglePlay">Google Play</TabsTrigger>
        <TabsTrigger value="Yandex">Яндекс</TabsTrigger>
        <TabsTrigger value="2GIS">2ГИС</TabsTrigger>
      </TabsList>
      <TabsContent value="AppStore">
        <AppStoreTab />
      </TabsContent>
      <TabsContent value="GooglePlay">
        <GooglePlayTab />
      </TabsContent>
      <TabsContent value="Yandex">
        <YandexTab />
      </TabsContent>
      <TabsContent value="2GIS">
        <TwoGISTab />
      </TabsContent>
    </Tabs>
  );
}
