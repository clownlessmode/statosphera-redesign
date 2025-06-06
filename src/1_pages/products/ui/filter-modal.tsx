import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { ProductsFilter } from "@widgets/report/sheet/ui/side/products-filter";
import { Funnel } from "lucide-react";
import { FC, useState } from "react";

interface Props {
  refetch: () => void;
}

export const FilterModal: FC<Props> = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    refetch();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <Funnel />
          <p>Фильтры</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[800px] ">
        <ProductsFilter className="grid grid-cols-2" />
        <Button onClick={handleClick}>Сохранить</Button>
      </DialogContent>
    </Dialog>
  );
};
