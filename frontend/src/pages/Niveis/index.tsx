import { Table } from "react-bootstrap";
import { Loading } from "../../shared/components/Loading";
import { useState } from 'react';
import MessageService from "../../shared/services/messages/MessageService";
import NivelService from "../../shared/services/niveis/NivelService";
import { Filters } from "../../shared/components/Filters";
import { Actions } from "../../shared/components/Actions";
import { NivelModal } from "../../shared/components/NivelModal";
import { INivel } from "../../shared/interfaces/INivel";
import { TableHeader, TableRow } from "../../shared/components/NivelTable";
import { useNiveis } from "../../shared/hooks/useNiveis";

export const Niveis = () => {
  const [nivelToEdit, setNivelToEdit] = useState<INivel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const {
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
    handleItemsPerPageChange
  } = useNiveis();

  const handleDelete = async (id: number) => {
    setLoading(true);
    MessageService.confirm(
      "Deseja deletar esse nível?",
      "Nível deletado com sucesso!",
      async () => {
        await NivelService.deleteNivel(id);
        await queryClient.invalidateQueries(['niveis', page, itens, sort, order, idFilter, nivelFilter]);
      }
    ).finally(() => {
      setLoading(false);
    });
  };

  const handleEdit = (nivel: INivel) => {
    setShow(true);
    setNivelToEdit(nivel);
  };

  return (
    <>
      <NivelModal show={show} handleClose={handleClose} nivelToEdit={nivelToEdit} />
      <Loading loading={isLoading || loading} />

      <div className="container mt-1">
        <h1 className="mb-2">Níveis</h1>

        <Filters
          idFilter={idFilter}
          nivelFilter={nivelFilter}
          setIdFilter={setIdFilter}
          setNivelFilter={setNivelFilter}
          handleItemsPerPageChange={handleItemsPerPageChange}
          itens={itens}
        />

        <Actions handlePageChange={handlePageChange} page={page} textButton={"Cadastrar Nível"} />

        <Table striped bordered responsive>
          <TableHeader handleSortChange={handleSortChange} />
          <tbody>
            {nivelRes?.data.map((nivel: INivel) => (
              <TableRow
                key={nivel.id}
                nivel={nivel}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
