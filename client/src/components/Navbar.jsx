import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarBootstrap from "react-bootstrap/Navbar";
import Logo from "../images/QSP_1.svg";

export function Navbar() {
  return (
    <div>
      <NavbarBootstrap
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        style={{ marginBottom: "30px" }}
      >
        <Container>
          <NavbarBootstrap.Brand as={Link} to="/">
            <img
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />{" "}
            Query Scanner Pro
          </NavbarBootstrap.Brand>
          <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBootstrap.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/recent_document">
                Documentos recientes
              </Nav.Link>
            </Nav>
          </NavbarBootstrap.Collapse>
        </Container>
      </NavbarBootstrap>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
