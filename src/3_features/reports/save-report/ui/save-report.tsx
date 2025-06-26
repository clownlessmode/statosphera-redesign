import { useState, useEffect, useCallback } from "react";
import { Button } from "@shared/ui/button";
import { Save, Check, X, Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@shared/ui/dialog";
import { Input } from "@shared/ui/input";
import { Label } from "@shared/ui/label";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useReportStore } from "@widgets/report/sheet/model/report-store";
import { useSaveReportController } from "../api/controller";
import { SaveReportRequest } from "../api/service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@shared/lib/utils";
import { tableColumns } from "@shared/constants/table-columns";

export default function SaveReport() {
  const [isOpen, setIsOpen] = useState(false);
  const [reportName, setReportName] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [nameStatus, setNameStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");

  const { getApiPayload } = useFiltersStore();
  const { tab } = useTabStore();
  const { graph, table, total } = useReportStore();
  const { checkUnique, saveReport, isSaving } = useSaveReportController();
  const queryClient = useQueryClient();

  // Проверяем, есть ли данные отчета для сохранения
  const hasReportData = graph && table && total;

  // Функция для получения русского названия показателя из tableColumns
  const getIndicatorName = useCallback((indicator: string): string => {
    const column = tableColumns.find((col) => col.field === indicator);
    return column?.headerName || indicator;
  }, []);

  // Функция автогенерации названия отчета
  const generateReportName = useCallback(() => {
    const currentData = getApiPayload();
    const reportType = tab === "commerce" ? "Коммерческий" : "Чековый";

    // Определяем основные показатели (берем первые 2) и получаем их русские названия
    const indicators = currentData.values.slice(0, 2);
    const indicatorNames = indicators.map((indicator) =>
      getIndicatorName(indicator),
    );

    // Определяем период
    const startDate = new Date(currentData.filterDate.dateStart);
    const endDate = new Date(currentData.filterDate.dateEnd);
    const monthNames = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];

    let period = "";
    if (startDate.getFullYear() === endDate.getFullYear()) {
      if (startDate.getMonth() === endDate.getMonth()) {
        period = `${monthNames[startDate.getMonth()]} ${startDate.getFullYear()}`;
      } else {
        period = `${monthNames[startDate.getMonth()]}-${monthNames[endDate.getMonth()]} ${startDate.getFullYear()}`;
      }
    } else {
      period = `${startDate.getFullYear()}-${endDate.getFullYear()}`;
    }

    // Определяем основную группировку
    let grouping = "";
    if (currentData.groups.length > 0) {
      const groupMapping: Record<string, string> = {
        month: "по месяцам",
        day: "по дням",
        store: "по магазинам",
        product: "по товарам",
        city: "по городам",
        region: "по регионам",
      };
      grouping = groupMapping[currentData.groups[0]] || "";
    }

    // Формируем название
    let name = reportType;

    if (indicatorNames.length > 0) {
      name += ` - ${indicatorNames.join(", ")}`;
    }

    if (period) {
      name += ` ${period}`;
    }

    if (grouping) {
      name += ` ${grouping}`;
    }

    // Ограничиваем длину
    if (name.length > 80) {
      name = name.substring(0, 77) + "...";
    }

    return name;
  }, [getApiPayload, tab, getIndicatorName]);

  const handleGenerateName = () => {
    const generatedName = generateReportName();
    setReportName(generatedName);
  };

  // Debounced проверка уникальности имени
  const checkNameUniqueness = useCallback(
    async (name: string) => {
      if (!name.trim()) {
        setNameStatus("idle");
        return;
      }

      setNameStatus("checking");

      try {
        const result = await checkUnique({ reportName: name.trim() });
        setNameStatus(result.available ? "available" : "unavailable");
      } catch (error) {
        console.error("Ошибка при проверке уникальности:", error);
        setNameStatus("idle");
      }
    },
    [checkUnique],
  );

  // Debounce эффект для проверки имени
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkNameUniqueness(reportName);
    }, 500); // 500ms задержка

    return () => clearTimeout(timeoutId);
  }, [reportName, checkNameUniqueness]);

  const handleSaveReport = async () => {
    if (!reportName.trim()) {
      toast.error("Введите название отчета");
      return;
    }

    if (!hasReportData) {
      toast.error("Нет данных отчета для сохранения");
      return;
    }

    if (nameStatus === "unavailable") {
      toast.error("Отчет с таким названием уже существует");
      return;
    }

    try {
      setIsValidating(true);

      // Получаем текущие данные из store
      const currentData = getApiPayload();

      // Детальное логирование для диагностики структуры отчета
      console.log("=== ДИАГНОСТИКА СТРУКТУРЫ ОТЧЕТА ===");
      console.log(
        "Полные данные из getApiPayload:",
        JSON.stringify(currentData, null, 2),
      );
      console.log("Тип отчета:", tab);
      console.log("Режим отчета:", tab === "commerce" ? "COMMERCIAL" : "CHECK");

      // Проверяем фильтры
      console.log("=== ФИЛЬТРЫ ===");
      console.log("Фильтры магазинов:", currentData.filters.store);
      console.log("Фильтры товаров:", currentData.filters.product);
      console.log("Фильтры чеков:", currentData.filters.check);
      console.log("Фильтры лояльности:", currentData.filters.loyal);
      console.log(
        "Фильтры интернет-магазина:",
        currentData.filters.onlineStore,
      );

      // Проверяем показатели и группировки
      console.log("=== ПОКАЗАТЕЛИ И ГРУППИРОВКИ ===");
      console.log("Показатели (values):", currentData.values);
      console.log("Группировки (groups):", currentData.groups);
      console.log("Тип группировок:", typeof currentData.groups);
      console.log("Является ли массивом:", Array.isArray(currentData.groups));

      // Проверяем даты
      console.log("=== ДАТЫ ===");
      console.log("Дата начала:", currentData.filterDate.dateStart);
      console.log("Дата окончания:", currentData.filterDate.dateEnd);
      console.log("Время начала:", currentData.filterTime.timeStart);
      console.log("Время окончания:", currentData.filterTime.timeEnd);

      // Проверяем сортировку
      console.log("=== СОРТИРОВКА ===");
      console.log("Сортировка:", currentData.sorts);

      // Проверяем пагинацию
      console.log("=== ПАГИНАЦИЯ ===");
      console.log("Лимит:", currentData.limit);
      console.log("Смещение:", currentData.offset);

      console.log("=== КОНЕЦ ДИАГНОСТИКИ ===");

      // Формируем запрос для сохранения
      const saveRequest: SaveReportRequest = {
        filters: currentData.filters,
        values: currentData.values,
        groups: currentData.groups,
        filterDate: currentData.filterDate,
        reportName: reportName.trim(),
        mode: tab === "commerce" ? "COMMERCIAL" : "CHECK",
      };

      console.log(
        "Запрос на сохранение:",
        JSON.stringify(saveRequest, null, 2),
      );

      // Используем функцию валидации для проверки структуры

      // Сохраняем отчет
      const result = await saveReport(saveRequest);

      // Если запрос прошел без ошибок, считаем его успешным
      console.log("Ответ от API:", result);

      toast.success("Отчет успешно сохранен");
      setReportName("");
      setNameStatus("idle");
      setIsOpen(false);

      // Инвалидируем кэш сохраненных отчетов
      queryClient.invalidateQueries({ queryKey: ["saved-reports"] });
    } catch (error) {
      console.error("Ошибка при сохранении отчета:", error);
      toast.error("Ошибка при сохранении отчета");
    } finally {
      setIsValidating(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setReportName("");
    setNameStatus("idle");
  };

  const isLoading = isSaving || isValidating;
  const canSave = reportName.trim() && nameStatus === "available" && !isLoading;

  // Определяем иконку для статуса проверки имени
  const getNameStatusIcon = () => {
    switch (nameStatus) {
      case "checking":
        return (
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        );
      case "available":
        return <Check className="w-4 h-4 text-green-500" />;
      case "unavailable":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Определяем текст статуса
  const getStatusText = () => {
    switch (nameStatus) {
      case "checking":
        return "Проверка...";
      case "unavailable":
        return "Название уже используется";
      default:
        return "";
    }
  };

  if (!hasReportData) {
    return (
      <Button variant="outline" disabled>
        <Save className="w-4 h-4" />
        Сохранить отчет
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Save className="w-4 h-4" />
          Сохранить отчет
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            Сохранить отчет
          </DialogTitle>
          <DialogDescription>
            Введите название для отчета. Вы сможете быстро применить его позже
            из списка сохраненных отчетов.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-name">Название отчета</Label>
            <div className="flex gap-2 items-start">
              <div className="relative flex-1">
                <Input
                  id="report-name"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Введите название отчета"
                  disabled={isLoading}
                  maxLength={100}
                  className={cn(
                    "pr-8", // Padding только для иконки статуса
                    nameStatus === "unavailable" &&
                      "border-red-500 focus:border-red-500",
                    nameStatus === "available" &&
                      "border-green-500 focus:border-green-500",
                  )}
                />
                {/* Иконка статуса */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {getNameStatusIcon()}
                </div>
              </div>
              {/* Кнопка автогенерации вынесена наружу */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateName}
                disabled={isLoading}
                className="px-3 flex-shrink-0"
                title="Сгенерировать название автоматически"
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
              </Button>
            </div>
            {getStatusText() && (
              <p
                className={cn(
                  "text-sm",
                  nameStatus === "checking" && "text-muted-foreground",
                  nameStatus === "available" && "text-green-600",
                  nameStatus === "unavailable" && "text-red-600",
                )}
              >
                {getStatusText()}
              </p>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Отмена
            </Button>
            <Button onClick={handleSaveReport} disabled={!canSave}>
              {isLoading ? "Сохранение..." : "Сохранить"}
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
