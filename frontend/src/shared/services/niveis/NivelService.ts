import { INivel, INivelRes } from "../../interfaces/INivel";
import BaseService from "../api/BaseService";
import { ErroException } from "../api/ErrorException";

class NivelService extends BaseService<INivel, INivelRes> {
  constructor() {
    super("niveis");
  }

  async getAllNiveis(
    page: number,
    itens: number,
    sort: string,
    order: string,
    idFilter: string,
    nivelFilter: string
  ): Promise<INivelRes | ErroException> {
    const params = new URLSearchParams({
      page: page.toString(),
      itens: itens.toString(),
      sort,
      order,
    });

    if (idFilter) params.append("id", idFilter);
    if (nivelFilter) params.append("nivel", nivelFilter);

    return this.getAll(params);
  }

  async createNivel(
    nivel: Omit<INivel, "id">
  ): Promise<INivel | ErroException> {
    return this.create(nivel);
  }

  async updateNivel(
    nivel: INivel,
    id: number
  ): Promise<INivel | ErroException> {
    return this.update(nivel, id);
  }

  async deleteNivel(id: number): Promise<void | ErroException> {
    return this.delete(id);
  }
}

export default new NivelService();
