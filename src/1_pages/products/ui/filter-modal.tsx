import { format } from "date-fns";
import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import {
  ProductsFilter,
  FilterDateOverrideProvider,
  IsProductsOverrideProvider,
} from "@widgets/report/sheet/ui/side/products-filter";
import { Funnel } from "lucide-react";
import { FC, useState } from "react";
import {
  MIN_DATE,
  MAX_DATE,
} from "@widgets/report/sheet/ui/side/date-filter/config/constants";

interface Props {
  onApplyFilters: () => void;
}

/** Полный период только для загрузки опций в этом модальном окне. Store отчётов не трогаем. */
const FULL_PERIOD = {
  dateStart: format(MIN_DATE, "yyyy-MM-dd"),
  dateEnd: format(MAX_DATE, "yyyy-MM-dd"),
};

export const FilterModal: FC<Props> = ({ onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    onApplyFilters();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Funnel />
          <p className="max-xs:hidden">Фильтры</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="md:min-w-[800px] max-md:h-[calc(100vh-128px)]"
        aria-describedby={undefined}
      >
        <FilterDateOverrideProvider value={FULL_PERIOD}>
          <IsProductsOverrideProvider value={true}>
            <ProductsFilter className="grid grid-cols-1 md:grid-cols-2" />
            <Button onClick={handleClick}>Сохранить</Button>
          </IsProductsOverrideProvider>
        </FilterDateOverrideProvider>
      </DialogContent>
    </Dialog>
  );
};
