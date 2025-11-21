import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { SavedReport } from "../config";
import { Button } from "@shared/ui/button";
import { CheckCircle2, X } from "lucide-react";
import { useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@shared/ui/alert-dialog";
import { useSavedReportsController } from "../api/controller";
import { useReport } from "@entities/report/model/api/filters/data/controller";
import {
  FilterApiPayload,
  useFiltersStore,
} from "@widgets/report/sheet/model/filters-store";
import { useReportStore } from "@widgets/report/sheet/model/report-store";
import { useTableVersionStore } from "@pages/report/ui/report";
import { useCountStore } from "@pages/report/model/usCountStore";

interface SavedReportCardProps {
  data: SavedReport;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const SavedReportCard = ({ data, onOpenChange }: SavedReportCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { getGraph, getTable, getTotal } = useReport();
  const { setGraph, setTotal, setTable, clearAll } = useReportStore();
  const { bumpDataVersion } = useTableVersionStore();
  const { setCount } = useCountStore();
  const { deleteReport, isDeleting } = useSavedReportsController();

  // Добавляем использование основного store для фильтров
  const {
    updateStoreFilter,
    updateProductFilter,
    updateCheckFilter,
    updateLoyalFilter,
    updateOnlineStoreFilter,
    updateDateFilter,
    updateTimeFilter,
    updateGroups,
    updateUniques,
    updateIndicators,
    resetAllFilters,
    getApiPayload,
  } = useFiltersStore();

  const applyFiltersToStore = () => {
    // Сначала сброс всех фильтров
    resetAllFilters();

    console.log("=== ПРИМЕНЕНИЕ СОХРАНЕННОГО ОТЧЕТА ===");
    console.log("Применяем сохраненный отчет:", data);
    console.log("Группировки из отчета:", data.report.groups);
    console.log("Тип группировок:", typeof data.report.groups);
    console.log("Является ли массивом:", Array.isArray(data.report.groups));
    console.log("Показатели из отчета:", data.report.values);
    console.log("Уникальные значения из отчета:", data.report.uniqueValues);

    // Применяем фильтры магазинов
    updateStoreFilter(
      "idStore",
      Array.isArray(data.report.filters.store?.idStore)
        ? data.report.filters.store.idStore
        : [],
    );
    updateStoreFilter(
      "idCity",
      Array.isArray(data.report.filters.store?.idCity)
        ? data.report.filters.store.idCity
        : [],
    );
    updateStoreFilter(
      "idRegion",
      Array.isArray(data.report.filters.store?.idRegion)
        ? data.report.filters.store.idRegion
        : [],
    );
    updateStoreFilter(
      "idManager",
      Array.isArray(data.report.filters.store?.idManager)
        ? data.report.filters.store.idManager
        : [],
    );
    updateStoreFilter(
      "storeCondition",
      Array.isArray(data.report.filters.store?.storeCondition)
        ? data.report.filters.store.storeCondition
        : [],
    );
    updateStoreFilter(
      "ageGroup",
      Array.isArray(data.report.filters.store?.ageGroup)
        ? data.report.filters.store.ageGroup
        : [],
    );
    updateStoreFilter(
      "channel",
      Array.isArray(data.report.filters.store?.channel)
        ? data.report.filters.store.channel
        : [],
    );

    // Применяем фильтры товаров
    if (data.report.filters.product) {
      updateProductFilter(
        "groupFranchise",
        Array.isArray(data.report.filters.product.groupFranchise)
          ? data.report.filters.product.groupFranchise
          : [],
      );
      updateProductFilter(
        "ppProducts",
        data.report.filters.product.ppProducts ?? null,
      );
      updateProductFilter(
        "subDivisionProducts",
        Array.isArray(data.report.filters.product.subDivisionProducts)
          ? data.report.filters.product.subDivisionProducts
          : [],
      );
      updateProductFilter(
        "subGroups",
        Array.isArray(data.report.filters.product.subGroups)
          ? data.report.filters.product.subGroups
          : [],
      );
      updateProductFilter(
        "subSubGroups",
        Array.isArray(data.report.filters.product.subSubGroups)
          ? data.report.filters.product.subSubGroups
          : [],
      );
      updateProductFilter(
        "typeProducts",
        Array.isArray(data.report.filters.product.typeProducts)
          ? data.report.filters.product.typeProducts
          : [],
      );
      updateProductFilter(
        "teamProducts",
        Array.isArray(data.report.filters.product.teamProducts)
          ? data.report.filters.product.teamProducts
          : [],
      );
      updateProductFilter(
        "directionProducts",
        Array.isArray(data.report.filters.product.directionProducts)
          ? data.report.filters.product.directionProducts
          : [],
      );
      updateProductFilter(
        "groupsEconomist",
        Array.isArray(data.report.filters.product.groupsEconomist)
          ? data.report.filters.product.groupsEconomist
          : [],
      );
      updateProductFilter(
        "groupsMain",
        Array.isArray(data.report.filters.product.groupsMain)
          ? data.report.filters.product.groupsMain
          : [],
      );
      updateProductFilter(
        "idGroupMain",
        Array.isArray(data.report.filters.product.idGroupMain)
          ? data.report.filters.product.idGroupMain
          : [],
      );
      updateProductFilter(
        "idProduct",
        Array.isArray(data.report.filters.product.idProduct)
          ? data.report.filters.product.idProduct
          : [],
      );
      updateProductFilter(
        "seasonalityProducts",
        Array.isArray(data.report.filters.product.seasonalityProducts)
          ? data.report.filters.product.seasonalityProducts
          : [],
      );
      updateProductFilter(
        "managerAuto",
        Array.isArray(data.report.filters.product.managerAuto)
          ? data.report.filters.product.managerAuto
          : [],
      );
    }

    // Применяем фильтры чеков
    if (data.report.filters.check) {
      updateCheckFilter(
        "tabNumber",
        Array.isArray(data.report.filters.check.tabNumber)
          ? data.report.filters.check.tabNumber
          : [],
      );
      updateCheckFilter(
        "containsBankQr",
        data.report.filters.check.containsBankQr ?? null,
      );
      updateCheckFilter(
        "paymentClass",
        data.report.filters.check.paymentClass ?? null,
      );
      updateCheckFilter(
        "shift",
        Array.isArray(data.report.filters.check.shift)
          ? data.report.filters.check.shift
          : [],
      );
      updateCheckFilter(
        "cashBox",
        Array.isArray(data.report.filters.check.cashBox)
          ? data.report.filters.check.cashBox
          : [],
      );
      updateCheckFilter(
        "checkNumber",
        Array.isArray(data.report.filters.check.checkNumber)
          ? data.report.filters.check.checkNumber
          : [],
      );
      updateCheckFilter(
        "numberfield",
        Array.isArray(data.report.filters.check.numberfield)
          ? data.report.filters.check.numberfield
          : [],
      );
    }

    // Применяем фильтры лояльности
    if (data.report.filters.loyal) {
      updateLoyalFilter("isLoyal", data.report.filters.loyal.isLoyal ?? null);
      updateLoyalFilter(
        "cardNumber",
        Array.isArray(data.report.filters.loyal.cardNumber)
          ? data.report.filters.loyal.cardNumber
          : [],
      );
      updateLoyalFilter("sex", data.report.filters.loyal.sex ?? null);
      updateLoyalFilter(
        "guidDiscount",
        Array.isArray(data.report.filters.loyal.guidDiscount)
          ? data.report.filters.loyal.guidDiscount
          : [],
      );
      updateLoyalFilter(
        "guidBonus",
        Array.isArray(data.report.filters.loyal.guidBonus)
          ? data.report.filters.loyal.guidBonus
          : [],
      );
      updateLoyalFilter("ageStart", data.report.filters.loyal.ageStart ?? null);
      updateLoyalFilter("ageEnd", data.report.filters.loyal.ageEnd ?? null);
      updateLoyalFilter(
        "groupAge",
        Array.isArray(data.report.filters.loyal.groupAge)
          ? data.report.filters.loyal.groupAge
          : [],
      );
    }

    // Применяем фильтры интернет-магазина
    if (data.report.filters.onlineStore) {
      updateOnlineStoreFilter(
        "isIm",
        data.report.filters.onlineStore.isIm ?? null,
      );
      updateOnlineStoreFilter(
        "imTypeOrder",
        Array.isArray(data.report.filters.onlineStore.imTypeOrder)
          ? data.report.filters.onlineStore.imTypeOrder
          : [],
      );
      updateOnlineStoreFilter(
        "imDeliveryMethod",
        Array.isArray(data.report.filters.onlineStore.imDeliveryMethod)
          ? data.report.filters.onlineStore.imDeliveryMethod
          : [],
      );
      updateOnlineStoreFilter(
        "imPaymentMethod",
        Array.isArray(data.report.filters.onlineStore.imPaymentMethod)
          ? data.report.filters.onlineStore.imPaymentMethod
          : [],
      );
      updateOnlineStoreFilter(
        "imStatusOrder",
        Array.isArray(data.report.filters.onlineStore.imStatusOrder)
          ? data.report.filters.onlineStore.imStatusOrder
          : [],
      );
      updateOnlineStoreFilter(
        "imReceiveInterval",
        Array.isArray(data.report.filters.onlineStore.imReceiveInterval)
          ? data.report.filters.onlineStore.imReceiveInterval
          : [],
      );
      updateOnlineStoreFilter(
        "imPromo",
        Array.isArray(data.report.filters.onlineStore.imPromo)
          ? data.report.filters.onlineStore.imPromo
          : [],
      );
    }

    // Применяем даты
    updateDateFilter(
      data.report.filterDate.dateStart,
      data.report.filterDate.dateEnd,
    );

    // Применяем время (если есть)
    updateTimeFilter("", "");

    // Применяем группировки, уникальные значения и показатели
    console.log("=== ПРИМЕНЕНИЕ ГРУППИРОВОК И ПОКАЗАТЕЛЕЙ ===");
    console.log("Применяем группировки:", data.report.groups);
    updateGroups(data.report.groups);
    console.log("Группировки применены:", data.report.groups);

    console.log(
      "Применяем уникальные значения:",
      data.report.uniqueValues || [],
    );
    updateUniques(data.report.uniqueValues || []);
    console.log("Уникальные значения применены");

    console.log("Применяем показатели:", data.report.values);
    updateIndicators(data.report.values);
    console.log("Показатели применены");

    // Проверяем состояние store после применения
    const currentState = getApiPayload();
    console.log("=== СОСТОЯНИЕ STORE ПОСЛЕ ПРИМЕНЕНИЯ ===");
    console.log("Текущие группировки в store:", currentState.groups);
    console.log("Текущие values в store:", currentState.values);
    console.log("=== КОНЕЦ ПРИМЕНЕНИЯ ===");
  };

  const handleApplyReport = async () => {
    try {
      console.log("=== ДИАГНОСТИКА СОХРАНЕННОГО ОТЧЕТА ===");
      console.log(
        "Полные данные сохраненного отчета:",
        JSON.stringify(data, null, 2),
      );
      console.log("Структура report:", JSON.stringify(data.report, null, 2));

      // Проверяем основные поля
      console.log("=== ОСНОВНЫЕ ПОЛЯ ===");
      console.log("ID отчета:", data.idReport);
      console.log("Название отчета:", data.nameReport);
      console.log("Дата создания:", data.dateAdd);
      console.log("Режим отчета:", data.report.mode);

      // Проверяем показатели и группировки
      console.log("=== ПОКАЗАТЕЛИ И ГРУППИРОВКИ ===");
      console.log("Показатели:", data.report.values);
      console.log("Уникальные значения:", data.report.uniqueValues);
      console.log("Группировки:", data.report.groups);
      console.log("Тип группировок:", typeof data.report.groups);
      console.log("Является ли массивом:", Array.isArray(data.report.groups));

      // Проверяем фильтры
      console.log("=== ФИЛЬТРЫ ===");
      console.log("Все фильтры:", JSON.stringify(data.report.filters, null, 2));

      if (data.report.filters.stores) {
        console.log("Магазины:", data.report.filters.stores);
        console.log("Тип магазинов:", typeof data.report.filters.stores);
        console.log(
          "Является ли массивом:",
          Array.isArray(data.report.filters.stores),
        );
      }

      if (data.report.filters.cities) {
        console.log("Города:", data.report.filters.cities);
        console.log("Тип городов:", typeof data.report.filters.cities);
        console.log(
          "Является ли массивом:",
          Array.isArray(data.report.filters.cities),
        );
      }

      if (data.report.filters.product) {
        console.log(
          "Фильтры товаров:",
          JSON.stringify(data.report.filters.product, null, 2),
        );
      }

      if (data.report.filters.check) {
        console.log(
          "Фильтры чеков:",
          JSON.stringify(data.report.filters.check, null, 2),
        );
      }

      if (data.report.filters.loyal) {
        console.log(
          "Фильтры лояльности:",
          JSON.stringify(data.report.filters.loyal, null, 2),
        );
      }

      if (data.report.filters.onlineStore) {
        console.log(
          "Фильтры интернет-магазина:",
          JSON.stringify(data.report.filters.onlineStore, null, 2),
        );
      }

      // Проверяем даты
      console.log("=== ДАТЫ ===");
      console.log("Дата начала:", data.report.filters.startDate);
      console.log("Дата окончания:", data.report.filters.endDate);
      console.log("Время начала:", data.report.filters.timeStart);
      console.log("Время окончания:", data.report.filters.timeEnd);

      console.log("=== КОНЕЦ ДИАГНОСТИКИ СОХРАНЕННОГО ОТЧЕТА ===");

      onOpenChange(false);
      clearAll();

      // Применяем фильтры в основной store
      applyFiltersToStore();

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
            colorsDiscount: Array.isArray(
              data.report.filters.loyal?.colorsDiscount,
            )
              ? data.report.filters.loyal.colorsDiscount
              : [],
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
        values: [...data.report.values, ...(data.report.uniqueValues || [])],
        groups: data.report.groups,
        filterDate: {
          dateStart: data.report.filterDate.dateStart,
          dateEnd: data.report.filterDate.dateEnd,
        },
        filterTime: {
          timeStart: "",
          timeEnd: "",
        },
        sorts: {
          colId: [data.report.values[0]], // Берем первый показатель
          sort: "desc",
        },
        limit: 100,
        offset: 0,
      };

      console.log("=== API ЗАПРОС ===");
      console.log("API Payload для графика:", {
        ...apiPayload,
        values: [apiPayload.values[0]],
        groups: ["day"],
      });
      console.log("API Payload для таблицы:", apiPayload);
      console.log("API Payload для итогов:", apiPayload);

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

      console.log("=== РЕЗУЛЬТАТЫ API ===");
      console.log("График:", graph);
      console.log("Итоги:", total);
      console.log("Таблица:", table);

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

  const handleDelete = async () => {
    try {
      await deleteReport(data.idReport);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Ошибка при удалении отчета:", error);
    }
  };

  return (
    <>
      <Card className="hover:shadow-md cursor-pointer transition-all bg-background shrink-0 relative group">
        <CardHeader className="flex flex-row justify-between gap-4 items-start">
          <CardTitle>{data.nameReport}</CardTitle>
          <div className="flex flex-row items-center gap-2 relative">
            <CardDescription className="transition-transform duration-200 group-hover:-translate-x-8">
              {new Date(data.dateAdd).toLocaleDateString()}
            </CardDescription>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-200 absolute right-0"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteDialogOpen(true);
              }}
              disabled={isDeleting}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-2">
          <Button size="sm" onClick={handleApplyReport}>
            Применить отчет
            <CheckCircle2 className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить отчет?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить отчет{" "}
              <span className="font-bold">"{data.nameReport}"</span>?
              <br />
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Удаление..." : "Удалить"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SavedReportCard;
