import { Header } from "@widgets/header";

import StandartCard from "@entities/standarts/ui/standart-card";
import { standartsMock } from "@shared/constants/mock/standarts-mock";

const Digests = () => {
  const standarts = standartsMock;

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Стандарты РС" />
      <div className="rounded-3xl bg-background p-4 gap-4 h-full flex flex-col lg:flex-row-reverse">
        <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 gap-2 w-full h-fit grid-cols-1">
          {standarts.map((item) => (
            <StandartCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Digests;
