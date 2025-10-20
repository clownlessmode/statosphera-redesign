import { Lesson } from "../../config";
import { LessonAction } from "./get-lesson-action";

/**
 * Обрабатывает клик по кнопке урока
 * Универсальная логика: если есть targetPath - это тур, если нет - тест
 */
export const handleLessonClick = (
  action: LessonAction,
  lesson: Lesson,
  onStartLesson?: (lesson: Lesson) => void,
  onStartTest?: (lesson: Lesson) => void,
  onStartTour?: (lesson: Lesson) => void,
  onResetProgress?: (lessonId: number) => void,
) => {
  // Если это действие связанное с тестом
  if (action === "start_test" || action === "continue_test") {
    onStartTest?.(lesson);
    return;
  }

  // Если это действие "restart" - начинаем заново
  if (action === "restart") {
    // Сначала сбрасываем прогресс
    onResetProgress?.(lesson.id);

    // Если у урока есть targetPath - это тур (урок с интерактивной частью на странице)
    if (lesson.targetPath) {
      onStartTour?.(lesson);
      return;
    }
    // Иначе - обычный урок
    onStartLesson?.(lesson);
    return;
  }

  // Если у урока есть targetPath - это тур (урок с интерактивной частью на странице)
  if (lesson.targetPath && (action === "start" || action === "continue")) {
    onStartTour?.(lesson);
    return;
  }

  // В остальных случаях - обычный урок
  onStartLesson?.(lesson);
};
