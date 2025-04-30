"use client";

import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";
import { useTheme } from "@app/providers/theme-provider";
import { UniversalTableProps } from "./types";
import { getAgGridTheme } from "./theme";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function UniversalTable({
  data,
  totalData,
  columnDefs: providedDefs,
  className,
  onRowClick,
  onCellClick,
  // New props
  selectionType = "single", // 'single' | 'multiple'
  multiSelectWithoutCtrl = true, // allow click-selection without ctrl for multi
  onSelectionChange, // callback when selection changes
}: UniversalTableProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [pinnedTopData, setPinnedTopData] = useState<any[]>([]);

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

    // Empty filler column
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

  // Totals row
  useEffect(() => {
    if (totalData && totalData.length > 0) {
      setPinnedTopData([totalData[0]]);
    } else {
      setPinnedTopData([]);
    }
  }, [totalData]);

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
        theme={agTheme}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pinnedTopRowData={pinnedTopData}
        loadThemeGoogleFonts
        // Use props for selection
        rowSelection={selectionType}
        rowMultiSelectWithClick={multiSelectWithoutCtrl}
        animateRows
        enableCellTextSelection
        domLayout="normal"
        className="flex-1"
        // Row click
        onRowClicked={(e) => {
          onRowClick?.(e.data);
        }}
        // Cell click
        onCellClicked={(e) => {
          onCellClick?.({
            rowData: e.data,
            field: e.colDef.field ?? "",
            value: e.value,
          });
        }}
        // Selection change
        onSelectionChanged={(e) => {
          const selected = e.api.getSelectedRows();
          onSelectionChange?.(selected);
        }}
        overlayNoRowsTemplate="Нет данных для отображения"
        onGridReady={(params: any) => {
          const api = params.api;

          // берём все колонки грида
          const allCols = api.getAllGridColumns();

          // фильтруем те, где нет width и нет flex
          const colsToSize = allCols
            .filter((col: any) => {
              const def = col.getColDef();
              return !def.width && !def.flex;
            })
            .map((col: any) => col.getColId());

          // авто-размер колонок по содержимому
          api.autoSizeColumns(colsToSize, /* skipHeader */ false);
        }}
      />
    </div>
  );
}
