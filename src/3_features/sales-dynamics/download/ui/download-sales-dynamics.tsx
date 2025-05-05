import { Button } from "@shared/ui/button";
import { Download } from "lucide-react";
import { useDownloadSalesDynamics } from "../model/controller";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";

const DownloadSalesDynamics = () => {
  const { downloadReport } = useDownloadSalesDynamics();
  const getApiPayload = useSalesDynamicsFiltersStore((s) => s.getApiPayload);

  const handleDownloadReport = async () => {
    try {
      // 1) Получаем Blob
      const blob = await downloadReport(getApiPayload());

      // 2) Выбираем имя файла (можно статично или из headers)
      const filename =
        "Динамика продаж на " +
        new Date().toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
        }) +
        ".xlsx";

      // 3) Создаём временный URL из Blob
      const url = window.URL.createObjectURL(blob as any);

      // 4) Генерируем <a> и эмулируем клик
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // 5) Убираем за собой
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  return (
    <Button variant="outline" onClick={handleDownloadReport}>
      <Download />
    </Button>
  );
};

export default DownloadSalesDynamics;
