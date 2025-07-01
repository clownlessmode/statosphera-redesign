import { Header } from "@widgets/header";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AllWriteOffs } from "./all-write-offs";
import { useTabStore } from "@widgets/write-off/sheet/model/url-store";
import WriteOffFiltersSheet from "@widgets/write-off/sheet/ui/sheet";

export const WriteOff = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true); // Показываем фильтры при первом открытии
  const navigate = useNavigate();

  const tab = useTabStore((state) => state.tab);

  return (
    <>
      <WriteOffFiltersSheet />
      <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
        <Header />

        <div className="ml-6 flex flex-row gap-0 -mb-2">
          <div className="flex items-center justify-center bg-background text-white rounded-t-2xl p-2 w-fit">
            <p>
              {tab === "write-off" ? "Списания (все)" : "Списания (поломки)"}
            </p>
          </div>
          <button
            onClick={() => navigate("/report")}
            className="flex items-center justify-center bg-background text-muted-foreground hover:text-foreground rounded-t-2xl p-2 w-30 transition-colors"
          >
            <p>Отчеты</p>
          </button>
        </div>

        <div className="rounded-3xl bg-background p-4 flex flex-col flex-1 gap-4 min-h-0">
          <AllWriteOffs
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </div>
      </div>
    </>
  );
};
