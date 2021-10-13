import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import authService from "../../services/authService";

export default function NavBar() {
	const user = authService.getCurrentUser();
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
					</Nav>

					{!user && (
						<Nav className="d-flex">
							<Nav.Link as={Link} to="/login">
								Login
							</Nav.Link>
							<Nav.Link as={Link} to="/users/new">
								Signup
							</Nav.Link>
						</Nav>
					)}

					{user && (
						<div className="d-flex">
							<NavDropdown
								title={user.name}
								variant="dark"
								id="navbarScrollingDropdown"
							>
								<NavDropdown.Item as={Link} to="/dash">
									Profile
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/dash">
									Dashboard
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={Link} to="/#">
									Hi!
								</NavDropdown.Item>
							</NavDropdown>
							<Button variant="outline-danger" as={Link} to="/logout">
								Logout
							</Button>
						</div>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
