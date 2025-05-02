import { Button } from "@shared/ui/button";

import { Download } from "lucide-react";
import { useDownloadSalesDynamics } from "../model/controller";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";

const DownloadSalesDynamics = () => {
  const { downloadReport } = useDownloadSalesDynamics();
  const getApiPayload = useSalesDynamicsFiltersStore(
    (state) => state.getApiPayload
  );

  const payload = getApiPayload();

  const handleDownloadReport = async () => {
    await downloadReport({
      ...payload,
      values: payload.values,
      groups: payload.groups,
    });
  };
  return (
    <Button variant="outline" onClick={() => handleDownloadReport()}>
      <Download />
    </Button>
  );
};

export default DownloadSalesDynamics;
