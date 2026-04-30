import React, { useState } from "react";
import { Header } from "@widgets/header";
import {
  useDemocracyController,
  useInfiniteDemocracyController,
} from "../api/controller";
import { IdeasList } from "./ideas-list";
import { IdeaCreateModal } from "@widgets/democracy";
import { VoteType } from "../api/types";
import { Button } from "@shared/ui/button";
import { useIsMobile } from "@shared/hooks/use-mobile";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@shared/ui/select";

export const DemocracyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "my">("all");
  const {
    ideas,
    isIdeasLoading,
    isIdeasFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteDemocracyController({ limit: 2 });
  const { myIdeas, isMyIdeasLoading, voteIdea, isVoteIdeaLoading } =
    useDemocracyController();
  const isMobile = useIsMobile();

  const handleVote = async (ideaId: number, type: VoteType) => {
    await voteIdea({ ideaId, dto: { grade: type } });
  };

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={isMobile ? "Предложения" : "Предложения пользователей"}
        actions={{
          left: !isMobile && (
            <div className="flex items-center gap-2">
              <Button
                variant={activeTab === "all" ? "default" : "outline"}
                onClick={() => setActiveTab("all")}
              >
                Все предложения
              </Button>
              <Button
                variant={activeTab === "my" ? "default" : "outline"}
                onClick={() => setActiveTab("my")}
              >
                Мои предложения
              </Button>
            </div>
          ),
          right: !isMobile && <IdeaCreateModal />,
        }}
      />
      <div className="rounded-3xl px-4 py-4 gap-4 h-full flex flex-col flex-1 w-full bg-background overflow-y-auto">
        {isMobile && (
          <div className="flex flex-row w-full justify-between gap-4">
            <Select
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "all" | "my")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все предложения</SelectItem>
                <SelectItem value="my">Мои предложения</SelectItem>
              </SelectContent>
            </Select>
            <IdeaCreateModal />
          </div>
        )}
        <IdeasList
          ideas={activeTab === "all" ? ideas : myIdeas}
          isFetchingNextPage={isIdeasFetchingNextPage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          onVote={handleVote}
          isVoteLoading={isVoteIdeaLoading}
          isLoading={activeTab === "all" ? isIdeasLoading : isMyIdeasLoading}
        />
      </div>
    </div>
  );
};
