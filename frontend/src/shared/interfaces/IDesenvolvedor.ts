import { IMeta } from "./IUtils";
import { INivel } from "./INivel";

export interface IDesenvolvedorRes {
  data: IDesenvolvedor[];
  meta: IMeta;
}

export interface IDesenvolvedor {
  id: number;
  nome: string;
  hobby: string;
  sexo: string;
  data_nascimento: string;
  nivel?: INivel;
  nivel_id?: number;
  idade?: number;
}
