import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { Badge } from "@shared/ui/badge";
import { ScrollArea } from "@shared/ui/scroll-area";
import { Separator } from "@shared/ui/separator";
import { SavedReport } from "../config";
import {
  CalendarDays,
  Clock,
  Filter,
  BarChart3,
  Building2,
  Package,
  CreditCard,
  Heart,
  Globe,
} from "lucide-react";

interface ReportDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  report: SavedReport;
}

export default function ReportDetailsDialog({
  isOpen,
  onOpenChange,
  report,
}: ReportDetailsDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  // Early return if report structure is incomplete
  if (!report || !report.report) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Ошибка загрузки отчета
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>Не удалось загрузить данные отчета</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const renderFilterSection = (
    title: string,
    icon: React.ReactNode,
    filters: any,
    filterKeys: string[],
  ) => {
    if (!filters) return null;

    const hasFilters = filterKeys.some((key) => {
      const value = filters[key];
      return Array.isArray(value)
        ? value.length > 0
        : value !== null && value !== undefined && value !== "";
    });

    if (!hasFilters) return null;

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="font-medium text-sm">{title}</h4>
        </div>
        <div className="space-y-1 pl-6">
          {filterKeys.map((key) => {
            const value = filters[key];
            if (Array.isArray(value) && value.length > 0) {
              return (
                <div key={key} className="flex flex-wrap gap-1">
                  <span className="text-xs text-muted-foreground">{key}:</span>
                  {value.map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {typeof item === "object"
                        ? JSON.stringify(item)
                        : String(item)}
                    </Badge>
                  ))}
                </div>
              );
            } else if (value !== null && value !== undefined && value !== "") {
              return (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{key}:</span>
                  <Badge variant="secondary" className="text-xs">
                    {String(value)}
                  </Badge>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Детали отчета: {report.nameReport}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-4 p-1">
            {/* Основная информация */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-sm font-medium">Период</span>
                </div>
                <div className="pl-6 space-y-1">
                  <div className="text-sm">
                    {report.report.filterDate ? (
                      <>
                        {formatDate(report.report.filterDate.dateStart)} -{" "}
                        {formatDate(report.report.filterDate.dateEnd)}
                      </>
                    ) : (
                      "Дата не указана"
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs text-muted-foreground">
                      00:00 - 23:59
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-sm font-medium">Тип отчета</span>
                </div>
                <div className="pl-6">
                  <Badge
                    variant={
                      report.report.mode === "COMMERCIAL"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {report.report.mode === "COMMERCIAL"
                      ? "Коммерческий"
                      : "Чековый"}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Показатели */}
            {report.report.values &&
              Array.isArray(report.report.values) &&
              report.report.values.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-sm font-medium">Показатели</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pl-6">
                    {report.report.values.map((indicator, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {indicator}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            {/* Группировки */}
            {report.report.groups &&
              Array.isArray(report.report.groups) &&
              report.report.groups.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Группировки</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pl-6">
                    {report.report.groups.map((group, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {group}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            <Separator />

            {/* Фильтры магазинов */}
            {report.report.filters.store &&
              renderFilterSection(
                "Магазины",
                <Building2 className="h-4 w-4" />,
                report.report.filters.store,
                [
                  "idStore",
                  "idCity",
                  "idRegion",
                  "idManager",
                  "storeCondition",
                  "ageGroup",
                  "channel",
                ],
              )}

            {/* Фильтры товаров */}
            {report.report.filters.product &&
              renderFilterSection(
                "Товары",
                <Package className="h-4 w-4" />,
                report.report.filters.product,
                [
                  "groupFranchise",
                  "groupsFranchise",
                  "ppProducts",
                  "subDivisionProducts",
                  "subGroups",
                  "subSubGroups",
                  "typeProducts",
                  "teamProducts",
                  "directionProducts",
                  "groupsEconomist",
                  "groupsMain",
                  "idGroupMain",
                  "groups",
                  "idProduct",
                  "products",
                  "seasonalityProducts",
                  "managerAuto",
                ],
              )}

            {/* Фильтры чеков */}
            {report.report.filters.check &&
              renderFilterSection(
                "Чеки",
                <CreditCard className="h-4 w-4" />,
                report.report.filters.check,
                [
                  "tabNumber",
                  "containsBankQr",
                  "paymentClass",
                  "shift",
                  "cashBox",
                  "cashbox",
                  "checkNumber",
                  "numberfield",
                ],
              )}

            {/* Фильтры лояльности */}
            {report.report.filters.loyal &&
              renderFilterSection(
                "Лояльность",
                <Heart className="h-4 w-4" />,
                report.report.filters.loyal,
                [
                  "isLoyal",
                  "cardNumber",
                  "sex",
                  "guidDiscount",
                  "guidBonus",
                  "ageStart",
                  "ageEnd",
                  "groupAge",
                ],
              )}

            {/* Фильтры интернет-магазина */}
            {report.report.filters.onlineStore &&
              renderFilterSection(
                "Интернет-магазин",
                <Globe className="h-4 w-4" />,
                report.report.filters.onlineStore,
                [
                  "isIm",
                  "imTypeOrder",
                  "imDeliveryMethod",
                  "imPaymentMethod",
                  "imStatusOrder",
                  "imReceiveInterval",
                  "imPromo",
                ],
              )}

            {/* Информация о создании */}
            <Separator />
            <div className="text-xs text-muted-foreground">
              Создан: {formatDate(report.dateAdd)}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
