export type Way = "in" | "out" | "passing" | "all";

export interface CameraStatsRequest {
  way?: Way;
  idStore?: number;
  startDateTime: string;
  endDateTime: string;
}

export interface CameraEventsPagination {
  limit?: number;
  offset?: number;
}

export interface CameraEventsRequest extends CameraStatsRequest {
  sort: "asc" | "desc";
  pagination?: CameraEventsPagination;
}

export interface CameraGraphRequest extends CameraStatsRequest {
  groupBy: "hour" | "day" | "week" | "month" | "year";
}
