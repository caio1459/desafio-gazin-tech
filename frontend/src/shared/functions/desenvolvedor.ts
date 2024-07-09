import { IDesenvolvedorRes } from "../interfaces/IDesenvolvedor";
import { ErroException } from "../services/api/ErrorException";
import DesenvolvedorService from "../services/desenvolvedor/DesenvolvedorService";

export const fetchDevs = async (
  page: number,
  itens: number,
  sort: string,
  order: string,
  idFilter: string,
  nomeFilter: string,
  hobbyFilter: string,
  sexoFilter: string,
  nivelIdFilter: string
): Promise<IDesenvolvedorRes> => {
  const res = await DesenvolvedorService.getAllDevs(
    page,
    itens,
    sort,
    order,
    idFilter,
    nomeFilter,
    hobbyFilter,
    sexoFilter,
    nivelIdFilter
  );
  if (res instanceof ErroException) {
    throw new Error(res.message);
  }
  return res;
};
