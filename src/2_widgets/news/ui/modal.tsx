import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { Button } from "@shared/ui/button";

interface NewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const NewsModal = ({
  open,
  onOpenChange,
  onSubmitted,
  title,
  description,
  children,
}: NewsModalProps) => {
  const handleClose = () => {
    onSubmitted();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px]" hideCloseButton>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          {children}
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
