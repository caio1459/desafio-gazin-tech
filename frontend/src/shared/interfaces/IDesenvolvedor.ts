import { IMeta } from "./IMeta";

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
  nivel_id: number;
  idade: number;
}
