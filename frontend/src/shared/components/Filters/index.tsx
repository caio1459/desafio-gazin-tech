import React, { ChangeEvent } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

interface IFiltersProps {
  idFilter?: string;
  nivelFilter?: string;
  nomeFilter?: string;
  hobbyFilter?: string;
  sexoFilter?: string;
  nivelIdFilter?: string;
  setIdFilter?: (value: string) => void;
  setNivelFilter?: (value: string) => void;
  setNomeFilter?: (value: string) => void;
  setHobbyFilter?: (value: string) => void;
  setSexoFilter?: (value: string) => void;
  setNivelIdFilter?: (value: string) => void;
  handleItemsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  itens: number;
}

export const Filters: React.FC<IFiltersProps> = ({
  idFilter,
  nivelFilter,
  nomeFilter,
  hobbyFilter,
  sexoFilter,
  nivelIdFilter,
  setIdFilter,
  setNivelFilter,
  setNomeFilter,
  setHobbyFilter,
  setSexoFilter,
  setNivelIdFilter,
  handleItemsPerPageChange,
  itens,
}) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Filtros</Card.Title>
        <Form>
          <Row>
            {idFilter !== undefined && setIdFilter && (
              <Col md={2}>
                <Form.Group controlId="formID">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={"Filtrar por ID"}
                    value={idFilter}
                    onChange={(e) => setIdFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
            )}
            {nivelFilter !== undefined && setNivelFilter && (
              <Col md={6}>
                <Form.Group controlId="formNivel">
                  <Form.Label>Nível</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={"Filtrar por nível"}
                    value={nivelFilter}
                    onChange={(e) => setNivelFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
            )}
            {nomeFilter !== undefined && setNomeFilter && (
              <Col md={4}>
                <Form.Group controlId="formNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={"Filtrar por nome"}
                    value={nomeFilter}
                    onChange={(e) => setNomeFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
            )}
            {hobbyFilter !== undefined && setHobbyFilter && (
              <Col md={6}>
                <Form.Group controlId="formHobby">
                  <Form.Label>Hobby</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={"Filtrar por hobby"}
                    value={hobbyFilter}
                    onChange={(e) => setHobbyFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
            )}
            {sexoFilter !== undefined && setSexoFilter && (
              <Col md={4}>
                <Form.Group controlId="formSexo">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select
                    value={sexoFilter}
                    onChange={(e) => setSexoFilter(e.target.value)}
                    aria-label="Filtrar por sexo"
                  >
                    <option value="">Selecione o sexo</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            {nivelIdFilter !== undefined && setNivelIdFilter && (
              <Col md={4}>
                <Form.Group controlId="formNivelId">
                  <Form.Label>Nível ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={"Filtrar por nível ID"}
                    value={nivelIdFilter}
                    onChange={(e) => setNivelIdFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
            )}
            <Col md={4}>
              <Form.Group controlId="formItems">
                <Form.Label>Qtd por Página</Form.Label>
                <Form.Select
                  onChange={handleItemsPerPageChange}
                  value={itens.toString()}
                  aria-label="Items por página"
                >
                  <option value="2">2 items por página</option>
                  <option value="5">5 items por página</option>
                  <option value="10">10 items por página</option>
                  <option value="20">20 items por página</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
