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
      idStore: "Магазин",
      idCity: "Город",
      idRegion: "Регион",
      idManager: "Менеджер",
      storeCondition: "Состояние",
      ageGroup: "Возрастная группа",
      idLegalEntity: "Юр. лицо",
      channel: "Канал",
      district: "Район",
    },
    product: {
      groupFranchise: "Франшиза",
      ppProducts: "PP-продукты",
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
      className="flex flex-row gap-2 flex-nowrap items-center"
    >
      {renderBadges()}
    </Link>
  );
}
