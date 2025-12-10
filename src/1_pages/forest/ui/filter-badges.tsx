import { Link } from "react-router";
import { Badge } from "@shared/ui/badge";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { JSX } from "react";
import { formatDate } from "date-fns";

const getFilterLabel = (sectionKey: string, filterKey: string): string => {
  const labels: Record<string, Record<string, string>> = {
    store: {
      idStore: "Магазины",
      idCity: "Города",
      idRegion: "Регионы",
    },
    product: {
      idGroupProduct: "Основные группы",
      oneLvlGroupProduct: "Подгруппы",
      twoLvlGroupProduct: "Подподгруппы",
      threeLvlGroupProduct: "Подподподгруппы",
      idProduct: "Товары",
      dishMeasureUnit: "Единицы измерения",
    },
    check: {
      checkNumber: "Номера чеков",
      discountType: "Типы скидок",
      typePayment: "Типы оплаты",
    },
    loyal: {
      isLoyal: "Лояльные клиенты",
      cardNumber: "Номера карт",
      sex: "Пол",
      guidDiscount: "Скидки",
      guidBonus: "Бонусы",
      ageStart: "Возраст от",
      ageEnd: "Возраст до",
      groupAge: "Возрастные группы",
      colorsDiscount: "Цвета скидок",
    },
    account: {
      idAccount: "Причины списания",
    },
  };

  return labels[sectionKey]?.[filterKey] || filterKey;
};

export function FilterBadges({ tab }: { tab: string }) {
  const { filters } = useFiltersStore();

  const renderBadges = () => {
    const badges: JSX.Element[] = [];

    // 1. Сначала добавляем период (если есть)
    if (filters.filterDate?.dateStart && filters.filterDate?.dateEnd) {
      badges.push(
        <Badge key="date-range">
          {`Период: ${formatDate(
            filters.filterDate.dateStart,
            "dd.MM.yyyy",
          )} - ${formatDate(filters.filterDate.dateEnd, "dd.MM.yyyy")}`}
        </Badge>,
      );
    }

    // 2. Затем фильтры по времени
    if (filters.filterTime?.timeStart) {
      badges.push(
        <Badge key="time-start">{`Время от: ${filters.filterTime.timeStart}`}</Badge>,
      );
    }
    if (filters.filterTime?.timeEnd) {
      badges.push(
        <Badge key="time-end">{`Время до: ${filters.filterTime.timeEnd}`}</Badge>,
      );
    }

    // 3. Остальные фильтры с подсчетом количества
    Object.entries(filters).forEach(([sectionKey, sectionValue]) => {
      if (typeof sectionValue !== "object" || sectionValue === null) return;
      if (sectionKey === "filterDate" || sectionKey === "filterTime") return;

      const activeFilters = Object.entries(sectionValue).filter(([, value]) => {
        // Убираем имя для первого параметра
        if (value === null) return false;
        if (Array.isArray(value)) return value.length > 0;
        return true;
      });

      if (activeFilters.length === 0) return;

      // Для каждого активного фильтра показываем количество выбранных значений
      activeFilters.forEach(([filterKey, value]) => {
        const count = Array.isArray(value) ? value.length : 1;
        badges.push(
          <Badge key={`${sectionKey}-${filterKey}`}>
            {`${getFilterLabel(sectionKey, filterKey)}: ${count}`}
          </Badge>,
        );
      });
    });

    return badges;
  };

  return (
    <Link
      to={`/forest/?open=true&tab=${tab}`}
      className="flex flex-row gap-2 flex-nowrap items-center"
    >
      {renderBadges()}
    </Link>
  );
}
