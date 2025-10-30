import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Funnel } from "lucide-react";
import { FC, useCallback, useState } from "react";
import ComparisonFilter from "@widgets/rfm/ui/filter/ui/comparison-filter";
import { useComparisonFiltersStore } from "@widgets/rfm/model/comparision-filters-store";
//import { useIsMobile } from "@shared/hooks/use-mobile";

interface Props {
  onApplyFilters: () => void;
}

export const ComparisonFilterModal: FC<Props> = ({ onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const { getApiPayload } = useComparisonFiltersStore();

  const isDisabled = useCallback(() => {
    const { firstSegment, secondSegment } = getApiPayload();
    return (
      !firstSegment.rfmCode ||
      !firstSegment.age ||
      firstSegment.age?.length === 0 ||
      !firstSegment.sex ||
      firstSegment.sex?.length === 0 ||
      !firstSegment.period ||
      firstSegment.period?.length === 0 ||
      !secondSegment.rfmCode ||
      secondSegment.rfmCode === 0 ||
      !secondSegment.age ||
      secondSegment.age?.length === 0 ||
      !firstSegment.sex ||
      secondSegment.sex?.length === 0 ||
      !secondSegment.period ||
      secondSegment.period?.length === 0
    );
  }, [getApiPayload]);

  const handleClick = () => {
    onApplyFilters();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Funnel />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-md:h-[calc(100vh-128px)] md:min-w-160"
      >
        <ComparisonFilter />
        <Button disabled={isDisabled()} onClick={handleClick}>
          Сохранить
        </Button>
      </DialogContent>
    </Dialog>
  );
};
