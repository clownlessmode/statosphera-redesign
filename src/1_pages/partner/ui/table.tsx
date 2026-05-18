import { useCallback, useMemo } from "react";
import InfinityTable from "@pages/report/ui/table/infinite-table";
import { buildPartnerColumnDefs } from "../lib/column-defs";
import type { PartnerTableRow } from "../api/types";
import type { TablePartnerRequest } from "../api/types/request";
import { usePartnerFiltersStore } from "../model/filters-store";

type TablePartnerProps = {
  fetchTable: (request: TablePartnerRequest) => Promise<{
    items: PartnerTableRow[];
    hasMore: boolean;
  }>;
  totalData: PartnerTableRow[];
  dataVersion: number;
  buildTableRequest: (
    pagination: { limit: number; offset: number },
    sort?: TablePartnerRequest["sort"],
  ) => TablePartnerRequest;
  onRowClick?: (row: PartnerTableRow) => void;
};

export const TablePartner = ({
  fetchTable,
  totalData,
  dataVersion,
  buildTableRequest,
  onRowClick,
}: TablePartnerProps) => {
  const { values, group } = usePartnerFiltersStore();

  const resolveColumnDefs = useCallback(
    (row: Record<string, unknown>) =>
      buildPartnerColumnDefs({ group, values, sampleRow: row }),
    [group, values],
  );

  const columnsKey = useMemo(
    () => `${group.join(",")}|${values.join(",")}`,
    [group, values],
  );

  const fetchData = useCallback(
    async ({
      startRow,
      endRow,
      sortModel = [],
    }: {
      startRow: number;
      endRow: number;
      sortModel?: { colId: string; sort: "asc" | "desc" }[];
    }) => {
      const limit = endRow - startRow;
      const sort = sortModel[0]
        ? { sort: sortModel[0].sort, colId: sortModel[0].colId }
        : undefined;

      const response = await fetchTable(
        buildTableRequest({ limit, offset: startRow }, sort),
      );

      const rows = response.hasMore
        ? response.items.slice(0, limit)
        : response.items;

      const totalRows = response.hasMore
        ? startRow + limit + 1
        : startRow + rows.length;

      return { data: rows, totalRows };
    },
    [fetchTable, buildTableRequest],
  );

  return (
    <InfinityTable
      key={columnsKey}
      fetchData={fetchData}
      resolveColumnDefs={resolveColumnDefs}
      totalData={totalData}
      dataVersion={dataVersion}
      cacheBlockSize={100}
      maxBlocksInCache={10}
      className="w-full h-full"
      onCellClick={({ rowData }) => onRowClick?.(rowData as PartnerTableRow)}
    />
  );
};
