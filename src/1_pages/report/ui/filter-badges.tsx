import { Link } from "react-router";
import { Badge } from "@shared/ui/badge";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { JSX } from "react";
import { formatDate } from "date-fns";
import {
  useLoyalAction,
  useLoyalBonus,
} from "@widgets/report/sheet/ui/side/loyalty-filter";
import {
  useInterval,
  usePromo,
  useStatusOrder,
} from "@widgets/report/sheet/ui/side/online-filter";
import {
  useAutoManager,
  useDirection,
  useEconomist,
  useFranchise,
  useGroup,
  useProduct,
  useSeason,
  useSubdivision,
  useSubgroup,
  useSubsubgroup,
  useTeam,
  useTypeSender,
} from "@widgets/report/sheet/ui/side/products-filter";
import { useEmployeeName } from "@widgets/report/sheet/ui/side/reciepts-filter";
import {
  useCities,
  usePartners,
  useRegions,
  useShops,
} from "@widgets/report/sheet/ui/side/shops-filter";

// Импортируем все необходимые хуки для получения сохраненных лейблов

// Добавьте импорты для других хуков аналогично

// Вспомогательные функции для форматирования
const formatFilterValue = (
  value: any,
  sectionKey: string,
  filterKey: string,
  savedLabels: Record<string, any>
): string => {
  if (Array.isArray(value)) {
    // Получаем соответствующие лейблы для массива ID
    const labels = value.map((id) => {
      const labelKey = `${sectionKey}_${filterKey}`;
      const savedOptions = savedLabels[labelKey] || [];
      const option = savedOptions.find((opt: any) => opt.value === String(id));
      return option ? option.label : String(id);
    });
    return labels.join(", ");
  }

  if (typeof value === "boolean") {
    return value ? "Да" : "Нет";
  }

  // Для одиночных значений также ищем лейбл
  const labelKey = `${sectionKey}_${filterKey}`;
  const savedOptions = savedLabels[labelKey] || [];
  const option = savedOptions.find((opt: any) => opt.value === String(value));
  return option ? option.label : String(value);
};

const getSectionLabel = (sectionKey: string): string => {
  const labels: Record<string, string> = {
    store: "Магазин",
    product: "Продукт",
    check: "Чек",
    loyal: "Лояльность",
    onlineStore: "Интернет-магазин",
    writeoff: "Списание",
  };
  return labels[sectionKey] || sectionKey;
};

const getFilterLabel = (sectionKey: string, filterKey: string): string => {
  const labels: Record<string, Record<string, string>> = {
    store: {
      idStore: "Магазин",
      idCity: "Город",
      idRegion: "Регион",
      idManager: "Партнер",
      storeCondition: "Состояние",
      ageGroup: "Возрастная группа",
      idLegalEntity: "Юр. лицо",
      channel: "Канал",
      district: "Район",
    },
    product: {
      groupFranchise: "Структура продаж",
      ppProducts: "ПП-продукты",
      subDivisionProducts: "Подразделение",
      subGroups: "Подгруппы",
      subSubGroups: "Подподгруппы",
      typeProducts: "Тип товаров",
      teamProducts: "Команда",
      directionProducts: "Направление",
      groupsEconomist: "Группы экономиста",
      idGroupMain: "Основная группа",
      idProduct: "Товар",
      seasonalityProducts: "Сезонность",
      managerAuto: "Авто-менеджер",
    },
    check: {
      tabNumber: "Табельный номер",
      containsBankQr: "Содержит QR банка",
      paymentClass: "Класс оплаты",
      shift: "Смена",
      cashBox: "Касса",
      checkNumber: "Номер чека",
      numberfield: "Числовое поле",
      type: "Тип чека",
    },
    loyal: {
      isLoyal: "Лояльный клиент",
      cardNumber: "Номер карты",
      sex: "Пол",
      guidDiscount: "ID скидки",
      guidBonus: "ID бонуса",
      ageStart: "Возраст от",
      ageEnd: "Возраст до",
      groupAge: "Возрастная группа",
    },
    onlineStore: {
      isIm: "Онлайн-заказ",
      imTypeOrder: "Тип заказа",
      imDeliveryMethod: "Способ доставки",
      imPaymentMethod: "Способ оплаты",
      imStatusOrder: "Статус заказа",
      imReceiveInterval: "Интервал получения",
      imPromo: "Промо",
    },
    writeoff: {
      indicator: "Показатель списания",
      article: "Статья списания",
    },
  };

  return labels[sectionKey]?.[filterKey] || filterKey;
};

export function FilterBadges({ tab }: { tab: string }) {
  const { filters, filterDate, filterTime } = useFiltersStore();

  // LOYAL
  const { savedLoyalBonusLabels } = useLoyalBonus({});
  const { savedLoyalActionLabels } = useLoyalAction({});

  //ONLINE
  const { savedIntervalLabels } = useInterval({});
  const { savedPromoLabels } = usePromo({});
  const { savedStatusOrderLabels } = useStatusOrder({});

  //PRODUCTS
  const { savedAutoManagerLabels } = useAutoManager({});
  const { savedDirectionLabels } = useDirection({});
  const { savedEconomistLabels } = useEconomist({});
  const { savedFranchiseLabels } = useFranchise({});
  const { savedGroupLabels } = useGroup({});
  const { savedProductLabels } = useProduct({});
  const { savedSeasonLabels } = useSeason({});
  const { savedSubdivisionLabels } = useSubdivision({});
  const { savedSubgroupLabels } = useSubgroup({});
  const { savedSubsubgroupLabels } = useSubsubgroup({});
  const { savedTeamLabels } = useTeam({});
  const { savedTypeSenderLabels } = useTypeSender({});

  //RECIEPTS
  const { savedEmployeeNameLabels } = useEmployeeName({});

  //SHOPS
  const { savedCityLabels } = useCities({});
  const { savedPartnerLabels } = usePartners({});
  const { savedRegionLabels } = useRegions({});
  const { savedShopLabels } = useShops({});

  // Создаем объект с сохраненными лейблами для удобного доступа
  const savedLabels = {
    // LOYAL
    loyal_guidDiscount: savedLoyalActionLabels,
    loyal_guidBonus: savedLoyalBonusLabels,

    // ONLINE
    onlineStore_imReceiveInterval: savedIntervalLabels,
    onlineStore_imPromo: savedPromoLabels,
    onlineStore_imStatusOrder: savedStatusOrderLabels,

    // PRODUCTS
    product_managerAuto: savedAutoManagerLabels,
    product_directionProducts: savedDirectionLabels,
    product_groupsEconomist: savedEconomistLabels,
    product_groupFranchise: savedFranchiseLabels,
    product_idGroupMain: savedGroupLabels,
    product_idProduct: savedProductLabels,
    product_seasonalityProducts: savedSeasonLabels,
    product_subDivisionProducts: savedSubdivisionLabels,
    product_subGroups: savedSubgroupLabels,
    product_subSubGroups: savedSubsubgroupLabels,
    product_teamProducts: savedTeamLabels,
    product_typeProducts: savedTypeSenderLabels,

    // RECEIPTS/CHECK
    check_tabNumber: savedEmployeeNameLabels,

    // SHOPS/STORE
    store_idCity: savedCityLabels,
    store_idManager: savedPartnerLabels,
    store_idRegion: savedRegionLabels,
    store_idStore: savedShopLabels,
  };

  const renderBadges = () => {
    const badges: JSX.Element[] = [];

    Object.entries(filters).forEach(([sectionKey, sectionValue]) => {
      if (typeof sectionValue !== "object" || sectionValue === null) return;

      const activeFilters = Object.entries(sectionValue).filter(
        ([_, value]) => {
          if (value === null) return false;
          if (Array.isArray(value)) return value.length > 0;
          return true;
        }
      );

      if (activeFilters.length === 0) return;

      // Для магазинов выводим количество выбранных значений
      if (sectionKey === "фыоивафыгивагфрыи") {
        const totalSelected = activeFilters.reduce((sum, [_, value]) => {
          return sum + (Array.isArray(value) ? value.length : 1);
        }, 0);

        badges.push(
          <Badge key={`section-${sectionKey}`}>
            {`${getSectionLabel(sectionKey)}: ${totalSelected}`}
          </Badge>
        );
      } else {
        // Для других секций выводим каждый активный фильтр
        activeFilters.forEach(([filterKey, value]) => {
          badges.push(
            <Badge key={`${sectionKey}-${filterKey}`}>
              {`${getFilterLabel(sectionKey, filterKey)}: ${formatFilterValue(
                value,
                sectionKey,
                filterKey,
                savedLabels
              )}`}
            </Badge>
          );
        });
      }
    });

    // 2. Фильтры по дате
    if (filterDate?.dateStart && filterDate?.dateEnd) {
      badges.push(
        <Badge key="date-range">
          {`Период: ${formatDate(
            filterDate.dateStart,
            "dd.MM.yyyy"
          )} - ${formatDate(filterDate.dateEnd, "dd.MM.yyyy")}`}
        </Badge>
      );
    }

    // 3. Фильтры по времени
    if (filterTime?.timeStart) {
      badges.push(
        <Badge key="time-start">{`Время от: ${filterTime.timeStart}`}</Badge>
      );
    }
    if (filterTime?.timeEnd) {
      badges.push(
        <Badge key="time-end">{`Время до: ${filterTime.timeEnd}`}</Badge>
      );
    }

    return badges;
  };

  return (
    <Link
      to={`/report/?open=true&tab=${tab}`}
      className="flex flex-row gap-2 flex-nowrap items-center"
    >
      {renderBadges()}
    </Link>
  );
}
