import { Header } from "@widgets/header";
import { useGrillController } from "../api/controller";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@shared/ui/button";
import UniversalTable from "@pages/report/ui/table";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import { createGrillColumnDefs } from "./grill-columns";
import StatCard from "./stat-card";
import { PlusIcon } from "lucide-react";
import { Input } from "@shared/ui/input";
import AddProductDialog from "./add-product-dialog";
import AddCountDialog from "./add-count-dialog";
import { GrillProductTblRo } from "../api/types/responses";

const Grill = () => {
  const { getGraph, getStatistic } = useGrillController();

  // Состояние для данных графика
  const [graphData, setGraphData] = useState<any>(null);
  const [statisticData, setStatisticData] = useState<any>(null);

  // Состояние для поиска
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Состояние для модалки добавления продукта
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isAddCountDialogOpen, setIsAddCountDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] =
    useState<GrillProductTblRo | null>(null);
  // Хук для подготовки данных графика
  const prepareLine = usePreparedStackedLine();

  // Обработчик клика по иконке шестеренки (только модалка)
  const handleSettingsClick = useCallback(async (rowData: any) => {
    console.log("Нажата иконка шестеренки для:", rowData);

    if (!rowData) {
      console.error("rowData is null or undefined");
      return;
    }

    // Проверяем различные возможные поля для ID продукта
    const possibleIdFields = ["idProduct", "id", "productId", "product_id"];
    let productId = null;

    for (const field of possibleIdFields) {
      if (rowData[field] !== undefined) {
        productId = rowData[field];
        console.log(`Найден ID продукта в поле ${field}:`, productId);
        break;
      }
    }

    if (!productId) {
      console.error("ID продукта не найден в данных:", rowData);
      console.log("Доступные поля:", Object.keys(rowData));
      return;
    }

    // Только открываем модалку, не загружаем график
    setSelectedProductId(productId);
    setIsAddCountDialogOpen(true);
    setSelectedProduct(rowData);
  }, []);

  // Обработчик клика по колонке (только график и карточки)
  const handleColumnClick = useCallback(
    async (cellData: any) => {
      console.log("Клик по колонке:", cellData);
      const rowData = cellData.rowData;

      if (!rowData) {
        console.error("rowData is null or undefined");
        return;
      }

      // Проверяем различные возможные поля для ID продукта
      const possibleIdFields = ["idProduct", "id", "productId", "product_id"];
      let productId = null;

      for (const field of possibleIdFields) {
        if (rowData[field] !== undefined) {
          productId = rowData[field];
          console.log(`Найден ID продукта в поле ${field}:`, productId);
          break;
        }
      }

      if (!productId) {
        console.error("ID продукта не найден в данных:", rowData);
        console.log("Доступные поля:", Object.keys(rowData));
        return;
      }

      // Только загружаем график и карточки, не открываем модалку
      const payload = { idProduct: [productId] };
      console.log("Отправляем в график:", payload);

      try {
        const resultGraph = await getGraph(payload);
        const resultStatistic = await getStatistic(payload);
        setGraphData(resultGraph);
        setStatisticData(resultStatistic);
        console.log("Данные графика:", resultGraph);
        console.log("Graph данные:", resultGraph.graph);
        console.log("GraphCheck данные:", resultGraph.graphCheck);
      } catch (error: any) {
        console.error("Ошибка при получении данных графика:", error);
        console.error("Детали ошибки:", error.response?.data);
      }
    },
    [getGraph, getStatistic],
  );

  //Работа с графиком

  //Работа с таблицей
  const { tableData, isTableLoading } = useGrillController();

  // Фильтрация таблицы по поиску
  const filteredTableData = useMemo(() => {
    if (!tableData) return [];

    const term = searchTerm.trim().toLowerCase();
    if (!term) return tableData;

    const tokens = term.split(/\s+/).filter((t) => t.length > 1);

    return tableData.filter((row: any) => {
      // Ищем по названию продукта (поле fullname в таблице)
      const productName =
        row.fullname || row.productName || row.product_name || row.name || "";
      const name = productName.toLowerCase();

      // Если нет токенов (короткий поиск), ищем точное вхождение
      if (tokens.length === 0) {
        return name.includes(term);
      }

      // Проверяем, что все токены присутствуют
      const fullMatch = tokens.every((token) => name.includes(token));
      if (fullMatch) return true;

      // Нечеткий поиск
      let idx = 0;
      for (let i = 0; i < term.length; i++) {
        const char = term[i];
        idx = name.indexOf(char, idx);
        if (idx === -1) return false;
        idx++;
      }
      return true;
    });
  }, [tableData, searchTerm]);

  // Создаем колонки с обработчиком для иконки шестеренки
  const tableColumnDefs = useMemo(() => {
    console.log("Создание колонок таблицы");
    console.log("Пример данных из tableData:", tableData?.[0]);
    return createGrillColumnDefs(handleSettingsClick);
  }, [handleSettingsClick, tableData]);

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header title={`Гриль`} />
      <div className="rounded-3xl px-4 py-4 gap-4 h-full w-full bg-background flex-1">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-row gap-4 w-full h-full">
            <div className="h-64 w-full">
              {graphData ? (
                <>
                  {console.log("Объединенные данные:", [
                    ...(graphData.graph || []),
                    ...(graphData.graphCheck || []),
                  ])}
                  <StackedLine
                    option={{
                      title: {
                        text: "График продаж",
                      },
                      legend: {
                        data: [
                          ...(graphData.graph?.map((item: any) => item.name) ||
                            []),
                          ...(graphData.graphCheck?.map(
                            (item: any) => item.name,
                          ) || []),
                        ],
                      },
                      series: prepareLine([
                        ...(graphData.graph || []),
                        ...(graphData.graphCheck || []),
                      ] as any),
                    }}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>
                    Кликните на любую ячейку в таблице для отображения графика
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {statisticData &&
                Object.values(statisticData).map((item: any) => (
                  <StatCard
                    key={item.name}
                    title={item.name}
                    number={item.value}
                  />
                ))}
            </div>
          </div>

          <div className="h-[500px] w-full flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <Input
                className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                placeholder="Найти продукт"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                size={"sm"}
                onClick={() => setIsAddProductDialogOpen(true)}
              >
                <PlusIcon /> Добавить продукт
              </Button>
            </div>
            {isTableLoading ? (
              <div className="flex items-center justify-center h-full">
                <p>Загрузка таблицы...</p>
              </div>
            ) : filteredTableData && filteredTableData.length > 0 ? (
              <div className="h-screen w-full">
                <UniversalTable
                  key={`table-${filteredTableData.length}-${JSON.stringify(filteredTableData[0]?.id)}`}
                  data={filteredTableData}
                  totalData={[]}
                  columnDefs={tableColumnDefs}
                  selectionType="single"
                  onCellClick={handleColumnClick}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>
                  {searchTerm
                    ? "Продукты не найдены"
                    : "Нет данных для отображения"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddProductDialog
        isOpen={isAddProductDialogOpen}
        onClose={() => setIsAddProductDialogOpen(false)}
      />
      <AddCountDialog
        isOpen={isAddCountDialogOpen}
        onClose={() => setIsAddCountDialogOpen(false)}
        idProduct={selectedProductId}
        product={selectedProduct}
      />
    </div>
  );
};

export default Grill;
