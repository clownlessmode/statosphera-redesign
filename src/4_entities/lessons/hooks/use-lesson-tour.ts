import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import { useCallback, useEffect, useRef } from "react";
import { useLessonProgress } from "./use-lesson-progress";

// Функция для получения CSS переменной как hex цвета
function getCSSVariableAsHex(variableName: string): string {
  if (typeof window === "undefined") return "#000000";

  // Принудительно обновляем computed styles
  const root = document.documentElement;

  // Добавляем временный класс для принудительного обновления
  const tempClass = `temp-${Date.now()}`;
  root.classList.add(tempClass);
  void root.offsetHeight; // trigger reflow
  root.classList.remove(tempClass);

  const value = getComputedStyle(root).getPropertyValue(variableName).trim();

  // Если это HSL значение, конвертируем в hex
  if (value.startsWith("hsl(")) {
    return hslToHex(value);
  }

  return value;
}

// Функция для конвертации HSL в hex
function hslToHex(hsl: string): string {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return "#000000";

  const [, h, s, l] = match.map(Number);

  const c = ((1 - Math.abs((2 * l) / 100 - 1)) * s) / 100;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - c / 2;

  let r, g, b;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// Добавляем стили прямо в код
const injectStyles = () => {
  const styleId = "statosphera-lesson-styles";
  if (document.getElementById(styleId)) return;

  // Получаем цвета из CSS переменных в hex формате
  const background = getCSSVariableAsHex("--background");
  const foreground = getCSSVariableAsHex("--foreground");
  const border = getCSSVariableAsHex("--border");
  const mutedForeground = getCSSVariableAsHex("--muted-foreground");
  const primary = getCSSVariableAsHex("--primary");
  const primaryForeground = getCSSVariableAsHex("--primary-foreground");

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    /* Кастомизация поповера */
    .shepherd-element.statosphera-lesson-popover {
      background-color: ${background} !important;
      color: ${foreground} !important;
      border: 1px solid ${border} !important;
      border-radius: 0.5rem !important;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
      max-width: 400px !important;
    }
    
    .shepherd-element.statosphera-lesson-popover .shepherd-header {
      font-size: 1.125rem !important;
      font-weight: 600 !important;
      padding: 1.5rem 1.5rem 0.75rem !important;
      background: transparent !important;
      color: ${foreground} !important;
    }

    .shepherd-element.statosphera-lesson-popover .shepherd-title {
      color: ${foreground} !important;
    }
    
    .shepherd-element.statosphera-lesson-popover .shepherd-text {
      color: ${mutedForeground} !important;
      font-size: 0.875rem !important;
      line-height: 1.5 !important;
      padding: 0 1.5rem 1rem !important;
    }
    
    .shepherd-element.statosphera-lesson-popover .shepherd-footer {
      padding: 1rem 1.5rem !important;
      border-top: 1px solid ${border} !important;
      gap: 0.5rem !important;
    }
    
    .shepherd-element.statosphera-lesson-popover .shepherd-button {
      padding: 0.5rem 1rem !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      border-radius: 0.375rem !important;
      transition: all 0.2s !important;
    }
    
    .shepherd-element.statosphera-lesson-popover .shepherd-button-primary {
      background: ${primary} !important;
      color: ${primaryForeground} !important;
    }
    
    .shepherd-element.statosphera-lesson-popover .shepherd-button-secondary {
      background: transparent !important;
      color: ${foreground} !important;
      border: 1px solid ${border} !important;
    }
    
    /* Стилизация стрелочки - все возможные селекторы */
    .shepherd-element.statosphera-lesson-popover .shepherd-arrow,
    .shepherd-element.statosphera-lesson-popover[data-popper-placement^="top"] .shepherd-arrow,
    .shepherd-element.statosphera-lesson-popover[data-popper-placement^="bottom"] .shepherd-arrow,
    .shepherd-element.statosphera-lesson-popover[data-popper-placement^="left"] .shepherd-arrow,
    .shepherd-element.statosphera-lesson-popover[data-popper-placement^="right"] .shepherd-arrow {
      border-color: ${border} !important;
    }
    
    .shepherd-element.statosphera-lesson-popover .shepherd-arrow:before,
    .shepherd-element.statosphera-lesson-popover[data-popper-placement^="top"] .shepherd-arrow:before,
    .shepherd-element.statosphera-lesson-popover[data-popper-placement^="bottom"] .shepherd-arrow:before,
    .shepherd-element.statosphera-lesson-popover[data-popper-placement^="left"] .shepherd-arrow:before,
    .shepherd-element.statosphera-lesson-popover[data-popper-placement^="right"] .shepherd-arrow:before {
      background-color: ${background} !important;
      border-color: ${background} !important;
    }
    
    /* Дополнительные селекторы для перезаписи стандартных стилей */
    .shepherd-element.shepherd-has-title.statosphera-lesson-popover .shepherd-arrow:before,
    .shepherd-element.shepherd-has-title.statosphera-lesson-popover[data-popper-placement^="top"] .shepherd-arrow:before,
    .shepherd-element.shepherd-has-title.statosphera-lesson-popover[data-popper-placement^="bottom"] .shepherd-arrow:before,
    .shepherd-element.shepherd-has-title.statosphera-lesson-popover[data-popper-placement^="left"] .shepherd-arrow:before,
    .shepherd-element.shepherd-has-title.statosphera-lesson-popover[data-popper-placement^="right"] .shepherd-arrow:before {
      background-color: ${background} !important;
      border-color: ${background} !important;
    }
    
    /* Затемнение фона */
    .shepherd-modal-overlay-container {
      background-color: rgba(0, 0, 0, 0.5) !important;
    }
  `;
  document.head.appendChild(style);
};

export interface LessonTourConfig {
  lessonId: string;
  steps: any[];
  onComplete?: () => void;
  onDestroy?: () => void;
  config?: any;
}

export const useLessonTour = () => {
  const shepherdRef = useRef<any>(null);
  const completedRef = useRef(false);
  const currentStepRef = useRef<number>(0);
  const dragTrackingRef = useRef<{
    isTracking: boolean;
    initialOrder: string[];
    currentStep: number;
  }>({
    isTracking: false,
    initialOrder: [],
    currentStep: 0,
  });
  const {
    updateLessonProgress,
    completeLesson,
    getLessonProgress,
    startLesson,
  } = useLessonProgress();

  // Функция для начала отслеживания drag операций
  const startDragTracking = useCallback(() => {
    console.log("🎯 Начинаем отслеживание drag операций");
    dragTrackingRef.current.isTracking = true;
    dragTrackingRef.current.currentStep = currentStepRef.current;

    // Получаем текущий порядок виджетов из localStorage
    const savedLayout = localStorage.getItem("dashboard-layout");
    if (savedLayout) {
      try {
        dragTrackingRef.current.initialOrder = JSON.parse(savedLayout);
      } catch (error) {
        console.error("Ошибка при загрузке layout:", error);
        dragTrackingRef.current.initialOrder = [];
      }
    }

    // Добавляем обработчик для отслеживания изменений в localStorage
    const checkLayoutChange = () => {
      if (!dragTrackingRef.current.isTracking) return;

      const currentLayout = localStorage.getItem("dashboard-layout");
      if (currentLayout) {
        try {
          const currentOrder = JSON.parse(currentLayout);
          const initialOrder = dragTrackingRef.current.initialOrder;

          // Проверяем, изменился ли порядок
          if (JSON.stringify(currentOrder) !== JSON.stringify(initialOrder)) {
            console.log("🎯 Обнаружено изменение порядка виджетов!");
            console.log("Было:", initialOrder);
            console.log("Стало:", currentOrder);

            // Завершаем отслеживание
            dragTrackingRef.current.isTracking = false;

            // Переходим к следующему шагу
            setTimeout(() => {
              if (shepherdRef.current) {
                shepherdRef.current.next();
              }
            }, 500);
          }
        } catch (error) {
          console.error("Ошибка при проверке layout:", error);
        }
      }
    };

    // Проверяем изменения каждые 500ms
    const intervalId = setInterval(checkLayoutChange, 500);

    // Очищаем интервал через 30 секунд (таймаут)
    setTimeout(() => {
      clearInterval(intervalId);
      if (dragTrackingRef.current.isTracking) {
        console.log("🎯 Таймаут отслеживания drag операций");
        dragTrackingRef.current.isTracking = false;
      }
    }, 30000);
  }, []);

  const startTour = useCallback(
    (tourConfig: LessonTourConfig) => {
      console.log("🎯 startTour вызван!");
      // Удаляем старые стили и инжектим новые (для обновления цветов)
      const oldStyle = document.getElementById("statosphera-lesson-styles");
      if (oldStyle) {
        oldStyle.remove();
      }
      injectStyles();

      // Если тур уже запущен, останавливаем его
      if (shepherdRef.current) {
        shepherdRef.current.complete();
      }

      // Сбрасываем флаг завершения
      completedRef.current = false;

      // Создаем новый экземпляр shepherd tour
      const shepherdInstance = new Shepherd.Tour({
        useModalOverlay: true,
        modalContainer: document.body,
        defaultStepOptions: {
          classes: "statosphera-lesson-popover",
          scrollTo: true,
          cancelIcon: {
            enabled: true,
            label: "Закрыть",
          },
          modalOverlayOpeningPadding: 20,
          modalOverlayOpeningRadius: 8,
          scrollToHandler: (element) => {
            console.log("🎯 Прокручиваем к элементу:", element);

            // Временно разрешаем скролл для прокрутки к элементу
            document.body.style.overflow = "auto";

            // Получаем текущую позицию элемента
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.pageYOffset;
            const targetPosition = elementTop - 80; // Отступ 80px от верха

            // Плавная прокрутка к нужной позиции
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });

            // Снова блокируем скролл после прокрутки
            setTimeout(() => {
              document.body.style.overflow = "hidden";
            }, 800); // Увеличиваем время для завершения прокрутки
          },
        },
      });

      // Получаем текущий прогресс урока
      const currentProgress = getLessonProgress(tourConfig.lessonId);

      // Если прогресс урока не существует, инициализируем его
      let startStep: number;
      if (!currentProgress) {
        startLesson(tourConfig.lessonId, tourConfig.steps.length);
        startStep = 0;
      } else if (currentProgress.progressPercentage === 100) {
        // НЕ обновляем прогресс здесь - это вызовет цикл
        // Просто начинаем с первого шага
        startStep = 0;
      } else {
        startStep = currentProgress.currentStep || 0;
      }

      // Добавляем шаги
      shepherdInstance.addSteps(
        tourConfig.steps.map((step, index) => ({
          ...step,
          id: `step-${index}`,
          when: {
            show: () => {
              console.log("👀 show вызван!");
              currentStepRef.current = index + 1;
              updateLessonProgress(
                tourConfig.lessonId,
                index + 1,
                tourConfig.steps.length,
              );

              // Если это шаг с практическим заданием (шаг 7), запускаем отслеживание drag операций
              if (index === 6) {
                // 7-й шаг (индекс 6)
                console.log(
                  "🎯 Запускаем отслеживание drag операций для практического задания",
                );
                setTimeout(() => {
                  startDragTracking();
                }, 1000); // Даем время на показ шага
              }

              // Проверяем, что это последний шаг И урок не был прерван
              if (
                index === tourConfig.steps.length - 1 &&
                !completedRef.current
              ) {
                console.log(
                  "🎯 Последний шаг показан - завершаем урок через show",
                );
                completedRef.current = true;
                // Завершаем урок
                completeLesson(tourConfig.lessonId);
                // Переходим на страницу уроков
                console.log("🎯 Вызываем onComplete через show...");
                tourConfig.onComplete?.();
                console.log("🎯 onComplete выполнен через show");
              }
            },
            hide: () => {
              console.log(
                `🎯 hide обработчик вызван для шага ${index + 1}/${tourConfig.steps.length}`,
              );
              // Проверяем, что мы на последнем шаге И урок не был прерван
              if (
                index === tourConfig.steps.length - 1 &&
                !completedRef.current
              ) {
                console.log("🎯 Последний шаг - завершаем урок через hide");
                completedRef.current = true;
                // Завершаем урок
                completeLesson(tourConfig.lessonId);
                // Переходим на страницу уроков
                console.log("🎯 Вызываем onComplete через hide...");
                tourConfig.onComplete?.();
                console.log("🎯 onComplete выполнен через hide");
              }
            },
            complete: () => {
              console.log("🎯 complete обработчик вызван!");
              completedRef.current = true;
              // Восстанавливаем скролл
              document.body.style.overflow = "";
              // Завершаем урок
              completeLesson(tourConfig.lessonId);
              console.log("🎯 Вызываем onComplete...");
              tourConfig.onComplete?.();
              console.log("🎯 onComplete выполнен");
              shepherdRef.current = null;
            },
            cancel: () => {
              // Восстанавливаем скролл
              document.body.style.overflow = "";
              // Сохраняем текущий прогресс при закрытии тура
              if (!completedRef.current && currentStepRef.current > 0) {
                // Явно сохраняем текущий прогресс
                updateLessonProgress(
                  tourConfig.lessonId,
                  currentStepRef.current,
                  tourConfig.steps.length,
                );
              }
              tourConfig.onDestroy?.();
              shepherdRef.current = null;
            },
          },
        })),
      );

      shepherdRef.current = shepherdInstance;

      // Добавляем функцию startDragTracking в Shepherd
      (shepherdInstance as any).startDragTracking = startDragTracking;

      // Добавляем обработчик для сохранения прогресса при закрытии тура любым способом
      const handleTourClose = () => {
        // Восстанавливаем скролл
        document.body.style.overflow = "";

        if (!completedRef.current && currentStepRef.current > 0) {
          // Явно сохраняем текущий прогресс
          updateLessonProgress(
            tourConfig.lessonId,
            currentStepRef.current,
            tourConfig.steps.length,
          );
        }
      };

      // Обработчики для различных способов закрытия тура
      shepherdInstance.on("cancel", handleTourClose);
      shepherdInstance.on("complete", handleTourClose);

      // Начинаем тур с нужного шага
      shepherdInstance.start();

      // Если нужно начать с конкретного шага, переходим к нему
      if (startStep > 0 && startStep <= tourConfig.steps.length) {
        // Переходим к нужному шагу (startStep уже 1-based, конвертируем в 0-based для Shepherd)
        setTimeout(() => {
          shepherdInstance.show(startStep - 1);
        }, 100);
      }
    },
    [updateLessonProgress, completeLesson, getLessonProgress, startLesson],
  );

  const stopTour = useCallback(() => {
    if (shepherdRef.current) {
      // Восстанавливаем скролл
      document.body.style.overflow = "";
      shepherdRef.current.complete();
      shepherdRef.current = null;
    }
  }, []);

  // Очищаем при размонтировании
  useEffect(() => {
    return () => {
      if (shepherdRef.current) {
        // Восстанавливаем скролл
        document.body.style.overflow = "";
        shepherdRef.current.complete();
      }
    };
  }, []);

  return {
    startTour,
    stopTour,
  };
};
