import { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@shared/ui/sortable-header";
import StatusBadge from "@shared/ui/status-badge";
import { Store } from "./types";
import { ROLES } from "@shared/constants/roles";
import { useSession } from "@entities/session";
import { StoreSettings } from "@features/store-settings";

export const columns: ColumnDef<Store>[] = [
  {
    id: "actions",
    size: 32,
    maxSize: 32,
    cell: ({ row }) => {
      const { session } = useSession();
      const isAdmin = session?.role === ROLES.SERVICE_MANAGER;
      const isNightStore = row.original.ipNightStore.length > 0;
      const store = row.original;

      if (!isAdmin || !isNightStore) return null;

      return (
        <div onClick={(e) => e.stopPropagation()}>
          <StoreSettings store={store} />
        </div>
      );
    },
  },
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
      return (
        <StatusBadge
          className="w-full"
          status={status}
          positiveValues={["действующие", "открытые"]}
          negativeValues={["закрытые", "неактивные"]}
        />
      );
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => <SortableHeader column={column} title="Регион" />,
    enableColumnFilter: true,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <SortableHeader column={column} title="Город" />,
    enableColumnFilter: true,
  },
  {
    accessorKey: "formatStore",
    header: ({ column }) => <SortableHeader column={column} title="Формат" />,
    enableColumnFilter: true,
  },
];
