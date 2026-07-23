import { ColDef } from "ag-grid-community";

import { AdminUser } from "../api/types";

export const adminUsersColumnDefs: ColDef<AdminUser>[] = [
  {
    field: "id_user",
    headerName: "ID",
    width: 100,
    sortable: false,
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: "ФИО",
    sortable: false,
    flex: 2,
    minWidth: 240,
    cellStyle: { textAlign: "left" },
    valueGetter: ({ data }) => {
      if (data === null || data === undefined) return "-";
      return (
        [data.last_name, data.first_name, data.middle_name]
          .filter(Boolean)
          .join(" ")
          .trim() || "—"
      );
    },
  },
  {
    field: "locked",
    headerName: "Статус",
    width: 130,
    sortable: false,
    cellStyle: { textAlign: "center" },
    valueFormatter: ({ value }) => (value ? "Заблокирован" : "Активен"),
  },
  {
    field: "id_store",
    headerName: "Магазины",
    width: 120,
    sortable: false,
    cellStyle: { textAlign: "center" },
    valueFormatter: ({ value }) => {
      const count = Array.isArray(value) ? value.length : 0;
      return count ? `${count} шт.` : "—";
    },
  },
];
