import React from "react";

import { Lightbulb } from "lucide-react";
import { Idea, VoteType } from "../types";
import { IdeaCard } from "./idea-card";
import { Skeleton } from "@shared/ui/skeleton";

interface IdeasListProps {
  ideas: Idea[];
  userVotes: Record<string, VoteType>;
  onVote: (ideaId: string, type: VoteType) => void;
  isLoading?: boolean;
  isVoting?: boolean;
}

export const IdeasList: React.FC<IdeasListProps> = ({
  ideas,
  userVotes,
  onVote,
  isLoading = false,
  isVoting = false,
}) => {
  return (
    <div className="space-y-6 w-full">
      {/* Список идей */}
      <div className="space-y-4 w-full">
        {isLoading ? (
          <div className="space-y-4 w-full">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-full h-20" />
            ))}
          </div>
        ) : ideas.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-[25vh]">
            <Lightbulb className="w-12 h-12  mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Идей пока нет
            </h3>
            <p className="text-muted-foreground">
              Станьте первым, кто предложит улучшение для Статосферы!
            </p>
          </div>
        ) : (
          ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              userVote={userVotes[idea.id]}
              onVote={onVote}
              isLoading={isVoting}
            />
          ))
        )}
      </div>
    </div>
  );
};
