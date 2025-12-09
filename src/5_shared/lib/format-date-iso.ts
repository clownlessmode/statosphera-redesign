import { parse, isValid, format } from "date-fns";

export default function formatDateIso(dateStr: string) {
  // Если уже ISO (простая проверка на наличие дефисов и год в начале)
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr;

  const parsedDate = parse(dateStr, "dd.MM.yyyy", new Date());
  if (isValid(parsedDate)) {
    return format(parsedDate, "yyyy-MM-dd");
  }
  return dateStr;
}
