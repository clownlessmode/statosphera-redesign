import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@shared/ui/badge";
import { Payment } from "./data";

import { SortableHeader } from "./sortable-header";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "idStore",
    header: ({ column }) => <SortableHeader column={column} title="ID" />,
    enableColumnFilter: true,
  },
  {
    accessorKey: "storeName",
    header: ({ column }) => <SortableHeader column={column} title="Адрес" />,
    enableColumnFilter: true,
  },
  {
    accessorKey: "storeCondition",
    header: ({ column }) => <SortableHeader column={column} title="Статус" />,
    cell: ({ row }) => {
      const status = row.getValue("storeCondition") as string;
      const normalizedStatus = status.toLowerCase();

      let variant: "default" | "destructive" | "secondary" = "secondary";

      if (normalizedStatus === "действующие") variant = "default";
      else if (normalizedStatus === "закрытые") variant = "secondary";

      return (
        <Badge variant={variant} className="w-full capitalize">
          {status.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "storeRegion",
    header: ({ column }) => <SortableHeader column={column} title="Регион" />,
    enableColumnFilter: true,
  },
  {
    accessorKey: "storeCity",
    header: ({ column }) => <SortableHeader column={column} title="Город" />,
    enableColumnFilter: true,
  },
  {
    accessorKey: "nameManager",
    header: ({ column }) => (
      <SortableHeader column={column} title="Управляющий" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "storeEmail",
    header: ({ column }) => <SortableHeader column={column} title="Почта" />,
    enableColumnFilter: true,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <SortableHeader column={column} title="Открытие" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      return (
        <div>
          {new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(date)}
        </div>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <SortableHeader column={column} title="Последняя продажа" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      return (
        <div>
          {new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(date)}
        </div>
      );
    },
    enableColumnFilter: true,
  },
];
