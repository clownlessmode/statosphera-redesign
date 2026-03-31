export const STAGE_PROJECT_OPTIONS = [
  { value: "Инициация", label: "Инициация" },
  { value: "Планирование", label: "Планирование" },
  { value: "Проектирование", label: "Проектирование" },
  { value: "Внедрение", label: "Внедрение" },
  { value: "Разработка", label: "Разработка" },
  { value: "Тестирование", label: "Тестирование" },
  { value: "Заморожен", label: "Заморожен" },
  { value: "Закрытие", label: "Закрытие" },
] as const;

export type StageProject = (typeof STAGE_PROJECT_OPTIONS)[number]["value"];

export const PRIORITY_PROJECT_OPTIONS = [
  { value: "Низкий", label: "Низкий" },
  { value: "Средний", label: "Средний" },
  { value: "Высокий", label: "Высокий" },
] as const;

export type PriorityProject =
  (typeof PRIORITY_PROJECT_OPTIONS)[number]["value"];
