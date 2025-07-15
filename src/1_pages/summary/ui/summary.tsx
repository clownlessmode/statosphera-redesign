import { Header } from "@widgets/header";
import SummaryFiltersSheet from "@widgets/summary/sheet/sheet";
import { NomenklaturaList } from "./nomenklatura-list";
import { Button } from "@shared/ui/button";
import { useSummaryController } from "../api/controller";
import { useSummaryFiltersStore } from "@widgets/summary/sheet/model/filters-store";
import { transformToComparisonCardsDto } from "../utils/transform-summary-dto";
import { useSummaryStore } from "../model";
import { useCallback, useState } from "react";
import { SummaryCard } from "./summary-card";
import {
  BadgeRussianRuble,
  CircleCheck,
  ReceiptRussianRuble,
  ReceiptText,
  RussianRuble,
} from "lucide-react";
import UniversalTable from "@pages/report/ui/table";

export const Summary = () => {
  const { getComparisonCards } = useSummaryController();
  const { getApiPayload } = useSummaryFiltersStore();
  const { nomenklatura, cards, table, setCards, setTable } = useSummaryStore();
  const { getTable } = useSummaryController();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedTableRows, setSelectedTableRows] = useState<any[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]); // ID выбранных продуктов из таблицы

  console.log("В общем выбранный продукт: ", selectedProducts);
  console.log("Выбранные строки в таблице: ", selectedTableRows);
  console.log("ID выбранных продуктов из таблицы: ", selectedProductIds);

  const handleGetComparisonCards = async () => {
    if (selectedProducts.length === 0) {
      return;
    }
    try {
      const payload = getApiPayload();
      const dto = transformToComparisonCardsDto(payload, selectedProducts);

      const cardsResponse = await getComparisonCards(dto);

      setCards(cardsResponse.total);

      const tablePayload = {
        ...payload,
        filters: {
          ...payload.filters,
          product: {
            ...payload.filters.product,
            idProduct: selectedProducts.map((id) => id.toString()),
          },
        },
      };
      console.log("В картах выбранный продукт: ", selectedProducts);

      const tableResponse = await getTable(tablePayload);
      setTable(tableResponse);
    } catch (error) {
      console.error("❌ Error fetching comparison cards:", error);
    }
  };

  const columnsTable = [
    { headerName: "Регион", field: "region", autoSizeCoumn: true },
    {
      headerName: "Номенклатура",
      field: "product_name",
      autoSizeColumn: true,
      sortable: true,
    },
    {
      headerName: "Структура продаж",
      field: "groupsFranchise",
      autoSizeColumn: true,
    },
    { headerName: "Группа", field: "group", autoSizeColumn: true },
    { headerName: "Подгруппа", field: "subGroups", autoSizeColumn: true },
    {
      headerName: "Направление",
      field: "directionProducts",
      autoSizeColumn: true,
    },
    { headerName: "Подподгруппа", field: "subSubGroups", autoSizeColumn: true },
    {
      headerName: "Тип поставщика",
      field: "typeProducts",
      autoSizeColumn: true,
    },
    { headerName: "Сезон", field: "seasonalityProducts", autoSizeColumn: true },
    {
      headerName: "Менеджер автозаказа",
      field: "managerAuto",
      autoSizeColumn: true,
    },
    {
      headerName: "Справочник экономиста",
      field: "groupsEconomist",
      autoSizeColumn: true,
    },
    {
      headerName: "Выручка",
      field: "relatedProceeds",
      autoSizeColumn: true,
      sortable: true,
    },
    {
      headerName: "Кол-во чеков",
      field: "checkCount",
      autoSizeColumn: true,
      sortable: true,
    },
    {
      headerName: "Кол-во продаж",
      field: "relatedSold",
      autoSizeColumn: true,
      sortable: true,
    },
  ];

  console.log("TABLE", table);

  const [, setCurrentSort] = useState<{
    sort: "asc" | "desc";
    colId: string;
  } | null>(null);

  const handleClearFilters = () => {
    setCurrentSort(null);
  };

  const handleSortChange = async (sortInfo: {
    sort: "asc" | "desc";
    colId: string;
  }) => {
    console.log("Sort info from table:", sortInfo);
    setCurrentSort(sortInfo);

    const payload = getApiPayload();

    console.log("В продуктах выбранный продукт: ", selectedProducts);

    const updatePayload = {
      ...payload,
      filters: {
        ...payload.filters,
        product: {
          ...payload.filters.product,
          idProduct:
            selectedProducts.length > 0
              ? selectedProducts.map((id) => id.toString())
              : payload.filters.product.idProduct,
        },
      },
      sorts: {
        sort: sortInfo.sort,
        colId: [sortInfo.colId],
      },
      sort: {
        sort: sortInfo.sort,
        colId: [sortInfo.colId],
      },
    };

    console.log("updatePayload:", updatePayload);

    try {
      const tableRes = await getTable(updatePayload);
      if (tableRes) {
        setTable(tableRes);
      }
    } catch (error) {
      console.error("Error fetching sorted table:", error);
    }
  };

  // Обработчик выбора строк в таблице
  const handleTableRowSelection = (selectedRows: any[]) => {
    console.log("🔥 handleTableRowSelection вызван!");
    console.log("🔥 Количество выбранных строк:", selectedRows.length);
    console.log("🔥 Выбранные строки:", selectedRows);

    // Сохраняем полные объекты строк
    setSelectedTableRows(selectedRows);

    // Извлекаем ID продуктов
    const productIds = selectedRows
      .map((row) => row.id_product)
      .filter((id) => id !== undefined);
    console.log("🔥 Извлеченные ID продуктов:", productIds);

    setSelectedProductIds(productIds);
  };

  // Обработчик для кнопки "Получить больше информации"
  const handleGetMoreInfo = async () => {
    if (selectedProductIds.length === 0) {
      console.log("Нет выбранных продуктов");
      return;
    }

    try {
      console.log(
        "🚀 Получаем больше информации для продуктов:",
        selectedProductIds,
      );
      console.log(
        "🚀 Названия выбранных продуктов:",
        selectedTableRows.map((row) => row.product_name),
      );

      // Формируем payload для API
      const payload = getApiPayload();

      const moreInfoPayload = {
        ...payload,
        filters: {
          ...payload.filters,
          product: {
            ...payload.filters.product,
            idProduct: selectedProductIds.map((id) => id.toString()),
          },
        },
      };

      console.log(
        "📦 Payload для получения дополнительной информации:",
        moreInfoPayload,
      );

      // Здесь можете добавить вызов API для получения дополнительной информации
      // const moreInfoResponse = await getMoreProductInfo(moreInfoPayload);

      // Пока что просто выводим в консоль что у нас есть
      console.log("✅ Готово! Выбранные ID продуктов:", selectedProductIds);
    } catch (error) {
      console.error(
        "❌ Ошибка при получении дополнительной информации:",
        error,
      );
    }
  };

  const tableRows = Array.isArray((table as any)?.tbl)
    ? (table as any).tbl
    : [];

  return (
    <>
      <SummaryFiltersSheet />
      <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
        <Header title="Сводная таблица" />
        <div className="rounded-3xl bg-background p-4 flex flex-col gap-4 flex-1 min-h-0">
          <div className="flex-1 min-h-0 flex flex-row gap-4">
            {/* Левая колонка: Номенклатура + кнопка */}
            <div className="flex flex-col gap-4 min-h-0">
              <div className="flex-1 min-h-0">
                <NomenklaturaList
                  onSelectedProductsChange={setSelectedProducts}
                />
              </div>
              <Button
                className="w-full"
                size={"lg"}
                onClick={handleGetComparisonCards}
                disabled={selectedProducts.length === 0}
              >
                Получить расчет по выбранной номенклатуре
              </Button>
            </div>

            {/* Правая колонка: Карточки + таблица + кнопка */}
            <div className="flex-1 flex flex-col gap-4 min-h-0">
              {cards && cards.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 auto-rows-max h-fit">
                  {cards.flatMap((card) => [
                    <SummaryCard
                      key={`total-${card.totalProceeds}`}
                      title="Общая выручка"
                      value={card.totalProceeds}
                      icons={<BadgeRussianRuble color="#E50046" />}
                    />,
                    <SummaryCard
                      key={`selected-${card.selectedProceeds}`}
                      title="Выручка по выбранной номенклатуры"
                      value={card.selectedProceeds}
                      icons={<CircleCheck color="#E50046" />}
                    />,
                    <SummaryCard
                      key={`count-${card.checkCount}`}
                      title="Количество чеков"
                      value={card.checkCount}
                      icons={<ReceiptText color="#E50046" />}
                    />,
                    <SummaryCard
                      key={`avg-${card.avgCheck}`}
                      title="Средний чек"
                      value={card.avgCheck}
                      icons={<ReceiptRussianRuble color="#E50046" />}
                    />,
                  ])}
                </div>
              ) : (
                <div className="flex items-center justify-center flex-1 text-muted-foreground">
                  Выберите номенклатуру и нажмите кнопку для получения расчетов
                </div>
              )}

              {tableRows.length > 0 && (
                <>
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <UniversalTable
                      selectionType="multiple"
                      data={tableRows}
                      columnDefs={columnsTable}
                      onSortChange={handleSortChange}
                      onSelectionChange={handleTableRowSelection}
                    />
                  </div>
                  <Button
                    className="w-full"
                    size={"lg"}
                    disabled={selectedProductIds.length === 0}
                    onClick={handleGetMoreInfo}
                  >
                    Получить больше информации о выбранном продукте
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
