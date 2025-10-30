import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Funnel } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { RfmFilter } from "@widgets/rfm/ui/filter";
import { useFiltersStore } from "@widgets/rfm/model/filters-store";
//import { useIsMobile } from "@shared/hooks/use-mobile";

interface Props {
  onApplyFilters: () => void;
}

export const FilterModal: FC<Props> = ({ onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const { getApiPayload } = useFiltersStore();

  const isDisabled = useCallback(() => {
    const { rfmList, agePeriods, sex, period, sankey, heatmap } =
      getApiPayload();
    return (
      rfmList.length === 0 ||
      !agePeriods ||
      agePeriods.length === 0 ||
      sex.length === 0 ||
      !period ||
      period.length === 0 ||
      !sankey ||
      sankey.length === 0 ||
      !heatmap ||
      heatmap.length === 0
    );
  }, [getApiPayload]);

  const handleClick = () => {
    onApplyFilters();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="max-md:w-full">
          Изменить фильтры <Funnel />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-md:h-[calc(100vh-128px)]"
      >
        <RfmFilter />
        <Button disabled={isDisabled()} onClick={handleClick}>
          Сохранить
        </Button>
      </DialogContent>
    </Dialog>
  );
};
