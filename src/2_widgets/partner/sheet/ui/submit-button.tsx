import { Button } from "@shared/ui/button";
import { useSearchParams } from "react-router";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { usePartnerFiltersStore } from "@pages/partner/model/filters-store";

type PartnerSubmitButtonProps = React.ComponentProps<"button"> & {
  onSubmit: () => void | Promise<void>;
};

export const PartnerSubmitButton = ({
  className,
  onSubmit,
  ...props
}: PartnerSubmitButtonProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const values = usePartnerFiltersStore((s) => s.values);
  const group = usePartnerFiltersStore((s) => s.group);
  const isMobile = useIsMobile();

  const isDisabled = values.length === 0 || group.length === 0;

  const handleSubmit = async () => {
    const p = new URLSearchParams(searchParams);
    p.set("open", "false");
    setSearchParams(p);
    await onSubmit();
  };

  return (
    <Button
      className={className}
      onClick={handleSubmit}
      disabled={isDisabled}
      {...props}
    >
      {isMobile ? "Получить отчёт" : "Получить отчёт"}
    </Button>
  );
};
