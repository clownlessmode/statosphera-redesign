import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@shared/ui/card";
import { TestQuestion } from "@entities/lessons";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@shared/lib/utils";

interface OrderCardsQuestionProps {
  question: TestQuestion;
  userAnswer: string[] | null;
  onAnswer: (answer: string[]) => void;
}

interface SortableCardProps {
  card: string;
  index: number;
}

const SortableCard: React.FC<SortableCardProps> = ({ card, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "hover:shadow-sm transition-shadow cursor-grab active:cursor-grabbing py-1",
        isDragging && "z-50 opacity-50",
      )}
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-normal">{card}</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">{index + 1}</span>
            <GripVertical className="w-3 h-3 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const OrderCardsQuestion: React.FC<OrderCardsQuestionProps> = ({
  question,
  userAnswer,
  onAnswer,
}) => {
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    if (userAnswer) {
      setCards(userAnswer);
    } else if (question.cards) {
      // Перемешиваем карточки для начального состояния
      const shuffled = [...question.cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
    }
  }, [question.cards, userAnswer]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        const newCards = arrayMove(items, oldIndex, newIndex);
        onAnswer(newCards);
        return newCards;
      });
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Перетащите карточки в правильном порядке:
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {cards.map((card, index) => (
              <SortableCard key={card} card={card} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
