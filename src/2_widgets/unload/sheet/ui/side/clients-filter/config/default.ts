import { FormValues } from "./types";

export const defaultValues: FormValues = {
  guidDiscount: [],
  guidBonus: [],
  age: [0, 100],
  frequency: {
    from: null,
    to: null,
  },
  totalPurchase: {
    from: null,
    to: null,
  },
  proceedPerCheck: {
    from: null,
    to: null,
  },
  avgCheckLen: {
    from: null,
    to: null,
  },
  avg: {
    from: null,
    to: null,
  },
  countBonus: {
    from: null,
    to: null,
  },
  ageAccount: {
    from: { years: null, months: null, days: null },
    to: { years: null, months: null, days: null },
  },
  sex: [],
  colorsDiscount: [],
};
