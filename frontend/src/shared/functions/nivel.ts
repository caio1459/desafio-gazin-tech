import { INivelRes } from "../interfaces/INivel";
import { ErroException } from "../services/api/ErrorException";
import NivelService from "../services/niveis/NivelService";

export const fetchNiveis = async (
  page: number,
  itens: number,
  sort: string,
  order: string,
  idFilter: string,
  nivelFilter: string
): Promise<INivelRes> => {
  const res = await NivelService.getAllNiveis(
    page,
    itens,
    sort,
    order,
    idFilter,
    nivelFilter
  );
  if (res instanceof ErroException) {
    throw new Error(res.message);
  }
  return res;
};
