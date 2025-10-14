import { Calendar1, CalendarDays, CalendarRange } from "lucide-react";

export const PERIOD = [
  {
    label: "M0",
    value: "M0",
    icon: Calendar1,
  },
  {
    label: "M-3",
    value: "M-3",
    icon: CalendarDays,
  },
  {
    label: "M-6",
    value: "M-6",
    icon: CalendarRange,
  },
];

export const DYNAMICS_PERIOD_SANKEY = [
  {
    label: "M-3 -> M0",
    value: "M-3 -> M0",
  },
  {
    label: "M-6 -> M-0",
    value: "M-6 -> M-0",
  },
  {
    label: "M-6 -> M-3",
    value: "M-6 -> M-3",
  },

  {
    label: "M-6 -> M-3 -> M0",
    value: "M-6 -> M-3 -> M0",
  },
];

export const DYNAMICS_PERIOD_HEATTMAP = [
  {
    label: "M-3 -> M0",
    value: "M-3 -> M0",
  },
  {
    label: "M-6 -> M0",
    value: "M-6 -> M0",
  },
  {
    label: "M-6 -> M-3",
    value: "M-6 -> M-3",
  },
];
