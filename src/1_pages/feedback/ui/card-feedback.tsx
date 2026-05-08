import { Card, CardContent } from "@shared/ui/card";
import { FeedbackAllResponse, FeedbackMyResponse } from "../api/types/response";
import { format, parseISO } from "date-fns";
import { useSession } from "@entities/session";
import { ModalUpdateFeedback } from "./modal-update-feedback";

const rankColorMap: Record<string, string> = {
  Минимальная:
    "text-emerald-600 border border-emerald-600 rounded-full px-2 py-0.2",
  Низкая: "text-blue-600 border border-blue-600 rounded-full px-2 py-0.2",
  Средняя: "text-yellow-600 border border-yellow-600 rounded-full px-2 py-0.2",
  Высокая: "text-orange-600 border border-orange-600 rounded-full px-2 py-0.2",
  Критическая: "text-red-600 border border-red-600 rounded-full px-2 py-0.2",
};

const statusColorMap: Record<string, string> = {
  Ожидает: "text-foreground",
  "В процессе": "text-indigo-600",
  Выполнено: "text-green-600",
  Отклонено: "text-red-600",
};

type CardFeedbackProps = {
  feedback: FeedbackMyResponse | FeedbackAllResponse;
};

function formatFeedbackCreatedAt(value: string): string {
  try {
    return format(parseISO(value), "dd.MM.yyyy HH:mm");
  } catch {
    return value;
  }
}

export const CardFeedback = ({ feedback }: CardFeedbackProps) => {
  const { session } = useSession();
  const idRole = session?.idRole;
  const rankColor = rankColorMap[feedback.rank] ?? "text-muted-foreground";
  const statusColor =
    statusColorMap[feedback.status] ?? "text-muted-foreground";
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <p className="text-md">{feedback.type}</p>
              <p className="text-xs text-muted-foreground text-center">
                {formatFeedbackCreatedAt(feedback.create_add)}
              </p>
            </div>
            <p className={`text-sm font-medium ${rankColor}`}>
              {feedback.rank}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Статус:{" "}
            <span className={`text-foreground font-medium ${statusColor}`}>
              {feedback.status ? feedback.status : "Не указан"}
            </span>
          </p>
          {"name_user" in feedback ? (
            <p className="text-xs text-muted-foreground">
              Автор: {feedback.name_user}
            </p>
          ) : null}
        </div>
        <div>
          <p className="text-sm">{feedback.text_message}</p>
          {idRole === 4 ? (
            <div className="flex justify-end">
              <ModalUpdateFeedback feedback={feedback} />
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
