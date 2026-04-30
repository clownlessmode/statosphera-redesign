import { forwardRef, memo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { ThumbsUp, ThumbsDown, Calendar, MoreHorizontal } from "lucide-react";
import { Idea, VoteType } from "../api/types";
import { useSession } from "@entities/session";
import { IdeaEditModal, IdeaDeleteModal } from "@widgets/democracy";
import { StatusBadge } from "./status-badge";
import confetti from "canvas-confetti";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { ROLES } from "@shared/constants/roles";
interface IdeaCardProps {
  idea: Idea;
  onVote: (ideaId: number, type: VoteType) => void;
  isVoteLoading?: boolean;
}

export const IdeaCard = memo(
  forwardRef<HTMLDivElement, IdeaCardProps>(
    ({ idea, onVote, isVoteLoading }, ref) => {
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const { session } = useSession();

      const shootConfettiFromElement = (el: HTMLElement, isLike: boolean) => {
        const rect = el.getBoundingClientRect();
        const origin = {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        };
        confetti({
          particleCount: isLike ? 45 : 18,
          spread: isLike ? 55 : 45,
          startVelocity: isLike ? 25 : 8,
          scalar: isLike ? 0.9 : 1.25,
          gravity: isLike ? 1 : 1.2,
          decay: 0.91,
          ticks: isLike ? 130 : 80,
          origin,
          shapes: ["square", "circle"],
          colors: isLike
            ? ["#22c55e", "#84cc16", "#bef264"]
            : ["#ef4444", "#fb7185", "#fda4af"],
          zIndex: 9999,
          disableForReducedMotion: true,
        });
      };

      const handleVote = async (
        type: "likes" | "dislikes",
        e?: React.MouseEvent<HTMLButtonElement>,
      ) => {
        if (e?.currentTarget) {
          shootConfettiFromElement(e.currentTarget, type === "likes");
        }
        await onVote(idea.id, type);
      };

      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      };

      return (
        <>
          <IdeaEditModal
            idea={idea}
            isOpen={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
          />
          <IdeaDeleteModal
            ideaId={idea.id}
            isOpen={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
          />

          <Card ref={ref} className="gap-4">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-2xl line-clamp-2 max-sm:text-lg">
                  {idea.title}
                </CardTitle>
                {(idea.id_user === session?.idUser ||
                  session?.role === ROLES.ADMIN) &&
                  idea.status === "VOTE" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setIsEditModalOpen(true)}
                        >
                          Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-primary"
                          onClick={() => setIsDeleteModalOpen(true)}
                        >
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-base text-muted-foreground max-sm:text-sm">
                {idea.description}
              </p>

              <div className="flex items-center gap-1 text-sm text-muted-foreground max-sm:text-xs">
                <Calendar className="w-4 h-4" />
                <span>
                  {idea.created_at === idea.updated_at
                    ? formatDate(idea.created_at)
                    : `Обновлено: ${formatDate(idea.updated_at)}`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={idea.userGrade === "likes" ? "default" : "outline"}
                    size="sm"
                    onClick={(e) =>
                      idea.status === "VOTE"
                        ? handleVote("likes", e)
                        : undefined
                    }
                    disabled={isVoteLoading || idea.status !== "VOTE"}
                    className="flex items-center gap-2"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="max-sm:hidden">Нравится</span>
                  </Button>
                  <Button
                    variant={
                      idea.userGrade === "dislikes" ? "destructive" : "outline"
                    }
                    size="sm"
                    onClick={(e) =>
                      idea.status === "VOTE"
                        ? handleVote("dislikes", e)
                        : undefined
                    }
                    disabled={isVoteLoading || idea.status !== "VOTE"}
                    className="flex items-center gap-2"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="max-sm:hidden">Не нравится</span>
                  </Button>
                </div>
                <StatusBadge status={idea.status} />
              </div>
            </CardContent>
          </Card>
        </>
      );
    },
  ),
);

IdeaCard.displayName = "IdeaCard";
