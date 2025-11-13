import { PreparedFilterBlock } from "@widgets/unload/sheet/model/filters-store";

export interface RequestDto {
  filter: {
    include: PreparedFilterBlock[];
    exclude: PreparedFilterBlock[];
  };
}

export interface AudienceResponse {
  count: number;
}
