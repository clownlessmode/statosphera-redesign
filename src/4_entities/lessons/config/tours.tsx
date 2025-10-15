export interface LessonTourDefinition {
  lessonId: number;
  steps: any[];
  onStepChange?: (step: number) => void;
}

// Урок для Dashboard - подробный тур по всем виджетам
export const DASHBOARD_TOUR: LessonTourDefinition = {
  lessonId: 1,
  steps: [
    {
      title: "🎯 Добро пожаловать на дашборд!",
      text: "Привет! Это ваш персональный дашборд - центр управления всеми ключевыми показателями бизнеса. Здесь вы найдете всю важную информацию в удобном формате. Давайте изучим все возможности!",
      buttons: [
        {
          text: "Начать изучение",
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
      title: "📍 Заголовок дашборда",
      text: "Здесь отображается название текущей страницы. Дашборд - это ваша главная рабочая область, где собраны все важные метрики.",
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
      title: "📊 Недельная выручка",
      text: "Этот виджет показывает динамику выручки за последние 7 дней. График помогает отслеживать тренды и выявлять закономерности в продажах. Красные и зеленые индикаторы показывают рост или падение относительно предыдущего периода.",
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
      title: "⭐ NPS (Net Promoter Score)",
      text: "NPS - это ключевой показатель лояльности клиентов. Он измеряется от -100 до +100. Значения выше 0 считаются хорошими, выше 50 - отличными. Этот показатель помогает понять, готовы ли клиенты рекомендовать ваш продукт.",
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
      text: "Здесь показана выручка по разным каналам продаж. Это помогает понять, какие каналы наиболее эффективны и где стоит сосредоточить усилия. Круговые диаграммы наглядно показывают распределение доходов.",
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
      title: "🔄 Drag & Drop - Перемещение виджетов",
      text: "Одна из самых крутых функций дашборда - это возможность перетаскивать виджеты! При наведении на виджет появляется специальная ручка для перетаскивания (иконка с полосками). Попробуйте навести мышь на любой виджет и увидите эту ручку.",
      buttons: [
        {
          text: "Назад",
          action: function (this: any) {
            return this.back();
          },
          classes: "shepherd-button-secondary",
        },
        {
          text: "Понятно",
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
        on: "top-center",
      },
      title: "🎯 Практическое задание",
      text: "Теперь попробуйте перетащить этот виджет недельной выручки:\n\n1. Наведите мышь на виджет\n2. Увидите ручку для перетаскивания (иконка с полосками)\n3. Захватите эту ручку мышкой\n4. Перетащите виджет в другое место\n\nСистема автоматически перейдет к следующему шагу, когда вы завершите перетаскивание!",
      buttons: [
        {
          text: "Назад",
          action: function (this: any) {
            return this.back();
          },
          classes: "shepherd-button-secondary",
        },
        // Кнопка "Понял" убрана - пользователь должен реально перетащить виджет
      ],
    },
    {
      attachTo: {
        element: "[data-widget='margin']",
        on: "left-start",
      },
      title: "📈 Маржа",
      text: "Маржа показывает процент прибыли от продаж. Это ключевой показатель рентабельности бизнеса. Чем выше маржа, тем больше прибыли получает компания с каждого рубля выручки. Маржа рассчитывается как (прибыль / выручка) × 100%.",
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
        element: "[data-widget='markup']",
        on: "right-start",
      },
      title: "💹 Наценка",
      text: "Наценка показывает, на сколько процентов цена товара превышает его себестоимость. Это важный показатель для ценообразования. Наценка помогает понять, достаточно ли прибыли заложено в цену товара для покрытия всех расходов.",
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
        element: "[data-widget='writeOffIndicator']",
        on: "top-center",
      },
      title: "📉 Списания (показатель)",
      text: "Этот виджет показывает объем списаний - товаров, которые пришлось списать из-за порчи, истечения срока годности или других причин. Стрелочка вниз (красная) означает увеличение списаний, стрелочка вверх (зеленая) - уменьшение. Чем меньше списания, тем эффективнее управление товарными запасами.",
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
        element: "[data-widget='salesStructure']",
        on: "right-center",
      },
      title: "🏗️ Структура продаж",
      text: "Этот виджет показывает структуру продаж по категориям товаров или услуг. Он помогает понять, какие направления бизнеса приносят больше всего дохода и где есть потенциал для роста. Круговые диаграммы наглядно показывают долю каждой категории в общих продажах.",
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
        element: "[data-widget='currentStats']",
        on: "left-start",
      },
      title: "📊 Текущие показатели",
      text: "Этот блок содержит ключевые метрики за текущий месяц: выручку, количество чеков и средний чек. Каждый показатель обновляется в реальном времени и помогает быстро оценить текущее состояние бизнеса. Давайте изучим каждую карточку подробнее.",
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
        element: "[data-widget='writeoffsLeaders']",
        on: "top-center",
      },
      title: "📉 Аутсайдеры по списаниям",
      text: "Этот виджет показывает магазины с наибольшим процентом списаний. Горизонтальные столбцы наглядно демонстрируют, какие точки требуют особого внимания. Чем длиннее столбец, тем больше проблем со списаниями в данном магазине. Это помогает выявить проблемные зоны и принять меры по улучшению.",
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
        element: "[data-widget='loyaltyCard']",
        on: "left-start",
      },
      title: "💎 Применение карт лояльности",
      text: "Этот виджет показывает, сколько раз клиенты использовали карты лояльности и какой процент от общего количества покупок они составляют. Высокий процент использования карт лояльности говорит о хорошей клиентской базе и эффективной программе лояльности.",
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
        element: "[data-widget='imRevenue']",
        on: "right-start",
      },
      title: "🛒 Выручка интернет-магазина",
      text: "Этот виджет показывает выручку от онлайн-продаж. Стрелочка вниз (красная) означает снижение выручки по сравнению с прошлым годом, стрелочка вверх (зеленая) - рост. Это важный показатель для оценки развития цифровых каналов продаж.",
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
        element: "[data-widget='leaderImSales']",
        on: "top-center",
      },
      title: "🏆 Лидер интернет-продаж",
      text: "Этот виджет показывает магазин с наибольшей выручкой от онлайн-продаж. Это помогает понять, какие точки наиболее успешно развивают цифровые каналы и могут служить примером для других магазинов.",
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
        element: "[data-widget='hoursRevenue']",
        on: "right-center",
      },
      title: "⏰ Выручка по часам (сегодня)",
      text: "Этот график показывает динамику выручки в течение дня. Пики обычно приходятся на обеденное время и вечерние часы. Это помогает понять, в какое время магазины наиболее загружены и когда стоит увеличить количество персонала.",
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
        element: "[data-widget='planPercent']",
        on: "left-start",
      },
      title: "🎯 Процент выполнения плана",
      text: "Этот виджет показывает, насколько успешно выполняется план по ключевым показателям: выручке, количеству чеков и среднему чеку. Значения выше 100% означают перевыполнение плана, ниже 100% - недовыполнение. Это помогает контролировать достижение поставленных целей.",
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
        element: "[data-widget='topWriteoffs']",
        on: "top-center",
      },
      title: "📊 Топ списаний по группам",
      text: "Этот виджет показывает списания по категориям товаров. Светло-розовые столбцы показывают выручку, темно-фиолетовые - списания. Это помогает понять, какие категории товаров наиболее проблематичны с точки зрения списаний и требуют особого внимания.",
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
        element: "[data-widget='todayStats']",
        on: "left-start",
      },
      title: "📅 Показатели за сегодня",
      text: "Этот блок показывает ключевые метрики за текущий день: выручку и количество чеков. Стрелочки показывают изменение по сравнению с прошлой неделей. Красная стрелочка вниз означает снижение, зеленая стрелочка вверх - рост. Это помогает быстро оценить текущую ситуацию.",
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
        element: "[data-widget='antiLoyalTop']",
        on: "right-center",
      },
      title: "📉 Анти-топ по применению карт лояльности",
      text: "Этот виджет показывает магазины с наименьшим процентом использования карт лояльности. Светло-синие столбцы наглядно демонстрируют проблемные зоны. Это помогает выявить магазины, где нужно улучшить работу с программой лояльности и обучить персонал.",
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
      title: "🎉 Поздравляем!",
      text: "Отлично! Вы изучили все основные возможности дашборда. Теперь вы знаете:\n\n• Как работают различные виджеты и что они показывают\n• Как интерпретировать стрелочки и индикаторы\n• Как перетаскивать виджеты для настройки под себя\n• Какие показатели важны для бизнеса\n• Как анализировать данные для принятия решений\n\nДашборд будет вашим надежным помощником в управлении бизнесом!",
      buttons: [
        {
          text: "Назад",
          action: function (this: any) {
            return this.back();
          },
          classes: "shepherd-button-secondary",
        },
        {
          text: "Завершить",
          action: function (this: any) {
            return this.complete();
          },
          classes: "shepherd-button-primary",
        },
      ],
    },
  ],
};

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
  1: DASHBOARD_TOUR, // Урок "Дашборд"
  999: TEST_DASHBOARD_TOUR, // Тестовый урок (запускается кнопкой на Dashboard)
};

// Функция для получения тура по ID урока
export const getLessonTour = (
  lessonId: number,
): LessonTourDefinition | undefined => {
  return LESSON_TOURS[lessonId];
};
