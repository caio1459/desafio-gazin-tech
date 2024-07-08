import ApiConfig from "./ApiConfig";
import { ErroException } from "./ErrorException";

class BaseService<T, R> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected async getAll(params: URLSearchParams): Promise<R | ErroException> {
    try {
      const { data } = await ApiConfig.runApi().get(
        `${this.endpoint}?${params.toString()}`
      );
      return data;
    } catch (error: any) {
      return new ErroException(
        error.message || `Erro ao listar ${this.endpoint}`,
        error.response?.data?.errors
      );
    }
  }

  protected async create(item: Omit<T, "id">): Promise<T | ErroException> {
    try {
      const { data } = await ApiConfig.runApi().post(this.endpoint, item);
      return data;
    } catch (error: any) {
      return new ErroException(
        error.message || `Erro ao criar ${this.endpoint}`,
        error.response?.data?.errors
      );
    }
  }

  protected async update(item: T, id: number): Promise<T | ErroException> {
    try {
      const { data } = await ApiConfig.runApi().put(
        `${this.endpoint}/${id}`,
        item
      );
      return data;
    } catch (error: any) {
      return new ErroException(
        error.message || `Erro ao atualizar ${this.endpoint}`,
        error.response?.data?.errors
      );
    }
  }

  protected async delete(id: number): Promise<void | ErroException> {
    try {
      await ApiConfig.runApi().delete(`${this.endpoint}/${id}`);
    } catch (error: any) {
      return new ErroException(
        error.message || `Erro ao deletar ${this.endpoint}`,
        error.response?.data?.errors
      );
    }
  }
}

export default BaseService;
