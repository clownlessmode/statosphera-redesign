import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LessonProgress, LessonsStore } from "../../config";
import { LESSONS_MOCK } from "../mock";
import { TESTS_MOCK } from "../tests-mock";
/**
 * Создает начальный объект прогресса для урока
 */
const createInitialProgress = (lessonId: number): LessonProgress => ({
  lessonId,
  progress: 0,
  completedCount: 0,
  testCompleted: false,
  tourCompleted: false,
  lastUpdated: new Date().toISOString(),
});

/**
 * Стор для управления уроками и прогрессом их прохождения.
 * Данные сохраняются в localStorage.
 */
export const useLessonsStore = create<LessonsStore>()(
  persist<LessonsStore>(
    (set, get) => ({
      lessonsProgress: {},

      // Методы для работы с прогрессом
      getLessonProgress: (lessonId: number) => {
        return get().lessonsProgress[lessonId];
      },

      updateProgress: (
        lessonId: number,
        data: number | Partial<LessonProgress>,
      ) => {
        set((state: LessonsStore) => {
          const existing = state.lessonsProgress[lessonId];
          const updated: LessonProgress = existing
            ? {
                ...existing,
                ...(typeof data === "number"
                  ? { progress: Math.max(0, Math.min(100, data)) }
                  : data),
                lastUpdated: new Date().toISOString(),
              }
            : {
                ...createInitialProgress(lessonId),
                ...(typeof data === "number"
                  ? { progress: Math.max(0, Math.min(100, data)) }
                  : data),
              };

          return {
            lessonsProgress: {
              ...state.lessonsProgress,
              [lessonId]: updated,
            },
          };
        });
      },

      // Получить количество шагов тура для урока
      getTourStepsCount: (lessonId: number) => {
        // Для урока "Дашборд" (id: 1) - количество шагов из dashboard-joyride.tsx
        if (lessonId === 1) {
          return 20; // Реальное количество шагов в туре дашборда (убрали дублирующий шаг)
        }

        // Для других уроков можно добавить их количество шагов
        // Пока возвращаем дефолтное значение
        return 10;
      },

      // Получить количество вопросов в тесте для урока
      getTestQuestionsCount: (lessonId: number) => {
        const lesson = LESSONS_MOCK.find((l) => l.id === lessonId);
        if (!lesson?.testId) return 0;

        const test = TESTS_MOCK.find((t: any) => t.lessonId === lessonId);
        return test?.questions?.length || 0;
      },

      // Рассчитать прогресс на основе пройденных этапов тура и теста
      calculateProgress: (lessonId: number) => {
        const lesson = LESSONS_MOCK.find((l) => l.id === lessonId);
        const progress = get().lessonsProgress[lessonId];

        if (!lesson || !progress) return 0;

        // Для урока с тестом: считаем общий прогресс как сумму шагов тура и вопросов теста
        if (lesson.testId) {
          const totalTourSteps = get().getTourStepsCount(lessonId);
          const totalTestQuestions = get().getTestQuestionsCount(lessonId);
          const totalSteps = totalTourSteps + totalTestQuestions;

          if (totalSteps === 0) return 0;

          let completedSteps = 0;

          // Считаем пройденные шаги тура
          if (progress.tourCompleted) {
            completedSteps += totalTourSteps;
          } else if (progress.tourStepIndex !== undefined) {
            completedSteps += progress.tourStepIndex + 1;
          }

          // Считаем пройденные вопросы теста
          if (progress.testCompleted) {
            completedSteps += totalTestQuestions;
          }

          // Рассчитываем процент: (пройденные шаги / общее количество шагов) * 100%
          return Math.round((completedSteps / totalSteps) * 100);
        }

        // Для уроков без теста используем базовый прогресс
        return progress.progress;
      },

      completeLesson: (lessonId: number) => {
        set((state: LessonsStore) => {
          const existing = state.lessonsProgress[lessonId];
          const updated: LessonProgress = existing
            ? {
                ...existing,
                progress: 100,
                completedCount: existing.completedCount + 1,
                lastUpdated: new Date().toISOString(),
              }
            : {
                ...createInitialProgress(lessonId),
                progress: 100,
                completedCount: 1,
              };

          return {
            lessonsProgress: {
              ...state.lessonsProgress,
              [lessonId]: updated,
            },
          };
        });
      },

      completeTest: (lessonId: number) => {
        set((state: LessonsStore) => {
          const existing = state.lessonsProgress[lessonId];
          const updated: LessonProgress = existing
            ? {
                ...existing,
                testCompleted: true,
                lastUpdated: new Date().toISOString(),
              }
            : { ...createInitialProgress(lessonId), testCompleted: true };

          return {
            lessonsProgress: {
              ...state.lessonsProgress,
              [lessonId]: updated,
            },
          };
        });
      },

      completeTour: (lessonId: number) => {
        set((state: LessonsStore) => {
          const existing = state.lessonsProgress[lessonId];
          const updated: LessonProgress = existing
            ? {
                ...existing,
                tourCompleted: true,
                lastUpdated: new Date().toISOString(),
              }
            : { ...createInitialProgress(lessonId), tourCompleted: true };

          return {
            lessonsProgress: {
              ...state.lessonsProgress,
              [lessonId]: updated,
            },
          };
        });
      },

      resetProgress: (lessonId: number) => {
        set((state: LessonsStore) => {
          const existing = state.lessonsProgress[lessonId];
          if (!existing) return state;

          const updated: LessonProgress = {
            ...existing,
            progress: 0,
            testCompleted: false,
            tourCompleted: false,
            tourStepIndex: undefined, // Очищаем сохраненный шаг тура
            lastUpdated: new Date().toISOString(),
          };

          return {
            lessonsProgress: {
              ...state.lessonsProgress,
              [lessonId]: updated,
            },
          };
        });
      },

      resetLessonProgress: (lessonId: number) => {
        set((state: LessonsStore) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [lessonId]: _, ...rest } = state.lessonsProgress;
          return { lessonsProgress: rest };
        });
      },

      clearAllProgress: () => {
        set({ lessonsProgress: {} });
      },
    }),
    {
      name: "lessons-store",
    },
  ),
);

/**
 * Хук для удобной работы с уроками и прогрессом
 */
export const useLessons = () => {
  const lessonsProgress = useLessonsStore((s) => s.lessonsProgress);
  const getLessonProgress = useLessonsStore((s) => s.getLessonProgress);
  const updateProgress = useLessonsStore((s) => s.updateProgress);
  const getTourStepsCount = useLessonsStore((s) => s.getTourStepsCount);
  const getTestQuestionsCount = useLessonsStore((s) => s.getTestQuestionsCount);
  const calculateProgress = useLessonsStore((s) => s.calculateProgress);
  const completeLesson = useLessonsStore((s) => s.completeLesson);
  const completeTest = useLessonsStore((s) => s.completeTest);
  const completeTour = useLessonsStore((s) => s.completeTour);
  const resetProgress = useLessonsStore((s) => s.resetProgress);
  const resetLessonProgress = useLessonsStore((s) => s.resetLessonProgress);
  const clearAllProgress = useLessonsStore((s) => s.clearAllProgress);

  return {
    lessons: LESSONS_MOCK, // Всегда возвращаем уроки из константы
    lessonsProgress,
    getLessonProgress,
    updateProgress,
    getTourStepsCount,
    getTestQuestionsCount,
    calculateProgress,
    completeLesson,
    completeTest,
    completeTour,
    resetProgress,
    resetLessonProgress,
    clearAllProgress,
  };
};
