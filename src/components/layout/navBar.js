import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { getCurrentUser } from "../../services/authService";
const user = getCurrentUser();

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          tastyle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/list">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/test">
              Test
            </Nav.Link>
          </Nav>

          {!user && (
            <Nav className="d-flex pe-1">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </Nav>
          )}

          {user && (
            <div className="d-flex bg-dark text-white">
              <NavDropdown
                className="pe-1 "
                title={<span className="text-white my-auto">{user.name}</span>}
                menuVariant="dark"
                drop="start"
                // align="left"
              >
                <NavDropdown.Item as={Link} to="/dash">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/logout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              <div className="m-auto me-3">
                <img
                  className="rounded-circle"
                  src={user.avatar.url}
                  alt="profile"
                  width="30"
                />
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
