import { PreparedFilterBlock } from "@widgets/unload/sheet/model/filters-store";

export interface DownloadAudienceRequest {
  filter: {
    include: PreparedFilterBlock[];
    exclude: PreparedFilterBlock[];
  };
}
