import React, {
  useMemo,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import {
  GridReadyEvent,
  ColDef,
  GridApi,
  RowClassParams,
  RowStyle,
} from "ag-grid-community";
import { columnDefs as masterColumnDefs } from "@shared/constants/table-columns";
import { useTheme } from "@app/providers/theme-provider";
import { getAgGridTheme } from "@pages/report/ui/table/theme";
import { Skeleton } from "@shared/ui/skeleton";

export interface WriteOffInfinityTableProps {
  fetchData: (params: {
    startRow: number;
    endRow: number;
    sortModel?: { colId: string; sort: "asc" | "desc" }[];
  }) => Promise<{ data: any[]; totalRows: number }>;
  cacheBlockSize?: number;
  maxBlocksInCache?: number;
  totalData: any[];
  totalSummary?: any[]; // Итоговые данные для заголовка
  actions?: React.FC<{ rowData: any }>;
  actionsIndex?: number;
  className?: string;
  onCellClick?: (info: { rowData: any; field: string; value: any }) => void;
  onRowClick?: (data: any) => void;
  onSelectionChange?: (selectedRows: any[]) => void;
  dataVersion?: number;
  maxRows?: number;
  selectedRows?: any[];
  rowSelection?: "single" | "multiple";
}

const WriteOffInfinityTable: React.FC<WriteOffInfinityTableProps> = ({
  cacheBlockSize = 100,
  maxBlocksInCache = 3,
  totalData,
  totalSummary,
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
      autoHeight: false,
      suppressSizeToFit: false,
      suppressAutoSize: false,
      minWidth: 100,
      maxWidth: 300,
    }),
    [],
  );

  useEffect(() => {
    if (dataVersion !== previousDataVersion.current && gridApiRef.current) {
      try {
        // Очищаем кэш и данные
        gridApiRef.current.setGridOption("rowData", []);
        gridApiRef.current.refreshCells();

        // Сбрасываем флаг колонок
        columnsSetRef.current = false;

        previousDataVersion.current = dataVersion;
      } catch (error) {
        console.error("Error clearing cache:", error);
      }
    }
  }, [dataVersion]);

  useEffect(() => {
    if (totalSummary && totalSummary.length > 0) {
      setPinnedTopData(totalSummary);
    } else if (totalData?.length > 0) {
      setPinnedTopData([totalData[0]]);
    } else {
      setPinnedTopData([]);
    }
  }, [totalData, totalSummary]);

  // Принудительное обновление pinnedTopRowData при изменении pinnedTopData
  useEffect(() => {
    if (gridApiRef.current && pinnedTopData.length > 0) {
      try {
        gridApiRef.current.setGridOption("pinnedTopRowData", pinnedTopData);
        gridApiRef.current.refreshCells();
      } catch (error) {
        console.error("Error updating pinned top row:", error);
      }
    }
  }, [pinnedTopData]);

  const withSkeleton = (col: ColDef): ColDef => ({
    ...col,
    cellRenderer: (params: any) => {
      if (params.node && params.node.stub) {
        return <Skeleton className="w-full h-[16px]" />;
      }

      // Специальное форматирование для итоговой строки
      if (params.node.rowPinned === "top") {
        const value = params.value;
        if (typeof value === "number") {
          // Для процентов добавляем знак %
          if (col.field?.includes("Percent")) {
            return `${value.toFixed(2)}%`;
          }
          // Для остальных числовых значений добавляем разделители тысяч
          return value.toLocaleString("ru-RU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
        // Для текстовых значений (например, "ИТОГО")
        return value;
      }

      if (col.cellRenderer) {
        return col.cellRenderer(params);
      }
      return params.valueFormatted ?? params.value;
    },
  });

  const updateColumns = useCallback(
    (firstRow: any) => {
      if (!gridApiRef.current || !firstRow) return;

      const baseDefs = masterColumnDefs.filter(
        (col) =>
          col.field &&
          Object.prototype.hasOwnProperty.call(firstRow, col.field),
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
          }),
        );
      }

      mergedDefs.push({
        headerName: "",
        field: "__filler__",
        valueGetter: () => "",
        cellStyle: {
          padding: 0,
          border: "none",
          display: "flex",
          flex: 1,
        },
        suppressMovable: true,
        sortable: false,
        filter: false,
        resizable: false,
        suppressAutoSize: true,
        suppressSizeToFit: true,
        minWidth: 0,
        flex: 2,
        maxWidth: undefined,
        cellClass: "ag-filler-cell",
      });

      gridApiRef.current.updateGridOptions({ columnDefs: mergedDefs });
      columnsSetRef.current = true;

      // Принудительно обновляем pinnedTopRowData после обновления колонок
      if (pinnedTopData.length > 0) {
        gridApiRef.current.setGridOption("pinnedTopRowData", pinnedTopData);
        gridApiRef.current.refreshCells();
      }

      // Авторазмер колонок после обновления
      setTimeout(() => {
        if (gridApiRef.current) {
          try {
            const allColumns = gridApiRef.current.getAllGridColumns();
            const colsToSize = allColumns
              .filter((col) => {
                const def = col.getColDef();
                return (
                  !def.suppressAutoSize &&
                  !def.width &&
                  !def.flex &&
                  def.field !== "__filler__" &&
                  def.field !== "__actions__"
                );
              })
              .map((col) => col.getColId());

            if (colsToSize && colsToSize.length > 0) {
              gridApiRef.current.autoSizeColumns(colsToSize, false);
            }
          } catch (error) {
            console.error("Error in auto-sizing after column update:", error);
          }
        }
      }, 100);
    },
    [actions, actionsIndex, pinnedTopData],
  );

  const onGridReady = useCallback(
    (event: GridReadyEvent) => {
      const api = event.api;
      gridApiRef.current = api;

      // Для clientSide режима не нужен datasource

      api.setGridOption("cacheBlockSize", effectiveCacheBlockSize);

      if (maxRows && maxRows < 100) {
        api.setGridOption("rowBuffer", Math.min(Math.ceil(maxRows / 2), 50));
      }

      // Принудительно устанавливаем данные если они есть
      if (totalData.length > 0) {
        api.setGridOption("rowData", totalData);

        // Обновляем колонки если нужно
        if (!columnsSetRef.current) {
          updateColumns(totalData[0]);
        }
      }

      // Принудительно обновляем таблицу
      setTimeout(() => {
        try {
          // Убираем состояние загрузки
          api.setGridOption("loading", false);

          // Обновляем ячейки
          api.refreshCells();

          // Принудительно запрашиваем данные
          api.ensureIndexVisible(0);

          // Принудительно обновляем размеры
          api.sizeColumnsToFit();
        } catch (error) {
          console.error("Error forcing grid update:", error);
        }
      }, 100);

      // Улучшенное авторазмерение колонок
      setTimeout(() => {
        try {
          const allColumns = api.getAllGridColumns();

          // Получаем все колонки, которые нужно авторазмерять
          const colsToSize = allColumns
            .filter((col) => {
              const def = col.getColDef();
              // Исключаем служебные колонки и колонки с фиксированной шириной
              return (
                !def.suppressAutoSize &&
                !def.width &&
                !def.flex &&
                def.field !== "__filler__" &&
                def.field !== "__actions__"
              );
            })
            .map((col) => col.getColId());

          if (colsToSize && colsToSize.length > 0) {
            // Авторазмер по содержимому заголовков и ячеек
            api.autoSizeColumns(colsToSize, false);

            // Дополнительно подгоняем размер под заголовки
            colsToSize.forEach((colId) => {
              const col = api.getColumnDef(colId);
              if (col && col.headerName) {
                // Примерная ширина для заголовка (примерно 8px на символ + отступы)
                const headerWidth = col.headerName.length * 8 + 20;
                const column = api.getColumn(colId);
                if (column) {
                  const currentWidth = column.getActualWidth();
                  if (headerWidth > currentWidth) {
                    api.setColumnWidths([
                      { key: colId, newWidth: Math.min(headerWidth, 300) },
                    ]); // Ограничиваем максимумом
                  }
                }
              }
            });
          }

          // Принудительно обновляем отображение
          api.refreshCells();
        } catch (error) {
          console.error("Error in auto-sizing:", error);
        }
      }, 200);
    },
    [
      cacheBlockSize,
      maxBlocksInCache,
      pinnedTopData,
      maxRows,
      totalData,
      updateColumns,
    ],
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
      // Стили для итоговой строки
      if (params.node.rowPinned === "top") {
        return {
          backgroundColor: "var(--ag-row-hover-color)",
          borderTop: "2px solid var(--ag-border-color)",
          borderBottom: "2px solid var(--ag-border-color)",
        };
      }

      // Стили для выбранных строк
      if (!params.data || !selectedRowsRef.current?.length) {
        return {};
      }

      const isSelected = selectedRowsRef.current.some((selectedRow) =>
        isEqual(selectedRow, params.data),
      );

      return isSelected ? { backgroundColor: "rgba(59, 130, 246, 0.1)" } : {};
    },
    [isEqual],
  );

  // Принудительное обновление данных при изменении totalData
  useEffect(() => {
    if (gridApiRef.current) {
      try {
        // Сначала убираем loading
        gridApiRef.current.setGridOption("loading", false);

        if (totalData.length > 0) {
          // Обновляем колонки если нужно
          if (!columnsSetRef.current) {
            const firstRow = totalData[0];
            updateColumns(firstRow);
          }

          // Устанавливаем данные
          gridApiRef.current.setGridOption("rowData", totalData);
          gridApiRef.current.refreshCells();
        } else {
          // Если данных нет, очищаем таблицу
          gridApiRef.current.setGridOption("rowData", []);
          gridApiRef.current.refreshCells();
        }
      } catch (error) {
        console.error("Error updating data from totalData:", error);
      }
    }
  }, [totalData, updateColumns]);

  // Дополнительное принудительное обновление при изменении dataVersion
  useEffect(() => {
    if (gridApiRef.current && dataVersion > 0) {
      try {
        // Сбрасываем флаг колонок для принудительного обновления
        columnsSetRef.current = false;

        // Сбрасываем данные и loading
        gridApiRef.current.setGridOption("rowData", []);
        gridApiRef.current.setGridOption("loading", false);
        gridApiRef.current.refreshCells();
      } catch (error) {
        console.error("Error in version update:", error);
      }
    }
  }, [dataVersion]);

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
          minHeight: "",
          height: "460px",
        } as React.CSSProperties
      }
    >
      <AgGridReact
        ref={gridRef}
        domLayout="normal"
        loadThemeGoogleFonts
        rowModelType="clientSide"
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
        onSelectionChanged={(e) => onSelectionChange?.(e.api.getSelectedRows())}
        getRowId={(params) => params.data?.id || JSON.stringify(params.data)}
        onSortChanged={() => {
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
        onFirstDataRendered={(params) => {
          // Принудительно убираем состояние загрузки
          params.api.setGridOption("loading", false);

          // Авторазмер колонок после первого рендера данных
          setTimeout(() => {
            try {
              const allColumns = params.api.getAllGridColumns();
              const colsToSize = allColumns
                .filter((col) => {
                  const def = col.getColDef();
                  return (
                    !def.suppressAutoSize &&
                    !def.width &&
                    !def.flex &&
                    def.field !== "__filler__" &&
                    def.field !== "__actions__"
                  );
                })
                .map((col) => col.getColId());

              if (colsToSize && colsToSize.length > 0) {
                params.api.autoSizeColumns(colsToSize, false);
              }
            } catch (error) {
              console.error(
                "Error in auto-sizing in firstDataRendered:",
                error,
              );
            }
          }, 50);
        }}
        onModelUpdated={(params) => {
          // Принудительно убираем состояние загрузки
          params.api.setGridOption("loading", false);
        }}
        onGridSizeChanged={() => {}}
        onBodyScroll={() => {}}
        // Используем обычные данные напрямую
        rowData={totalData}
      />
    </div>
  );
};

export default WriteOffInfinityTable;
