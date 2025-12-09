import { Header } from "@widgets/header";
import { useFarmers } from "../api/controller";
import { ShortProfile } from "./cards";
import PageSkeleton from "@shared/ui/page-skeleton";
import { Input } from "@shared/ui/input";
import { useState } from "react";

export const Farmers = () => {
  const { farmers, isFarmersLoading } = useFarmers();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFarmers = farmers?.filter((farmer) => {
    const query = searchQuery.toLowerCase();
    return (
      farmer.organizationName?.toLowerCase().includes(query) ||
      farmer.managerName?.toLowerCase().includes(query)
    );
  });

  if (isFarmersLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header title={`Фермеры`} />
      <div className="rounded-3xl px-4 py-4 gap-4 h-[calc(100vh-64px)] flex flex-col w-full bg-background">
        <Input
          placeholder="Поиск фермера"
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul className="flex flex-col gap-2">
          {filteredFarmers?.map((farmer) => (
            <li key={farmer.idUser}>
              <ShortProfile farmer={farmer} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
