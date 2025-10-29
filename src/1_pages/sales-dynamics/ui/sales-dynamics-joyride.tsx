import React, { useEffect, useState } from "react";
import { useTourProvider } from "@entities/lessons";
import { useDropdownStore } from "@features/sales-dynamics/graph-date/ui/graph-date";
import { useDropdownTourStore } from "./dropdown-tour-store";
import { useShopsFilterTourStore } from "./shops-filter-tour-store";

interface SalesDynamicsJoyrideProps {
  children: React.ReactNode;
  onTourComplete?: () => void;
}

// Массив шагов для тура
export const salesDynamicsSteps = [
  {
    selector: '[data-testid="sales-dynamics-page"]',
    content:
      "Добро пожаловать на страницу Динамика продаж! Здесь вы можете анализировать продажи по различным параметрам.",
    position: "center" as const,
  },
  {
    selector: '[data-testid="days-filter"]',
    content:
      "Фильтр по дням. Выберите период для анализа. Нажмите на этот фильтр, чтобы открыть календарь и выбрать нужные даты.",
    position: "bottom" as const,
    action: "open-days-filter",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="days-filter-modal"]',
    content:
      "Выбор даты. Кликните по любой дате в календаре или используйте предустановленные периоды для быстрого выбора.",
    position: "left" as const,
    action: "select-date",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="nps-modal-close"]',
    content:
      "Закрытие модального окна. Нажмите на кнопку закрытия или кликните вне модального окна, чтобы закрыть его.",
    position: "left" as const,
    action: "close-days-filter",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="graph-date-filter"]',
    content:
      "Настройте группировку данных: по дням, неделям или месяцам. Это влияет на детализацию графиков.",
    position: "bottom" as const,
    action: "select-graph-date",
    hideNextButton: true,
  },
  {
    selector: "[data-radix-menu-content]",
    content:
      "Выберите группировку данных. Рекомендуем выбрать 'Помесячно' для лучшей визуализации трендов.",
    position: "left" as const,
    action: "select-dropdown-option",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="shops-filter"]',
    content:
      "Фильтр по магазинам. Выберите конкретные магазины или регионы для анализа.",
    position: "bottom" as const,
    action: "open-shops-filter",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="shops-filter-modal"]',
    content:
      "Настройка фильтра магазинов. Выберите каналы продаж и регионы для детального анализа.",
    position: "left" as const,
    action: "select-shops",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="shops-filter-modal"] [data-testid="status-open"]',
    content:
      "Выберите статус 'Открытые' для фильтрации только работающих магазинов.",
    position: "left" as const,
    action: "select-status-open",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="region-select"]',
    content:
      "Выбор регионов. Используйте мультиселект для выбора нескольких регионов одновременно.",
    position: "bottom" as const,
    action: "select-regions",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="lfl-filter"]',
    content:
      "Переключатель LFL (Like-for-Like). Включите для сравнения с аналогичным периодом прошлого года.",
    position: "bottom" as const,
    action: "toggle-lfl",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="download-button"]',
    content:
      "Скачать данные. Экспортируйте текущие данные в Excel для дальнейшего анализа.",
    position: "bottom" as const,
    action: "download-data",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="add-indicators"]',
    content:
      "Добавить показатели. Настройте отображение дополнительных метрик в таблице.",
    position: "bottom" as const,
    action: "open-indicators",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="indicators-modal"]',
    content:
      "Выбор показателей. Отметьте нужные метрики для отображения в таблице.",
    position: "center" as const,
    action: "select-indicators",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="sales-select"]',
    content:
      "Выбор метрик для графиков. Выберите показатели, которые будут отображаться на графиках.",
    position: "bottom" as const,
    action: "select-sales-metrics",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="search-input"]',
    content:
      "Поиск по таблице. Введите название магазина или региона для быстрого поиска.",
    position: "bottom" as const,
    action: "search-table",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="sales-dynamics-table"]',
    content:
      "Таблица с данными. Здесь отображаются все выбранные показатели. Кликните на строку для детального просмотра.",
    position: "top" as const,
    action: "select-table-row",
    hideNextButton: true,
  },
  {
    selector: '[data-testid="sales-dynamics-chart"]',
    content:
      "График динамики продаж. Визуализация выбранных метрик за выбранный период.",
    position: "top" as const,
  },
];

export const SalesDynamicsJoyride: React.FC<SalesDynamicsJoyrideProps> = ({
  children,
  onTourComplete,
}) => {
  const { startTour, isActive, nextStep } = useTourProvider();
  const steps = salesDynamicsSteps;
  const [waitingForModal, setWaitingForModal] = useState(false);
  const [modalTourActive, setModalTourActive] = useState(false);
  const { isOpen: isDropdownOpen } = useDropdownStore();
  const { isWaitingForDropdown, reset } = useDropdownTourStore();
  const { isWaitingForShopsFilter, reset: resetShopsFilter } =
    useShopsFilterTourStore();

  // Обработка клика по кнопке фильтра дней
  useEffect(() => {
    if (!isActive) return;

    const handleDaysFilterClick = () => {
      setWaitingForModal(true);
    };

    const daysFilterButton = document.querySelector(
      '[data-testid="days-filter"]',
    );
    if (daysFilterButton) {
      daysFilterButton.addEventListener("click", handleDaysFilterClick);
    }

    return () => {
      if (daysFilterButton) {
        daysFilterButton.removeEventListener("click", handleDaysFilterClick);
      }
    };
  }, [isActive]);

  // Простое отслеживание фильтра магазинов через стор
  useEffect(() => {
    if (!isWaitingForShopsFilter) return;

    const checkShopsModal = () => {
      const shopsModal = document.querySelector(
        '[data-testid="shops-filter-modal"]',
      );
      if (shopsModal) {
        resetShopsFilter(); // Сбрасываем флаг ожидания
        setTimeout(() => nextStep(), 500);
      }
    };

    const interval = setInterval(checkShopsModal, 100);
    return () => clearInterval(interval);
  }, [isWaitingForShopsFilter, nextStep, resetShopsFilter]);

  // Отслеживание клика по статусу "Открытые"
  useEffect(() => {
    if (!isActive) return;

    const handleStatusOpenClick = () => {
      setTimeout(() => nextStep(), 500);
    };

    const statusOpenButton = document.querySelector(
      '[data-testid="status-open"]',
    );
    if (statusOpenButton) {
      statusOpenButton.addEventListener("click", handleStatusOpenClick);
    }

    return () => {
      if (statusOpenButton) {
        statusOpenButton.removeEventListener("click", handleStatusOpenClick);
      }
    };
  }, [isActive, nextStep]);

  useEffect(() => {
    if (!isWaitingForDropdown) return;

    if (isDropdownOpen) {
      reset(); // Сбрасываем флаг ожидания
      setTimeout(() => nextStep(), 500);
    }
  }, [isWaitingForDropdown, isDropdownOpen, nextStep, isActive, reset]);

  // Отслеживание выбора опции в дропдауне
  useEffect(() => {
    if (!isActive || !isDropdownOpen) return;

    const handleDropdownSelection = () => {
      setTimeout(() => nextStep(), 500);
    };

    // Слушаем клики по опциям дропдауна только когда он открыт
    const dropdownOptions = document.querySelectorAll(
      '[data-radix-menu-content] [role="menuitem"]',
    );

    dropdownOptions.forEach((option) => {
      option.addEventListener("click", handleDropdownSelection);
    });

    return () => {
      dropdownOptions.forEach((option) => {
        option.removeEventListener("click", handleDropdownSelection);
      });
    };
  }, [isActive, isDropdownOpen, nextStep]);

  // Отслеживание открытия модалки дней
  useEffect(() => {
    if (!waitingForModal) return;

    const checkModal = () => {
      const modal = document.querySelector('[data-testid="days-filter-modal"]');
      if (modal) {
        setWaitingForModal(false);
        setModalTourActive(true);
        setTimeout(() => nextStep(), 500);
      }
    };

    const interval = setInterval(checkModal, 100);
    return () => clearInterval(interval);
  }, [waitingForModal, nextStep]);

  // Отслеживание выбора даты
  useEffect(() => {
    if (!modalTourActive) return;

    const handleDateSelection = () => {
      setTimeout(() => nextStep(), 500);
    };

    // Слушаем клики по календарю
    const calendarDays = document.querySelectorAll(".rdp-day");
    const presetButtons = document.querySelectorAll(
      '[data-testid="days-filter-modal"] button[type="button"]',
    );

    calendarDays.forEach((day) => {
      day.addEventListener("click", handleDateSelection);
    });

    presetButtons.forEach((button) => {
      button.addEventListener("click", handleDateSelection);
    });

    return () => {
      calendarDays.forEach((day) => {
        day.removeEventListener("click", handleDateSelection);
      });
      presetButtons.forEach((button) => {
        button.removeEventListener("click", handleDateSelection);
      });
    };
  }, [modalTourActive, nextStep]);

  // Отслеживание закрытия модалки дней
  useEffect(() => {
    if (!modalTourActive) return;

    const checkModalClosed = () => {
      const modal = document.querySelector('[data-testid="days-filter-modal"]');
      if (!modal) {
        setModalTourActive(false);
        setTimeout(() => nextStep(), 300);
      }
    };

    const interval = setInterval(checkModalClosed, 100);
    return () => clearInterval(interval);
  }, [modalTourActive, nextStep]);

  // Автозапуск тура при переходе с урока
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromLesson = urlParams.get("fromLesson");

    if (fromLesson === "true" && !isActive) {
      // Убираем параметр из URL
      const url = new URL(window.location.href);
      url.searchParams.delete("fromLesson");
      window.history.replaceState({}, "", url.toString());

      // Запускаем тур с задержкой для загрузки элементов
      setTimeout(() => {
        startTour(2, steps);
      }, 1500);
    }
  }, [isActive, startTour, steps]);

  // Вызываем onTourComplete при завершении тура
  useEffect(() => {
    if (!isActive && onTourComplete) {
      onTourComplete();
    }
  }, [isActive, onTourComplete]);

  return <>{children}</>;
};
