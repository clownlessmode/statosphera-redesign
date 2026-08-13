import { Button } from "@shared/ui/button";
import { Download, Sparkles } from "lucide-react";
import { useDownloadWriteOffController } from "../model/api/controller";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@shared/ui/dialog";

import { useState } from "react";
import { CardContent, CardDescription, CardTitle } from "@shared/ui/card";
import { useSession } from "@entities/session";
import { ROLES } from "@shared/constants/roles";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";

const DownloadWriteOff = ({ rows, tab }: { rows: number; tab: string }) => {
  const { downloadWriteOff, downloadWriteOffEquipment } =
    useDownloadWriteOffController();
  const { getApiPayload } = useFiltersStore();
  const [isOpen, setIsOpen] = useState(false);

  const payload = getApiPayload();

  const handleDownloadWriteOff = async () => {
    if (tab === "write-off") {
      await downloadWriteOff(payload);
    } else if (tab === "write-off-equip") {
      await downloadWriteOffEquipment(payload);
    }
    setIsOpen(false);
  };

  const isAllDisabled = rows > 7000000;
  const { session } = useSession();

  const disabledRolesList: string[] = [
    ROLES.MANAGER_STORE,
    ROLES.SERVICE_MANAGER,
  ];

  const isDisabled = disabledRolesList.includes(session?.role as string);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild disabled={isDisabled}>
        <Button variant="outline">
          <Download />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Скачать отчет</DialogTitle>
          <DialogDescription>
            Выберите формат и тип отчета <br /> Кол-во строк:{" "}
            {rows.toLocaleString("ru-RU", { maximumFractionDigits: 0 })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-2 w-full">
          <Button
            disabled={isAllDisabled}
            className="w-full bg-rose-500"
            onClick={() => handleDownloadWriteOff()}
          >
            CSV
          </Button>
        </DialogFooter>

        {isAllDisabled && (
          <CardContent className="bg-background p-0 m-0 border-none">
            <CardTitle className="mb-1 flex flex-row items-center gap-1">
              {isAllDisabled && (
                <>
                  Экспорт данных ограничен
                  <Sparkles className="size-4 text-primary" />
                </>
              )}
            </CardTitle>
            <CardDescription>
              {isAllDisabled && (
                <>
                  В текущей выборке содержится более 1 000 000 строк данных.
                  Экспорт таких объёмов невозможен из-за ограничений системы.
                  <br />
                  <br />
                  Для работы с данными рекомендуем:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      Применить дополнительные фильтры для уменьшения выборки
                    </li>
                    <li>Использовать группировку данных</li>
                    <li>Разделить данные на несколько периодов</li>
                    <li>
                      Обратиться в техническую поддержку за альтернативными
                      вариантами экспорта
                    </li>
                  </ul>
                </>
              )}
            </CardDescription>
          </CardContent>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DownloadWriteOff;
