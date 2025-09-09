import { ColDef } from "ag-grid-community";
import { createProductNameRenderer } from "./product-name-renderer";

// Функция для создания колонок с обработчиком
export const createGrillColumnDefs = (
  onSettingsClick: (data: any) => void,
): ColDef[] => [
  {
    field: "fullname",
    headerName: "Название продукта",
    width: 300,
    resizable: true,
    sortable: true,
    cellStyle: { textAlign: "left" },
    flex: 1,
    cellRenderer: createProductNameRenderer(onSettingsClick),
  },
  {
    field: "countProduct",
    headerName: "Количество продукта",
    width: 150,
    resizable: true,
    sortable: true,
    cellStyle: { textAlign: "center" },
    valueFormatter: (params) => {
      if (params.value === null || params.value === undefined) return "-";
      return params.value;
    },
  },
  {
    field: "countSales",
    headerName: "Количество продаж",
    width: 150,
    resizable: true,
    sortable: true,
    cellStyle: { textAlign: "center" },
    valueFormatter: (params) => {
      if (params.value === null || params.value === undefined) return "-";
      return params.value;
    },
  },
  {
    field: "remainder",
    headerName: "Остаток",
    width: 120,
    resizable: true,
    sortable: true,
    cellStyle: { textAlign: "center" },
    valueFormatter: (params) => {
      if (params.value === null || params.value === undefined) return "-";
      return params.value;
    },
  },
  {
    field: "ed",
    headerName: "Ед. измерения",
    width: 120,
    resizable: true,
    sortable: true,
    cellStyle: { textAlign: "center" },
  },
];

// Экспортируем старые колонки для обратной совместимости
export const grillColumnDefs: ColDef[] = createGrillColumnDefs(() => {});
