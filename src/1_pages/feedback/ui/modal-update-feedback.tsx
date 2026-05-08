import { useState } from "react";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { FeedbackAllResponse, FeedbackMyResponse } from "../api/types/response";
import { useUpdateFeedbackStatus } from "../api/controller";
import { Textarea } from "@shared/ui/textarea";

enum FEEDBACK_STATUS {
  WAITING = "Ожидает",
  IN_PROGRESS = "В процессе",
  COMPLETED = "Выполнено",
  CANCELED = "Отклонено",
}

const FEEDBACK_STATUS_OPTIONS = Object.values(FEEDBACK_STATUS);

export const ModalUpdateFeedback = ({
  feedback,
}: {
  feedback: FeedbackAllResponse | FeedbackMyResponse;
}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(feedback.status);
  const [comment, setComment] = useState("");
  const { mutate: updateFeedbackStatus, isPending } = useUpdateFeedbackStatus();

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setStatus(feedback.status);
      setComment("");
    }
    setOpen(nextOpen);
  };

  const handleSave = () => {
    updateFeedbackStatus(
      { id: feedback.id, status, comment },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Редактировать
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Обновить статус</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              Нынешний статус заявки:{" "}
            </p>
            <p className="text-sm font-medium">{feedback.status}</p>
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
              {FEEDBACK_STATUS_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={isPending}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
