import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Badge } from "@shared/ui/badge";
import {
  AlertTriangle,
  DoorOpen,
  RefreshCw,
  RotateCcw,
  Settings,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@shared/ui/card";
import { Separator } from "@shared/ui/separator";
import { useState, useEffect } from "react";
import { cn } from "@shared/lib/utils";
import { Store } from "@entities/store/config";
import { useStoreSettingsController } from "../api";

export const StoreSettings = ({ store }: { store: Store }) => {
  const {
    getStoreStatusAsync,
    isGetStoreStatusLoading,
    openDoor,
    isOpenDoorLoading,
    reboot,
    isRebootLoading,
    emergencyClosure,
    isEmergencyClosureLoading,
  } = useStoreSettingsController();
  const [data, setData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchStoreStatus = async () => {
    if (!store.ipNightStore?.[0]) return;
    try {
      const result = await getStoreStatusAsync({ ip: store.ipNightStore[0] });
      setData(result);
      console.log(result);
    } catch (error) {
      console.error("Failed to fetch store status:", error);
    }
  };

  const handleOpenDoor = async () => {
    try {
      console.log("Opening door...");
      openDoor({
        ip: store.ipNightStore[0],
        open: !data?.status_door,
      });
      await fetchStoreStatus();
      setTimeout(async () => {
        await fetchStoreStatus();
      }, 5500);
    } catch (error) {
      console.error("Failed to open door:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStoreStatus();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => e.stopPropagation()}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2 justify-between">
            <span>Настройки {store.storeName}</span>
          </DialogTitle>
          <DialogDescription>
            Здесь вы можете управлять настройками ночного магазина
          </DialogDescription>
        </DialogHeader>
        <CardContent className="flex flex-col gap-3 px-0">
          <DangerMode active={data?.pressing_the_emergency_button} />
          <div
            className={cn(
              "grid gap-2",
              data?.status_door ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {data?.status_door && (
              <Button
                loading={isOpenDoorLoading}
                size={"sm"}
                variant={"outline"}
                onClick={handleOpenDoor}
              >
                Открыть дверь на 5 сек
                <DoorOpen />
              </Button>
            )}
            <Button
              loading={isRebootLoading}
              size={"sm"}
              variant={"outline"}
              onClick={() =>
                reboot({
                  ip: store.ipNightStore[0],
                })
              }
            >
              Перезагрузить систему
              <RotateCcw />
            </Button>
            {data?.pressing_the_emergency_button && !data?.complete_closure && (
              <Button
                loading={isEmergencyClosureLoading}
                size={"sm"}
                variant={"outline"}
                className="col-span-2"
                onClick={() =>
                  emergencyClosure({
                    ip: store.ipNightStore[0],
                    enabled: true,
                  })
                }
              >
                Закрыть магазин в аварийном режиме
                <AlertTriangle />
              </Button>
            )}
          </div>
          <Separator />
          <StoreStatuses
            data={data}
            onRefresh={fetchStoreStatus}
            isLoading={isGetStoreStatusLoading}
          />
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

const DangerMode = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <Badge
      variant="destructive"
      className="flex flex-row gap-2 items-center w-full text-destructive-foreground"
    >
      Нажата аварийная кнопка <AlertTriangle />
    </Badge>
  );
};

const StoreStatuses = ({
  data,
  onRefresh,
  isLoading,
}: {
  data: any;
  onRefresh: () => void;
  isLoading: boolean;
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <CardHeader className="px-0">
          <CardTitle className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              Статус системы{" "}
              <div
                className={cn(
                  data?.status_door && "bg-positive",
                  !data?.status_door && "bg-destructive",
                  "w-2 h-2 rounded-full",
                )}
              />
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
            >
              Обновить
              <RefreshCw className={cn(isLoading && "animate-spin")} />
            </Button>
          </CardTitle>
        </CardHeader>
        <div className="text-sm flex justify-between">
          Дверь:
          <Badge className={cn(!data?.was_open ? "bg-primary" : "bg-positive")}>
            {data?.was_open ? "Открыта" : "Закрыта"}
          </Badge>
        </div>

        <div className="text-sm flex justify-between">
          Доступ для покупателей по QR:
          <Badge
            className={cn(
              data?.complete_closure || !data?.status_door
                ? "bg-primary"
                : "bg-positive",
            )}
          >
            {data?.complete_closure || !data?.status_door
              ? "Нет доступа"
              : "Есть доступ"}
          </Badge>
        </div>

        <div className="text-sm flex justify-between">
          Аварийный режим:
          <Badge
            className={cn(
              data?.message_off_emergency_button ? "bg-primary" : "bg-positive",
            )}
          >
            {data?.message_off_emergency_button ? "Включен" : "Выключен"}
          </Badge>
        </div>

        <div className="text-sm flex justify-between">
          Ночной режим работы:
          <Badge
            className={cn(!data?.status_door ? "bg-primary" : "bg-positive")}
          >
            {data?.status_door ? "Включен" : "Выключен"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
