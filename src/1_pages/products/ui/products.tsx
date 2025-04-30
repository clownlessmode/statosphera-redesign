import UniversalTable from "@pages/report/ui/table";
import { Input } from "@shared/ui/input";
import { Header } from "@widgets/header";
import { mock } from "../model/mock";
import { columnDefs } from "@shared/constants/table-columns";

const Products = () => {
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Номенклатура`}
        actions={{
          center: <Input placeholder="Поиск" className="w-full max-w-sm" />,
        }}
      />
      <div className="rounded-3xl bg-background p-4 flex flex-col h-full gap-4">
        <UniversalTable data={mock as any[]} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default Products;
