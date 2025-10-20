import { Lesson, LessonProgress } from "../../config";
import { LessonAction, getLessonAction } from "./get-lesson-action";

/**
 * Интерфейс для состояния урока
 */
export interface LessonState {
  progressValue: number;
  completedCount: number;
  testCompleted: boolean;
  tourCompleted: boolean;
  hasProgress: boolean;
  hasAttempts: boolean;
  showDropdown: boolean;
  action: LessonAction;
}

/**
 * Вычисляет состояние урока на основе данных прогресса
 */
export const calculateLessonState = (
  lesson: Lesson,
  progress: LessonProgress | undefined,
  progressValue: number,
): LessonState => {
  const completedCount = progress?.completedCount ?? 0;
  const testCompleted = progress?.testCompleted ?? false;
  const tourCompleted = progress?.tourCompleted ?? false;

  const hasProgress = progressValue > 0;
  const hasAttempts = completedCount > 0 || testCompleted || tourCompleted;
  const showDropdown = hasProgress || hasAttempts;
  const action = getLessonAction(
    lesson,
    progressValue,
    completedCount,
    testCompleted,
    tourCompleted,
  );

  return {
    progressValue,
    completedCount,
    testCompleted,
    tourCompleted,
    hasProgress,
    hasAttempts,
    showDropdown,
    action,
  };
};
