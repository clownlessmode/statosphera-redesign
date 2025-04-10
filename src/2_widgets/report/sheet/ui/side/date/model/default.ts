// default.ts
import { format, startOfMonth, endOfMonth, subMonths, subDays } from "date-fns";
import { FormValues } from "./types";

const today = new Date();

let dateStart: string;
let dateEnd: string;

if (today.getDate() === 1) {
  const lastMonth = subMonths(today, 1);
  dateStart = format(startOfMonth(lastMonth), "yyyy-MM-dd");
  dateEnd = format(endOfMonth(lastMonth), "yyyy-MM-dd");
} else {
  const yesterday = subDays(today, 1);
  dateStart = format(yesterday, "yyyy-MM-dd");
  dateEnd = format(yesterday, "yyyy-MM-dd");
}

export const defaultValues: FormValues = {
  dateStart,
  dateEnd,
  timeStart: "",
  timeEnd: "",
};
