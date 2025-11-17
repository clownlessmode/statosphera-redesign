// default.ts
import { format } from "date-fns";
import { FormValues } from "./types";

const dateStart = format(new Date(2022, 0, 1), "yyyy-MM-dd");
const dateEnd = format(new Date(), "yyyy-MM-dd");

export const defaultValues: FormValues = {
  dateStart,
  dateEnd,
  timeStart: "",
  timeEnd: "",
  rfmList: [],
  period: "",
  audienceId: [],
};
