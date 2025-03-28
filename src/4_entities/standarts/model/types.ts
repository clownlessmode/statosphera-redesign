export interface Standart {
  id: number;
  idteg: number;
  nameteg: string;
  datestart: string;
  full_path: string;
  name_standard: string;
  attachedFiles: number;
  attachedVideo: number;
  attachedPhoto: number;
  tagSearch: string | null;
  color: string;
  links?: {
    id_add: number;
    id: number;
    full_path: string;
    nameFiles: string;
  }[];
}
