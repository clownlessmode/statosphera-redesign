import { Home } from "lucide-react";
import { Lesson } from "../config/types";

const lessonsBase = [
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
    testId: 1, // Связываем с тестом
  },
  // {
  //   id: 2,
  //   title: "Динамика продаж",
  //   description:
  //     "Освойте анализ продаж: фильтры по магазинам и периодам, сравнение показателей, работа с графиками и таблицами. Интерактивный тур научит эффективно анализировать данные и выявлять тренды.",
  //   duration: "12 минут",
  //   progress: 0,
  //   completed: false,
  //   to: ["Все пользователи"],
  //   icon: <TrendingUp className="size-5" />,
  //   tags: ["Аналитика", "Продажи", "Фильтры", "Графики"],
  //   targetPath: "/sales-dynamics",
  //   testId: 2, // Связываем с тестом
  // },
];

// Экспортируем уроки
export const LESSONS_MOCK: Lesson[] = lessonsBase;
