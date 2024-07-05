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
  data_nascimento: Date;
  nivel: INivel;
  idade: number;
}
