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
  PowerOff,
  Power,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@shared/ui/card";
import { Separator } from "@shared/ui/separator";
import { useState, useEffect } from "react";
import { cn } from "@shared/lib/utils";
import { Store } from "@entities/store/config";
import { useStoreSettingsController } from "../api";
import { useSession } from "@entities/session";
import { ROLES } from "@shared/constants/roles";

export const StoreSettings = ({ store }: { store: Store }) => {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});

  const handleOpenDialog = (ip: string) => {
    setOpenDialogs((prev) => ({ ...prev, [ip]: true }));
  };

  const handleCloseDialog = (ip: string) => {
    setOpenDialogs((prev) => ({ ...prev, [ip]: false }));
  };

  // Если только один IP, открываем его диалог
  const handleSingleIpClick = () => {
    if (store.ipNightStore?.length === 1) {
      handleOpenDialog(store.ipNightStore[0]);
    }
  };

  // Если несколько IP, показываем меню выбора
  if (store.ipNightStore?.length > 1) {
    return (
      <>
        <Dialog>
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
              <DialogTitle>Выберите систему</DialogTitle>
              <DialogDescription>
                Доступно несколько систем для управления
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {store.ipNightStore.map((ip, index) => (
                <Button
                  key={ip}
                  variant="outline"
                  onClick={() => handleOpenDialog(ip)}
                  className="justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Система #{index + 1} - {ip}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Отдельные диалоги для каждого IP */}
        {store.ipNightStore.map((ip, index) => (
          <StoreSettingsDialog
            key={ip}
            store={store}
            ip={ip}
            index={index}
            open={openDialogs[ip] || false}
            onOpenChange={(open) =>
              open ? handleOpenDialog(ip) : handleCloseDialog(ip)
            }
          />
        ))}
      </>
    );
  }

  // Если только один IP
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          handleSingleIpClick();
        }}
      >
        <Settings className="h-4 w-4" />
      </Button>

      {store.ipNightStore?.[0] && (
        <StoreSettingsDialog
          store={store}
          ip={store.ipNightStore[0]}
          index={0}
          open={openDialogs[store.ipNightStore[0]] || false}
          onOpenChange={(open) =>
            open
              ? handleOpenDialog(store.ipNightStore[0])
              : handleCloseDialog(store.ipNightStore[0])
          }
        />
      )}
    </>
  );
};

const StoreSettingsDialog = ({
  store,
  ip,
  index,
  open,
  onOpenChange,
}: {
  store: Store;
  ip: string;
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const {
    getStoreStatusAsync,
    isGetStoreStatusLoading,
    openDoor,
    isOpenDoorLoading,
    reboot,
    isRebootLoading,
    emergencyClosure,
    isEmergencyClosureLoading,
    toggleNightMode,
    isToggleNightModeLoading,
  } = useStoreSettingsController();

  const { session } = useSession();
  const isServiceManager = session?.role === ROLES.SERVICE_MANAGER;

  const [data, setData] = useState<any>(null);

  const fetchStoreStatus = async () => {
    try {
      const result = await getStoreStatusAsync({ ip });
      setData(result);
      console.log(result);
    } catch (error) {
      console.error("Failed to fetch store status:", error);
    }
  };

  const handleOpenDoor = async () => {
    try {
      console.log("Opening door...");
      await openDoor({
        ip,
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

  const handleToggleNightMode = async () => {
    try {
      await toggleNightMode({ ip, enabled: !data?.status_door });
      await fetchStoreStatus();
      setTimeout(async () => {
        await fetchStoreStatus();
      }, 5500);
    } catch (error) {
      console.error("Failed to toggle night mode:", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchStoreStatus();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2 justify-between">
            <span>
              Настройки {store.storeName}
              {store.ipNightStore?.length > 1 && ` - Система #${index + 1}`}
            </span>
          </DialogTitle>
          <DialogDescription>
            {store.ipNightStore?.length > 1
              ? `IP: ${ip}`
              : "Здесь вы можете управлять настройками ночного магазина"}
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
                disabled={!isServiceManager}
              >
                Открыть дверь на 5 сек
                <DoorOpen />
              </Button>
            )}
            <Button
              loading={isRebootLoading}
              size={"sm"}
              variant={"outline"}
              onClick={() => reboot({ ip })}
              disabled={!isServiceManager}
            >
              Перезагрузить систему
              <RotateCcw />
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="col-span-full"
              disabled={isGetStoreStatusLoading || isToggleNightModeLoading}
              onClick={handleToggleNightMode}
              loading={isToggleNightModeLoading}
            >
              {data?.status_door ? "Выключить" : "Включить"} ночной режим работы
              {data?.status_door ? <PowerOff /> : <Power />}
            </Button>
            {data?.pressing_the_emergency_button && !data?.complete_closure && (
              <Button
                loading={isEmergencyClosureLoading}
                size={"sm"}
                variant={"outline"}
                className="col-span-2"
                onClick={() =>
                  emergencyClosure({
                    ip,
                    enabled: true,
                  })
                }
                disabled={!isServiceManager}
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
