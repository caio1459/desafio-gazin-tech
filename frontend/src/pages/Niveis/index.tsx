import { Table } from "react-bootstrap";
import { Loading } from "../../shared/components/Loading";
import { Filters } from "../../shared/components/Filters";
import { Actions } from "../../shared/components/Actions";
import { NivelModal } from "../../shared/components/NivelModal";
import { INivel } from "../../shared/interfaces/INivel";
import { NivelTableHeader, NivelTableRow } from "../../shared/components/NivelTable";
import { useNiveis } from "../../shared/hooks/useNiveis";
import { CustomToast } from "../../shared/components/CustomToast";

export const Niveis = () => {

  const {
    page,
    itens,
    idFilter,
    nivelFilter,
    nivelRes,
    isLoading,
    setIdFilter,
    setNivelFilter,
    handleSortChange,
    handlePageChange,
    handleItemsPerPageChange,
    handleDelete,
    loading,
    show,
    handleClose,
    nivelToEdit,
    handleEdit,
    toast,
    errorMessages
  } = useNiveis();

  return (
    <>
      {errorMessages.length > 0 &&
        errorMessages.map((msg, i) => (
          <CustomToast
            key={i}
            visible={toast}
            title={"Erro ao excluir desenvolvedor!"}
            text={msg}
          />
        ))}
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

        <Actions
          handlePageChange={handlePageChange}
          page={page}
          textButton={"Cadastrar Nível"}
          entity="nivel"
        />

        <Table striped bordered responsive>
          <NivelTableHeader handleSortChange={handleSortChange} />
          <tbody>
            {nivelRes?.data.map((nivel: INivel) => (
              <NivelTableRow
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
