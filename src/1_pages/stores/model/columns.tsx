import { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@shared/ui/sortable-header";
import StatusBadge from "@shared/ui/status-badge";
import { Store } from "@entities/store/config";
import { EditStore } from "@features/edit-store";
import { StoreSettings } from "@features/store-settings";
import { useSession } from "@entities/session";
import { ROLES } from "@shared/constants/roles";

export const columns: ColumnDef<Store>[] = [
  {
    id: "actions",
    size: 64,
    maxSize: 64,
    cell: ({ row }) => {
      const { session } = useSession();
      const canEditStore =
        session?.role === ROLES.ADMIN ||
        [151, 156].includes(session?.idUser ?? 0);
      const isNightStore = row.original.ipNightStore.length > 0;
      const store = row.original;

      return (
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          {isNightStore && <StoreSettings store={store} />}
          {canEditStore && <EditStore store={store} />}
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
