import { cn } from "@shared/lib/utils";
import { Button } from "@shared/ui/button";
import { Header } from "@widgets/header";
import { useState } from "react";
import { NotificationForm } from "./notification-form";
import { NotificationList } from "./notification-list";
import { NotificationStats } from "./notification-stats";

export const AdminNotifications = () => {
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Уведомления`}
        isAdmin={true}
        actions={{
          left: (
            <div className="ml-6 -mb-4 flex flex-row gap-1">
              <Button
                variant={"outline"}
                className={cn(
                  "border-b-0 rounded-b-none",
                  activeTab === "create" ? "opacity-100" : "opacity-50",
                )}
                onClick={() => setActiveTab("create")}
              >
                Создание
              </Button>
              <Button
                variant={"outline"}
                className={cn(
                  "border-b-0 rounded-b-none",
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
          "rounded-3xl px-4 py-4 gap-4 h-full flex flex-col flex-1 w-full bg-background",
        )}
      >
        <NotificationStats />

        {activeTab === "create" ? (
          <NotificationForm onSuccess={() => setActiveTab("manage")} />
        ) : (
          <NotificationList />
        )}
      </div>
    </div>
  );
};
