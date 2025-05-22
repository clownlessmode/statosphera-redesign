import React, {
  useMemo,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import {
  IDatasource,
  IGetRowsParams,
  GridReadyEvent,
  ColDef,
  GridApi,
  RowClassParams,
  RowStyle,
} from "ag-grid-community";
import { columnDefs as masterColumnDefs } from "@shared/constants/table-columns";
import { useTheme } from "@app/providers/theme-provider";
import { getAgGridTheme } from "./theme";
import { Skeleton } from "@shared/ui/skeleton";

export interface InfinityTableProps {
  fetchData: (params: {
    startRow: number;
    endRow: number;
    sortModel?: { colId: string; sort: "asc" | "desc" }[];
  }) => Promise<{ data: any[]; totalRows: number }>;
  cacheBlockSize?: number;
  maxBlocksInCache?: number;
  totalData: any[];
  actions?: React.FC<{ rowData: any }>;
  actionsIndex?: number;
  className?: string;
  onCellClick?: (info: { rowData: any; field: string; value: any }) => void;
  onRowClick?: (data: any) => void;
  onSelectionChange?: (selectedRows: any[]) => void;
  dataVersion?: number;
  maxRows?: number;
  selectedRows?: any[]; // Добавляем пропс для выбранных строк
  rowSelection?: "single" | "multiple"; // Опционально: тип выделения
}

const InfinityTable: React.FC<InfinityTableProps> = ({
  fetchData,
  cacheBlockSize = 100,
  maxBlocksInCache = 3,
  totalData,
  actions,
  actionsIndex = 0,
  className,
  onRowClick,
  onCellClick,
  onSelectionChange,
  dataVersion = 0,
  maxRows,
  selectedRows = [],
  rowSelection = "multiple",
}) => {
  const selectedRowsRef = useRef(selectedRows);
  const gridRef = useRef<AgGridReact>(null);
  const gridApiRef = useRef<GridApi | null>(null);
  const columnsSetRef = useRef(false);
  const previousDataVersion = useRef<number>(dataVersion);
  const [forceUpdate, setForceUpdate] = useState(false);
  const totalRowsRef = useRef<number>(0);
  const effectiveCacheBlockSize = useMemo(() => {
    return maxRows ? Math.min(cacheBlockSize, maxRows) : cacheBlockSize;
  }, [maxRows, cacheBlockSize]);
  const { theme } = useTheme();
  const isLight = theme === "light";
  // Добавьте этот эффект в компонент InfinityTable
  useEffect(() => {
    if (gridApiRef.current) {
      // Принудительно обновляем все видимые строки
      gridApiRef.current.redrawRows();
    }
  }, [selectedRows]);
  const [pinnedTopData, setPinnedTopData] = useState<any[]>([]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: "center" },
      valueFormatter: (params) => (params.value == null ? "––" : params.value),
    }),
    []
  );

  useEffect(() => {
    if (dataVersion !== previousDataVersion.current && gridApiRef.current) {
      gridApiRef.current.purgeInfiniteCache();
      gridApiRef.current.setGridOption("rowData", []);
      previousDataVersion.current = dataVersion;
      setForceUpdate((prev) => !prev);
    }
  }, [dataVersion]);

  useEffect(() => {
    if (totalData?.length > 0) {
      setPinnedTopData([totalData[0]]);
    } else {
      setPinnedTopData([]);
    }
  }, [totalData]);

  const withSkeleton = (col: ColDef): ColDef => ({
    ...col,
    cellRenderer: (params: any) => {
      if (params.node && params.node.stub) {
        return <Skeleton className="w-full h-[16px]" />;
      }
      if (col.cellRenderer) {
        // @ts-ignore
        return col.cellRenderer(params);
      }
      return params.valueFormatted ?? params.value;
    },
    valueFormatter: (params) => (params.value == null ? "––" : params.value),
  });

  const updateColumns = useCallback(
    (firstRow: any) => {
      if (!gridApiRef.current || !firstRow) return;

      const baseDefs = masterColumnDefs.filter(
        (col) => col.field && firstRow.hasOwnProperty(col.field)
      );

      const mergedDefs = baseDefs.map(withSkeleton);

      if (actions) {
        const pos =
          actionsIndex >= 0 && actionsIndex <= mergedDefs.length
            ? actionsIndex
            : 0;
        mergedDefs.splice(
          pos,
          0,
          withSkeleton({
            headerName: "",
            field: "__actions__",
            cellRenderer: (p: any) => {
              const ActionComp = actions;
              return <ActionComp rowData={p.data} />;
            },
            resizable: false,
            suppressMovable: false,
            sortable: false,
            filter: false,
            lockPosition: true,
            width: 50,
          })
        );
      }

      mergedDefs.push({
        headerName: "",
        field: "__filler__",
        valueGetter: () => "",
        cellStyle: {
          padding: 0,
          border: "none",
          display: "flex", // Добавлено
          flex: 1, // Добавлено
        },
        suppressMovable: true,
        sortable: false,
        filter: false,
        resizable: false,
        suppressAutoSize: true,
        suppressSizeToFit: true,
        minWidth: 0,
        flex: 2, // Увеличьте значение, если другие колонки тоже имеют flex
        maxWidth: undefined, // Явное указание
        cellClass: "ag-filler-cell", // Добавьте в CSS: .ag-filler-cell { flex-grow: 1; }
      });

      gridApiRef.current.updateGridOptions({ columnDefs: mergedDefs });
      columnsSetRef.current = true;
    },
    [actions, actionsIndex]
  );

  const datasource: IDatasource = useMemo(
    () => ({
      getRows: async (params: IGetRowsParams) => {
        gridApiRef.current?.setGridOption("loading", true);

        try {
          const adjustedEndRow = maxRows
            ? Math.min(params.endRow, maxRows)
            : params.endRow;

          if (maxRows && params.startRow >= maxRows) {
            params.successCallback([], maxRows);
            return;
          }
          const sortModel = params.sortModel ?? [];

          const resp = await fetchData({
            startRow: params.startRow,
            endRow: adjustedEndRow,
            sortModel,
          });

          const actualTotalRows = maxRows
            ? Math.min(resp.totalRows, maxRows)
            : resp.totalRows;

          totalRowsRef.current = actualTotalRows;
          params.successCallback(resp.data, actualTotalRows);

          if (resp.data.length > 0 && !columnsSetRef.current) {
            updateColumns(resp.data[0]);
          }
        } catch (error) {
          params.failCallback();
        } finally {
          gridApiRef.current?.setGridOption("loading", false);
        }
      },
      rowCount: maxRows || totalRowsRef.current || undefined,
    }),
    [fetchData, forceUpdate, updateColumns, maxRows]
  );

  const onGridReady = useCallback(
    (event: GridReadyEvent) => {
      const api = event.api;
      gridApiRef.current = api;
      api.setGridOption("datasource", datasource);
      api.setGridOption("cacheBlockSize", effectiveCacheBlockSize);
      if (pinnedTopData.length > 0) {
        api.setGridOption("pinnedTopRowData", pinnedTopData);
      }
      if (maxRows && maxRows < 100) {
        api.setGridOption("rowBuffer", Math.min(Math.ceil(maxRows / 2), 50));
      }

      setTimeout(() => {
        const colsToSize = api
          .getAllGridColumns()
          .filter((col) => {
            const def = col.getColDef();
            return !def.width && !def.flex;
          })
          .map((col) => col.getColId());

        if (colsToSize && colsToSize.length > 0) {
          api.autoSizeColumns(colsToSize, false);
        }
      }, 0);
    },
    [datasource, cacheBlockSize, maxBlocksInCache, pinnedTopData, maxRows]
  );

  const agTheme = useMemo(() => getAgGridTheme(isLight), [isLight]);
  useEffect(() => {
    selectedRowsRef.current = selectedRows;
  }, [selectedRows]);

  const isEqual = useCallback((obj1: any, obj2: any) => {
    if (!obj1 || !obj2) return false;

    if ("id" in obj1 && "id" in obj2) {
      return obj1.id === obj2.id;
    }

    try {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    } catch {
      const keys = Object.keys(obj1);
      return keys.every((key) => obj1[key] === obj2[key]);
    }
  }, []);

  const getRowStyle = useCallback(
    (params: RowClassParams): RowStyle => {
      if (!params.data || !selectedRowsRef.current?.length) {
        return {};
      }

      // Используем текущее значение из ref
      const isSelected = selectedRowsRef.current.some((selectedRow) =>
        isEqual(selectedRow, params.data)
      );

      return isSelected ? { backgroundColor: "rgba(0, 0, 0, 0)" } : {};
    },
    [isEqual]
  ); // Убираем selectedRows из зависимостей
  return (
    <div
      className={`rounded-[16px] overflow-hidden border border-border h-full w-full flex-1 ${
        className || ""
      }`}
      style={
        {
          "--ag-row-height": "36px",
          "--ag-header-height": "36px",
          "--ag-header-cell-height": "32px",
          "--ag-header-icon-size": "12px",
          "--ag-cell-horizontal-padding": "6px",
          "--ag-cell-vertical-padding": "2px",
          "--ag-header-cell-horizontal-padding": "6px",
          "--ag-header-cell-vertical-padding": "2px",
        } as React.CSSProperties
      }
    >
      <AgGridReact
        ref={gridRef}
        domLayout="normal"
        loadThemeGoogleFonts
        rowModelType="infinite"
        enableCellTextSelection
        animateRows
        autoSizeStrategy={{ type: "fitCellContents" }}
        cacheBlockSize={cacheBlockSize}
        maxBlocksInCache={maxBlocksInCache}
        onGridReady={onGridReady}
        pinnedTopRowData={pinnedTopData}
        theme={agTheme}
        getRowStyle={getRowStyle}
        rowSelection={rowSelection}
        rowMultiSelectWithClick={rowSelection === "multiple"}
        suppressRowClickSelection={false}
        onSelectionChanged={(e) => onSelectionChange?.(e.api.getSelectedRows())}
        getRowId={(params) => params.data?.id || JSON.stringify(params.data)}
        onSortChanged={() => {
          console.log("onSortChanged TRIGGERRED");
          gridApiRef.current?.purgeInfiniteCache();
          gridApiRef.current?.refreshInfiniteCache();
        }}
        autoSizePadding={20}
        className="flex-1"
        overlayNoRowsTemplate="Нет данных для отображения"
        defaultColDef={defaultColDef}
        onRowClicked={(e) => onRowClick?.(e.data)}
        onCellClicked={(e) =>
          onCellClick?.({
            rowData: e.data,
            field: e.colDef.field ?? "",
            value: e.value,
          })
        }
      />
    </div>
  );
};

export default InfinityTable;
