// default.ts
import { format, startOfMonth, endOfMonth, subMonths, subDays } from "date-fns";
import { FormValues } from "./types";

const today = new Date();

let dateStart: string;
let dateEnd: string;

if (today.getDate() === 1) {
  // Сегодня — первое число месяца → берём весь предыдущий месяц
  const lastMonth = subMonths(today, 1);
  dateStart = format(startOfMonth(lastMonth), "yyyy-MM-dd");
  dateEnd = format(endOfMonth(lastMonth), "yyyy-MM-dd");
} else {
  // Иначе → с начала месяца до вчерашнего дня
  dateStart = format(startOfMonth(today), "yyyy-MM-dd");
  dateEnd = format(subDays(today, 1), "yyyy-MM-dd");
}

export const defaultValues: FormValues = {
  dateStart,
  dateEnd,
  timeStart: "",
  timeEnd: "",
};
