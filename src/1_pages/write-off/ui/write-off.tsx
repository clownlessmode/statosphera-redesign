import { Header } from "@widgets/header";
import { useState } from "react";
import { Link } from "react-router";
import { AllWriteOffs } from "./all-write-offs";
import { useTabStore } from "@widgets/write-off/sheet/model/url-store";
import WriteOffFiltersSheet from "@widgets/write-off/sheet/ui/sheet";
import { Button } from "@shared/ui/button";
import { ROUTES_PATH } from "@app/router/routes";
import { useTabStore as useReportTabStore } from "@widgets/report/sheet/model/url-store";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useWriteOffStore } from "../model/write-off-store";
import { DownloadWriteOff } from "@features/write-off/download";

export const WriteOff = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true); // Показываем фильтры при первом открытии
  const isMobile = useIsMobile();
  const tab = useTabStore((state) => state.tab);
  const reportTab = useReportTabStore((state) => state.tab);
  const { table } = useWriteOffStore();

  return (
    <>
      <WriteOffFiltersSheet />
      <div className="bg-muted w-full p-2 flex flex-col gap-2 md:h-screen md:max-w-full md:overflow-hidden">
        <Header
          title="Списания"
          actions={{
            left: !isMobile && (
              <div className="ml-6 -mb-4 flex flex-row gap-1">
                <Link to={ROUTES_PATH.REPORT}>
                  <Button
                    variant="outline"
                    className="border-b-0! rounded-b-none! opacity-50"
                  >
                    {reportTab === "commerce" ? "Коммерческая" : "Чековая"}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-b-0! rounded-b-none!"
                >
                  {tab === "write-off" ? "Списания" : "Списания по поломкам"}
                </Button>
              </div>
            ),
            right: <DownloadWriteOff rows={table?.totalRows || 0} tab={tab} />,
          }}
        />
        <div className="rounded-3xl bg-background flex flex-col h-full gap-4 max-md:pb-4 max-md:*:px-4 *:first:px-0 max-md:*:last:px-0 md:p-4 max-md:gap-2">
          {isMobile && (
            <div className="flex flex-row gap-1">
              <Link to={ROUTES_PATH.REPORT} className="w-1/2">
                <Button
                  variant="outline"
                  className="border-0 border-b-1 border-r-1 rounded-none! rounded-tl-3xl! h-10 px-1 w-full opacity-50"
                >
                  {reportTab === "commerce" ? "Коммерческая" : "Чековая"}
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-0 rounded-none! rounded-tr-3xl! w-1/2 h-10"
              >
                {tab === "write-off" ? "Списания" : "Списания по поломкам"}
              </Button>
            </div>
          )}
          <AllWriteOffs
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </div>
      </div>
    </>
  );
};
