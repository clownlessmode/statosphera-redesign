import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { ProductsFilter } from "@widgets/report/sheet/ui/side/products-filter";
import { Funnel } from "lucide-react";
import { FC, useState } from "react";

interface Props {
  onApplyFilters: () => void;
}

export const FilterModal: FC<Props> = ({ onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    onApplyFilters();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <Funnel />
          <p className="max-xs:hidden">Фильтры</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[800px] max-md:h-[calc(100vh-128px)]">
        <ProductsFilter className="grid grid-cols-1 md:grid-cols-2" />
        <Button onClick={handleClick}>Сохранить</Button>
      </DialogContent>
    </Dialog>
  );
};
