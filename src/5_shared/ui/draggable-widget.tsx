import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@shared/lib/utils";
import { GripVertical } from "lucide-react";
import { ReactNode } from "react";

interface DraggableWidgetProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

export function DraggableWidget({
  id,
  children,
  disabled = false,
}: DraggableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group min-h-[400px]",
        isDragging && "z-50 opacity-50",
      )}
    >
      {!disabled && (
        <div
          {...attributes}
          {...listeners}
          className={cn(
            "absolute -top-2 -left-2 z-10",
            "flex items-center justify-center",
            "w-8 h-8 rounded-lg",
            "bg-primary/10 border-2 border-primary/20",
            "cursor-grab active:cursor-grabbing",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-200",
            "hover:bg-primary/20 hover:border-primary/40",
          )}
        >
          <GripVertical className="w-4 h-4 text-primary" />
        </div>
      )}
      <div className={cn("h-full", isDragging && "cursor-grabbing")}>
        {children}
      </div>
    </div>
  );
}
