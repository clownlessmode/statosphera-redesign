import { Header } from "@widgets/header";
import { useState } from "react";
import { Link } from "react-router";
import { AllWriteOffs } from "./all-write-offs";
import { useTabStore } from "@widgets/write-off/sheet/model/url-store";
import WriteOffFiltersSheet from "@widgets/write-off/sheet/ui/sheet";
import { Button } from "@shared/ui/button";
import { ROUTES_PATH } from "@app/router/routes";
import { useTabStore as useReportTabStore } from "@widgets/report/sheet/model/url-store";

export const WriteOff = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true); // Показываем фильтры при первом открытии

  const tab = useTabStore((state) => state.tab);
  const reportTab = useReportTabStore((state) => state.tab);
  return (
    <>
      <WriteOffFiltersSheet />
      <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
        <Header
          actions={{
            left: (
              <div className="ml-6 -mb-4 flex flex-row gap-1">
                <Link to={ROUTES_PATH.REPORT}>
                  <Button
                    variant="outline"
                    className="border-b-0 rounded-b-none opacity-50"
                  >
                    {reportTab === "commerce" ? "Коммерческая" : "Чековая"}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-b-0 rounded-b-none "
                >
                  {tab === "write-off" ? "Списания" : "Списания по поломкам"}
                </Button>
              </div>
            ),
          }}
        />
        <div className="rounded-3xl bg-background p-4 flex flex-col h-full gap-4">
          <AllWriteOffs
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </div>
      </div>
    </>
  );
};
