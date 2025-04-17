import { Link } from "react-router";
import { Badge } from "@shared/ui/badge";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { JSX } from "react";
import { formatDate } from "date-fns";

// Вспомогательные функции для форматирования
const formatFilterValue = (value: any): string => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "boolean") {
    return value ? "Да" : "Нет";
  }
  return String(value);
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
      idStore: "ID магазина",
      idCity: "Город",
      idRegion: "Регион",
      idManager: "Менеджер",
      storeCondition: "Состояние",
      ageGroup: "Возрастная группа",
      idLegalEntity: "Юр. лицо",
      channel: "Канал",
      district: "Район",
    },
    // Добавьте другие секции по аналогии
  };

  return labels[sectionKey]?.[filterKey] || filterKey;
};

export function FilterBadges({ tab }: { tab: string }) {
  const { filters, filterDate, filterTime } = useFiltersStore();

  const renderBadges = () => {
    const badges: JSX.Element[] = [];

    // 1. Обработка основных фильтров
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
      if (sectionKey === "store") {
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
                value
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
      className="flex flex-row gap-2 flex-wrap items-center"
    >
      {renderBadges()}
    </Link>
  );
}
