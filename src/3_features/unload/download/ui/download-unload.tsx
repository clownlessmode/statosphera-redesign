import { Button } from "@shared/ui/button";
import { useDownloadAudienceController } from "../model/api/controller";
import {
  PreparedFilterBlock,
  useUnloadFilterStore,
} from "@widgets/unload/sheet/model/filters-store";

const DownloadUnload = () => {
  const { getPreparedFilter } = useUnloadFilterStore();
  const { downloadAudience } = useDownloadAudienceController();

  const handleDownloadReport = async () => {
    const { include, exclude } = getPreparedFilter();
    console.log({ include, exclude });
    await downloadAudience({
      filter: {
        include: include as PreparedFilterBlock[],
        exclude: exclude as PreparedFilterBlock[],
      },
    });
  };

  return (
    <Button onClick={handleDownloadReport} className="w-full">
      Выгрузить
    </Button>
  );
};

export default DownloadUnload;
