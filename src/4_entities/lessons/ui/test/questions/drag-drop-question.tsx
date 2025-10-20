import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@shared/ui/card";
import { TestQuestion } from "@entities/lessons";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@shared/lib/utils";
import { X } from "lucide-react";

interface DragDropQuestionProps {
  question: TestQuestion;
  userAnswer: string[] | null;
  onAnswer: (answer: string[]) => void;
}

interface DraggableCardProps {
  card: string;
}

interface DroppableAreaProps {
  category: string;
  cards: string[];
  onRemoveCard: (card: string) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab active:cursor-grabbing py-1 px-3 inline-block",
        isDragging && "opacity-50",
      )}
      {...attributes}
      {...listeners}
    >
      <CardContent className="!p-0">
        <span className="text-sm">{card}</span>
      </CardContent>
    </Card>
  );
};

const DroppableArea: React.FC<DroppableAreaProps> = ({
  category,
  cards,
  onRemoveCard,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: category,
  });

  return (
    <div className="space-y-2">
      <h4 className="font-medium">{category}:</h4>
      <div
        ref={setNodeRef}
        className={cn(
          "min-h-[100px] border-2 border-dashed rounded-lg p-4 transition-colors",
          isOver
            ? "border-primary/50 bg-primary/5"
            : "border-muted-foreground/25",
        )}
      >
        <div className="flex flex-wrap gap-1">
          {cards.map((card, index) => (
            <Card
              key={`${category}-${card}-${index}`}
              className="cursor-pointer hover:shadow-md transition-shadow py-1 px-3 inline-block"
              onClick={() => onRemoveCard(card)}
            >
              <CardContent className="!p-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm">{card}</span>
                  <X className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {cards.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Перетащите карточки сюда
          </p>
        )}
      </div>
    </div>
  );
};

export const DragDropQuestion: React.FC<DragDropQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [availableCards, setAvailableCards] = useState<string[]>([]);
  const [droppedCards, setDroppedCards] = useState<{
    [category: string]: string[];
  }>({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    if (question.cards) {
      setAvailableCards(question.cards);
    }
  }, [question.cards]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const card = active.id as string;
    const category = over.id as string;

    // Если карточка уже в этой категории, ничего не делаем
    if (droppedCards[category]?.includes(card)) return;

    // Удаляем карточку из всех категорий
    const newDroppedCards = { ...droppedCards };
    Object.keys(newDroppedCards).forEach((cat) => {
      newDroppedCards[cat] =
        newDroppedCards[cat]?.filter((c) => c !== card) || [];
    });

    // Добавляем карточку в новую категорию
    newDroppedCards[category] = [...(newDroppedCards[category] || []), card];
    setDroppedCards(newDroppedCards);

    // Удаляем из доступных карточек
    setAvailableCards((prev) => prev.filter((c) => c !== card));

    // Обновляем ответ
    const newAnswer = Object.entries(newDroppedCards).flatMap(([cat, cards]) =>
      cards.map((card) => `${cat}:${card}`),
    );
    onAnswer(newAnswer);
  };

  const removeCard = (card: string, category: string) => {
    setDroppedCards((prev) => ({
      ...prev,
      [category]: prev[category]?.filter((c) => c !== card) || [],
    }));

    setAvailableCards((prev) => [...prev, card]);

    // Обновляем ответ
    const newAnswer = Object.entries({
      ...droppedCards,
      [category]: droppedCards[category]?.filter((c) => c !== card) || [],
    }).flatMap(([cat, cards]) => cards.map((card) => `${cat}:${card}`));

    onAnswer(newAnswer);
  };

  const categories = ["Лояльность", "Прибыльность"];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Перетащите карточки в соответствующие категории:
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* Доступные карточки */}
        <div className="space-y-2">
          <h4 className="font-medium">Доступные карточки:</h4>
          <div className="flex flex-wrap gap-1">
            {availableCards.map((card) => (
              <DraggableCard key={`available-${card}`} card={card} />
            ))}
          </div>
        </div>

        {/* Категории */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <DroppableArea
              key={category}
              category={category}
              cards={droppedCards[category] || []}
              onRemoveCard={(card) => removeCard(card, category)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};
