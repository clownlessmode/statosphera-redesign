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
} from "ag-grid-community";
import { columnDefs as masterColumnDefs } from "@shared/constants/table-columns";
import { useTheme } from "@app/providers/theme-provider";
import { getAgGridTheme } from "./theme";
import { Skeleton } from "@shared/ui/skeleton";

export interface InfinityTableProps {
  fetchData: (params: {
    startRow: number;
    endRow: number;
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
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const gridApiRef = useRef<GridApi | null>(null);
  const columnsSetRef = useRef(false);
  const previousDataVersion = useRef<number>(dataVersion);
  const [forceUpdate, setForceUpdate] = useState(false);
  const totalRowsRef = useRef<number>(0); // Добавляем ref для хранения общего количества строк

  const { theme } = useTheme();
  const isLight = theme === "light";

  const [pinnedTopData, setPinnedTopData] = useState<any[]>([]);

  const defaultColDef = useMemo<ColDef>(
    () => ({ resizable: true, cellStyle: { textAlign: "center" } }),
    []
  );

  // Обновляем данные при изменении dataVersion
  useEffect(() => {
    if (dataVersion !== previousDataVersion.current && gridApiRef.current) {
      gridApiRef.current.purgeInfiniteCache();
      gridApiRef.current.setGridOption("rowData", []);
      previousDataVersion.current = dataVersion;
      setForceUpdate((prev) => !prev);
    }
  }, [dataVersion]);

  // Устанавливаем pinnedTopData при изменении totalData
  useEffect(() => {
    if (totalData?.length > 0) {
      setPinnedTopData([totalData[0]]);
    } else {
      setPinnedTopData([]);
    }
  }, [totalData]);

  // Utility: wrap colDef to show Skeleton when stub row
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
  });

  // Функция обновления колонок
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
        cellStyle: { padding: 0, border: "none" },
        suppressMovable: true,
        sortable: false,
        filter: false,
        resizable: false,
        flex: 1,
      });

      gridApiRef.current.updateGridOptions({ columnDefs: mergedDefs });
      columnsSetRef.current = true;

      setTimeout(() => {
        const colsToSize = gridApiRef.current
          ?.getAllGridColumns()
          .filter((col) => {
            const def = col.getColDef();
            return !def.width && !def.flex;
          })
          .map((col) => col.getColId());

        if (colsToSize && colsToSize.length > 0) {
          gridApiRef.current?.autoSizeColumns(colsToSize, false);
        }
      }, 0);
    },
    [actions, actionsIndex]
  );

  // Datasource for infinite scrolling with dynamic columns
  const datasource: IDatasource = useMemo(
    () => ({
      getRows: async (params: IGetRowsParams) => {
        gridApiRef.current?.setGridOption("loading", true);

        try {
          const resp = await fetchData({
            startRow: params.startRow,
            endRow: params.endRow,
          });

          // Сохраняем общее количество строк
          totalRowsRef.current = resp.totalRows;

          if (resp.data.length > 0 && !columnsSetRef.current) {
            updateColumns(resp.data[0]);
          }

          // Важно: передаем актуальное количество строк в successCallback
          // Это сообщает AG Grid, когда прекратить запрашивать дополнительные данные
          params.successCallback(resp.data, resp.totalRows);
        } catch (error) {
          params.failCallback();
        } finally {
          gridApiRef.current?.setGridOption("loading", false);
        }
      },
      rowCount: totalRowsRef.current || undefined, // Это ключевое свойство для ограничения запросов
    }),
    [fetchData, forceUpdate, updateColumns]
  );

  const onGridReady = useCallback(
    (event: GridReadyEvent) => {
      const api = event.api;
      gridApiRef.current = api;
      api.setGridOption("datasource", datasource);
      api.setGridOption("cacheBlockSize", cacheBlockSize);
      // api.setGridOption("", maxBlocksInCache);

      // Устанавливаем pinnedTopData если оно существует
      if (pinnedTopData.length > 0) {
        api.setGridOption("pinnedTopRowData", pinnedTopData);
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
    [datasource, cacheBlockSize, maxBlocksInCache, pinnedTopData]
  );

  const agTheme = useMemo(() => getAgGridTheme(isLight), [isLight]);

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
        onSelectionChanged={(e) => onSelectionChange?.(e.api.getSelectedRows())}
      />
    </div>
  );
};

export default InfinityTable;
