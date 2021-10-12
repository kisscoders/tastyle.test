import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavBar = ({ user }) => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container fluid>
				<Navbar.Brand href="/">tastyle</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="/products">Products</Nav.Link>
					</Nav>

					{!user && (
						<Nav className="d-flex">
							<Nav.Link href="/login">Login</Nav.Link>
							<Nav.Link href="/register">Signup</Nav.Link>
						</Nav>
					)}

					{user && (
						<div className="d-flex">
							<NavDropdown
								title={user.name}
								variant="dark"
								id="navbarScrollingDropdown"
							>
								<NavDropdown.Item href="/dash#profile">Profile</NavDropdown.Item>
								<NavDropdown.Item href="/dash">Dashboard</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#">Hi!</NavDropdown.Item>
							</NavDropdown>
							<Button variant="outline-danger" href="/logout">
								Logout
							</Button>
						</div>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
