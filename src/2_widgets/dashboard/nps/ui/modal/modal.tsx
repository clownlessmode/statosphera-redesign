import { Button } from "@shared/ui/button";
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
import {
  ArrowUpRightIcon,
  Building2,
  ChartBar,
  Map,
  Store,
} from "lucide-react";
import { Cities, Regions, Stores, Summary } from "./tabs";

export const Modal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          Подробнее <ArrowUpRightIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-xxs:h-full max-md:overflow-y-auto scrollbar-hide md:w-3xl md:max-w-none! h-[900px] flex flex-col">
        <DialogHeader>
          <DialogTitle>NPS Аналитика</DialogTitle>
          <DialogDescription>
            Подробная NPS аналитика по городам, регионам и магазинам
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Tabs className="w-full flex-1">
          <TabsList className="w-full max-md:h-max max-md:grid grid-cols-1 xxs:grid-cols-2">
            <TabsTrigger value="summary">
              <ChartBar />
              Сводка
            </TabsTrigger>
            <TabsTrigger value="cities">
              <Building2 />
              Города
            </TabsTrigger>
            <TabsTrigger value="regions">
              <Map />
              Регионы
            </TabsTrigger>
            <TabsTrigger value="stores">
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
