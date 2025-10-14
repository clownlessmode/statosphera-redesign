export interface LessonProgress {
  /** ID урока */
  lessonId: string;
  /** Текущий шаг (0-based индекс) */
  currentStep: number;
  /** Общее количество шагов в уроке */
  totalSteps: number;
  /** Процент прохождения (0-100) */
  progressPercentage: number;
  /** Количество полных прохождений урока */
  completedCount: number;
  /** Дата последнего обновления прогресса */
  lastUpdated: string;
  /** Дата первого начала урока */
  firstStarted: string;
  /** Дата последнего завершения урока */
  lastCompleted?: string;
  /** Статус урока */
  status: LessonStatus;
}

export type LessonStatus =
  | "not_started" // Никогда не начинал
  | "in_progress" // В процессе прохождения
  | "completed_once" // Завершен хотя бы один раз
  | "restarted" // Запущен заново после завершения
  | "restarted_in_progress"; // Запущен заново, но не завершен

export interface LessonProgressData {
  [lessonId: string]: LessonProgress;
}

export interface LessonAction {
  type: "start" | "continue" | "restart";
  label: string;
  description: string;
}

export interface LessonBadge {
  text: string;
  variant: "default" | "success" | "warning" | "secondary";
  showCount: boolean;
}
