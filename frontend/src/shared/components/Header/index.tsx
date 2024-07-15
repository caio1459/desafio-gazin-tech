import { Link } from "react-router-dom";
import image from '/images/logo.png';
import Container from "react-bootstrap/esm/Container";
import { Navbar, Nav } from "react-bootstrap";

export const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-dark fixed-top">
        <Container fluid>
          <Navbar.Brand  className="text-light">
            <Link to={'/'} className="d-flex align-items-center navbar-brand text-light fs-4">
              <img
                src={image}
                alt="Logo"
                width="60"
                height="60"
                className="d-inline-block align-text-top me-2"
              />
              DevTech
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="text-light">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/" className="text-light nav-link-custom">
                <i className="bi bi-house me-2"></i> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/niveis" className="text-light nav-link-custom">
                <i className="bi bi-bar-chart me-2"></i> Niveis
              </Nav.Link>
              <Nav.Link as={Link} to="/desenvolvedores" className="text-light nav-link-custom">
                <i className="bi bi-person-lines-fill me-2"></i> Desenvolvedores
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
