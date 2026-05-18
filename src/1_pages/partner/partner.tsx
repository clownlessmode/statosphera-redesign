import { useState } from "react";
import { Header } from "@widgets/header";
import PartnerFiltersSheet from "@widgets/partner/sheet/ui/sheet";
import { AllPartners } from "./ui/all-partners";
import { usePartnerFiltersStore } from "./model/filters-store";

export const Partner = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const requestSubmit = usePartnerFiltersStore((s) => s.requestSubmit);

  return (
    <>
      <PartnerFiltersSheet onSubmit={requestSubmit} />
      <div className="bg-muted w-full p-2 flex flex-col gap-2 md:h-screen md:max-w-full md:overflow-hidden">
        <Header title="Партнёры" />
        <div className="rounded-3xl bg-background flex flex-col flex-1 min-h-0 gap-4 max-md:pb-4 md:p-4 max-md:gap-2 overflow-hidden">
          <AllPartners
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </div>
      </div>
    </>
  );
};
