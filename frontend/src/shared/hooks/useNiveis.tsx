import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetchNiveis } from "../functions/nivel";
import NivelService from "../services/niveis/NivelService";
import { ErroException } from "../services/api/ErrorException";
import { INivel, INivelRes } from "../interfaces/INivel";
import MessageService from "../services/messages/MessageService";

export const useNiveis = () => {
  // Filtros de páginação
  const [page, setPage] = useState<number>(1);
  const [itens, setItens] = useState<number>(2);
  const [sort, setSort] = useState<string>("id");
  const [order, setOrder] = useState<string>("asc");
  const [idFilter, setIdFilter] = useState<string>("");
  const [nivelFilter, setNivelFilter] = useState<string>("");

  const [allNiveis, setAllNiveis] = useState<INivelRes | null>(null);
  const [nivel, setNivel] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [nivelToEdit, setNivelToEdit] = useState<INivel | null>(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [toast, setToast] = useState(false);

  const queryClient = useQueryClient();

  const handleClose = () => setShow(false);

  const { data: nivelRes, isLoading } = useQuery<INivelRes>(
    ["niveis", page, itens, sort, order, idFilter, nivelFilter],
    () => fetchNiveis(page, itens, sort, order, idFilter, nivelFilter),
    { onSettled: () => setLoading(false) }
  );

  const fetchAllNiveis = async () => {
    const allData = await fetchNiveis(1, 1000, "id", "asc", "", "");
    setAllNiveis(allData);
  };

  useEffect(() => {
    setLoading(true);
  }, [page, itens, sort, order, idFilter, nivelFilter])

  useEffect(() => {
    fetchAllNiveis();
  }, []);

  const mutation = useMutation({
    mutationFn: async ({ nivelToEdit }: { nivelToEdit?: INivel | null, handleClose?: () => void }) => {
      setLoading(true);
      if (nivelToEdit) {
        setMessage("Nível atualizado com sucesso!");
        return await NivelService.updateNivel(
          { nivel, id: nivelToEdit.id },
          nivelToEdit.id
        );
      } else {
        setMessage("Nível criado com sucesso!");
        return await NivelService.createNivel({ nivel });
      }
    },
    onSuccess: async (data, { handleClose }) => {
      if (data instanceof ErroException) {
        setToast(true);
        const errorResponse = data;
        if (errorResponse.errors) {
          const errors = Object.values(errorResponse.errors).flat();
          setErrorMessages(errors);
        } else {
          setErrorMessages([errorResponse.message]);
        }
        setLoading(false);
      } else {
        await queryClient.invalidateQueries("niveis").finally(() => {
          setLoading(false);
          setNivel("");
          MessageService.success(message);
          handleClose && handleClose();
        });
      }
    },
    onSettled: () => queryClient.invalidateQueries("niveis")
  });

  const handleSave = (nivelToEdit?: INivel | null, handleClose?: () => void) => {
    setErrorMessages([]);
    setToast(false);
    mutation.mutate({ nivelToEdit, handleClose });
  };

  const handleSortChange = (field: string) => {
    setSort(field);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItens(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleDelete = async (nivel: INivel) => {
    if (nivel.devs_count !== undefined && nivel.devs_count > 0) {
      MessageService.error("Exclusão não permitida a um nivel associado")
      return
    }
    setLoading(true);
    MessageService.confirm(
      "Deseja deletar esse nível?",
      "Nivel deletado com sucesso!",
      async () => {
        await NivelService.deleteNivel(nivel.id);
        await queryClient.invalidateQueries("niveis");
      },
      () => setLoading(false)
    ).finally(() => setLoading(false));
  };

  const handleEdit = (nivel: INivel) => {
    setShow(true);
    setNivelToEdit(nivel);
  };

  const getTotalNivelToDev = (): number => {
    return allNiveis?.data.reduce((count, nivel) => {
      return count + (nivel.devs_count !== undefined && nivel.devs_count > 0 ? 1 : 0);
    }, 0) || 0;
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
    allNiveis,
    setIdFilter,
    setNivelFilter,
    handleSortChange,
    handlePageChange,
    handleItemsPerPageChange,
    nivel,
    setNivel,
    loading,
    errorMessages,
    toast,
    handleSave,
    setErrorMessages,
    setToast,
    handleDelete,
    show,
    handleClose,
    nivelToEdit,
    handleEdit,
    getTotalNivelToDev
  };
};
