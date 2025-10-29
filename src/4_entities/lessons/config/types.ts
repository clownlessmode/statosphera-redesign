import React from "react";

export type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  completed: boolean;
  to: string[];
  icon: React.ReactNode;
  tags: string[];
  isTest?: boolean; // Флаг для тестовых уроков, которые не показываются в списке
  targetPath?: string; // Путь страницы, на которой проводится урок
  testId?: number; // ID связанного теста
};

// Типы для тестов
export type TestQuestion = {
  id: number;
  question: string;
  type:
    | "multiple-choice"
    | "single-choice"
    | "drag-drop"
    | "range-selector"
    | "order-cards";
  options?: string[]; // Для multiple-choice и single-choice
  correctAnswers: number[] | string[]; // Правильные ответы
  explanation?: string; // Объяснение правильного ответа
  range?: {
    min: number;
    max: number;
    step: number;
    unit: string;
  }; // Для range-selector
  cards?: string[]; // Для drag-drop и order-cards
};

export type Test = {
  id: number;
  lessonId: number; // ID урока, к которому привязан тест
  title: string;
  description: string;
  questions: TestQuestion[];
  passingScore: number; // Процент для прохождения (например, 70)
  timeLimit?: number; // Лимит времени в минутах
};

export type TestResult = {
  testId: number;
  score: number; // Количество правильных ответов
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  completedAt: Date;
  answers: {
    questionId: number;
    userAnswer: number[] | string[];
    isCorrect: boolean;
  }[];
};

// Типы для прогресса уроков
export type LessonProgress = {
  lessonId: number;
  progress: number; // Общий прогресс урока (0-100)
  completedCount: number; // Количество завершений урока
  testCompleted: boolean; // Пройден ли тест
  tourCompleted: boolean; // Пройден ли тур
  tourStepIndex?: number; // Текущий шаг тура
  lastUpdated: string; // Дата последнего обновления
};

export type LessonsStore = {
  lessonsProgress: { [lessonId: number]: LessonProgress };

  // Методы для работы с прогрессом
  getLessonProgress: (lessonId: number) => LessonProgress | undefined;
  updateProgress: (
    lessonId: number,
    data: number | Partial<LessonProgress>,
  ) => void;
  getTourStepsCount: (lessonId: number) => number;
  getTestQuestionsCount: (lessonId: number) => number;
  calculateProgress: (lessonId: number) => number;
  completeLesson: (lessonId: number) => void;
  completeTest: (lessonId: number) => void;
  completeTour: (lessonId: number) => void;
  resetProgress: (lessonId: number) => void;
  resetLessonProgress: (lessonId: number) => void;
  clearAllProgress: () => void;
};
