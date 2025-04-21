import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { forwardRef, useMemo } from "react";
import "./table.css";

import { AG_GRID_LOCALE_RU } from "./locale";
import { useTheme } from "@app/providers/theme-provider";

export const AgTable = forwardRef<AgGridReact, AgGridReactProps>(
  (props, ref) => {
    const theme = useTheme();

    const localeText = useMemo<Record<string, string>>(
      () => AG_GRID_LOCALE_RU,
      []
    );

    const rowStyle = useMemo(() => ({ cursor: "pointer" }), []);

    return (
      <AgGridReact
        ref={ref}
        localeText={localeText}
        rowSelection={"multiple"}
        className={`ag-theme-quartz ${theme}`}
        tooltipShowDelay={350}
        rowStyle={rowStyle}
        defaultColDef={{
          wrapHeaderText: true,
          autoHeaderHeight: true,
        }}
        gridOptions={{
          enableCellTextSelection: true,
        }}
        {...props}
      />
    );
  }
);
