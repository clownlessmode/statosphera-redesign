import { Header } from "@widgets/header";
import { FC } from "react";

const SalesDynamics: FC = () => {
  return (
    <div className="bg-muted max-h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Динамика продаж" />
      <div className="rounded-3xl bg-background p-4 flex flex-col h-full gap-4"></div>
    </div>
  );
};

export default SalesDynamics;
