// default.ts
import { format, startOfMonth } from "date-fns";
import { FormValues } from "./types";

const dateStart: string = format(
  startOfMonth(new Date(2018, 4, 1)),
  "yyyy-MM-dd",
);
const dateEnd: string = format(new Date(), "yyyy-MM-dd");

export const defaultValues: FormValues = {
  dateStart,
  dateEnd,
  timeStart: "",
  timeEnd: "",
  rfmList: [],
  period: "",
  audienceId: [],
};
