import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

/** День для отображения в карточках (срок задачи, дата документа и т.д.). */
export function formatProjectDay(iso: string): string {
  if (!iso) return "—";
  try {
    return format(
      parseISO(iso.length > 10 ? iso : `${iso}T00:00:00`),
      "d MMM yyyy",
      { locale: ru },
    );
  } catch {
    return iso.split("T")[0] ?? "—";
  }
}
