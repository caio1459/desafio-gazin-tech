import { Col, Container, Row } from "react-bootstrap";
import { CustomCarousel } from "../../shared/components/CustomCarousel";
import { CustomCard } from "../../shared/components/CustomCard";
import { useNiveis } from "../../shared/hooks/useNiveis";
import { useDevs } from "../../shared/hooks/useDevs";

export const Home = () => {
  const { nivelRes, getTotalNivelToDev } = useNiveis();
  const { devRes } = useDevs();

  return (
    <>
      <Container>
        <h1>{ }</h1>
        <h1 className="mb-4">Boas vindas ao DevTech</h1>
        <Row className="justify-content-center">
          <Col md={6}>
            <CustomCard
              title={"Niveis cadastrados"}
              text={
                nivelRes?.meta.total === undefined
                  ? 'Carregando...'
                  : `Total: ${nivelRes.meta.total}`
              }
            />
            <CustomCard
              title={"Niveis associados a desenvolvedores"}
              text={
                nivelRes?.meta.total === undefined
                  ? 'Carregando...'
                  : `Total: ${getTotalNivelToDev()}`
              }
            />
            <CustomCard
              title={"Desenvolvedores cadastrados"}
              text={
                devRes?.meta.total === undefined
                  ? 'Carregando...'
                  : `Total: ${devRes.meta.total}`
              }
            />
          </Col>
          <Col md={6}>
            <CustomCarousel />
          </Col>
        </Row>
      </Container>
    </>
  );
};
