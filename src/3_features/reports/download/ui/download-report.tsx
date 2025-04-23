import { Button } from "@shared/ui/button";
import { Download } from "lucide-react";
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
const DownloadReport = () => {
  const { downloadReport } = useDownloadReportController();
  const { getApiPayload } = useFiltersStore();
  const [isOpen, setIsOpen] = useState(false);
  const payload = getApiPayload();
  const handleDownloadReport = async (typeFile: "csv" | "excel") => {
    await downloadReport({
      ...payload,
      values: payload.values,
      groups: payload.groups,
      sorts: { colId: [payload.values[0]], sort: "asc" },
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
      </DialogContent>
    </Dialog>
  );
};

export default DownloadReport;
