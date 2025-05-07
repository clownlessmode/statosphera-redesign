import { useMemo } from "react";
import { Theme, useTheme } from "@app/providers/theme-provider";
import { themeMaterial, Theme as AgGridTheme } from "ag-grid-community";

interface ThemeParams {
  backgroundColor: string;
  foregroundColor: string;
  headerBackgroundColor: string;
  headerTextColor: string;
  oddRowBackgroundColor: string;
  headerColumnResizeHandleColor: string;
  accentColor: string;
  borderColor: string;
  selectedRowBackgroundColor: string;
}

const themeParamsMap: Record<Theme, ThemeParams> = {
  light: {
    backgroundColor: "#ffffff",
    foregroundColor: "#333333",
    headerBackgroundColor: "#fafafa",
    headerTextColor: "#333333",
    oddRowBackgroundColor: "#f9fafb",
    headerColumnResizeHandleColor: "#dad9d8",
    accentColor: "#e50046",
    borderColor: "#dad9d8",
    selectedRowBackgroundColor: "#e4e4e4",
  },
  dark: {
    backgroundColor: "#191919",
    foregroundColor: "#d4d4d4",
    headerBackgroundColor: "#262626",
    headerTextColor: "#d4d4d4",
    oddRowBackgroundColor: "#202020",
    headerColumnResizeHandleColor: "#2f2f2f",
    accentColor: "#e50046",
    borderColor: "#2f2f2f",
    selectedRowBackgroundColor: "#262626",
  },
};

export function useAgGridTheme(): AgGridTheme {
  const { theme } = useTheme();
  const params = themeParamsMap[theme];

  if (!params) {
    throw new Error(`Theme '${theme}' is not defined`);
  }

  // мемоизируем создание темы
  return useMemo(() => {
    return themeMaterial.withParams(params);
  }, [params]);
}
