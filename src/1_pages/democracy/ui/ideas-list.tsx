import React, { useRef, useCallback } from "react";

import { Lightbulb } from "lucide-react";
import { Idea, VoteType } from "../api/types";
import { IdeaCard } from "./idea-card";
import { Skeleton } from "@shared/ui/skeleton";

interface IdeasListProps {
  ideas: Idea[];
  onVote: (ideaId: number, type: VoteType) => void;
  isLoading?: boolean;
  isVoteLoading?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export const IdeasList: React.FC<IdeasListProps> = ({
  ideas,
  onVote,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isVoteLoading,
}) => {
  // Подготавливаем observer для бесконечной загрузки элементов
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  return (
    <div className="space-y-6 w-full">
      {/* Список идей */}
      <div className="space-y-4 w-full">
        {isLoading && (
          <div className="space-y-4 w-full">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-full h-20" />
            ))}
          </div>
        )}
        {ideas.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center mt-[25vh]">
            <Lightbulb className="w-12 h-12  mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Идей пока нет
            </h3>
            <p className="text-muted-foreground">
              Станьте первым, кто предложит свое улучшение!
            </p>
          </div>
        )}
        {ideas.length > 0 &&
          !isLoading &&
          ideas.map((idea, index) => {
            const isLast = index === ideas.length - 1;
            return (
              <IdeaCard
                key={`${idea.id}-${index}`}
                ref={isLast ? lastElementRef : undefined}
                idea={idea}
                onVote={onVote}
                isVoteLoading={isVoteLoading}
              />
            );
          })}
      </div>
    </div>
  );
};
