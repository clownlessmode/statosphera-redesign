import React, { useEffect, useState } from "react";
import { useTourProvider } from "@entities/lessons";
import { useDropdownStore } from "@features/sales-dynamics/graph-date/ui/graph-date";

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
    position: "center" as const,
    action: "select-shops",
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
  const { isActive, nextStep } = useTourProvider();
  const steps = salesDynamicsSteps;
  const [waitingForModal, setWaitingForModal] = useState(false);
  const [modalTourActive, setModalTourActive] = useState(false);
  const [waitingForDropdown, setWaitingForDropdown] = useState(false);
  const { isOpen: isDropdownOpen } = useDropdownStore();

  // Логируем состояние тура
  useEffect(() => {
    // Получаем текущий шаг тура
    const currentStepElement = document.querySelector('[data-tour="true"]');
    const currentStep = currentStepElement
      ? parseInt(currentStepElement.getAttribute("data-current-step") || "0")
      : -1;

    console.log("🎭 [TOUR STATE] Tour state changed:", {
      isActive,
      stepsLength: steps.length,
      currentStep,
      waitingForModal,
      modalTourActive,
      waitingForDropdown,
    });

    // Дополнительная отладка для дропдауна
    if (waitingForDropdown) {
      console.log(
        "🔍 [DROPDOWN DEBUG] waitingForDropdown is true, checking dropdown state:",
      );
      console.log("🔍 [DROPDOWN DEBUG] Current dropdown store state:", {
        isDropdownOpen,
      });
    }
  }, [
    isActive,
    steps.length,
    waitingForModal,
    modalTourActive,
    waitingForDropdown,
  ]);

  // Обработка клика по кнопке фильтра дней
  useEffect(() => {
    if (!isActive) return;

    const handleDaysFilterClick = () => {
      console.log("🔘 [DAYS FILTER] Days filter button clicked");
      setWaitingForModal(true);
    };

    const daysFilterButton = document.querySelector(
      '[data-testid="days-filter"]',
    );
    if (daysFilterButton) {
      console.log(
        "🔘 [DAYS FILTER] Adding click listener to days filter button",
      );
      daysFilterButton.addEventListener("click", handleDaysFilterClick);
    }

    return () => {
      if (daysFilterButton) {
        daysFilterButton.removeEventListener("click", handleDaysFilterClick);
      }
    };
  }, [isActive]);

  // Обработка клика по дропдауну группировки данных
  useEffect(() => {
    if (!isActive) return;

    const handleGraphDateFilterClick = (event: Event) => {
      console.log("🔥 [GRAPH DATE FILTER] CLICK EVENT TRIGGERED!", event);
      console.log("📊 [GRAPH DATE FILTER] Graph date filter button clicked");
      console.log("📊 [GRAPH DATE FILTER] Current tour state:", {
        isActive,
        waitingForDropdown,
      });

      // Проверяем, находимся ли мы на шаге с дропдауном (шаг 4 - группировка данных)
      const currentStepElement = document.querySelector('[data-tour="true"]');
      if (currentStepElement) {
        const currentStep = parseInt(
          currentStepElement.getAttribute("data-current-step") || "0",
        );
        console.log("📊 [GRAPH DATE FILTER] Current step:", currentStep);

        // Обрабатываем клик только на шаге 4 (группировка данных)
        if (currentStep === 4) {
          console.log(
            "📊 [GRAPH DATE FILTER] Graph date filter button clicked on correct step",
          );
          console.log(
            "📊 [GRAPH DATE FILTER] Setting waitingForDropdown to true",
          );
          setWaitingForDropdown(true);
        } else {
          console.log(
            "📊 [GRAPH DATE FILTER] Click ignored - not on correct step",
          );
        }
      }
    };

    const graphDateFilterButton = document.querySelector(
      '[data-testid="graph-date-filter"]',
    );
    if (graphDateFilterButton) {
      console.log(
        "📊 [GRAPH DATE FILTER] Adding click listener to graph date filter button",
      );
      console.log(
        "📊 [GRAPH DATE FILTER] Button element:",
        graphDateFilterButton,
      );
      graphDateFilterButton.addEventListener(
        "click",
        handleGraphDateFilterClick,
      );
    } else {
      console.log("❌ [GRAPH DATE FILTER] Button not found!");
    }

    return () => {
      if (graphDateFilterButton) {
        graphDateFilterButton.removeEventListener(
          "click",
          handleGraphDateFilterClick,
        );
      }
    };
  }, [isActive]);

  // Отслеживание открытия модалки дней
  useEffect(() => {
    if (!waitingForModal) return;

    const checkModal = () => {
      const modal = document.querySelector('[data-testid="days-filter-modal"]');
      if (modal) {
        console.log("✅ [DAYS MODAL] Modal opened, advancing to next step");
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
      console.log("✅ [DATE SELECTION] Date selected, advancing to next step");
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
        console.log("✅ [MODAL CLOSE] Modal closed, advancing to next step");
        setModalTourActive(false);
        setTimeout(() => nextStep(), 300);
      }
    };

    const interval = setInterval(checkModalClosed, 100);
    return () => clearInterval(interval);
  }, [modalTourActive, nextStep]);

  // Отслеживание открытия дропдауна группировки данных
  useEffect(() => {
    if (!waitingForDropdown) return;

    console.log(
      "🔍 [DROPDOWN] Starting to monitor dropdown opening, waitingForDropdown:",
      waitingForDropdown,
    );
    console.log("🔍 [DROPDOWN] Current dropdown state:", { isDropdownOpen });

    if (isDropdownOpen) {
      console.log("✅ [DROPDOWN] Dropdown opened, advancing to next step");
      setWaitingForDropdown(false);
      setTimeout(() => nextStep(), 500);
    }
  }, [waitingForDropdown, isDropdownOpen, nextStep]);

  // Отслеживание выбора опции в дропдауне
  useEffect(() => {
    if (!waitingForDropdown || !isDropdownOpen) return;

    const handleDropdownSelection = () => {
      console.log(
        "✅ [DROPDOWN SELECTION] Option selected, advancing to next step",
      );
      setWaitingForDropdown(false);
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
  }, [waitingForDropdown, isDropdownOpen, nextStep]);

  // Автоматический запуск тура убран - тур теперь запускается только по требованию пользователя

  // Вызываем onTourComplete при завершении тура
  useEffect(() => {
    if (!isActive && onTourComplete) {
      onTourComplete();
    }
  }, [isActive, onTourComplete]);

  return <>{children}</>;
};
