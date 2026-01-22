import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Separator } from "@shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import { Building2, ChartBar, Map, Store } from "lucide-react";
import { useTourState } from "@entities/lessons";
import { Cities, Regions, Stores, Summary } from "./tabs";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const isTourActive = useTourState();

  return (
    <Dialog modal={!isTourActive}>
      <DialogTrigger asChild className="cursor-pointer hover:bg-card/80">
        {children}
      </DialogTrigger>
      <DialogContent
        className="w-full max-xxs:h-full max-md:overflow-y-auto scrollbar-hide md:w-3xl md:max-w-none! h-fit min-h-[600px] flex flex-col"
        data-testid="nps-modal"
        onInteractOutside={(e) => {
          // Предотвращаем закрытие модалки при активном туре
          if (isTourActive) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>NPS Аналитика</DialogTitle>
          <DialogDescription>
            Подробная NPS аналитика по городам, регионам и магазинам
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Tabs className="w-full flex-1">
          <TabsList className="w-full max-md:h-max max-md:grid grid-cols-1 xxs:grid-cols-2">
            <TabsTrigger value="summary" data-testid="nps-tab-summary">
              <ChartBar />
              Сводка
            </TabsTrigger>
            <TabsTrigger value="cities" data-testid="nps-tab-cities">
              <Building2 />
              Города
            </TabsTrigger>
            <TabsTrigger value="regions" data-testid="nps-tab-regions">
              <Map />
              Регионы
            </TabsTrigger>
            <TabsTrigger value="stores" data-testid="nps-tab-stores">
              <Store />
              Магазины
            </TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <Summary />
          </TabsContent>
          <TabsContent value="cities">
            <Cities />
          </TabsContent>
          <TabsContent value="regions">
            <Regions />
          </TabsContent>
          <TabsContent value="stores">
            <Stores />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
