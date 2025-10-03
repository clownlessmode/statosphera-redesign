export interface GrillProductRo {
  productName: string;
  idProduct: number[];
  idProduct1C: string;
  groupName: string;
  groups: number[];
}

export interface GrillProductTblRo {
  countProduct: number;
  countSales: number;
  ed: string;
  fullname: string;
  id: number;
  idProduct: number;
  remainder: number;
}

type DataPoint = [number, number | null];

export interface GraphSeries {
  name: string;
  data: DataPoint[];
}

export interface GraphData {
  graph: GraphSeries[];
  graphCheck: GraphSeries[];
}
