import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@shared/ui/sortable-header";
import { Badge } from "@shared/ui/badge";
import StatusBadge from "@shared/ui/status-badge";
import { Button } from "@shared/ui/button";

import { EllipsisVertical } from "lucide-react";

// Тип для строки данных
type RowData = Record<string, any>;

/**
 * Генерация колонок на основе данных
 */
export const generateDynamicColumns = (
  data: RowData[]
): ColumnDef<RowData>[] => {
  if (!data || data.length === 0) return [];

  const sample = data[0];

  const dynamicColumns: ColumnDef<RowData>[] = Object.keys(sample).map(
    (key) => {
      return {
        accessorKey: key,
        header: ({ column }) => (
          <SortableHeader column={column} title={getColumnTitle(key)} />
        ),
        cell: ({ row }) => {
          const value = row.getValue(key);

          // Кастомизация отображения по типу
          if (typeof value === "number") {
            return (
              <Badge
                variant={value ? "positive" : "outline"}
                className="w-full h-fit"
              >
                {value.toLocaleString("ru-RU")}
              </Badge>
            );
          }

          if (
            key.toLowerCase().includes("date") ||
            key.toLowerCase().includes("day")
          ) {
            const formatted = new Date(
              value as string | number
            ).toLocaleDateString("ru-RU");
            return <span>{formatted}</span>;
          }

          if (key === "ed") {
            return (
              <StatusBadge
                className="w-full h-fit"
                status={(value as string) || null}
                positiveValues={["шт"]}
                negativeValues={["кг"]}
              />
            );
          }

          return <span>{value as string | number}</span>;
        },
        enableColumnFilter: true,
      };
    }
  );

  const actionsColumn: ColumnDef<RowData> = {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Action clicked", rowData);
            // setSelectedRow(rowData); // и показывай Dialog где-то выше
          }}
        >
          <EllipsisVertical className="w-4 h-4" />
        </Button>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  };

  return [actionsColumn, ...dynamicColumns];
};

// Можно использовать для локализации заголовков
const getColumnTitle = (key: string): string => {
  const titles: Record<string, string> = {
    id: "ID",
    day: "Дата",
    proceeds: "Выручка",
  };

  return titles[key] || key;
};
