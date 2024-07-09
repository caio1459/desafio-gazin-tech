import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchNiveis } from "../functions/nivel";
import { INivelRes } from "../interfaces/INivel";

export const useNiveis = () => {
  const [page, setPage] = useState<number>(1);
  const [itens, setItens] = useState<number>(2);
  const [sort, setSort] = useState<string>("id");
  const [order, setOrder] = useState<string>("asc");
  //Filtros personalizados
  const [idFilter, setIdFilter] = useState<string>("");
  const [nivelFilter, setNivelFilter] = useState<string>("");
  
  const queryClient = useQueryClient();
  const { data: nivelRes, isLoading } = useQuery<INivelRes>(
    ["niveis", page, itens, sort, order, idFilter, nivelFilter],
    () => fetchNiveis(page, itens, sort, order, idFilter, nivelFilter),
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
    nivelFilter,
    nivelRes,
    isLoading,
    queryClient,
    setIdFilter,
    setNivelFilter,
    handleSortChange,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
