import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export function MainHeader() {
  return (
    <>
      <Navbar variant="dark" expand="lg" className=" bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">
            <img width="100px" src="/summer-sweet-colorful.png" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="Projects" id="basic-nav-dropdown">
                <NavDropdown.Item href="/projects/comprehensiveconfig">
                  Comprehensive Config (Python)
                </NavDropdown.Item>
                <NavDropdown.Item href="/projects/compiler-toolkit">
                  Compiler Toolkit (Not Yet Released)
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
