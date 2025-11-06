import { FormValues } from "./types";

export const defaultValues: FormValues = {
  isIm: null, // null означает "Все" для BooleanCheckboxCard
  imTypeOrder: [], // пустой массив означает "Все" для CheckboxCards с selectAll
  imDeliveryMethod: [], // пустой массив означает "Все" для CheckboxCards с selectAll
  imPaymentMethod: [], // пустой массив означает "Все" для CheckboxCards без selectAll
  imStatusOrder: [],
  imReceiveInterval: [],
  imPromo: [],
};
