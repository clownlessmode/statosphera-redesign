"use client";

import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";
import { useTheme } from "@app/providers/theme-provider";
import { UniversalTableProps } from "./types";
import { calculateTotalRow } from "./utils";
import { getAgGridTheme } from "./theme";

// Регистрируем модули AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);

export default function UniversalTable({
  data,
  totalData,
  columnDefs: providedDefs,
  className,
  onRowClick,
  onCellClick,
}: UniversalTableProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [pinnedTopData, setPinnedTopData] = useState<any[]>([]);

  // Вычисляем колонки
  useEffect(() => {
    if (!data?.length) return;
    const first = data[0];

    const defs = (
      providedDefs ||
      Object.keys(first).map((key) => ({
        field: key,
        headerName: key,
        resizable: true,
        cellStyle: {
          textAlign: typeof first[key] === "number" ? "center" : "left",
        },
      }))
    ).filter((def) => def.field && first.hasOwnProperty(def.field));

    // Пустая заполнитель-колонка
    defs.push({
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

    setColumnDefs(defs);
  }, [data, providedDefs]);

  // Итоговая строка
  useEffect(() => {
    const total = totalData?.[0] ?? calculateTotalRow(data);
    setPinnedTopData([total]);
  }, [data, totalData]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      cellStyle: { textAlign: "center" },
    }),
    []
  );

  const agTheme = useMemo(() => getAgGridTheme(isLight), [isLight]);

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
        theme={agTheme}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pinnedTopRowData={pinnedTopData}
        loadThemeGoogleFonts
        rowSelection="multiple"
        animateRows
        enableCellTextSelection
        domLayout="normal"
        // клик по строке
        onRowClicked={(e) => {
          onRowClick?.(e.data);
        }}
        // клик по ячейке
        onCellClicked={(e) => {
          onCellClick?.({
            rowData: e.data,
            field: e.colDef.field ?? "",
            value: e.value,
          });
        }}
        overlayNoRowsTemplate="Нет данных для отображения"
        onGridReady={(params: any) => {
          const allIds: string[] = [];
          params.columnApi.getAllColumns()?.forEach((col: any) => {
            const cd = col.getColDef();
            if (!cd.width && !cd.flex) allIds.push(col.getColId());
          });
          params.columnApi.autoSizeColumns(allIds, false);
        }}
      />
    </div>
  );
}
