import { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@shared/ui/sortable-header";
import { Grill } from "./types";
import { Badge } from "@shared/ui/badge";
import StatusBadge from "@shared/ui/status-badge";
import { Button } from "@shared/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";

import { EllipsisVertical } from "lucide-react";

export const columns: ColumnDef<Grill>[] = [
  {
    id: "actions",
    header: "", // или "Действия"
    cell: ({ row }) => {
      const grill = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Action clicked for", grill);
              }}
            >
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit</DialogTitle>
              <DialogDescription>Make</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title="ID" />,
    enableColumnFilter: true,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <SortableHeader column={column} title="Наименование" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "countSales",
    header: ({ column }) => (
      <SortableHeader column={column} title="Кол-во продаж." />
    ),
    cell: ({ row }) => {
      const countSales = row.getValue("countSales") as number;
      return (
        <Badge
          variant={countSales ? "positive" : "outline"}
          className="w-full h-fit"
        >
          {countSales}
        </Badge>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "countProduct",
    header: ({ column }) => (
      <SortableHeader column={column} title="Приготовлено сегодня" />
    ),
    cell: ({ row }) => {
      const countProduct = row.getValue("countProduct") as number;
      return (
        <Badge
          variant={countProduct ? "positive" : "outline"}
          className="w-full h-fit"
        >
          {countProduct}
        </Badge>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "remainder",
    header: ({ column }) => (
      <SortableHeader column={column} title="Остаток на магазине" />
    ),
    enableColumnFilter: true,
    cell: ({ row }) => {
      const remainder = row.getValue("remainder") as number;
      return (
        <Badge
          variant={remainder ? "positive" : "outline"}
          className="w-full h-fit"
        >
          {remainder}
        </Badge>
      );
    },
  },
  {
    accessorKey: "ed",
    header: ({ column }) => (
      <SortableHeader column={column} title="Мера измерения" />
    ),
    enableColumnFilter: true,
    cell: ({ row }) => {
      const ed = row.getValue("ed") as string;
      return (
        <StatusBadge
          className="w-full h-fit"
          status={ed}
          positiveValues={["шт"]}
          negativeValues={["кг"]}
        />
      );
    },
  },
];
