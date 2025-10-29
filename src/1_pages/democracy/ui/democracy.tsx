import React, { useState, useEffect } from "react";
import { Header } from "@widgets/header";
import { democracyController } from "../api";
import { Idea, VoteType, CreateIdeaRequest, Vote } from "../types";
import { IdeasList } from "./ideas-list";
import { AddIdeaForm } from "./add-idea-form";

// Моковые данные пользователя (в реальном приложении это будет из контекста/стора)
const CURRENT_USER = {
  id: "user1",
  name: "Иван Петров",
  role: "Собственник",
};

export const DemocracyPage: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, VoteType>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Загрузка данных при монтировании
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [ideasData, votesData] = await Promise.all([
        democracyController.getIdeas(),
        democracyController.getUserVotes(CURRENT_USER.id),
      ]);

      setIdeas(ideasData);

      // Преобразуем голоса в удобный формат
      const votesMap: Record<string, VoteType> = {};
      Object.values(votesData).forEach((vote: Vote) => {
        votesMap[vote.ideaId] = vote.type;
      });
      setUserVotes(votesMap);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (ideaId: string, type: VoteType) => {
    try {
      setIsVoting(true);
      await democracyController.voteForIdea({
        ideaId,
        type,
        userId: CURRENT_USER.id,
      });

      // Обновляем голоса пользователя
      setUserVotes((prev) => ({
        ...prev,
        [ideaId]: type,
      }));

      // Перезагружаем идеи для обновления рейтингов
      const updatedIdeas = await democracyController.getIdeas();
      setIdeas(updatedIdeas);
    } catch (error) {
      console.error("Ошибка голосования:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const handleAddIdea = async (data: CreateIdeaRequest) => {
    try {
      setIsSubmitting(true);
      const newIdea = await democracyController.createIdea(data);

      setIdeas((prev) => [newIdea, ...prev]);
    } catch (error) {
      console.error("Ошибка создания идеи:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title="Предложения пользователей"
        actions={{
          center: (
            <AddIdeaForm onSubmit={handleAddIdea} isLoading={isSubmitting} />
          ),
        }}
      />
      <div className="rounded-3xl px-4 py-4 gap-4 h-full flex flex-1 w-full bg-background overflow-y-auto">
        <IdeasList
          ideas={ideas}
          userVotes={userVotes}
          onVote={handleVote}
          isLoading={isLoading}
          isVoting={isVoting}
        />
      </div>
    </div>
  );
};
