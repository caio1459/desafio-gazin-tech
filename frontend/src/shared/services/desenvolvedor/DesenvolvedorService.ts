import {
  IDesenvolvedor,
  IDesenvolvedorRes,
} from "../../interfaces/IDesenvolvedor";
import BaseService from "../api/BaseService";
import { ErroException } from "../api/ErrorException";

class DesenvolvedorService extends BaseService<
  IDesenvolvedor,
  IDesenvolvedorRes
> {
  constructor() {
    super("/desenvolvedores");
  }

  async getAllDevs(
    page: number,
    itens: number,
    sort: string,
    order: string,
    idFilter: string,
    nomeFilter: string,
    hobbyFilter: string,
    sexoFilter: string,
    nivelIdFilter: string
  ): Promise<IDesenvolvedorRes | ErroException> {
    const params = new URLSearchParams({
      page: page.toString(),
      itens: itens.toString(),
      sort,
      order,
    });

    if (idFilter) params.append("id", idFilter);
    if (nomeFilter) params.append("nome", nomeFilter);
    if (hobbyFilter) params.append("hobby", hobbyFilter);
    if (sexoFilter) params.append("sexo", sexoFilter);
    if (nivelIdFilter) params.append("nivel_id", nivelIdFilter);

    return this.getAll(params);
  }

  async createDev(
    desenvolvedor: Omit<IDesenvolvedor, "id">
  ): Promise<IDesenvolvedor | ErroException> {
    return this.create(desenvolvedor);
  }

  async updateDev(
    desenvolvedor: IDesenvolvedor,
    id: number
  ): Promise<IDesenvolvedor | ErroException> {
    return this.update(desenvolvedor, id);
  }

  async deleteDev(id: number): Promise<void | ErroException> {
    return this.delete(id);
  }
}

export default new DesenvolvedorService();
