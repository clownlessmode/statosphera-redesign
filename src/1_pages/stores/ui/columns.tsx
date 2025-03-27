import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "./data";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "idStore",
    enableResizing: true,
    header: "ID",
  },
  {
    accessorKey: "storeName",
    header: "Адрес",
  },
  {
    accessorKey: "storeCondition",
    header: "Статус",
  },
  {
    accessorKey: "storeRegion",
    header: "Регион",
  },
  {
    accessorKey: "storeCity",
    header: "Город",
  },
  {
    accessorKey: "nameManager",
    header: "Управляющий",
  },
  {
    accessorKey: "storeEmail",
    header: "Почта",
  },
  {
    accessorKey: "startDate",
    header: "Дата открытия",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      const formattedDate = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "Дата последней продажи",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      const formattedDate = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);

      return <div>{formattedDate}</div>;
    },
  },
];
