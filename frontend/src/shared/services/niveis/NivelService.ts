import { INivel, INivelRes } from "../../interfaces/INivel";
import ApiConfig from "../api/ApiConfig";
import { ErroException } from "../api/ErrorException";

class NivelService {
  async getAll(page: number, itens: number, sort: string, order: string): Promise<INivelRes | ErroException> {
    try {
      const { data } = await ApiConfig.runApi().get(
        `/niveis?page=${page}&itens=${itens}&sort=${sort}&order=${order}`
      );
      return data;
    } catch (error: any) {
      return new ErroException(error.message || "Erro ao listar niveis");
    }
  }

  async create(nivel: Omit<INivel, "id">): Promise<INivel | ErroException> {
    try {
      const { data } = await ApiConfig.runApi().post("/niveis", nivel);
      return data;
    } catch (error: any) {
      return new ErroException(error.message || "Erro ao criar a nivel");
    }
  }

  async update(nivel: INivel, id: string): Promise<INivel | ErroException> {
    try {
      const { data } = await ApiConfig.runApi().put(`/niveis/${id}`, nivel);
      return data;
    } catch (error: any) {
      return new ErroException(error.message || "Erro ao atualizar a nivel");
    }
  }

  async delete(id: string): Promise<undefined | ErroException> {
    try {
      await ApiConfig.runApi().delete(`/niveis/${id}`);
      return undefined;
    } catch (error: any) {
      return new ErroException(error.message || "Erro ao deletar a mivel");
    }
  }
}

export default new NivelService();
