import { Header } from "@widgets/header";

import { DataTable } from "../../../5_shared/ui/table/data-table";

import StoreDetails from "./store-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import StoresMap from "./stores-map";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { useMemo, useState } from "react";
import { STORES_MOCK } from "@shared/constants/mock/stores-mock";
import { columns } from "../model/columns";

const Stores = () => {
  const [search, setSearch] = useState("");
  const data = STORES_MOCK;

  // Фильтрация данных по всем полям
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    const lowerSearch = search.toLowerCase();

    return data.filter((store) =>
      Object.values(store).some((value) =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, data]);

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title="Справочник магазинов"
        actions={{
          left: (
            <div className="flex flex-row gap-1 w-full">
              <Input
                placeholder="Поиск по магазинам"
                className="w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={() => setSearch("")}>Сброс</Button>
            </div>
          ),
        }}
      />

      <div className="rounded-3xl px-4 pt-4 gap-4 h-fit flex flex-col min-h-[calc(100vh-4rem)] w-full bg-background">
        <Tabs defaultValue="stores">
          <TabsList className="w-full">
            <TabsTrigger value="stores">Магазины</TabsTrigger>
            <TabsTrigger value="map">Карта</TabsTrigger>
          </TabsList>

          <TabsContent value="stores">
            <div className="overflow-x-auto w-full max-w-full">
              <DataTable
                columns={columns}
                data={filteredData}
                onRowClick={(row) => console.log("row clicked", row)}
                renderRowDialog={({ row, isOpen, onClose }) => (
                  <StoreDetails
                    row={row}
                    open={isOpen}
                    onOpenChange={(open) => !open && onClose()}
                  />
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="map">
            <StoresMap stores={filteredData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Stores;
