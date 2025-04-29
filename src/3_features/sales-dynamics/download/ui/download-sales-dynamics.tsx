import { Button } from "@shared/ui/button";
import { Download } from "lucide-react";

const DownloadSalesDynamics = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const handleDownloadReport = async () => {
    // await downloadReport({
    //   ...payload,
    //   values: payload.values,
    //   groups: payload.groups,
    //   sorts: { colId: [payload.values[0]], sort: "asc" },
    //   typeFile,
    // });
  };
  return (
    <Button variant="outline" onClick={() => handleDownloadReport()}>
      <Download />
    </Button>
  );
};

export default DownloadSalesDynamics;
