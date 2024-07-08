import React, { ChangeEvent } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

interface IFiltersProps {
  idFilter: string;
  nivelFilter: string;
  setIdFilter: (value: string) => void;
  setNivelFilter: (value: string) => void;
  handleItemsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  itens: number;
}

export const Filters: React.FC<IFiltersProps> = ({
  idFilter,
  nivelFilter,
  setIdFilter,
  setNivelFilter,
  handleItemsPerPageChange,
  itens
}) => {
  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Filtros</Card.Title>
          <Form>
            <Row>
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
              <Col md={6}>
                <Form.Group controlId="formNivel">
                  <Form.Label>Nivel</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={"Filtrar por nivel"}
                    value={nivelFilter}
                    onChange={(e) => setNivelFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formItems">
                  <Form.Label>Qtd por Página</Form.Label>
                  <Form.Select onChange={handleItemsPerPageChange} value={itens.toString()} aria-label="Items por página">
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
    </>
  )
}