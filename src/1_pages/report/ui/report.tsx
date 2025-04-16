import { Header } from "@widgets/header";
import { Sheet } from "@widgets/report/sheet";

import { type FC } from "react";

const Report: FC = () => {
  return (
    <>
      <Sheet />
      <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
        <Header title="Отчеты" />
        <div className="rounded-3xl bg-background p-4 gap-4 grid grid-cols-1 grid-rows-5"></div>
      </div>
    </>
  );
};

export default Report;
{
  /* <div className="overflow-x-auto w-full max-w-full h-full! row-span-2"> */
}
{
  /* <DataTable
              key={lastUpdate}
              columns={columns}
              data={table?.data || []}
            /> */
}
{
  /* </div> */
}
// const prepareLine = usePreparedStackedLine();
// const prevUpdate = useRef(lastUpdate);

// const columns = useMemo(() => {
//   if (!table?.data) return [];
//   return generateDynamicColumns(table.data);
// }, [table?.data, lastUpdate]);

// useEffect(() => {
//   if (prevUpdate.current !== lastUpdate) {
//     console.log("Data updated:", table);
//     prevUpdate.current = lastUpdate;
//   }
// }, [lastUpdate, table]);
