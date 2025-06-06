import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { SavedReport } from "../config";
import { Button } from "@shared/ui/button";
import { CheckCircle2, Share2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useReport } from "@entities/report/model/api/filters/data/controller";
import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";
import { useReportStore } from "@widgets/report/sheet/model/report-store";
import { useTableVersionStore } from "@pages/report/ui/report";
import { useCountStore } from "@pages/report/model/usCountStore";

interface SavedReportCardProps {
  data: SavedReport;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const SavedReportCard = ({ data, onOpenChange }: SavedReportCardProps) => {
  const navigate = useNavigate();
  const { getGraph, getTable, getTotal } = useReport();
  const { setGraph, setTotal, setTable, clearAll } = useReportStore();
  const { bumpDataVersion } = useTableVersionStore();
  const { setCount } = useCountStore();

  const handleApplyReport = async () => {
    try {
      onOpenChange(false);
      clearAll();

      // Формируем параметры для API с правильным маппингом
      const apiPayload: FilterApiPayload = {
        filters: {
          store: {
            idStore: Array.isArray(data.report.filters.stores)
              ? data.report.filters.stores
              : [],
            idCity: Array.isArray(data.report.filters.cities)
              ? data.report.filters.cities
              : [],
            idRegion: Array.isArray(data.report.filters.regions)
              ? data.report.filters.regions
              : [],
            idManager: Array.isArray(data.report.filters.managers)
              ? data.report.filters.managers
              : [],
            storeCondition: Array.isArray(data.report.filters.storeStatus)
              ? data.report.filters.storeStatus
              : [],
            ageGroup: Array.isArray(data.report.filters.ageStatus)
              ? data.report.filters.ageStatus
              : [],
            idLegalEntity: [],
            channel: Array.isArray(data.report.filters.channel)
              ? data.report.filters.channel
              : [],
            district: [],
          },
          product: {
            groupFranchise: Array.isArray(
              data.report.filters.product?.groupFranchise,
            )
              ? data.report.filters.product.groupFranchise
              : Array.isArray(data.report.filters.product?.groupsFranchise)
                ? data.report.filters.product.groupsFranchise
                : [],
            ppProducts: data.report.filters.product?.ppProducts ?? null,
            subDivisionProducts: Array.isArray(
              data.report.filters.product?.subDivisionProducts,
            )
              ? data.report.filters.product.subDivisionProducts
              : [],
            subGroups: Array.isArray(data.report.filters.product?.subGroups)
              ? data.report.filters.product.subGroups
              : [],
            subSubGroups: Array.isArray(
              data.report.filters.product?.subSubGroups,
            )
              ? data.report.filters.product.subSubGroups
              : [],
            typeProducts: Array.isArray(
              data.report.filters.product?.typeProducts,
            )
              ? data.report.filters.product.typeProducts
              : [],
            teamProducts: Array.isArray(
              data.report.filters.product?.teamProducts,
            )
              ? data.report.filters.product.teamProducts
              : [],
            directionProducts: Array.isArray(
              data.report.filters.product?.directionProducts,
            )
              ? data.report.filters.product.directionProducts
              : [],
            groupsEconomist: Array.isArray(
              data.report.filters.product?.groupsEconomist,
            )
              ? data.report.filters.product.groupsEconomist
              : [],
            groupsMain: Array.isArray(data.report.filters.product?.groupsMain)
              ? data.report.filters.product.groupsMain
              : [],
            idGroupMain: Array.isArray(data.report.filters.product?.idGroupMain)
              ? data.report.filters.product.idGroupMain
              : Array.isArray(data.report.filters.product?.groups)
                ? data.report.filters.product.groups
                : [],
            idProduct: Array.isArray(data.report.filters.product?.idProduct)
              ? data.report.filters.product.idProduct
              : Array.isArray(data.report.filters.product?.products)
                ? data.report.filters.product.products
                : [],
            seasonalityProducts: Array.isArray(
              data.report.filters.product?.seasonalityProducts,
            )
              ? data.report.filters.product.seasonalityProducts
              : [],
            managerAuto: Array.isArray(data.report.filters.product?.managerAuto)
              ? data.report.filters.product.managerAuto
              : [],
          },
          check: {
            tabNumber: Array.isArray(data.report.filters.check?.tabNumber)
              ? data.report.filters.check.tabNumber
              : [],
            containsBankQr: data.report.filters.check?.containsBankQr ?? null,
            paymentClass: data.report.filters.check?.paymentClass ?? null,
            shift: Array.isArray(data.report.filters.check?.shift)
              ? data.report.filters.check.shift
              : [],
            cashBox: Array.isArray(data.report.filters.check?.cashBox)
              ? data.report.filters.check.cashBox
              : Array.isArray(data.report.filters.check?.cashbox)
                ? data.report.filters.check.cashbox
                : [],
            checkNumber: Array.isArray(data.report.filters.check?.checkNumber)
              ? data.report.filters.check.checkNumber
              : [],
            numberfield: Array.isArray(data.report.filters.check?.numberfield)
              ? data.report.filters.check.numberfield
              : [],
            type: [],
          },
          loyal: {
            isLoyal: data.report.filters.loyal?.isLoyal ?? null,
            cardNumber: Array.isArray(data.report.filters.loyal?.cardNumber)
              ? data.report.filters.loyal.cardNumber
              : [],
            sex: data.report.filters.loyal?.sex ?? null,
            guidDiscount: Array.isArray(data.report.filters.loyal?.guidDiscount)
              ? data.report.filters.loyal.guidDiscount
              : [],
            guidBonus: Array.isArray(data.report.filters.loyal?.guidBonus)
              ? data.report.filters.loyal.guidBonus
              : [],
            ageStart: data.report.filters.loyal?.ageStart ?? null,
            ageEnd: data.report.filters.loyal?.ageEnd ?? null,
            groupAge: Array.isArray(data.report.filters.loyal?.groupAge)
              ? data.report.filters.loyal.groupAge
              : [],
          },
          onlineStore: {
            isIm: data.report.filters.onlineStore?.isIm ?? null,
            imTypeOrder: Array.isArray(
              data.report.filters.onlineStore?.imTypeOrder,
            )
              ? data.report.filters.onlineStore.imTypeOrder
              : [],
            imDeliveryMethod: Array.isArray(
              data.report.filters.onlineStore?.imDeliveryMethod,
            )
              ? data.report.filters.onlineStore.imDeliveryMethod
              : [],
            imPaymentMethod: Array.isArray(
              data.report.filters.onlineStore?.imPaymentMethod,
            )
              ? data.report.filters.onlineStore.imPaymentMethod
              : [],
            imStatusOrder: Array.isArray(
              data.report.filters.onlineStore?.imStatusOrder,
            )
              ? data.report.filters.onlineStore.imStatusOrder
              : [],
            imReceiveInterval: Array.isArray(
              data.report.filters.onlineStore?.imReceiveInterval,
            )
              ? data.report.filters.onlineStore.imReceiveInterval
              : [],
            imPromo: Array.isArray(data.report.filters.onlineStore?.imPromo)
              ? data.report.filters.onlineStore.imPromo
              : [],
          },
          writeoff: {
            indicator: [],
            article: [],
          },
        },
        values: [...data.report.indicators, ...data.report.uniqueValues],
        groups: data.report.groupingColumns,
        filterDate: {
          dateStart: new Date(data.report.filters.startDate)
            .toISOString()
            .split("T")[0],
          dateEnd: new Date(data.report.filters.endDate)
            .toISOString()
            .split("T")[0],
        },
        filterTime: {
          timeStart: data.report.filters.timeStart || "",
          timeEnd: data.report.filters.timeEnd || "",
        },
        sorts: {
          colId: [data.report.indicators[0]], // Берем первый показатель
          sort: "desc",
        },
        limit: 100,
        offset: 0,
      };

      // Загружаем данные параллельно
      const [graph, total, table] = await Promise.all([
        getGraph({
          ...apiPayload,
          // Для графика берем только первый показатель
          values: [apiPayload.values[0]],
          // И группируем по времени
          groups: ["day"],
        }),
        getTotal(apiPayload),
        getTable(apiPayload),
      ]);

      // Устанавливаем полученные данные
      setGraph(graph);
      setTotal(total);
      setTable(table);
      setCount(table.totalRows);
      bumpDataVersion();

      // Переходим на страницу отчета
      navigate(
        `/report?open=false&tab=${
          data.report.mode === "COMMERCIAL" ? "commerce" : "check"
        }`,
      );
    } catch (error) {
      console.error("Ошибка при загрузке отчета:", error);
    }
  };

  return (
    <Card className="hover:shadow-md cursor-pointer transition-all bg-background">
      <CardHeader className="flex flex-row justify-between gap-4">
        <CardTitle>{data.nameReport}</CardTitle>
        <CardDescription>
          {new Date(data.dateAdd).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button size="sm" onClick={handleApplyReport} disabled>
          Применить отчет
          <CheckCircle2 className="w-4 h-4" />
        </Button>
        <Button disabled variant="outline" size="sm">
          Поделиться отчетом
          <Share2 className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SavedReportCard;
