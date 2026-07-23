import { STORE_CHANNEL, STORE_STATUS } from "@entities/store/config";

export type UpdateStoreDto = {
  idStore: number;
  storeCondition: STORE_STATUS;
  channel: STORE_CHANNEL;
};
