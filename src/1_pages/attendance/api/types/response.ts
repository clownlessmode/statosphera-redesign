export interface CameraStatsRow {
  idStore: number;
  way: string;
  count: number;
  firstTime: string;
  lastTime: string;
  storeName: string;
}

export type CameraStatsResponse = CameraStatsRow[];

export interface CameraEventsResponse {
  id: number;
  idStore: number;
  way: string;
  createAt: string;
  storeName: string;
}

export interface CameraStoreItem {
  idStore: number;
  store: string;
}

export type CameraStoresResponse = CameraStoreItem[];

export interface CameraGraphRow {
  period: string;
  count: number;
}

export type CameraGraphResponses = CameraGraphRow[];
