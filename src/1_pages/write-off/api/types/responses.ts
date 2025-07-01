// Response types for Write-Off API

export interface WriteOffTableResponse {
  data: any[];
  totalRows: number;
}

export interface WriteOffTotalResponse {
  writeOff: number;
  writeOffCount: number;
  writeOffWeight: number;
  writeOffLM: number;
  writeOffCountLM: number;
  writeOffWeightLM: number;
  writeOffLY: number;
  writeOffCountLY: number;
  writeOffWeightLY: number;
  writeOffMoM: number;
  writeOffCountMoM: number;
  writeOffWeightMoM: number;
  writeOffMoMPercent: number;
  writeOffCountMoMPercent: number;
  writeOffWeightMoMPercent: number;
  writeOffYoY: number;
  writeOffCountYoY: number;
  writeOffWeightYoY: number;
  writeOffYoYPercent: number;
  writeOffCountYoYPercent: number;
  writeOffWeightYoYPercent: number;
}

// Тип для прямого ответа от API (массив данных)
export type WriteOffTableDataResponse = Array<{
  store_id: number;
  store: string;
  writeOff: number;
  writeOffCount: number;
  writeOffWeight: number;
  writeOffLM: number;
  writeOffCountLM: number;
  writeOffWeightLM: number;
  writeOffLY: number;
  writeOffCountLY: number;
  writeOffWeightLY: number;
  writeOffMoM: number;
  writeOffMoMPercent: number;
  writeOffYoY: number;
  writeOffYoYPercent: number;
}>;

export interface WriteOffGraphSeries {
  name: string;
  data: Array<[string, number]>;
}

export interface WriteOffGraphCard {
  name1: string;
  name2: string;
  negative: boolean;
  value1: string;
  value2: string;
}

export interface WriteOffGraphResponse {
  graph: WriteOffGraphSeries[];
  card1: WriteOffGraphCard;
  card2: WriteOffGraphCard;
  card3: WriteOffGraphCard;
}

// Альтернативный тип для массива серий графика
export type WriteOffGraphSeriesArray = WriteOffGraphSeries[];

export interface WriteOffReason {
  name: string;
  value: number;
  count: number;
  weight: number;
}

export interface WriteOffReasonsResponse {
  data: WriteOffReason[];
}
