"use client";

import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  ColDef,
  themeMaterial,
  Theme,
} from "ag-grid-community";
import { useTheme } from "@app/providers/theme-provider";
// import { divideNumberSpaces } from "@shared/ui/graphs/stacked-line/formatter-tooltip";

// Регистрируем модули AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);

// Форматирование чисел
// const formatNumber = (value: any): string => {
//   if (value === null || value === undefined) return "-";
//   return divideNumberSpaces(value);
// };

// // Форматирование процентов
// const formatPercent = (value: any): string => {
//   if (value === null || value === undefined) return "-";
//   return `${value}%`;
// };
const calculateTotalRow = (data: any[]): any => {
  if (!data || data.length === 0) return {};

  const totalRow: Record<string, any> = {};

  const keys = Object.keys(data[0]);

  for (const key of keys) {
    const isNumeric = typeof data[0][key] === "number";

    if (isNumeric) {
      totalRow[key] = data.reduce((sum, row) => {
        const value = row[key];
        return sum + (typeof value === "number" ? value : 0);
      }, 0);
    } else {
      totalRow[key] = ""; // 👈 Пусто для строковых значений
    }
  }

  return totalRow;
};
interface UniversalTableProps {
  data: any[];
  totalData?: any[];
  columnDefs?: ColDef[];
  className?: string;
}

const UniversalTable = ({
  data,
  totalData,
  columnDefs: providedColumnDefs,
  className,
}: UniversalTableProps) => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [pinnedTopData, setPinnedTopData] = useState<any[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const firstRow = data[0];

    if (providedColumnDefs) {
      const filteredDefs = providedColumnDefs.filter((col) =>
        Object.prototype.hasOwnProperty.call(firstRow, col.field!)
      );

      // Добавим выравнивание по типу данных
      const withAlignment = filteredDefs.map((col) => {
        if (!col.field) return col;

        const value = firstRow[col.field];

        const isNumber = typeof value === "number";

        return {
          ...col,
          cellStyle: {
            ...(typeof col.cellStyle === "function" ? {} : col.cellStyle ?? {}),
            textAlign: isNumber ? "center" : "center",
          },
        };
      });

      setColumnDefs(withAlignment);
    } else {
      const generated = Object.keys(firstRow).map((key) => {
        const value = firstRow[key];
        const isNumber = typeof value === "number";

        return {
          field: key,
          headerName: key,
          resizable: true,
          cellStyle: {
            textAlign: isNumber ? "center" : "left",
          },
        };
      });

      setColumnDefs(generated);
    }
  }, [data, providedColumnDefs]);

  // Установка строки итого
  useEffect(() => {
    let total: any;

    if (totalData && totalData.length > 0) {
      total = { ...totalData[0] };
    } else {
      total = calculateTotalRow(data);
    }

    setPinnedTopData([total]);
  }, [data, totalData]);

  // Общие настройки колонок
  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      cellStyle: { textAlign: "center" }, // 👈 Центрируем все ячейки
    }),
    []
  );

  // Тема AG Grid
  const customTheme: Theme = useMemo(() => {
    return themeMaterial.withParams(
      isLightTheme
        ? {
            backgroundColor: "#ffffff",
            foregroundColor: "#333333",
            headerBackgroundColor: "#fafafa",
            headerTextColor: "#333333",
            oddRowBackgroundColor: "#f9fafb",
            headerColumnResizeHandleColor: "#dad9d8",
            accentColor: "#e50046",
            borderColor: "#dad9d8",
            selectedRowBackgroundColor: "#ffadc6",
          }
        : {
            backgroundColor: "#191919",
            foregroundColor: "#d4d4d4",
            headerBackgroundColor: "#262626",
            headerTextColor: "#d4d4d4",
            oddRowBackgroundColor: "#202020",
            headerColumnResizeHandleColor: "#2f2f2f",
            accentColor: "#e50046",
            borderColor: "#2f2f2f",
            selectedRowBackgroundColor: "#ffadc6",
          }
    );
  }, [isLightTheme]);

  return (
    <div
      className={`rounded-[16px] overflow-hidden border border-border h-full w-full ${
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
        theme={customTheme}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pinnedTopRowData={pinnedTopData}
        loadThemeGoogleFonts
        rowSelection="multiple"
        animateRows={true}
        enableCellTextSelection={true}
        domLayout="normal"
        overlayNoRowsTemplate="Нет данных для отображения"
        onGridReady={(params: any) => {
          const allColumnIds: string[] = [];

          // Получаем список всех колонок
          params.columnApi.getAllColumns()?.forEach((column: any) => {
            const colDef = column.getColDef();

            // Автоматически подстраиваем ТОЛЬКО те, у которых нет явной ширины
            if (colDef && !colDef.width && !colDef.flex) {
              allColumnIds.push(column.getColId());
            }
          });

          // Автоширина по содержимому
          params.columnApi.autoSizeColumns(allColumnIds, false);

          // Можно также подогнать ширину таблицы
          // params.api.sizeColumnsToFit(); // опционально
        }}
      />
    </div>
  );
};

export default UniversalTable;
