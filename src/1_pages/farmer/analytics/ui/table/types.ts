import { ColDef } from "ag-grid-community";

export interface UniversalTableProps {
  data: any[];
  /** Опциональные данные для итоговой (прикреплённой) строки */
  totalData?: any[];
  /** Пользовательские определения колонок (ColDef) */
  columnDefs?: ColDef[];
  /** CSS-класс для контейнера таблицы */
  className?: string;
  /** Обработчик клика по строке */
  onRowClick?: (data: any) => void;
  /** Обработчик клика по ячейке */
  onCellClick?: (info: { rowData: any; field: string; value: any }) => void;
  /** Обработчик изменения сортировки */
  onSortChange?: (sortInfo: { sort: "asc" | "desc"; colId: string }) => void;

  /**
   * Тип выбора строк: "single" — одиночный, "multiple" — множественный.
   * По умолчанию: "multiple"
   */
  selectionType?: "single" | "multiple";
  /**
   * Если true, в режиме множественного выбора клик без Ctrl переключает выбор строки.
   * По умолчанию: true
   */
  multiSelectWithoutCtrl?: boolean;
  /**
   * Колбэк, вызываемый при изменении выбора строк.
   * Принимает массив выбранных объектов данных.
   */
  onSelectionChange?: (selectedRows: any[]) => void;
  /**
   * Массив выбранных строк для синхронизации с внешним состоянием
   */
  selectedRows?: any[];
}
