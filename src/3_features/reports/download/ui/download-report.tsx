import { Button } from "@shared/ui/button";
import { Download, Sparkles } from "lucide-react";
import { useDownloadReportController } from "../model/api/controller";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@shared/ui/dialog";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useState } from "react";
import { CardContent, CardDescription, CardTitle } from "@shared/ui/card";
import { useSession } from "@entities/session";
import { ROLES } from "@shared/constants/roles";

const DownloadReport = ({ rows }: { rows: number }) => {
  const { downloadReport } = useDownloadReportController();
  const { getApiPayload } = useFiltersStore();
  const [isOpen, setIsOpen] = useState(false);
  const payload = getApiPayload();

  const handleDownloadReport = async (typeFile: "csv" | "excel") => {
    await downloadReport({
      ...payload,
      values: payload.values,
      groups: payload.groups,
      sorts: { colId: [payload.values[0]], sort: "desc" },
      typeFile,
    });
    setIsOpen(false);
  };

  const isExcelDisabled = rows > 500000;
  const isAllDisabled = rows > 7000000;
  const { session } = useSession();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild disabled={session?.role === ROLES.MANAGER_STORE}>
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
            disabled={isExcelDisabled || isAllDisabled}
            className="w-full bg-green-500"
            onClick={() => handleDownloadReport("excel")}
          >
            Excel
          </Button>
          <Button
            disabled={isAllDisabled}
            className="w-full bg-rose-500"
            onClick={() => handleDownloadReport("csv")}
          >
            CSV
          </Button>
        </DialogFooter>

        {(isExcelDisabled || isAllDisabled) && (
          <CardContent className="bg-background p-0 m-0 border-none">
            <CardTitle className="mb-1 flex flex-row items-center gap-1">
              {isAllDisabled
                ? "Экспорт данных ограничен"
                : "Ограничение на экспорт в Excel"}
              <Sparkles className="size-4 text-primary" />
            </CardTitle>
            <CardDescription>
              {isAllDisabled ? (
                <>
                  В текущей выборке содержится более 7 000 000 строк данных.
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
              ) : (
                <>
                  В текущей выборке содержится более 500 000 строк данных.
                  Экспорт таких объёмов в Excel невозможен из-за технических
                  ограничений формата.
                  <br />
                  <br />
                  Для работы с большими данными рекомендуем:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      Применить дополнительные фильтры для уменьшения выборки
                    </li>
                    <li>Использовать группировку данных перед экспортом</li>
                    <li>Экспортировать данные в формате CSV</li>
                    <li>Разделить данные на несколько периодов</li>
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

export default DownloadReport;
