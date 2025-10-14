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
  const { updateLessonProgress, completeLesson, getLessonProgress } =
    useLessonProgress();

  const startTour = useCallback(
    (tourConfig: LessonTourConfig) => {
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
          modalOverlayOpeningPadding: 10,
          modalOverlayOpeningRadius: 5,
        },
      });

      // Получаем текущий прогресс урока
      const currentProgress = getLessonProgress(tourConfig.lessonId);

      // Если урок завершен (100%), сбрасываем прогресс для перезапуска
      let startStep: number;
      if (currentProgress?.progressPercentage === 100) {
        console.log(
          `Урок ${tourConfig.lessonId} завершен, сбрасываем прогресс для перезапуска`,
        );
        // Сбрасываем прогресс на первый шаг
        updateLessonProgress(tourConfig.lessonId, 1, tourConfig.steps.length);
        startStep = 1;
      } else {
        startStep = currentProgress?.currentStep || 0;
      }

      // Добавляем шаги
      shepherdInstance.addSteps(
        tourConfig.steps.map((step, index) => ({
          ...step,
          id: `step-${index}`,
          when: {
            show: () => {
              // Обновляем прогресс при показе каждого шага
              console.log(
                `Показываем шаг ${index + 1}/${tourConfig.steps.length} для урока ${tourConfig.lessonId}`,
              );
              updateLessonProgress(
                tourConfig.lessonId,
                index + 1,
                tourConfig.steps.length,
              );
            },
            hide: () => {
              console.log(
                `Скрываем шаг ${index + 1}/${tourConfig.steps.length} для урока ${tourConfig.lessonId}, completedRef: ${completedRef.current}`,
              );
              // Проверяем, что мы на последнем шаге И урок не был прерван
              if (
                index === tourConfig.steps.length - 1 &&
                !completedRef.current
              ) {
                console.log(
                  `Завершаем урок ${tourConfig.lessonId} - последний шаг скрыт`,
                );
                completedRef.current = true;
                // Завершаем урок
                completeLesson(tourConfig.lessonId);
              }
            },
            complete: () => {
              console.log(
                `Завершаем урок ${tourConfig.lessonId} - кнопка "Завершить" нажата`,
              );
              completedRef.current = true;
              // Завершаем урок
              completeLesson(tourConfig.lessonId);
              tourConfig.onComplete?.();
              shepherdRef.current = null;
            },
            cancel: () => {
              console.log(
                `Отменяем урок ${tourConfig.lessonId}, completedRef: ${completedRef.current}`,
              );
              // Сохраняем текущий прогресс при закрытии тура
              const currentProgress = getLessonProgress(tourConfig.lessonId);
              if (currentProgress && !completedRef.current) {
                console.log(
                  `Сохраняем промежуточный прогресс урока ${tourConfig.lessonId}: ${currentProgress.progressPercentage}%`,
                );
                // Прогресс уже сохранен в updateLessonProgress, просто логируем
              }
              tourConfig.onDestroy?.();
              shepherdRef.current = null;
            },
          },
        })),
      );

      shepherdRef.current = shepherdInstance;

      // Добавляем обработчик для сохранения прогресса при закрытии тура любым способом
      const handleTourClose = () => {
        const currentProgress = getLessonProgress(tourConfig.lessonId);
        if (currentProgress && !completedRef.current) {
          console.log(
            `Тур закрыт, сохраняем промежуточный прогресс урока ${tourConfig.lessonId}: ${currentProgress.progressPercentage}%`,
          );
        }
      };

      // Обработчики для различных способов закрытия тура
      shepherdInstance.on("cancel", handleTourClose);
      shepherdInstance.on("complete", handleTourClose);

      // Начинаем тур с нужного шага
      if (startStep > 0 && startStep <= tourConfig.steps.length) {
        shepherdInstance.start();
        // Переходим к нужному шагу (startStep уже 1-based, конвертируем в 0-based для Shepherd)
        setTimeout(() => {
          shepherdInstance.show(startStep - 1);
        }, 100);
      } else {
        shepherdInstance.start();
      }
    },
    [updateLessonProgress, completeLesson, getLessonProgress],
  );

  const stopTour = useCallback(() => {
    if (shepherdRef.current) {
      shepherdRef.current.complete();
      shepherdRef.current = null;
    }
  }, []);

  // Очищаем при размонтировании
  useEffect(() => {
    return () => {
      if (shepherdRef.current) {
        shepherdRef.current.complete();
      }
    };
  }, []);

  return {
    startTour,
    stopTour,
  };
};
