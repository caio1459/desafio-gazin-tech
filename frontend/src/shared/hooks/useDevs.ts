import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchDevs } from "../functions/desenvolvedor";
import { IDesenvolvedorRes } from "../interfaces/IDesenvolvedor";

export const useDevs = () => {
  const [page, setPage] = useState<number>(1);
  const [itens, setItens] = useState<number>(5);
  const [sort, setSort] = useState<string>("id");
  const [order, setOrder] = useState<string>("asc");
  //Filtros personalizados
  const [idFilter, setIdFilter] = useState<string>("");
  const [nomeFilter, setNomeFilter] = useState<string>("");
  const [hobbyFilter, setHobbyFilter] = useState<string>("");
  const [sexoFilter, setSexoFilter] = useState<string>("");
  const [nivelIdFilter, setNivelIdFilter] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: devRes, isLoading } = useQuery<IDesenvolvedorRes>(
    [
      "desenvolvedores",
      page,
      itens,
      sort,
      order,
      idFilter,
      nomeFilter,
      hobbyFilter,
      sexoFilter,
      nivelIdFilter,
    ],
    () =>
      fetchDevs(
        page,
        itens,
        sort,
        order,
        idFilter,
        nomeFilter,
        hobbyFilter,
        sexoFilter,
        nivelIdFilter
      ),
    { keepPreviousData: true }
  );

  const handleSortChange = (field: string) => {
    setSort(field);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItens(parseInt(event.target.value, 10));
    setPage(1);
  };

  return {
    page,
    itens,
    sort,
    order,
    idFilter,
    nomeFilter,
    hobbyFilter,
    sexoFilter,
    nivelIdFilter,
    devRes,
    isLoading,
    queryClient,
    setIdFilter,
    setNomeFilter,
    setHobbyFilter,
    setSexoFilter,
    setNivelIdFilter,
    handleSortChange,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
