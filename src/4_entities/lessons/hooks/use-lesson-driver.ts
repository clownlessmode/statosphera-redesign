import { useState, useEffect } from "react";

export interface LessonProgress {
  lessonId: number;
  progress: number;
  completed: boolean;
  lastCompletedStep?: number;
}

const STORAGE_KEY = "lesson-progress";

export const useLessonDriver = () => {
  const [lessonProgresses, setLessonProgresses] = useState<
    Record<number, LessonProgress>
  >(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  // Сохраняем прогресс в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessonProgresses));
  }, [lessonProgresses]);

  const updateProgress = (
    lessonId: number,
    progress: number,
    completed: boolean,
    lastCompletedStep?: number,
  ) => {
    setLessonProgresses((prev) => ({
      ...prev,
      [lessonId]: {
        lessonId,
        progress,
        completed,
        lastCompletedStep,
      },
    }));
  };

  const getProgress = (lessonId: number): LessonProgress | undefined => {
    return lessonProgresses[lessonId];
  };

  const resetProgress = (lessonId: number) => {
    setLessonProgresses((prev) => {
      const newProgress = { ...prev };
      delete newProgress[lessonId];
      return newProgress;
    });
  };

  return {
    updateProgress,
    getProgress,
    resetProgress,
    lessonProgresses,
  };
};
