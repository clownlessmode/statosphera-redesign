import { ChartLine, FileText, Handshake, Home } from "lucide-react";

export const LESSONS_MOCK = [
  {
    id: 1,
    title: "Главная страница",
    description:
      "Вы изучите основные элементы интерфейса: навигацию, меню и информационные виджеты. Это поможет быстро начать работу с системой.",
    duration: "10 минут",
    progress: 12,
    completed: true,
    to: ["Аналитики"],
    icon: <Home className="size-5" />,
    tags: ["Интерфейс", "Виджеты", "Навигация"],
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
  },
];
