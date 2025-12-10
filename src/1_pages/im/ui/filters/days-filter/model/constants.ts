import { subDays } from "date-fns";

const today = new Date();

export const MIN_DATE = new Date(2022, 10, 20);
export const MAX_DATE = subDays(today, 1);
