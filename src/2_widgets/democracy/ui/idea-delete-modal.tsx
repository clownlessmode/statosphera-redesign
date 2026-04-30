import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@shared/ui/dialog";
import { useDemocracyController } from "@pages/democracy";

export const IdeaDeleteModal = ({
  ideaId,
  isOpen,
  onOpenChange,
}: {
  ideaId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { deleteIdea, isDeleteIdeaLoading } = useDemocracyController();

  const handleDelete = async (ideaId: number) => {
    deleteIdea(
      { ideaId },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Удалить идею</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить идею? Это действие нельзя будет
            отменить.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="max-sm:w-full"
            onClick={() => onOpenChange(false)}
          >
            Отмена
          </Button>
          <Button
            onClick={() => handleDelete(ideaId)}
            disabled={isDeleteIdeaLoading}
            className="max-sm:w-full"
          >
            {isDeleteIdeaLoading ? "Удаление..." : "Удалить"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
