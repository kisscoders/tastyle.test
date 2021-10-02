import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					tastyle
				</Link>
				<div className="collapse navbar-collapse" id="navbarNav">
					<div className="navbar-nav">
						<NavLink className="nav-item nav-link" to="/">
							Home
						</NavLink>
						<NavLink className="nav-item nav-link" to="/admin">
							Dash
						</NavLink>
						<NavLink className="nav-item nav-link" to="/products">
							Products
						</NavLink>
						<NavLink className="nav-item nav-link" to="/orders">
							Orders
						</NavLink>
						{/* <NavLink className="nav-item nav-link" to="/posts/2019/19">
              Posts
            </NavLink> */}
						<NavLink className="nav-item nav-link" to="/movies">
							Movies
						</NavLink>
						{!user && (
							<React.Fragment>
								<NavLink className="nav-item nav-link" to="/login">
									Login
								</NavLink>
								<NavLink className="nav-item nav-link" to="/register">
									Register
								</NavLink>
							</React.Fragment>
						)}
						{user && (
							<React.Fragment>
								<NavLink className="nav-item nav-link" to="/me">
									{user.name}
								</NavLink>
								<NavLink className="nav-item nav-link" to="/logout">
									Logout
								</NavLink>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
