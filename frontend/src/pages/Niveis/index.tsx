import { Table, Card, Form, Button, Row, Col, Pagination } from "react-bootstrap";
import NivelService from "../../shared/services/niveis/NivelService";
import { useEffect, useState } from "react";
import { INivelRes } from "../../shared/interfaces/INivel";
import { ErroException } from "../../shared/services/api/ErrorException";
import { Loading } from "../../shared/components/Loading";

export const Niveis = () => {
  const [nivelRes, setNivelRes] = useState<INivelRes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [itens, setItens] = useState<number>(2);
  const [sort, setSort] = useState<string>('id');
  const [order, setOrder] = useState<string>('asc');

  const fetchNiveis = async () => {
    await NivelService.getAll(page, itens, sort, order).then((res) => {
      if (res instanceof ErroException) {
        console.error(res.stack)
      } else {
        setNivelRes(res)
      };
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchNiveis();
  }, [page, itens, sort, order]);

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <>
      <Loading loading={loading} />
      <div className="container mt-3">
        <h1 className="mb-2">Niveis</h1>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Filtros</Card.Title>
            <Form>
              <Row>
                <Col md={2}>
                  <Form.Group controlId="formID">
                    <Form.Label>Nível</Form.Label>
                    <Form.Control type="text" placeholder="Filtrar por ID" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formNivel">
                    <Form.Label>Nível</Form.Label>
                    <Form.Control type="text" placeholder="Filtrar por nível" />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button variant="dark" type="submit">
                    Aplicar Filtros
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-between mb-2">
          <Pagination>
            <Pagination.Prev onClick={() => handlePageChange(page > 1 ? page - 1 : 1)} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={() => handlePageChange(page + 1)} />
          </Pagination>
        </div>

        <Table striped bordered responsive>
          <thead>
            <tr className="table-hover">
              <th>ID</th>
              <th>Nivel</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {nivelRes?.data.map((nivel) => (
              <tr key={nivel.id}>
                <td>{nivel.id}</td>
                <td>{nivel.nivel}</td>
                <td>
                  <button type="button" className="btn btn-info me-1">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" className="btn btn-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
