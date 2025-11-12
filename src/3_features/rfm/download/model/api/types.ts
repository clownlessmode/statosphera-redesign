export interface DownloadMigrationsRequest {
  rfmCodeM6?: number;
  rfmCodeM3?: number;
  rfmCodeM0?: number;
  sex: string[];
  age: string[];
}

export interface DownloadSegmentRequest {
  period: string;
  rfmCode: number;
  sex: string[];
  age: string[];
}
