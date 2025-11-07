import { subDays, subMonths } from "date-fns";

export const MIN_DATE = new Date(2018, 4, 1);
export const MAX_DATE = subDays(new Date(), 1);

export const DATE_RANGES = {
  m0: (today: Date) => {
    const start = subMonths(today, 3);
    const end = subDays(today, 0);
    return { start, end };
  },

  m3: (today: Date) => {
    const start = subMonths(today, 6);
    const end = subMonths(today, 3);
    return { start, end };
  },

  m6: (today: Date) => {
    const start = subMonths(today, 9);
    const end = subMonths(today, 6);
    return { start, end };
  },
};
