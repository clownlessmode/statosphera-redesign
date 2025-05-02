"use client";

import React from "react";
import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";
import { useTheme } from "@app/providers/theme-provider";
import { UniversalTableProps } from "./types";
import { getAgGridTheme } from "./theme";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props extends UniversalTableProps {
  /** React-компонент для колонки "действий". Появится в каждой строке */
  actions?: React.FC<{ rowData: any }>;
  /** Индекс, куда вставить колонку с действиями (по умолчанию 0) */
  actionsIndex?: number;
}

export default function UniversalTable({
  data,
  totalData,
  columnDefs: providedDefs,
  actions,
  actionsIndex = 0,
  className,
  onRowClick,
  onCellClick,
  selectionType = "single",
  multiSelectWithoutCtrl = true,
  onSelectionChange,
}: Props) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [pinnedTopData, setPinnedTopData] = useState<any[]>([]);

  useEffect(() => {
    if (!data?.length) return;
    const first = data[0];

    // Основные колонки
    const baseDefs: ColDef[] =
      providedDefs ||
      Object.keys(first).map((key) => ({
        field: key,
        headerName: key,
        resizable: true,
        cellStyle: {
          textAlign: typeof first[key] === "number" ? "center" : "left",
        },
      }));

    const filteredBaseDefs = baseDefs.filter(
      (d) => d.field && first.hasOwnProperty(d.field)
    );

    const mergedDefs: ColDef[] = [...filteredBaseDefs];

    // Вставляем колонку действий, если передан компонент
    if (actions) {
      const pos =
        actionsIndex >= 0 && actionsIndex <= mergedDefs.length
          ? actionsIndex
          : 0;
      mergedDefs.splice(pos, 0, {
        headerName: "",
        field: "__actions__",
        cellRenderer: (params: any) => {
          const ActionComp = actions;
          return <ActionComp rowData={params.data} />;
        },
        resizable: false,

        suppressMovable: false,
        sortable: false,
        filter: false,
        lockPosition: true,
        width: 50,
      } as ColDef);
    }

    // Колонка-заполнитель до конца
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

    setColumnDefs(mergedDefs);
  }, [data, providedDefs, actions, actionsIndex]);

  useEffect(() => {
    if (totalData && totalData.length) {
      setPinnedTopData([totalData[0]]);
    } else {
      setPinnedTopData([]);
    }
  }, [totalData]);

  const defaultColDef = useMemo<ColDef>(
    () => ({ resizable: true, cellStyle: { textAlign: "center" } }),
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
        rowSelection={selectionType}
        rowMultiSelectWithClick={multiSelectWithoutCtrl}
        animateRows
        enableCellTextSelection
        domLayout="normal"
        className="flex-1"
        onRowClicked={(e) => onRowClick?.(e.data)}
        onCellClicked={(e) =>
          onCellClick?.({
            rowData: e.data,
            field: e.colDef.field ?? "",
            value: e.value,
          })
        }
        onSelectionChanged={(e) => onSelectionChange?.(e.api.getSelectedRows())}
        overlayNoRowsTemplate="Нет данных для отображения"
        onGridReady={(params) => {
          const api = params.api;
          const colsToSize = api
            .getAllGridColumns()
            .filter((col) => {
              const def = col.getColDef();
              return !def.width && !def.flex;
            })
            .map((col) => col.getColId());
          api.autoSizeColumns(colsToSize, false);
        }}
      />
    </div>
  );
}
