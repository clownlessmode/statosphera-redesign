export interface LessonTourDefinition {
  lessonId: number;
  steps: any[];
  onStepChange?: (step: number) => void;
}

// Тестовый урок для Dashboard
export const TEST_DASHBOARD_TOUR: LessonTourDefinition = {
  lessonId: 999, // Тестовый ID
  steps: [
    {
      title: "🎓 Тестовый урок системы обучения",
      text: "Привет! Это демонстрация того, как работает система обучения. Сейчас я покажу тебе несколько элементов на странице. Нажми 'Далее' чтобы продолжить.",
      buttons: [
        {
          text: "Далее",
          action: function (this: any) {
            return this.next();
          },
          classes: "shepherd-button-primary",
        },
      ],
    },
    {
      attachTo: {
        element: ".dashboard-header",
        on: "bottom-start",
      },
      title: "📍 Заголовок страницы",
      text: "Вот так подсвечиваются элементы! Здесь отображается название текущей страницы. Можно указывать на любой элемент через селекторы.",
      buttons: [
        {
          text: "Назад",
          action: function (this: any) {
            return this.back();
          },
          classes: "shepherd-button-secondary",
        },
        {
          text: "Далее",
          action: function (this: any) {
            return this.next();
          },
          classes: "shepherd-button-primary",
        },
      ],
    },
    {
      attachTo: {
        element: "[data-widget='weeklyRevenue']",
        on: "left-start",
      },
      title: "📊 Виджет недельной выручки",
      text: "Используй data-атрибуты чтобы указывать на нужные элементы. Этот виджет показывает динамику за 7 дней.",
      buttons: [
        {
          text: "Назад",
          action: function (this: any) {
            return this.back();
          },
          classes: "shepherd-button-secondary",
        },
        {
          text: "Далее",
          action: function (this: any) {
            return this.next();
          },
          classes: "shepherd-button-primary",
        },
      ],
    },
    {
      attachTo: {
        element: "[data-widget='nps']",
        on: "right-center",
      },
      title: "⭐ NPS виджет",
      text: "Можно перемещать поповер в разные стороны от элемента: top, right, bottom, left.",
      buttons: [
        {
          text: "Назад",
          action: function (this: any) {
            return this.back();
          },
          classes: "shepherd-button-secondary",
        },
        {
          text: "Далее",
          action: function (this: any) {
            return this.next();
          },
          classes: "shepherd-button-primary",
        },
      ],
    },
    {
      attachTo: {
        element: "[data-widget='channelRevenue']",
        on: "top-start",
      },
      title: "💰 Каналы продаж",
      text: "А тут поповер показывается сверху! Система автоматически адаптируется если элемент у края экрана.",
      buttons: [
        {
          text: "Назад",
          action: function (this: any) {
            return this.back();
          },
          classes: "shepherd-button-secondary",
        },
        {
          text: "Далее",
          action: function (this: any) {
            return this.next();
          },
          classes: "shepherd-button-primary",
        },
      ],
    },
    {
      title: "🎉 Готово!",
      text: "Отлично! Ты прошел тестовый урок. Теперь можешь создавать свои уроки: просто добавь шаги в tours.tsx и укажи селекторы элементов. Прогресс сохраняется автоматически в localStorage!",
      buttons: [
        {
          text: "Назад",
          action: function (this: any) {
            return this.back();
          },
          classes: "shepherd-button-secondary",
        },
        {
          text: "Готово",
          action: function (this: any) {
            return this.complete();
          },
          classes: "shepherd-button-primary",
        },
      ],
    },
  ],
};

// Экспортируем маппинг уроков по ID
export const LESSON_TOURS: Record<number, LessonTourDefinition> = {
  1: TEST_DASHBOARD_TOUR, // Урок "Главная страница"
  999: TEST_DASHBOARD_TOUR, // Тестовый урок (запускается кнопкой на Dashboard)
};

// Функция для получения тура по ID урока
export const getLessonTour = (
  lessonId: number,
): LessonTourDefinition | undefined => {
  return LESSON_TOURS[lessonId];
};
