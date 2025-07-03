import { Header } from "@widgets/header";
import { StoreCard } from "./card";
import { Button } from "@shared/ui/button";
import { Grid, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@shared/lib/utils";
import { useStoresController } from "@pages/stores/model/api/controller";
import { Skeleton } from "@shared/ui/skeleton";

export const AdminStoresPage = () => {
  const { stores, isStoresLoading } = useStoresController();
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Магазины`}
        isAdmin={true}
        actions={{
          center: (
            <>
              <div className="flex flex-row items-center gap-2">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => setView("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => setView("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </>
          ),
        }}
      />
      <div
        className={cn(
          "rounded-3xl px-4 py-4 gap-4 h-full grid grid-cols-2 flex-1 w-full bg-background",
          view === "grid" ? "grid-cols-2" : "grid-cols-1",
        )}
      >
        {isStoresLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-full" />
            ))
          : stores
              ?.sort((a, b) => {
                // Действующие магазины будут выше
                if (
                  a.storeCondition === "Действующие" &&
                  b.storeCondition !== "Действующие"
                )
                  return -1;
                if (
                  a.storeCondition !== "Действующие" &&
                  b.storeCondition === "Действующие"
                )
                  return 1;
                return 0;
              })
              .map((store) => <StoreCard key={store.idStore} store={store} />)}
      </div>
    </div>
  );
};
