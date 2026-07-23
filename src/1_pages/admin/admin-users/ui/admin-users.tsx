import { useCallback, useMemo } from "react";
import { ICellRendererParams } from "ag-grid-community";

import InfinityTable from "@pages/report/ui/table/infinite-table";
import { Header } from "@widgets/header";
import { EditUserStores } from "@features/edit-user-stores";

import { AdminUsersService } from "../api/service";
import { adminUsersColumnDefs } from "../model/col-defs";
import { useAdminUsersFiltersStore } from "../model/filters-store";
import { FiltersModal } from "./filters-modal";

export const AdminUsers = () => {
  const filters = useAdminUsersFiltersStore((state) => state.filters);
  const dataVersion = useAdminUsersFiltersStore((state) => state.dataVersion);
  const bumpDataVersion = useAdminUsersFiltersStore(
    (state) => state.bumpDataVersion,
  );

  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);

  const fetchData = useCallback(
    async ({ startRow, endRow }: { startRow: number; endRow: number }) => {
      const response = await AdminUsersService.getUsers({
        ...filters,
        page: Math.floor(startRow / (endRow - startRow)) + 1,
        limit: endRow - startRow,
      });

      return {
        data: response.items.map((item) => ({
          ...item,
          id: item.id_user,
        })),
        totalRows: response.total,
      };
    },
    [filters],
  );

  const resolveColumnDefs = useCallback(
    () => [
      {
        headerName: "",
        colId: "actions",
        width: 36,
        sortable: false,
        resizable: false,
        lockPosition: true,
        cellStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        cellRenderer: (params: ICellRendererParams) => {
          if (!params.data) return null;
          return (
            <EditUserStores
              id_user={params.data.id_user}
              id_store={params.data.id_store}
              onSuccess={bumpDataVersion}
            />
          );
        },
      },
      ...adminUsersColumnDefs,
    ],
    [],
  );

  return (
    <div className="bg-muted w-full p-2 flex flex-col gap-2 md:h-screen md:max-w-full md:overflow-hidden">
      <Header
        title="Пользователи"
        isAdmin
        actions={{
          center: <FiltersModal />,
        }}
      />
      <div className="rounded-3xl bg-background flex flex-col flex-1 min-h-0 gap-4 md:p-4 overflow-hidden">
        <div className="flex-1 min-h-80 md:min-h-0 flex flex-col">
          <InfinityTable
            key={filtersKey}
            fetchData={fetchData}
            resolveColumnDefs={resolveColumnDefs}
            totalData={[]}
            dataVersion={dataVersion}
            cacheBlockSize={50}
            maxBlocksInCache={10}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
