export const NONE = "__none__";

export const USER_ROLE_OPTIONS = [
  { value: "1", label: "partner" },
  { value: "2", label: "store" },
  { value: "3", label: "office" },
  { value: "4", label: "admin" },
  { value: "5", label: "office_mm" },
  { value: "6", label: "office_union" },
  { value: "7", label: "service" },
  { value: "8", label: "zavod_volkov" },
  { value: "9", label: "farmer" },
  { value: "10", label: "farmer_manager" },
  { value: "11", label: "forest" },
] as const;

export const USER_ROLE_VALUES = [
  NONE,
  ...USER_ROLE_OPTIONS.map((option) => option.value),
] as const;
