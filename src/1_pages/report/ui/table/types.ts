import { ColDef } from "ag-grid-community";

export interface UniversalTableProps {
  /** Основные данные для таблицы */
  data: any[];
  /** При необходимости можно передать предрасчитанные итоговые данные */
  totalData?: any[];
  /** Определения колонок по ag-grid */
  columnDefs?: ColDef[];
  /** Дополнительные классы для корневого div */
  className?: string;
}
