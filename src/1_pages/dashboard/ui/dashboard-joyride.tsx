import React, { useEffect, useState } from "react";
import { useTourProvider } from "@entities/lessons";
import { useNavigate } from "react-router";

interface DashboardJoyrideProps {
  children: React.ReactNode;
}

// Функция-помощник для создания контента шагов
const createStepContent = (title: string, description: string) => (
  <div>
    <h3
      style={{
        margin: "0 0 8px 0",
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--foreground)",
      }}
    >
      {title}
    </h3>
    <p
      style={{
        margin: "0",
        fontSize: "14px",
        color: "var(--muted-foreground)",
        lineHeight: "1.4",
      }}
    >
      {description}
    </p>
  </div>
);

// Данные для шагов тура
export const dashboardStepData = [
  {
    selector: "[data-testid='widget-grid']",
    title: "Аналитическая платформа",
    description:
      "Добро пожаловать в аналитическую платформу Статосфера! Здесь собраны ключевые метрики. Изучим основные виджеты.",
    position: "center" as const,
  },
  {
    selector: "[data-testid='weekly-revenue-widget']",
    title: "Настройка рабочего места",
    description:
      "Настройте дашборд под свои задачи. Перетаскивайте виджеты в удобном порядке для быстрого доступа к нужным метрикам.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='weekly-revenue-widget']",
    title: "Перетащите виджет",
    description:
      "Наведите курсор на виджет и перетащите его. Иконка перетаскивания в левом верхнем углу поможет вам.",
    position: "top" as const,
    hideNextButton: true, // Скрываем кнопку "Далее"
    action: "drag-widget", // Специальное действие для перетаскивания
  },
  {
    selector: "[data-testid='nps-widget']",
    title: "Общий NPS",
    description:
      "NPS показывает готовность покупателей рекомендовать наши магазины. Шкала от 0 до 100: промоутеры (90-100), нейтралы (70-89), критики (0-69).",
    position: "top" as const,
  },
  {
    selector: "[data-testid='nps-widget']",
    title: "Открыть NPS аналитику",
    description:
      "Нажмите на элемент для детальной NPS аналитики по городам, регионам и магазинам сети.",
    position: "top" as const,
    hideNextButton: true, // Скрываем кнопку "Далее"
    action: "open-nps-modal", // Специальное действие для открытия модалки
  },
  {
    selector: "[data-testid='nps-modal']",
    title: "NPS Аналитика",
    description:
      "Детальная NPS аналитика по городам, регионам и магазинам. Выявляйте проблемные зоны и успешные практики работы с покупателями.",
    position: "left" as const,
  },
  // Шаги для тура внутри модалки
  {
    selector: "[data-testid='nps-modal']",
    title: "Общая сводка NPS",
    description:
      "Вкладка 'Сводка' показывает общую статистику NPS. Видите динамику nps по месяцам и его значение",
    position: "left" as const,
  },
  {
    selector: "[data-testid='nps-tab-cities']",
    title: "NPS по городам",
    hideNextButton: true, // Скрываем кнопку "Далее"
    description:
      "Нажмите 'Города' для детализации NPS по каждому городу. Выявляйте города с высоким и низким уровнем удовлетворенности покупателей.",
    position: "bottom" as const,
  },
  {
    selector: "[data-testid='nps-modal']",
    title: "Данные по городам",
    description:
      "Детализация NPS по каждому городу. Выявляйте проблемные зоны и успешные практики работы с покупателями в разных городах.",
    position: "bottom" as const,
  },
  {
    selector: "[data-testid='nps-tab-regions']",
    title: "NPS по регионам",
    hideNextButton: true, // Скрываем кнопку "Далее"
    description:
      "Нажмите 'Регионы' для NPS по географическим регионам. Анализируйте региональные различия и планируйте локализованные кампании.",
    position: "bottom" as const,
  },
  {
    selector: "[data-testid='nps-modal']",
    title: "Данные по регионам",
    description:
      "Региональная аналитика NPS показывает показатели по географическим регионам. Планируйте локализованные кампании на основе региональных различий.",
    position: "left" as const,
  },
  {
    selector: "[data-testid='nps-tab-stores']",
    title: "NPS по магазинам",
    hideNextButton: true, // Скрываем кнопку "Далее"
    description:
      "Нажмите 'Магазины' для детальной информации по каждому магазину. Выявляйте лучшие практики и проблемные точки.",
    position: "bottom" as const,
  },
  {
    selector: "[data-testid='nps-modal']",
    title: "Данные по магазинам",
    description:
      "Детальная информация по каждому магазину сети. Выявляйте лучшие практики успешных магазинов и проблемные точки для улучшения.",
    position: "bottom" as const,
  },
  {
    selector: "[data-testid='nps-modal-close']",
    title: "Закрыть модальное окно",
    hideNextButton: true, // Скрываем кнопку "Далее"
    description:
      "Закройте модальное окно крестиком для продолжения изучения других виджетов дашборда.",
    position: "left" as const,
  },
  {
    selector: "[data-testid='channel-revenue-widget']",
    title: "Распределение по каналам продаж",
    description:
      "Распределение выручки по каналам: фудтрак, вендинг, микромаркет, инвестиционная франшиза, франшиза в аренду, фрс. Определяйте приоритетные каналы для развития.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='margin-widget']",
    title: "Маржа",
    description:
      "Маржа — разность между выручкой и себестоимостью продуктов. Ключевой показатель прибыльности магазинов сети.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='markup-widget']",
    title: "Наценка",
    description:
      "Наценка — процент надбавки к себестоимости продуктов. Контролируйте ценообразование и обеспечивайте прибыльность.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='writeoffs-indicator-widget']",
    title: "Списания (показатель)",
    description:
      "Объем списанных продуктов из-за порчи или истечения срока годности. Низкий показатель — хорошее управление запасами.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='writeoffs-households-widget']",
    title: "Списания (ХОЗ-ы)",
    description:
      "Списания продуктов для внутренних нужд: коробки, стаканчики и другие хозяйственные товары. Контроль предотвращает злоупотребления.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='sales-structure-widget']",
    title: "Структура продаж за 6 месяцев",
    description:
      "Структура продаж по категориям продуктов за полгода. Анализируйте сезонность и планируйте ассортиментную политику.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='month-revenue-widget']",
    title: "Выручка (за текущий месяц)",
    description:
      "Месячная выручка магазинов сети в сравнении с предыдущими периодами. Ключевой KPI для оценки эффективности работы.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='month-checks-widget']",
    title: "Чеки (за текущий месяц)",
    description:
      "Количество чеков за месяц показывает активность покупателей. Больше чеков — больше возможностей для продаж дополнительных продуктов.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='average-check-widget']",
    title: "Средний чек (за текущий месяц)",
    description:
      "Средняя сумма покупки покупателя. Рост среднего чека напрямую влияет на прибыльность магазинов сети.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='writeoffs-leaders-widget']",
    title: "Аутсайдеры по списаниям",
    description:
      "Магазины с наибольшими потерями от списаний. Оптимизируйте  закупки и управление запасами на основе этих данных.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='loyalty-widget']",
    title: "Применение карт лояльности",
    description:
      "Процент применения карт лояльности в продажах. Высокий процент способствует удержанию покупателей и увеличению их ценности.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='im-revenue-widget']",
    title: "Выручка интернет магазина",
    description:
      "Доходы от онлайн-продаж продуктов. Важный канал для расширения клиентской базы сети.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='leader-im-sales-widget']",
    title: "Лидер интернет продаж",
    description:
      "Лучший магазин по онлайн-продажам продуктов. Мотивирует команду и выявляет успешные практики работы с покупателями в интернет-магазине.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='hours-revenue-widget']",
    title: "Выручка по часам (сегодня)",
    description:
      "Распределение доходов магазинов в течение дня. Оптимизируйте график работы персонала и планируйте ресурсы в пиковые часы работы магазина.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='plan-percent-widget']",
    title: "Процент выполнения плана",
    description:
      "Процент выполнения плана выручки, чеков и среднего чека магазинов сети. Ключевой показатель для оценки эффективности работы управляющих и команды. Хорошим показателем считается 100% выполнение плана.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='writeoffs-groups-widget']",
    title: "Аутсайдеры по группам списаний",
    description:
      "Категории продуктов с наибольшими потерями от списаний. Выявляйте проблемные зоны в управлении ассортиментом.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='today-revenue-widget']",
    title: "Выручка (сегодня)",
    description:
      "Выручка магазинов сети за сегодня. Оперативный показатель для ежедневного контроля.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='today-checks-widget']",
    title: "Чеки (сегодня)",
    description:
      "Количество чеков за сегодня показывает активность покупателей. Оценивайте загруженность и эффективность работы магазинов.",
    position: "top" as const,
  },
  {
    selector: "[data-testid='widget-anti-loyal-top']",
    title: "Анти топ по применению карт лояльности",
    description:
      "Магазины с низким процентом использования программы лояльности. Выявляйте области для обучения и улучшения работы с покупателями.",
    position: "top" as const,
  },
];

export const DashboardJoyride: React.FC<DashboardJoyrideProps> = ({
  children,
}) => {
  const { startTour, isActive, nextStep, currentStep, stopTour } =
    useTourProvider();
  const [waitingForModal, setWaitingForModal] = useState(false);
  const [modalTourActive, setModalTourActive] = useState(false);
  const navigate = useNavigate();
  // Создаем шаги из данных
  const steps = dashboardStepData.map((step) => ({
    selector: step.selector,
    content: createStepContent(step.title, step.description),
    position: step.position,
    ...(step.action && { action: step.action }),
    ...(step.hideNextButton && { hideNextButton: step.hideNextButton }),
  }));

  // Автозапуск тура при переходе с урока
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromLesson = urlParams.get("fromLesson");

    if (fromLesson === "true" && !isActive) {
      // Убираем параметр из URL
      const url = new URL(window.location.href);
      url.searchParams.delete("fromLesson");
      window.history.replaceState({}, "", url.toString());

      // Запускаем тур с задержкой для загрузки виджетов
      setTimeout(() => {
        startTour(1, steps);
      }, 1500);
    }
  }, [isActive, startTour, steps]);

  // Специфичная для дашборда логика интерактивных шагов
  useEffect(() => {
    if (!isActive) return;

    const openModalStepIndex = dashboardStepData.findIndex(
      (step) => step.action === "open-nps-modal",
    );

    if (currentStep <= openModalStepIndex) {
      const closeButton = document.querySelector(
        "[data-testid='nps-modal-close']",
      );
      if (closeButton) {
        (closeButton as HTMLElement).click();
        setModalTourActive(false); // Сбрасываем флаг, что мы в туре модалки
        setWaitingForModal(false); // Сбрасываем ожидание
      }
    }

    // Если это шаг с элементом NPS
    const handleNpsWidgetClick = () => {
      if (currentStep === openModalStepIndex) {
        setWaitingForModal(true);
      } else {
        stopTour();
        setTimeout(() => {
          navigate("/lessons");
        }, 100);
      }
    };

    const button = document.querySelector("[data-testid='nps-widget']");
    if (button) {
      button.addEventListener("click", handleNpsWidgetClick);
      return () => button.removeEventListener("click", handleNpsWidgetClick);
    }
  }, [isActive, currentStep]);

  // Отслеживание кликов по табам для автоматического перехода
  useEffect(() => {
    if (!isActive || !modalTourActive) return;

    const citiesTab = document.querySelector("[data-testid='nps-tab-cities']");
    const regionsTab = document.querySelector(
      "[data-testid='nps-tab-regions']",
    );
    const storesTab = document.querySelector("[data-testid='nps-tab-stores']");

    if (citiesTab) {
      citiesTab.addEventListener("click", () => nextStep());
    }
    if (regionsTab) {
      regionsTab.addEventListener("click", () => nextStep());
    }
    if (storesTab) {
      storesTab.addEventListener("click", () => nextStep());
    }

    return () => {
      if (citiesTab) {
        citiesTab.removeEventListener("click", () => nextStep());
      }
      if (regionsTab) {
        regionsTab.removeEventListener("click", () => nextStep());
      }
      if (storesTab) {
        storesTab.removeEventListener("click", () => nextStep());
      }
    };
  }, [isActive, modalTourActive, nextStep]);

  // Отслеживание открытия модалки NPS
  useEffect(() => {
    if (!waitingForModal) return;

    const checkModal = () => {
      const modal = document.querySelector("[data-testid='nps-modal']");
      if (modal) {
        setWaitingForModal(false);
        setModalTourActive(true);

        // Небольшая задержка для анимации открытия модалки
        setTimeout(() => {
          nextStep();
        }, 500);
      }
    };

    // Проверяем каждые 100мс
    const interval = setInterval(checkModal, 100);

    return () => {
      clearInterval(interval);
    };
  }, [waitingForModal, nextStep]);

  // Отслеживание drag and drop виджетов
  useEffect(() => {
    if (!isActive) return;

    let dragDetected = false;
    let timeoutId: NodeJS.Timeout;

    // Создаем MutationObserver для отслеживания изменений в DOM
    const observer = new MutationObserver((mutations) => {
      // Проверяем только изменения порядка дочерних элементов
      const hasChildListChanges = mutations.some(
        (mutation) =>
          mutation.type === "childList" &&
          (mutation.target as Element).closest('[data-testid="widget-grid"]'),
      );

      if (hasChildListChanges && !dragDetected) {
        dragDetected = true;

        // Дебаунс - ждем 500мс чтобы убедиться что это именно перетаскивание
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          nextStep();
          dragDetected = false;
        }, 500);
      }
    });

    // Наблюдаем только за изменениями дочерних элементов
    const widgetGrid = document.querySelector('[data-testid="widget-grid"]');
    if (widgetGrid) {
      observer.observe(widgetGrid, {
        childList: true,
        subtree: false, // Только прямые дочерние элементы
        attributes: false, // Не отслеживаем атрибуты
      });
    }

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [isActive, nextStep]);

  // Отслеживание закрытия модалки
  useEffect(() => {
    if (!modalTourActive) return;

    const checkModalClosed = () => {
      const modal = document.querySelector("[data-testid='nps-modal']");
      if (!modal) {
        setModalTourActive(false);

        setTimeout(() => {
          nextStep();
        }, 300);
      }
    };

    const interval = setInterval(checkModalClosed, 100);
    return () => clearInterval(interval);
  }, [modalTourActive, nextStep]);

  return <>{children}</>;
};
