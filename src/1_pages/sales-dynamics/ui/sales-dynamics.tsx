import { Header } from "@widgets/header";
import { FC, useEffect, useMemo, useState } from "react";
import { Lfl } from "@features/sales-dynamics/lfl";
import { ShopsFilter } from "@features/sales-dynamics/shops-filter";
import { DaysFilter } from "@features/sales-dynamics/days-filter";
import { GraphDate } from "@features/sales-dynamics/graph-date";
import { DownloadSalesDynamics } from "@features/sales-dynamics/download";
import UniversalTable from "@pages/report/ui/table";
import { columnDefs } from "@shared/constants/table-columns";
import { Input } from "@shared/ui/input";
import { AddIndicators } from "@features/sales-dynamics/add-indicators";
import { useDefaultValues } from "@features/sales-dynamics/add-indicators/model/default";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";
import { useSalesDynamicsController } from "../model/api/controller";
import { useSalesDynamicsStore } from "../model/sales-dynamics-store";
import { SalesSelect } from "@features/sales-dynamics/sales-select";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import { useDateFilterStore } from "@features/sales-dynamics/graph-date/ui/graph-date";
import { useSalesSelectStore } from "@features/sales-dynamics/sales-select/ui/sales-select";
import { Button } from "@shared/ui/button";
import { Store, X } from "lucide-react";
import { DialogContent } from "@shared/ui/dialog";
import { DialogTrigger } from "@shared/ui/dialog";
import { Dialog } from "@shared/ui/dialog";
import { Skeleton } from "@shared/ui/skeleton";

const SalesDynamics: FC = () => {
  // где-то вверху компонента
  const [searchTerm, setSearchTerm] = useState<string>("");

  // мемоизированный отфильтрованный массив

  const { defaultValues, isLoading } = useDefaultValues();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const { value: dateGranularity } = useDateFilterStore((state) => state);
  const { lfl } = useSalesDynamicsFiltersStore((state) => state);
  const { filterDate } = useSalesDynamicsFiltersStore((state) => state);
  const { values } = useSalesDynamicsFiltersStore((state) => state);
  const { filters } = useSalesDynamicsFiltersStore((state) => state);
  const prepareLine = usePreparedStackedLine();
  const {
    getTable,
    getTotal,
    getGraph,
    getSecondGraph,
    isSecondGraphLoading,
    isGraphLoading,
  } = useSalesDynamicsController();
  const getApiPayload = useSalesDynamicsFiltersStore(
    (state) => state.getApiPayload
  );
  const { updateValues } = useSalesDynamicsFiltersStore((state) => state);
  const {
    table,
    total,
    setTable,
    setTotal,
    graph,
    setGraph,
    secondGraph,
    setSecondGraph,
  } = useSalesDynamicsStore();
  useEffect(() => {
    if (isLoading) return;
    updateValues(defaultValues.indicators_and_groups);
  }, [isLoading, defaultValues, updateValues]);
  useEffect(() => {
    setSearchTerm("");
  }, [filterDate, filters, values, lfl]);
  const filteredTable = useMemo(() => {
    if (!table) return [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return table;

    const tokens = term.split(/\s+/).filter((t) => t.length > 1);
    return (table as any).filter((row: any) => {
      const name = row.storeName.toLowerCase();
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
  }, [table, searchTerm, defaultValues, filters, filterDate, lfl, values]);

  const { first, second } = useSalesSelectStore((state) => state);

  // 1. Эффект только для Total
  useEffect(() => {
    if (isLoading) return;
    const fetchTotal = async () => {
      const payload = getApiPayload();
      const totalRes = await getTotal({
        ...payload,
        values: values || defaultValues.indicators_and_groups, // <-- берем из стора, а не из defaultValues
      });
      setTotal(totalRes);
    };

    fetchTotal();
  }, [isLoading, lfl, getApiPayload, filterDate, values, filters]);
  // 2. Эффект только для Table
  useEffect(() => {
    if (isLoading) return;

    const fetchTable = async () => {
      const payload = getApiPayload();
      const tableRes = await getTable({
        ...payload,
        values: values || defaultValues.indicators_and_groups, // <-- берем из стора, а не из defaultValues
      });
      setTable(tableRes);
    };

    fetchTable();
  }, [isLoading, lfl, getApiPayload, filterDate, values, filters]);

  // 3. Эффект для первого графика
  useEffect(() => {
    if (isLoading) return;

    const fetchFirstGraph = async () => {
      const payload = getApiPayload();
      const graphRes = await getGraph({
        ...payload,
        value: first.value,
        groups: dateGranularity,
      });
      setGraph(graphRes);
    };

    fetchFirstGraph();
  }, [
    isLoading,
    getApiPayload,
    filterDate,
    values,
    filters,
    first.value,
    dateGranularity,
  ]);

  // 4. Эффект для второго графика
  useEffect(() => {
    if (isLoading) return;

    const fetchSecondGraph = async () => {
      const payload = getApiPayload();
      const secondGraphRes = await getSecondGraph({
        ...payload,
        value: second.value,
        groups: dateGranularity,
      });
      setSecondGraph(secondGraphRes);
    };

    fetchSecondGraph();
  }, [
    isLoading,
    getApiPayload,
    filterDate,
    values,
    filters,
    second.value,
    dateGranularity,
  ]);

  const handleSelectionChange = async (selectedRows: any) => {
    const payload = getApiPayload();
    const [secondGraphRes, graphRes] = await Promise.all([
      getSecondGraph({
        ...payload,
        value: second.value,
        groups: dateGranularity,
        filters: {
          ...payload.filters,
          idStore: selectedRows.map((row: any) => row.idStore),
        },
      }),
      getGraph({
        ...payload,
        value: first.value,
        groups: dateGranularity,
        filters: {
          ...payload.filters,
          idStore: selectedRows.map((row: any) => row.idStore),
        },
      }),
    ]);
    setGraph(graphRes);
    setSecondGraph(secondGraphRes);
  };
  const isCompleted = !!table && !!total && !!graph && !!secondGraph;
  const isAllLoading = !table || !total || !graph || !secondGraph;
  return (
    <>
      <div className="bg-muted max-h-screen w-full p-2 flex flex-col gap-2">
        <Header
          title="Динамика продаж"
          actions={{
            left: (
              <div className="flex flex-row gap-2">
                <DaysFilter />
                <ShopsFilter />
                <Lfl />
              </div>
            ),
            right: (
              <div className="flex flex-row gap-2">
                <DownloadSalesDynamics />
                <GraphDate />
              </div>
            ),
          }}
        />
        <div className="rounded-3xl bg-background p-4 flex flex-col h-full gap-4">
          <div className="flex flex-row gap-2 max-h-[40vh] w-full h-full">
            {isAllLoading && <Skeleton className="w-full h-full" />}
            {!isAllLoading && (
              <div className="flex flex-col gap-2 h-full w-full">
                <SalesSelect index={1} />
                {isCompleted && (
                  <StackedLine
                    mirror={1}
                    option={{
                      title: {
                        text: first.label,
                      },
                      legend: {
                        data: ["Выбранный период", "Прошлый год"],
                      },
                      series:
                        graph &&
                        prepareLine(
                          graph,
                          dateGranularity == "month" && !isGraphLoading
                            ? {
                                firstLineStyle: { width: 4, type: "solid" },
                                secondLineStyle: { width: 3, type: "dashed" },
                                thirdLineStyle: { width: 4, type: "solid" },
                                fourthLineStyle: { width: 3, type: "dashed" },
                              }
                            : {}
                        ),
                    }}
                  />
                )}
              </div>
            )}
            {isAllLoading && <Skeleton className="w-full h-full" />}
            {!isAllLoading && (
              <div className="flex flex-col gap-2 h-full w-full">
                <SalesSelect index={2} />
                {isCompleted && (
                  <StackedLine
                    mirror={1}
                    option={{
                      title: {
                        text: second.label,
                      },
                      legend: {
                        data: ["Выбранный период", "Прошлый год"],
                      },
                      series:
                        secondGraph &&
                        prepareLine(
                          secondGraph,
                          dateGranularity == "month" && !isSecondGraphLoading
                            ? {
                                firstLineStyle: { width: 4, type: "solid" },
                                secondLineStyle: { width: 3, type: "dashed" },
                                thirdLineStyle: { width: 4, type: "solid" },
                                fourthLineStyle: { width: 3, type: "dashed" },
                              }
                            : {}
                        ),
                    }}
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 h-full w-full">
            <div className="flex flex-row gap-2">
              <Input
                placeholder="Поиск по магазину"
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {selectedRows.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Store /> Выбранные магазины: {selectedRows.length}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex flex-col gap-2 ">
                      {selectedRows.map((row) => (
                        <div
                          key={row.idStore}
                          className="grid grid-cols-5 gap-8 w-full"
                        >
                          <span className="col-span-4">{row.storeName}</span>
                          <X
                            className="cursor-pointer"
                            onClick={() =>
                              setSelectedRows(
                                selectedRows.filter(
                                  (r) => r.idStore !== row.idStore
                                )
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <div className="w-full flex flex-row gap-2 justify-end">
                <AddIndicators
                  defaultValues={defaultValues.indicators_and_groups}
                />
              </div>
            </div>
            {isAllLoading && <Skeleton className="w-full h-full" />}
            {!isAllLoading && isCompleted && (
              <UniversalTable
                selectionType="multiple"
                onSelectionChange={(selectedRows) => {
                  setSelectedRows(selectedRows);
                  handleSelectionChange(selectedRows);
                }}
                data={filteredTable as any}
                totalData={total as any}
                columnDefs={columnDefs}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesDynamics;
