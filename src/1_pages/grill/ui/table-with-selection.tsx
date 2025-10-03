import { useRef, useCallback } from "react";
import UniversalTable from "@pages/report/ui/table";
import type { ColDef } from "ag-grid-community";

interface TableWithSelectionProps {
  data: any[];
  totalData: any[];
  columnDefs: ColDef[];
  selectionType?: "single" | "multiple";
  selectedRows?: any[];
  onCellClick?: (cellData: any) => void;
}

/**
 * Обертка над UniversalTable с управлением выделением строк
 * Позволяет сохранять выделение после обновления данных
 */
export default function TableWithSelection({
  data,
  totalData,
  columnDefs,
  selectionType = "single",
  selectedRows = [],
  onCellClick,
}: TableWithSelectionProps) {
  const internalSelectedRef = useRef<any[]>([]);

  // Обработчик клика с сохранением выделения
  const handleCellClick = useCallback(
    (cellData: any) => {
      internalSelectedRef.current = [cellData.rowData];
      onCellClick?.(cellData);
    },
    [onCellClick],
  );

  // Обработчик изменения выделения - сохраняем его внутренне
  const handleSelectionChange = useCallback((rows: any[]) => {
    if (rows && rows.length > 0) {
      internalSelectedRef.current = rows;
    }
  }, []);

  // Используем внешнее выделение если оно есть, иначе внутреннее
  const effectiveSelection =
    selectedRows.length > 0 ? selectedRows : internalSelectedRef.current;

  return (
    <UniversalTable
      data={data}
      totalData={totalData}
      columnDefs={columnDefs}
      selectionType={selectionType}
      selectedRows={effectiveSelection}
      onCellClick={handleCellClick}
      onSelectionChange={handleSelectionChange}
    />
  );
}
