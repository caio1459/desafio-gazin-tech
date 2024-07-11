import { useDevs } from "../../shared/hooks/useDevs";
import { Filters } from "../../shared/components/Filters";
import { IDesenvolvedor } from "../../shared/interfaces/IDesenvolvedor";
import { Actions } from "../../shared/components/Actions";
import { Table } from "react-bootstrap";
import { DevTableHeader, DevTableRow } from "../../shared/components/DevTable";
import { Loading } from "../../shared/components/Loading";
import { DevModal } from "../../shared/components/DevModal";

export const Desenvolvedores = () => {

  const {
    idFilter,
    nomeFilter,
    hobbyFilter,
    sexoFilter,
    nivelIdFilter,
    setIdFilter,
    setNomeFilter,
    setHobbyFilter,
    setSexoFilter,
    setNivelIdFilter,
    handleItemsPerPageChange,
    handlePageChange,
    handleSortChange,
    itens,
    page,
    devRes,
    isLoading,
    show,
    devToEdit,
    handleClose,
    loading,
    handleDelete,
    handleEdit
  } = useDevs();

  return (
    <>
      <DevModal show={show} handleClose={handleClose} devToEdit={devToEdit} />
      <Loading loading={isLoading || loading} />

      <div className="container mt-1">
        <h1 className="mb-2">Desenvolvedores</h1>
        <Filters
          idFilter={idFilter}
          nomeFilter={nomeFilter}
          hobbyFilter={hobbyFilter}
          sexoFilter={sexoFilter}
          nivelIdFilter={nivelIdFilter}
          setIdFilter={setIdFilter}
          setNomeFilter={setNomeFilter}
          setHobbyFilter={setHobbyFilter}
          setSexoFilter={setSexoFilter}
          setNivelIdFilter={setNivelIdFilter}
          handleItemsPerPageChange={handleItemsPerPageChange}
          itens={itens}
        />

        <Actions
          handlePageChange={handlePageChange}
          page={page}
          textButton={"Cadastrar Desenvolvedor"}
          entity="desenvolvedor"
        />

        <Table striped bordered responsive>
          <DevTableHeader handleSortChange={handleSortChange} />
          <tbody>
            {devRes?.data.map((dev: IDesenvolvedor) => (
              <DevTableRow
                key={dev.id}
                desenvolvedor={dev}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
};
