export type NightEntriesRequest = {
  id_store?: number;
  pagination?: {
    limit: number;
    offset: number;
  };
  card_number?: number;
};
