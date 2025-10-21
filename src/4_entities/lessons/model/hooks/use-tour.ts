import { useState, useCallback, useEffect } from "react";
import { CallBackProps, STATUS, EVENTS, ACTIONS, Step } from "react-joyride";
import { useNavigate } from "react-router";
import { useLessonsStore } from "./use-lessons-store";
import { setTourActive } from "./use-tour-state";

interface UseTourOptions {
  lessonId: number;
  steps: Step[];
  enabled?: boolean;
  onStepChange?: (stepIndex: number) => void; // Добавляем кастомный callback
  onInteractiveAction?: (stepIndex: number, action: string) => boolean | void; // Для интерактивных действий
}

/**
 * Универсальный хук для управления турами
 * Содержит всю общую логику: автозапуск, сохранение прогресса, навигацию и т.д.
 */
export const useTour = ({
  lessonId,
  steps,
  enabled = true,
  onStepChange,
  onInteractiveAction,
}: UseTourOptions) => {
  const { completeTour, updateProgress, getLessonProgress } = useLessonsStore();
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();

  // Функция для обновления шага (используется внутри хука и может быть вызвана извне)
  const updateStepIndex = useCallback(
    (newStepIndex: number) => {
      setStepIndex(newStepIndex);
      onStepChange?.(newStepIndex);
    },
    [onStepChange],
  );

  // Автозапуск тура при переходе с урока
  useEffect(() => {
    if (!enabled) return;

    const urlParams = new URLSearchParams(window.location.search);
    const fromLesson = urlParams.get("fromLesson");

    if (fromLesson === "true" && !run) {
      // Проверяем текущий путь - не запускаем тур автоматически на sales-dynamics
      // если там нет соответствующей логики автозапуска
      const currentPath = window.location.pathname;
      if (currentPath === "/sales-dynamics") {
        // Убираем параметр из URL без запуска тура
        const url = new URL(window.location.href);
        url.searchParams.delete("fromLesson");
        window.history.replaceState({}, "", url.toString());
        return;
      }

      // Проверяем, есть ли сохраненный прогресс тура
      const progress = getLessonProgress(lessonId);
      const savedStepIndex = progress?.tourStepIndex ?? 0;

      // Увеличенная задержка для полной загрузки всех элементов
      setTimeout(() => {
        // Проверяем, существует ли элемент сохраненного шага
        let startStepIndex = savedStepIndex;

        if (savedStepIndex > 0 && savedStepIndex < steps.length) {
          const targetSelector = steps[savedStepIndex].target as string;
          const element = document.querySelector(targetSelector);

          if (!element) {
            console.warn(
              `Saved step element ${targetSelector} not found, starting from beginning`,
            );
            startStepIndex = 0;
          }
        }

        setStepIndex(startStepIndex);
        setRun(true);
      }, 1500);

      // Убираем параметр из URL
      const url = new URL(window.location.href);
      url.searchParams.delete("fromLesson");
      window.history.replaceState({}, "", url.toString());
    }
  }, [getLessonProgress, run, steps, enabled, lessonId]);

  // Обработчик событий тура
  const handleJoyrideCallback = useCallback(
    (data: CallBackProps) => {
      const { status, index, action, type, lifecycle } = data;

      const currentStep = steps[index];

      // Проверяем существует ли элемент
      if (typeof currentStep?.target === "string") {
        const element = document.querySelector(currentStep.target);
        if (element) {
          // Проверяем родительские элементы на z-index
          let parent = element.parentElement;
          let level = 0;
          while (parent && level < 5) {
            parent = parent.parentElement;
            level++;
          }
        }
      }

      // Пропускаем шаг, если элемент не найден
      if (lifecycle === "error") {
        // Автоматически переходим к следующему шагу
        if (index < steps.length - 1) {
          setStepIndex(index + 1);
        }
        return;
      }

      // Обработка закрытия крестиком
      if (action === ACTIONS.CLOSE) {
        setRun(false);

        // Принудительно восстанавливаем скролл
        document.body.style.overflow = "unset";
        document.documentElement.style.overflow = "unset";
        document.body.style.position = "unset";
        document.documentElement.style.position = "unset";

        // Сохраняем текущий шаг и прогресс
        const progress = Math.round(((index + 1) / steps.length) * 100);
        updateProgress(lessonId, {
          tourStepIndex: index,
          progress: progress,
        });

        // Переходим обратно на страницу уроков
        setTimeout(() => {
          navigate("/lessons");
        }, 100);

        return;
      }

      // Обработка интерактивных действий
      let shouldPreventStepChange = false;
      if (
        onInteractiveAction &&
        (action === ACTIONS.NEXT || action === ACTIONS.PREV)
      ) {
        const result = onInteractiveAction(index, action);
        shouldPreventStepChange = result === false; // Если callback вернул false, предотвращаем переход
      }

      // Обновляем шаг после перехода (важно использовать STEP_AFTER)
      if (type === EVENTS.STEP_AFTER && !shouldPreventStepChange) {
        const newStepIndex =
          action === ACTIONS.NEXT
            ? index + 1
            : action === ACTIONS.PREV
              ? index - 1
              : index;

        if (action === ACTIONS.NEXT || action === ACTIONS.PREV) {
          updateStepIndex(newStepIndex);

          // Обновляем прогресс при каждом переходе
          const progress = Math.round(
            ((newStepIndex + 1) / steps.length) * 100,
          );
          updateProgress(lessonId, {
            tourStepIndex: newStepIndex,
            progress: progress,
          });
        }
      }

      // Если тур закрыт крестиком или пропущен
      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        setRun(false);

        // Принудительно восстанавливаем скролл
        document.body.style.overflow = "unset";
        document.documentElement.style.overflow = "unset";
        document.body.style.position = "unset";
        document.documentElement.style.position = "unset";

        if (status === STATUS.FINISHED) {
          // Отмечаем тур как пройденный
          completeTour(lessonId);
          // Устанавливаем прогресс 100% и очищаем сохраненный шаг
          updateProgress(lessonId, {
            tourStepIndex: undefined,
            progress: 100,
          });
        } else if (status === STATUS.SKIPPED) {
          // Сохраняем текущий шаг и прогресс при закрытии крестиком
          const progress = Math.round(((index + 1) / steps.length) * 100);
          updateProgress(lessonId, {
            tourStepIndex: index,
            progress: progress,
          });

          // Переходим обратно на страницу уроков с небольшой задержкой
          setTimeout(() => {
            navigate("/lessons");
          }, 100);
        }
      }
    },
    [completeTour, updateProgress, navigate, steps.length, lessonId, steps],
  );

  // Блокируем ручной скролл, но разрешаем Joyride автоматически скроллить
  useEffect(() => {
    if (run) {
      // Устанавливаем глобальное состояние активности тура
      setTourActive(true);

      // Блокируем скролл через CSS
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Понижаем z-index только активных модалок чтобы Joyride был поверх них
      const modals = document.querySelectorAll(
        '[data-slot="dialog-overlay"], [data-slot="dialog-content"], [role="dialog"]',
      );
      modals.forEach((modal) => {
        const element = modal as HTMLElement;
        // Сохраняем оригинальный z-index
        if (!element.dataset.originalZIndex) {
          element.dataset.originalZIndex =
            element.style.zIndex || window.getComputedStyle(element).zIndex;
        }
        // Понижаем только если это модалка (не основной контент)
        if (
          element.getAttribute("role") === "dialog" ||
          element.getAttribute("data-slot")?.includes("dialog")
        ) {
          element.style.zIndex = "1";
        }
      });

      // Блокируем скролл колесиком мыши и клавишами
      const preventScroll = (e: Event) => {
        // Разрешаем скролл только если он исходит от Joyride
        const target = e.target as Element;
        if (target && target.closest("[data-joyride]")) {
          return;
        }

        // Блокируем только скролл, не клики - Joyride сам обрабатывает клики
        if (
          e.type === "wheel" ||
          e.type === "touchmove" ||
          e.type === "keydown"
        ) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      };

      // Блокируем только события скролла
      const scrollEvents = ["wheel", "touchmove", "keydown"];

      scrollEvents.forEach((event) => {
        document.addEventListener(event, preventScroll, { passive: false });
      });

      return () => {
        // Сбрасываем глобальное состояние активности тура
        setTourActive(false);

        // Восстанавливаем скролл
        document.body.style.overflow = "unset";
        document.documentElement.style.overflow = "unset";

        // Восстанавливаем z-index модалок
        const modals = document.querySelectorAll(
          '[data-slot="dialog-overlay"], [data-slot="dialog-content"], [role="dialog"]',
        );
        modals.forEach((modal) => {
          const element = modal as HTMLElement;
          // Восстанавливаем оригинальный z-index
          if (element.dataset.originalZIndex) {
            element.style.zIndex = element.dataset.originalZIndex;
            delete element.dataset.originalZIndex;
          } else {
            element.style.zIndex = "";
          }
        });

        scrollEvents.forEach((event) => {
          document.removeEventListener(event, preventScroll);
        });
      };
    } else {
      // Дополнительная проверка: если тур не активен, убеждаемся что скролл разблокирован
      setTourActive(false);
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
  }, [run]);

  return {
    run,
    stepIndex,
    handleJoyrideCallback,
    updateStepIndex, // Экспортируем функцию для внешнего использования
  };
};
