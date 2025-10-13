import { useCallback, useEffect, useState } from "react";
import {
  LessonProgress,
  LessonProgressData,
  LessonStatus,
  LessonAction,
  LessonBadge,
} from "../types/progress";
import { getLessonTour } from "../config";

const STORAGE_KEY = "statosphera-lesson-progress";
const OLD_STORAGE_KEY = "lesson-progress"; // Старый ключ из useLessonDriver

export const useLessonProgress = () => {
  const [progressData, setProgressData] = useState<LessonProgressData>(() => {
    // Инициализируем данные из localStorage при создании состояния
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Ошибка при загрузке прогресса уроков:", error);
        return {};
      }
    }
    return {};
  });

  // Функция миграции данных из старой системы
  const migrateOldProgressData = useCallback(() => {
    const oldData = localStorage.getItem(OLD_STORAGE_KEY);
    if (!oldData) return {};

    try {
      const oldProgress = JSON.parse(oldData);
      const migratedData: LessonProgressData = {};

      // Мигрируем данные из старого формата в новый
      Object.values(oldProgress).forEach((oldLesson: any) => {
        if (oldLesson.lessonId && oldLesson.progress !== undefined) {
          const lessonId = oldLesson.lessonId.toString();
          const now = new Date().toISOString();

          // Получаем количество шагов из конфигурации тура
          const tour = getLessonTour(oldLesson.lessonId);
          const totalSteps = tour?.steps.length || 6; // По умолчанию 6 шагов

          migratedData[lessonId] = {
            lessonId,
            currentStep: Math.round((oldLesson.progress / 100) * totalSteps),
            totalSteps,
            progressPercentage: oldLesson.progress,
            completedCount: oldLesson.completed ? 1 : 0,
            lastUpdated: now,
            firstStarted: now,
            lastCompleted: oldLesson.completed ? now : undefined,
            status: oldLesson.completed ? "completed_once" : "in_progress",
          };
        }
      });

      return migratedData;
    } catch (error) {
      console.error("Ошибка при миграции старых данных:", error);
      return {};
    }
  }, []);

  // Проверяем миграцию данных один раз при монтировании
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      // Если новых данных нет, пробуем мигрировать старые
      const dataToSet = migrateOldProgressData();
      if (Object.keys(dataToSet).length > 0) {
        console.log("✅ Миграция завершена:", dataToSet);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSet));
        setProgressData(dataToSet);
        localStorage.removeItem(OLD_STORAGE_KEY);
      }
    }
  }, [migrateOldProgressData]); // Запускаем при инициализации

  // Сохраняем данные в localStorage при изменении
  useEffect(() => {
    console.log("💾 Сохраняем progressData в localStorage:", progressData);
    if (Object.keys(progressData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    }
  }, [progressData]);

  // Получить прогресс конкретного урока
  const getLessonProgress = useCallback(
    (lessonId: string): LessonProgress | null => {
      const progress = progressData[lessonId] || null;
      console.log(`getLessonProgress(${lessonId}):`, progress);
      return progress;
    },
    [progressData],
  );

  // Начать новый урок
  const startLesson = useCallback((lessonId: string, totalSteps: number) => {
    const now = new Date().toISOString();

    console.log(`startLesson(${lessonId}): начинаем урок`);

    console.log("🚀 startLesson:", lessonId, totalSteps);
    setProgressData((prev) => ({
      ...prev,
      [lessonId]: {
        lessonId,
        currentStep: 0,
        totalSteps,
        progressPercentage: 0,
        completedCount: 0,
        lastUpdated: now,
        firstStarted: now,
        status: "in_progress" as LessonStatus,
      },
    }));
  }, []);

  // Обновить прогресс урока
  const updateLessonProgress = useCallback(
    (lessonId: string, currentStep: number, totalSteps: number) => {
      const progress = progressData[lessonId];
      if (!progress) {
        console.log(
          `updateLessonProgress(${lessonId}): прогресс не найден, пропускаем`,
        );
        return;
      }

      const progressPercentage = Math.round((currentStep / totalSteps) * 100);
      const now = new Date().toISOString();

      console.log(
        `updateLessonProgress(${lessonId}): шаг ${currentStep}/${totalSteps}, ${progressPercentage}%`,
        {
          oldProgress: progress,
          newProgressPercentage: progressPercentage,
          newCurrentStep: currentStep,
        },
      );

      setProgressData((prev) => {
        const newData = {
          ...prev,
          [lessonId]: {
            ...progress,
            currentStep,
            totalSteps, // Обновляем totalSteps на случай изменения
            progressPercentage,
            lastUpdated: now,
          },
        };
        console.log("📝 setProgressData в updateLessonProgress:", newData);
        return newData;
      });
    },
    [progressData],
  );

  // Завершить урок
  const completeLesson = useCallback(
    (lessonId: string) => {
      const progress = progressData[lessonId];
      if (!progress) {
        console.log(`completeLesson(${lessonId}): прогресс не найден`);
        return;
      }

      const now = new Date().toISOString();
      const newCompletedCount = progress.completedCount + 1;

      console.log(`completeLesson(${lessonId}): завершаем урок`, {
        oldProgress: progress,
        newCompletedCount,
        willSetTo100Percent: true,
      });

      setProgressData((prev) => {
        const newData = {
          ...prev,
          [lessonId]: {
            ...progress,
            currentStep: progress.totalSteps,
            progressPercentage: 100,
            completedCount: newCompletedCount,
            lastUpdated: now,
            lastCompleted: now,
            status:
              newCompletedCount === 1
                ? "completed_once"
                : ("completed_once" as LessonStatus),
          },
        };
        console.log("✅ setProgressData в completeLesson:", newData);
        return newData;
      });
    },
    [progressData],
  );

  // Запустить урок заново
  const restartLesson = useCallback(
    (lessonId: string) => {
      const progress = progressData[lessonId];
      if (!progress) return;

      const now = new Date().toISOString();

      setProgressData((prev) => ({
        ...prev,
        [lessonId]: {
          ...progress,
          currentStep: 0,
          progressPercentage: 0,
          lastUpdated: now,
          status: "restarted" as LessonStatus,
        },
      }));
    },
    [progressData],
  );

  // Получить действие для урока
  const getLessonAction = useCallback(
    (lessonId: string): LessonAction => {
      const progress = progressData[lessonId];

      if (!progress) {
        return {
          type: "start",
          label: "Начать обучение",
          description: "Начать изучение урока",
        };
      }

      // Проверяем текущий прогресс
      if (progress.progressPercentage === 100) {
        // Урок завершен, показываем "Запустить заново"
        return {
          type: "restart",
          label: "Запустить заново",
          description: "Повторить урок с начала",
        };
      } else if (progress.progressPercentage > 0) {
        // Урок в процессе, показываем "Продолжить"
        return {
          type: "continue",
          label: "Продолжить обучение",
          description: `Продолжить с шага ${progress.currentStep + 1}`,
        };
      } else {
        // Урок не начат, показываем "Начать"
        return {
          type: "start",
          label: "Начать обучение",
          description: "Начать изучение урока",
        };
      }
    },
    [progressData],
  );

  // Получить бейдж для урока
  const getLessonBadge = useCallback(
    (lessonId: string): LessonBadge | null => {
      const progress = progressData[lessonId];

      if (!progress || progress.completedCount === 0) {
        return null;
      }

      if (progress.completedCount === 1) {
        return {
          text: "Пройдено",
          variant: "success",
          showCount: false,
        };
      }

      return {
        text: "Пройдено",
        variant: "success",
        showCount: true,
      };
    },
    [progressData],
  );

  // Получить количество прохождений
  const getCompletedCount = useCallback(
    (lessonId: string): number => {
      const progress = progressData[lessonId];
      return progress?.completedCount || 0;
    },
    [progressData],
  );

  // Получить процент прохождения
  const getProgressPercentage = useCallback(
    (lessonId: string): number => {
      const progress = progressData[lessonId];
      const percentage = progress?.progressPercentage || 0;
      console.log(
        `📈 getProgressPercentage(${lessonId}):`,
        percentage,
        progress,
      );
      return percentage;
    },
    [progressData],
  );

  // Проверить, завершен ли урок
  const isLessonCompleted = useCallback(
    (lessonId: string): boolean => {
      const progress = progressData[lessonId];
      const completed = progress?.completedCount > 0;
      console.log(`✅ isLessonCompleted(${lessonId}):`, completed, progress);
      return completed;
    },
    [progressData],
  );

  // Проверить, в процессе ли урок
  const isLessonInProgress = useCallback(
    (lessonId: string): boolean => {
      const progress = progressData[lessonId];
      return (
        progress?.status === "in_progress" ||
        progress?.status === "restarted_in_progress"
      );
    },
    [progressData],
  );

  // Функция для принудительной миграции (можно вызвать из консоли)
  const forceMigration = useCallback(() => {
    const migratedData = migrateOldProgressData();
    if (Object.keys(migratedData).length > 0) {
      setProgressData(migratedData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedData));
      localStorage.removeItem(OLD_STORAGE_KEY);
      console.log("Миграция завершена:", migratedData);
    } else {
      console.log("Нет данных для миграции");
    }
  }, [migrateOldProgressData]);

  // Функция для принудительного исправления прогресса урока
  const fixLessonProgress = useCallback(
    (lessonId: string, progressPercentage: number) => {
      const progress = progressData[lessonId];
      if (!progress) {
        console.log(`Прогресс для урока ${lessonId} не найден`);
        return;
      }

      const now = new Date().toISOString();
      const currentStep = Math.round(
        (progressPercentage / 100) * progress.totalSteps,
      );

      console.log(`Исправляем прогресс урока ${lessonId}:`, {
        oldProgress: progress,
        newProgressPercentage: progressPercentage,
        newCurrentStep: currentStep,
      });

      setProgressData((prev) => ({
        ...prev,
        [lessonId]: {
          ...progress,
          currentStep,
          progressPercentage,
          lastUpdated: now,
          status: progressPercentage === 100 ? "completed_once" : "in_progress",
        },
      }));
    },
    [progressData],
  );

  return {
    // Данные
    progressData,

    // Основные функции
    getLessonProgress,
    startLesson,
    updateLessonProgress,
    completeLesson,
    restartLesson,

    // Вспомогательные функции
    getLessonAction,
    getLessonBadge,
    getCompletedCount,
    getProgressPercentage,
    isLessonCompleted,
    isLessonInProgress,

    // Утилиты
    forceMigration,
    fixLessonProgress,
  };
};
