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
import { useSession } from "@entities/session";
import { useNavigate } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";

const Grill = () => {
  const { session } = useSession();
  const navigate = useNavigate();
  if (!session?.isGrillProject) {
    navigate(ROUTES_PATH.FORBIDDEN);
  }
  const { getGraph, getStatistic } = useGrillController();
  const [graphData, setGraphData] = useState<any>(null);
  const [statisticData, setStatisticData] = useState<any>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isAddCountDialogOpen, setIsAddCountDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] =
    useState<GrillProductTblRo | null>(null);
  const prepareLine = usePreparedStackedLine();

  const handleSettingsClick = useCallback(async (rowData: any) => {
    const possibleIdFields = ["idProduct", "id", "productId", "product_id"];
    let productId = null;

    for (const field of possibleIdFields) {
      if (rowData[field] !== undefined) {
        productId = rowData[field];
        break;
      }
    }

    setSelectedProductId(productId);
    setIsAddCountDialogOpen(true);
    setSelectedProduct(rowData);
  }, []);

  const handleColumnClick = useCallback(
    async (cellData: any) => {
      const rowData = cellData.rowData;

      const possibleIdFields = ["idProduct", "id", "productId", "product_id"];
      let productId = null;

      for (const field of possibleIdFields) {
        if (rowData[field] !== undefined) {
          productId = rowData[field];
          break;
        }
      }

      const payload = { idProduct: [productId] };

      try {
        const resultGraph = await getGraph(payload);
        const resultStatistic = await getStatistic(payload);
        setGraphData(resultGraph);
        setStatisticData(resultStatistic);
      } catch (error: any) {
        console.error("Ошибка при получении данных графика:", error);
        console.error("Детали ошибки:", error.response?.data);
      }
    },
    [getGraph, getStatistic],
  );

  const { tableData, isTableLoading } = useGrillController();

  const filteredTableData = useMemo(() => {
    if (!tableData) return [];

    const term = searchTerm.trim().toLowerCase();
    if (!term) return tableData;

    const tokens = term.split(/\s+/).filter((t) => t.length > 1);

    return tableData.filter((row: any) => {
      const productName =
        row.fullname || row.productName || row.product_name || row.name || "";
      const name = productName.toLowerCase();

      if (tokens.length === 0) {
        return name.includes(term);
      }

      const fullMatch = tokens.every((token) => name.includes(token));
      if (fullMatch) return true;

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

  const tableColumnDefs = useMemo(() => {
    return createGrillColumnDefs(handleSettingsClick);
  }, [handleSettingsClick, tableData]);

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header title={`Гриль`} />
      <div className="rounded-3xl px-4 py-4 gap-4 w-full bg-background flex-1 flex flex-col">
        <div className="flex flex-col gap-4 flex-1 min-h-0">
          <div className="flex flex-row gap-4 w-full h-64">
            {graphData ? (
              <>
                <div className="flex-grow h-full min-w-0">
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
                </div>

                <div className="grid grid-cols-2 gap-4 w-[550px] flex-shrink-0 h-full overflow-hidden">
                  {statisticData &&
                    Object.values(statisticData).map((item: any) => (
                      <StatCard
                        key={item.name}
                        title={item.name}
                        number={item.value}
                      />
                    ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <p className="text-center text-muted-foreground">
                  Кликните на любую ячейку в таблице для отображения графика и
                  статистики
                </p>
              </div>
            )}
          </div>

          <div className="flex-1 w-full flex flex-col gap-4 min-h-0">
            <div className="flex flex-row items-center gap-4 flex-shrink-0">
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
              <div className="flex items-center justify-center flex-1">
                <p>Загрузка таблицы...</p>
              </div>
            ) : filteredTableData && filteredTableData.length > 0 ? (
              <div className="flex-1 w-full min-h-[400px]">
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
              <div className="flex items-center justify-center flex-1">
                <p className="text-muted-foreground">
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
        idRow={selectedProduct?.id || 0}
        product={selectedProduct}
      />
    </div>
  );
};

export default Grill;
