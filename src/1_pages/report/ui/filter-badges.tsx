import { Link } from "react-router";
import { Badge } from "@shared/ui/badge";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { JSX } from "react";
import { formatDate } from "date-fns";

const getFilterLabel = (sectionKey: string, filterKey: string): string => {
  const labels: Record<string, Record<string, string>> = {
    store: {
      idStore: "Магазины",
      idCity: "Города",
      idRegion: "Регионы",
      idManager: "Партнеры",
      storeCondition: "Состояние",
      ageGroup: "Возрастная группа",
      idLegalEntity: "Юр. лица",
      channel: "Каналы",
      district: "Районы",
    },
    product: {
      groupFranchise: "Структура продаж",
      ppProducts: "ПП-продукты",
      subDivisionProducts: "Подразделения",
      subGroups: "Подгруппы",
      subSubGroups: "Подподгруппы",
      typeProducts: "Типы товаров",
      teamProducts: "Команды",
      directionProducts: "Направления",
      groupsEconomist: "Группы экономиста",
      idGroupMain: "Основные группы",
      idProduct: "Товары",
      seasonalityProducts: "Сезонность",
      managerAuto: "Авто-менеджеры",
    },
    check: {
      tabNumber: "Сотрудники",
      containsBankQr: "QR банка",
      paymentClass: "Классы оплаты",
      shift: "Смены",
      cashBox: "Кассы",
      checkNumber: "Номера чеков",
      numberfield: "Числовые поля",
      type: "Типы чеков",
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
    onlineStore: {
      isIm: "Онлайн-заказы",
      imTypeOrder: "Типы заказов",
      imDeliveryMethod: "Способы доставки",
      imPaymentMethod: "Способы оплаты",
      imStatusOrder: "Статусы заказов",
      imReceiveInterval: "Интервалы получения",
      imPromo: "Промо",
    },
    // writeoff: {
    //   indicator: "Показатели списания",
    //   article: "Статьи списания",
    // },
  };

  return labels[sectionKey]?.[filterKey] || filterKey;
};

export function FilterBadges({ tab }: { tab: string }) {
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
        if (
          sectionKey === "loyal" &&
          (filterKey === "ageStart" || filterKey === "ageEnd")
        ) {
          badges.push(
            <Badge key={`${sectionKey}-${filterKey}`}>
              {`${getFilterLabel(sectionKey, filterKey)}: ${value}`}
            </Badge>,
          );
        } else {
          const count = Array.isArray(value) ? value.length : 1;
          badges.push(
            <Badge key={`${sectionKey}-${filterKey}`}>
              {`${getFilterLabel(sectionKey, filterKey)}: ${count}`}
            </Badge>,
          );
        }
      });
    });

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
