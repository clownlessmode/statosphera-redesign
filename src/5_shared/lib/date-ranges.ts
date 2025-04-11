import {
  endOfMonth,
  endOfQuarter,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  isAfter,
} from "date-fns";

export const dateRanges = {
  /** Последние 6 месяцев (от сегодняшней даты, включая вчера) */
  halfYear: (today: Date) => {
    const start = subMonths(today, 6);
    const end = subDays(today, 1);
    return { start, end };
  },

  /** С начала года до вчера */
  startOfYear: (today: Date) => {
    const start = startOfYear(today);
    const end = subDays(today, 1);
    return { start, end };
  },

  /** С начала квартала до вчера, но не позже конца квартала */
  currentQuarter: (today: Date) => {
    const start = startOfQuarter(today);
    const yesterday = subDays(today, 1);
    const quarterEnd = endOfQuarter(today);
    const end = isAfter(quarterEnd, yesterday) ? yesterday : quarterEnd;
    return { start, end };
  },

  /** С начала месяца до вчера */
  currentMonth: (today: Date) => {
    const start = startOfMonth(today);
    const end = subDays(today, 1);
    return { start, end };
  },

  /** Последняя неделя (7 дней до вчерашнего дня) */
  lastWeek: (today: Date) => {
    const end = subDays(today, 1);
    const start = subWeeks(end, 1);
    return { start, end };
  },

  /** Предыдущий месяц (полный, от начала до конца) */
  lastMonth: (today: Date) => {
    const lastMonthDate = subMonths(today, 1);
    const start = startOfMonth(lastMonthDate);
    const end = endOfMonth(lastMonthDate);
    return { start, end };
  },
};
