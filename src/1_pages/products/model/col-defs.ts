import { ColDef } from "ag-grid-community";
import { Edit } from "lucide-react";

// Стили для если линия пустая
const styleLineOfHasNoValue = {
  color: "red",
  fontWeight: 600,
  textAlign: "left",
};

// Дефолтные стили для строк
const defaultStyleRow = {
  textAlign: "left",
};

// Колонки номенклатуры
export const nomenclatureColumns: ColDef<any>[] = [
  {
    width: 60,
    field: "edit",
    headerName: "",
    cellStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    cellRenderer: Edit,
  },
  {
    headerName: "Код номенклатуры",
    field: "productCode",
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Группа",
    field: "groupsMain",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
    },
    cellRenderer: (params: any) => {
      return params.value === "-" ? "---" : params.value;
    },
  },
  {
    headerName: "Подгруппа",
    field: "subGroups",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
    cellRenderer: (params: any) => {
      return params.value === "-" ? "---" : params.value;
    },
  },
  {
    headerName: "Подподгруппа",
    field: "subSubGroups",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
    cellRenderer: (params: any) => {
      return params.value === "-" ? "---" : params.value;
    },
  },
  {
    headerName: "Номенклатура",
    field: "productName",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Подразделение",
    field: "subDivisionProducts",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
    cellRenderer: (params: any) => {
      return params.value === "-" ? "---" : params.value;
    },
  },
  {
    headerName: "Тип Продукта",
    field: "typeProducts",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
    cellRenderer: (params: any) => {
      return params.value === "-" ? "---" : params.value;
    },
  },
  {
    headerName: "Сезонность",
    field: "seasonalityProducts",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
    cellRenderer: (params: any) => {
      return params.value === "-" ? "---" : params.value;
    },
  },
  {
    headerName: "Команда",
    field: "teamProducts",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
    cellRenderer: (params: any) => {
      return params.value === "-" ? "---" : params.value;
    },
  },
  {
    headerName: "Направление",
    field: "directionProducts",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
    cellRenderer: (params: any) => {
      return params.value === "-" ? "---" : params.value;
    },
  },
  {
    headerName: "Группа Экономиста",
    field: "groupsEconomist",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
    cellRenderer: (params: any) => {
      return params.value === "-" ? "---" : params.value;
    },
  },
  {
    headerName: "PP Продукты",
    field: "ppProducts",
    sortable: true,
    filter: true,
    cellRenderer: (params: { value: boolean }) => (params.value ? "Да" : "Нет"),
  },
  {
    headerName: "Это ИМ",
    field: "isIm",
    sortable: true,
    filter: true,
    cellRenderer: (params: { value: boolean }) => (params.value ? "Да" : "Нет"),
  },
  { headerName: "Ед. Измерения", field: "ed", sortable: true, filter: true },
  {
    headerName: "Менеджер",
    field: "managerAuto",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
  },
  {
    headerName: "Группы Франчайзи",
    field: "groupsFranchise",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value === "-") {
        return styleLineOfHasNoValue;
      }
      return defaultStyleRow;
    },
  },
];
