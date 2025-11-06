export interface RequestDto {
  period: string;
  rfmList: number[];
  sex: string[];
  age: string[];
}

export interface NameSegmentResponse {
  rfmCode: number;
  rfmName: string;
}

export interface TreemapRfmOrderDeliveryResponse {
  childrenProceed: {
    name: string;
    value: number;
    children: {
      name: string;
      value: number;
    }[];
  }[];
}
