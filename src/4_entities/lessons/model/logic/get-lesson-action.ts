import { Lesson } from "../../config";

/**
 * Типы действий для кнопки урока
 */
export type LessonAction =
  | "start"
  | "continue"
  | "restart"
  | "start_test"
  | "continue_test";

/**
 * Определяет действие для кнопки урока на основе прогресса и состояния
 */
export const getLessonAction = (
  lesson: Lesson,
  progressValue: number,
  _completedCount: number,
  testCompleted: boolean,
  tourCompleted: boolean,
): LessonAction => {
  // Если урок завершен (100% прогресса) или тур + тест пройдены
  if (
    progressValue === 100 ||
    (tourCompleted && lesson.testId && testCompleted)
  ) {
    return "restart";
  }

  // Если тур пройден (50% прогресса) и есть тест, но он не пройден
  if (tourCompleted && lesson.testId && !testCompleted) {
    return "start_test";
  }

  // Если есть прогресс, но урок не завершен
  if (progressValue > 0 && progressValue < 100) {
    return "continue";
  }

  // Если прогресса нет
  return "start";
};
