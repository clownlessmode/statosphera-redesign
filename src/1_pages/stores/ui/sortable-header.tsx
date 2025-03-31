import { Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@shared/ui/button";

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  title: string;
}

export function SortableHeader<TData>({
  column,
  title,
}: SortableHeaderProps<TData>) {
  const isSorted = column.getIsSorted();

  const handleSort = () => {
    // Цикл сортировки: asc -> desc -> off
    column.toggleSorting(isSorted === "asc");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center space-x-1"
      onClick={handleSort}
    >
      <span>{title}</span>

      {/* Резервируем место под иконку */}
      <span className="w-4 h-4 flex items-center justify-center">
        {isSorted === "asc" && <ArrowUp className="h-4 w-4" />}
        {isSorted === "desc" && <ArrowDown className="h-4 w-4" />}
        {/* Пустое место, если не отсортировано */}
        {isSorted === false && (
          <span className="invisible">
            <ArrowUp className="h-4 w-4" />
          </span>
        )}
      </span>
    </Button>
  );
}
