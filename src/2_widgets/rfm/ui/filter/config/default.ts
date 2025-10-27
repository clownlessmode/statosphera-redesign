// default.ts
import { FormComparisionValues, FormValues } from "./types";

export const defaultValues: FormValues = {
  rfmList: [],
  agePeriods: [],
  sex: [],
  period: "M0",
  sankey: "M-3 -> M0",
  heatmap: "M-3 -> M0",
};

export const defaultComparisionValues: FormComparisionValues = {
  firstSegment: {
    rfmCode: 111,
    age: [
      "<18",
      "18-25",
      "25-35",
      "35-45",
      "45-60",
      ">60",
      "Не указан возраст",
    ],
    sex: ["Мужской", "Женский", "Не определено"],
    period: "M0",
  },
  secondSegment: {
    rfmCode: 111,
    age: [
      "<18",
      "18-25",
      "25-35",
      "35-45",
      "45-60",
      ">60",
      "Не указан возраст",
    ],
    sex: ["Мужской", "Женский", "Не определено"],
    period: "M0",
  },
};
