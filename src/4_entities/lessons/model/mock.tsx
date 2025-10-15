import { ChartLine, FileText, Handshake, Home, TestTube } from "lucide-react";

export const LESSONS_MOCK = [
  {
    id: 1,
    title: "Дашборд",
    description:
      "Изучите все возможности дашборда: виджеты, drag & drop, настройки. Интерактивный тур покажет как работать с каждым элементом и настроить рабочее пространство под себя.",
    duration: "8 минут",
    progress: 0,
    completed: false,
    to: ["Все пользователи"],
    icon: <Home className="size-5" />,
    tags: ["Интерфейс", "Виджеты", "Настройки"],
    targetPath: "/",
  },
  {
    id: 2,
    title: "Конструктор отчетов",
    description:
      "Вы освоите работу с конструктором отчетов, включая фильтрацию, группировку и выбор показателей для анализа данных.",
    duration: "15 минут",
    progress: 65,
    completed: false,
    to: ["Специалисты"],
    icon: <FileText className="size-5" />,
    tags: ["Аналитика", "Отчеты", "Визуализация"],
    targetPath: "/report",
  },
  {
    id: 3,
    title: "Стандарты",
    description:
      "Вы научитесь искать, фильтровать и просматривать стандарты в системе.",
    duration: "15 минут",
    progress: 100,
    completed: true,
    to: ["Руководители"],
    icon: <Handshake className="size-5" />,
    tags: ["Стандарты", "Поиск", "Фильтрация"],
    targetPath: "/standarts",
  },
  {
    id: 4,
    title: "Динамика продаж",
    description:
      "Вы научитесь использовать инструменты аналитики для работы с данными о продажах. Курс охватывает фильтрацию, визуализацию и экспорт информации.",
    duration: "15 минут",
    progress: 0,
    completed: false,
    to: ["Руководители"],
    icon: <ChartLine className="size-5" />,
    tags: ["Аналитика", "Продажи", "Визуализация"],
    targetPath: "/sales-dynamics",
  },
  // Тестовый урок (не показывается в списке уроков)
  {
    id: 999,
    title: "Тестовый урок",
    description:
      "Тестовый урок для проверки работы системы обучения. Проходит на главной странице.",
    duration: "5 минут",
    progress: 0,
    completed: false,
    to: ["Тестирование"],
    icon: <TestTube className="size-5" />,
    tags: ["Тест"],
    isTest: true,
    targetPath: "/",
  },
];
