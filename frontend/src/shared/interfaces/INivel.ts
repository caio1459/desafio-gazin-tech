import { IMeta } from "./IMeta";

export interface INivelRes {
  data: INivel[];
  meta: IMeta;
}

export interface INivel {
  id: number;
  nivel: string;
}
