import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavBar = ({ user }) => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container fluid>
				<Navbar.Brand href="#">tastyle</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="/products">Products</Nav.Link>
						<Nav.Link href="/orders">Orders</Nav.Link>
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
								<NavDropdown.Item href="/me">Profile</NavDropdown.Item>
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

// <nav className="navbar navbar-expand-sm navbar-light bg-light">
// 	<Stack direction="horizontal" gap={3}>
// 		<Link className="navbar-brand me-auto" to="/">
// 			tastyle
// 		</Link>
// 		<NavLink className="nav-item nav-link" to="/products">
// 			Products
// 		</NavLink>
// 		<NavLink className="nav-item nav-link" to="/orders">
// 			Orders
// 		</NavLink>
// 		<Form.Control className="me-auto" placeholder="Add your item here..." />
// 		<Button variant="secondary">Submit</Button>
// 		<div className="vr" />
// 		<Button variant="outline-danger">Reset</Button>
// 		{!user && (
// 			<React.Fragment>
// 				<NavLink className="nav-item nav-link" to="/login">
// 					Login
// 				</NavLink>
// 				<NavLink className="nav-item nav-link" to="/register">
// 					Register
// 				</NavLink>
// 			</React.Fragment>
// 		)}
// 		{user && (
// 			<React.Fragment>
// 				<Dropdown as={ButtonGroup}>
// 					<Button variant="primary" href="/me">
// 						{user.name}
// 					</Button>

// 					<Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

// 					<Dropdown.Menu>
// 						<Dropdown.Item href="/admin">Dash</Dropdown.Item>
// 						<Dropdown.Item href="/logout">Logout</Dropdown.Item>
// 					</Dropdown.Menu>
// 				</Dropdown>
// 			</React.Fragment>
// 		)}
// 	</Stack>
// </nav>
