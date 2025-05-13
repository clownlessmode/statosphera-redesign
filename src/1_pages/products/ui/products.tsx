import { Input } from "@shared/ui/input";
import { Header } from "@widgets/header";
import { mock } from "../model/mock";

import { nomenclatureColumns } from "../model/col-defs";
import UniversalTable from "@pages/report/ui/table";
import EditProduct, { Product } from "./edit-product";
import InfinityTable from "@pages/report/ui/table/infinite-table";
const Products = () => {
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Номенклатура`}
        actions={{
          center: <Input placeholder="Поиск" className="w-full max-w-sm" />,
        }}
      />
      <div className="rounded-3xl bg-background p-4 flex flex-col h-[calc(100vh-4rem)] gap-4">
        {/* <InfinityTable
          fetchData={fetchData as any}
          columnDefs={nomenclatureColumns}
          actions={(rowData) => <EditProduct product={rowData.rowData} />}
          actionsIndex={0}
        /> */}
        <EditProduct product={mock[12]} />
      </div>
    </div>
  );
};

export default Products;
