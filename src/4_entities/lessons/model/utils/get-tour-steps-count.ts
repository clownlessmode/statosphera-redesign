import { dashboardStepData } from "@pages/dashboard/ui/dashboard-joyride";
import { salesDynamicsSteps } from "@pages/sales-dynamics/ui/sales-dynamics-joyride";

/**
 * Получает реальное количество шагов тура для урока
 * @param lessonId - ID урока
 * @returns Количество шагов тура
 */
export const getTourStepsCount = (lessonId: number): number => {
  switch (lessonId) {
    case 1: // Дашборд
      return dashboardStepData.length;

    case 2: // Динамика продаж
      return salesDynamicsSteps.length;

    default:
      // Для других уроков возвращаем дефолтное значение
      return 10;
  }
};
