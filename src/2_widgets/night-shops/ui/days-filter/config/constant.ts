import { subDays } from "date-fns";

export const MIN_DATE = new Date(2024, 10, 1);
export const MAX_DATE = subDays(new Date(), 1);
