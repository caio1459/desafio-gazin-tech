import { IMeta } from "./IUtils";

export interface INivelRes {
  data: INivel[];
  meta: IMeta;
}

export interface INivel {
  id: number;
  nivel: string;
}
