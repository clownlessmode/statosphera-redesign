export interface RequestDto {
  period: "M-0" | "M-3" | "M-6" | "M-6 -> M-3" | "M-3 -> M0" | "M-6 -> M0";
  rfmList: number[];
  idCalculation?: 3 | 4 | 6 | 7;
}

export interface NameSegment {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface FirstCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface SecondCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface ThirdCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface FourthCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface FifthCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface SixthCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface SeventhCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface EighthCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface NinthCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface TenthCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface EleventhCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface TwelfthCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface ThirteenthCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface FourteenCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface FifteenCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface SixteenCalculation {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}
