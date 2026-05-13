export type NightEntriesResponse = {
  id_store: number;
  card_number: string;
  status: boolean;
  time_open_door: string;
  store_name: string;
};

export type NightStoresResponse = {
  id_store: number;
  store: string;
};
