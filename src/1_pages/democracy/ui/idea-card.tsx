import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Badge } from "@shared/ui/badge";
import { ThumbsUp, ThumbsDown, Calendar } from "lucide-react";
import { Idea, VoteType } from "../types";

interface IdeaCardProps {
  idea: Idea;
  userVote?: VoteType | null;
  onVote: (ideaId: string, type: VoteType) => void;
  isLoading?: boolean;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  userVote,
  onVote,
  isLoading = false,
}) => {
  const handleVote = (type: VoteType) => {
    if (isLoading) return;
    onVote(idea.id, type);
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
    <Card className="w-full hover:shadow-md transition-shadow gap-3">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
            {idea.title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {idea.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(idea.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={userVote === "like" ? "default" : "outline"}
              size="sm"
              onClick={() => handleVote("like")}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{idea.likesCount}</span>
            </Button>

            <Button
              variant={userVote === "dislike" ? "destructive" : "outline"}
              size="sm"
              onClick={() => handleVote("dislike")}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{idea.dislikesCount}</span>
            </Button>
          </div>

          {idea.status === "implemented" && (
            <Badge
              variant="default"
              className="bg-positive text-positive-foreground"
            >
              ✅ Реализовано
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
