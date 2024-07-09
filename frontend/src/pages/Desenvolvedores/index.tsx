import { Table } from "react-bootstrap";
import { useDevs } from "../../shared/hooks/useDevs";
import { Filters } from "../../shared/components/Filters";
import { Actions } from "../../shared/components/Actions";
import { DevTableHeader, DevTableRow } from "../../shared/components/DevTable";
import { IDesenvolvedor } from "../../shared/interfaces/IDesenvolvedor";
import { Loading } from "../../shared/components/Loading";
import { useState } from "react";

export const Desenvolvedores = () => {
  const [loading, setLoading] = useState<boolean>(false);

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
  } = useDevs();

  return (
    <div className="container mt-1">
      <Loading loading={isLoading || loading} />
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
              handleEdit={() => {}}
              handleDelete={() => {}}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
