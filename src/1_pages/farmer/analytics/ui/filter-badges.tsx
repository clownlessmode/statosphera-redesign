import { Link } from "react-router";
import { Badge } from "@shared/ui/badge";
import { useFiltersStore } from "@widgets/farmer/analytics/sheet/model/filters-store";
import { JSX } from "react";
import { formatDate } from "date-fns";

const getFilterLabel = (sectionKey: string, filterKey: string): string => {
  const labels: Record<string, Record<string, string>> = {
    store: {
      idStore: "Магазины",
      idCity: "Города",
      idRegion: "Регионы",
      district: "Районы",
    },
    product: {
      idProduct: "Товары",
    },
  };

  return labels[sectionKey]?.[filterKey] || filterKey;
};

export function FilterBadges() {
  const { filters, filterDate, filterTime } = useFiltersStore();

  const renderBadges = () => {
    const badges: JSX.Element[] = [];

    // 1. Сначала добавляем период (если есть)
    if (filterDate?.dateStart && filterDate?.dateEnd) {
      badges.push(
        <Badge key="date-range">
          {`Период: ${formatDate(
            filterDate.dateStart,
            "dd.MM.yyyy",
          )} - ${formatDate(filterDate.dateEnd, "dd.MM.yyyy")}`}
        </Badge>,
      );
    }

    // 2. Затем фильтры по времени
    if (filterTime?.timeStart) {
      badges.push(
        <Badge key="time-start">{`Время от: ${filterTime.timeStart}`}</Badge>,
      );
    }
    if (filterTime?.timeEnd) {
      badges.push(
        <Badge key="time-end">{`Время до: ${filterTime.timeEnd}`}</Badge>,
      );
    }

    // 3. Остальные фильтры с подсчетом количества
    Object.entries(filters).forEach(([sectionKey, sectionValue]) => {
      if (typeof sectionValue !== "object" || sectionValue === null) return;

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
      to={`/analytics/?open=true`}
      className="flex flex-row gap-2 flex-nowrap items-center"
    >
      {renderBadges()}
    </Link>
  );
}
