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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Скачать отчет</DialogTitle>
          <DialogDescription>Выберите формат и тип отчета</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-2 w-full">
          <Button
            disabled={rows > 500000}
            className="w-full bg-green-500"
            onClick={() => handleDownloadReport("excel")}
          >
            Excel
          </Button>
          <Button
            className="w-full bg-rose-500"
            onClick={() => handleDownloadReport("csv")}
          >
            CSV
          </Button>
        </DialogFooter>
        {rows > 500000 && (
          <CardContent className="bg-background p-0 m-0 border-none">
            <CardTitle className="mb-1 flex flex-row items-center gap-1">
              Ограничение на экспорт в Excel
              <Sparkles className="size-4 text-primary" />
            </CardTitle>
            <CardDescription>
              В текущей выборке содержится более 500 000 строк данных. Экспорт
              таких объёмов в Excel невозможен из-за технических ограничений
              формата.
              <br />
              <br />
              Для работы с большими данными рекомендуем:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Применить дополнительные фильтры для уменьшения выборки</li>
                <li>Использовать группировку данных перед экспортом</li>
                <li>Экспортировать данные частями по определённым периодам</li>
              </ul>
            </CardDescription>
          </CardContent>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DownloadReport;
