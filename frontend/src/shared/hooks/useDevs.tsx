import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetchDevs } from "../functions/desenvolvedor";
import DesenvolvedorService from "../services/desenvolvedor/DesenvolvedorService";
import { ErroException } from "../services/api/ErrorException";
import { IDesenvolvedor, IDesenvolvedorRes } from "../interfaces/IDesenvolvedor";
import MessageService from "../services/messages/MessageService";

export const useDevs = () => {
  const [page, setPage] = useState<number>(1);
  const [itens, setItens] = useState<number>(5);
  const [sort, setSort] = useState<string>("id");
  const [order, setOrder] = useState<string>("asc");
  const [idFilter, setIdFilter] = useState<string>("");
  const [nomeFilter, setNomeFilter] = useState<string>("");
  const [hobbyFilter, setHobbyFilter] = useState<string>("");
  const [sexoFilter, setSexoFilter] = useState<string>("");
  const [nivelIdFilter, setNivelIdFilter] = useState<string>("");

  const [nome, setNome] = useState<string>("");
  const [hobby, setHobby] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [nivelId, setNivelId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devToEdit, setDevToEdit] = useState<IDesenvolvedor | null>(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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

  const mutation = useMutation({
    mutationFn: async ({ devToEdit }: { devToEdit?: IDesenvolvedor | null, handleClose?: () => void }) => {
      setLoading(true);
      const payload = {
        nome,
        hobby,
        sexo,
        data_nascimento: dataNascimento,
        ...(nivelId ? { nivel_id: nivelId } : {}),
        ...(devToEdit ? { id: devToEdit.id } : {}),
      };

      if (devToEdit) {
        setMessage("Desenvolvedor atualizado com sucesso!")
        return await DesenvolvedorService.updateDev(payload as IDesenvolvedor, devToEdit.id);
      } else {
        setMessage("Desenvolvedor criado com sucesso!")
        return await DesenvolvedorService.createDev(payload as Omit<IDesenvolvedor, "id">);
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
        await queryClient.invalidateQueries("desenvolvedores").finally(() => {
          setLoading(false);
          reset();
          MessageService.sucess(message)
          handleClose && handleClose();
        });
      }
    },
  });

  const handleSave = (devToEdit?: IDesenvolvedor | null, handleClose?: () => void) => {
    setErrorMessages([]);
    setToast(false);
    mutation.mutate({ devToEdit, handleClose });
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    MessageService.confirm(
      "Deseja deletar esse Desenvolvedor?",
      "Desenvolvedor deletado com sucesso!",
      async () => {
        await DesenvolvedorService.deleteDev(id);
        await queryClient.invalidateQueries("desenvolvedores");
      }
    ).finally(() => {
      setLoading(false);
    });
  };

  const handleEdit = (dev: IDesenvolvedor) => {
    setShow(true);
    setDevToEdit(dev);
  };

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

  const reset = () => {
    setNome("");
    setHobby("");
    setSexo("");
    setDataNascimento("");
    setNivelId("");
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
    nome,
    setNome,
    hobby,
    setHobby,
    sexo,
    setSexo,
    dataNascimento,
    setDataNascimento,
    nivelId,
    setNivelId,
    errorMessages,
    setErrorMessages,
    toast,
    setToast,
    loading,
    handleSave,
    reset,
    show,
    handleClose,
    devToEdit,
    handleEdit,
    handleDelete
  };
};
