import { cn } from "@shared/lib/utils";
import { Button } from "@shared/ui/button";
import { Header } from "@widgets/header";

import { useState } from "react";
import { DigestForm } from "./digest-form";
import { DigestList } from "./digest-list";
import { DigestStats } from "./digest-stats";

export const AdminDigests = () => {
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Дайджесты`}
        isAdmin={true}
        actions={{
          left: (
            <div className="ml-6 -mb-4 flex flex-row gap-1">
              <Button
                variant={"outline"}
                className={cn(
                  "border-b-0! rounded-b-none!",
                  activeTab === "create" ? "opacity-100" : "opacity-50",
                )}
                onClick={() => setActiveTab("create")}
              >
                Создание
              </Button>
              <Button
                variant={"outline"}
                className={cn(
                  "border-b-0! rounded-b-none!",
                  activeTab === "manage" ? "opacity-100" : "opacity-50",
                )}
                onClick={() => setActiveTab("manage")}
              >
                Управление
              </Button>
            </div>
          ),
        }}
      />
      <div
        className={cn(
          "rounded-3xl px-4 py-4 gap-4 flex flex-col flex-1 w-full bg-background overflow-auto",
        )}
      >
        <DigestStats />

        {activeTab === "create" ? (
          <DigestForm onSuccess={() => setActiveTab("manage")} />
        ) : (
          <DigestList onEdit={() => setActiveTab("create")} />
        )}
      </div>
    </div>
  );
};
