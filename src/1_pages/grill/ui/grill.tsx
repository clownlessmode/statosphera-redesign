import { Header } from "@widgets/header";

import { useIsMobile } from "@shared/hooks/use-mobile";

// import { Separator } from "@shared/ui/separator";

const Grill = () => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title={`Гриль`} />
      <div className="rounded-3xl bg-background p-4 gap-4 h-full flex flex-col">
        grill content
      </div>
    </div>
  );
};

export default Grill;
