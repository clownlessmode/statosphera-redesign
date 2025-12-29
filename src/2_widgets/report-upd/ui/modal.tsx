import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { Button } from "@shared/ui/button";

interface ReportUpdModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
}

export const ReportUpdModal = ({
  open,
  onOpenChange,
  onSubmitted,
}: ReportUpdModalProps) => {
  const handleClose = () => {
    onSubmitted();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px]" hideCloseButton>
        <DialogHeader>
          <DialogTitle>ВСЕ ОТЧЕТЫ В ОДНОМ РАЗДЕЛЕ</DialogTitle>
          <DialogDescription>
            Теперь все отчёты, включая «Списания», «Проект Лес» и «Парные
            продажи», вынесены в один раздел.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <img
            src="/news/report.png"
            alt="News"
            className="rounded-lg w-full h-auto"
          />
          <div className="flex gap-2 justify-end">
            <Button onClick={handleClose} className="w-full">
              Хорошо
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
